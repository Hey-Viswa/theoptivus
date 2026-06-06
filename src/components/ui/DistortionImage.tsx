'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface DistortionImageProps {
    src: string;
    alt?: string;
    className?: string;
}

/**
 * A project image rendered through a tiny three.js quad. At rest it's grayscale
 * (matching the site's existing b/w hover language). On hover it colorizes and,
 * driven by pointer velocity, splits the R/B channels apart — a "print
 * misregistration" chromatic shift that's the same retro-print family as the
 * ordered-dither background, so it reinforces the aesthetic instead of fighting it.
 *
 * Contained per-thumbnail (no full-screen WebGL), so it never competes with the
 * DitherBackground.
 */
export default function DistortionImage({ src, alt = '', className }: DistortionImageProps) {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(mount.clientWidth, mount.clientHeight);
        mount.appendChild(renderer.domElement);
        renderer.domElement.style.width = '100%';
        renderer.domElement.style.height = '100%';
        renderer.domElement.style.display = 'block';

        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0, 1);

        const texture = new THREE.TextureLoader().load(src, (t) => {
            t.colorSpace = THREE.SRGBColorSpace;
            sizeToCover();
        });
        texture.minFilter = THREE.LinearFilter;

        const uniforms = {
            uTexture: { value: texture },
            uOffset: { value: 0 },
            uHover: { value: 0 },
            // Image natural ratio vs container ratio — for object-cover in-shader
            uScale: { value: new THREE.Vector2(1, 1) },
            // Blue accent leans the chromatic split toward the brand color
            uAccent: { value: new THREE.Color('#2F52E0') },
        };

        const material = new THREE.ShaderMaterial({
            uniforms,
            transparent: true,
            vertexShader: /* glsl */ `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = vec4(position.xy * 2.0, 0.0, 1.0);
                }
            `,
            fragmentShader: /* glsl */ `
                uniform sampler2D uTexture;
                uniform float uOffset;
                uniform float uHover;
                uniform vec2 uScale;
                uniform vec3 uAccent;
                varying vec2 vUv;

                void main() {
                    // object-cover
                    vec2 uv = (vUv - 0.5) / uScale + 0.5;

                    float o = uOffset;
                    float r = texture2D(uTexture, uv + vec2(o, 0.0)).r;
                    float g = texture2D(uTexture, uv).g;
                    float b = texture2D(uTexture, uv - vec2(o, 0.0)).b;
                    vec3 col = vec3(r, g, b);

                    // grayscale at rest -> full color on hover
                    float lum = dot(col, vec3(0.299, 0.587, 0.114));
                    vec3 grayed = mix(vec3(lum), col, clamp(uHover, 0.0, 1.0));

                    // tint the split fringe toward the brand blue
                    grayed = mix(grayed, grayed * uAccent * 1.4, o * 8.0);

                    gl_FragColor = vec4(grayed, 1.0);
                }
            `,
        });

        const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
        scene.add(mesh);

        function sizeToCover() {
            const img = texture.image as HTMLImageElement | undefined;
            if (!img || !img.width) return;
            const cont = mount!.clientWidth / mount!.clientHeight;
            const imgR = img.width / img.height;
            if (imgR > cont) {
                uniforms.uScale.value.set(cont / imgR, 1);
            } else {
                uniforms.uScale.value.set(1, imgR / cont);
            }
        }

        // pointer-driven chromatic offset + hover fade
        let targetOffset = 0;
        let curOffset = 0;
        let targetHover = 0;
        let curHover = 0;

        const onMove = (e: PointerEvent) => {
            const speed = Math.abs(e.movementX) + Math.abs(e.movementY);
            targetOffset = Math.min(0.012 + speed * 0.0008, 0.05);
        };
        const onEnter = () => { targetHover = 1; };
        const onLeave = () => { targetHover = 0; targetOffset = 0; };

        mount.addEventListener('pointermove', onMove);
        mount.addEventListener('pointerenter', onEnter);
        mount.addEventListener('pointerleave', onLeave);

        let raf = 0;
        const tick = () => {
            curOffset += (targetOffset - curOffset) * 0.12;
            targetOffset *= 0.88; // decay so it settles when the pointer stops
            curHover += (targetHover - curHover) * 0.1;
            uniforms.uOffset.value = curOffset * curHover;
            uniforms.uHover.value = curHover;
            renderer.render(scene, camera);
            raf = requestAnimationFrame(tick);
        };
        tick();

        const ro = new ResizeObserver(() => {
            renderer.setSize(mount.clientWidth, mount.clientHeight);
            sizeToCover();
        });
        ro.observe(mount);

        return () => {
            cancelAnimationFrame(raf);
            ro.disconnect();
            mount.removeEventListener('pointermove', onMove);
            mount.removeEventListener('pointerenter', onEnter);
            mount.removeEventListener('pointerleave', onLeave);
            renderer.domElement.remove();
            renderer.dispose();
            material.dispose();
            mesh.geometry.dispose();
            texture.dispose();
        };
    }, [src]);

    return <div ref={mountRef} role="img" aria-label={alt} className={className} />;
}
