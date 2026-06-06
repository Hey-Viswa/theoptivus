'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface ParticleTextProps {
    text: string;
    className?: string;
}

/**
 * The thesis of the site, made interactive: dithering builds images out of dots,
 * so here the headline word is built out of dots too. The text is rasterized to an
 * offscreen canvas, sampled on a grid into a charcoal point cloud, and each particle
 * springs to its "home" letter position while fleeing the cursor. On mount the cloud
 * scatters, then converges into the word.
 *
 * Raw three.js (no R3F). Charcoal points on a transparent canvas over the cream page.
 */
export default function ParticleText({ text, className }: ParticleTextProps) {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;

        let width = mount.clientWidth;
        let height = mount.clientHeight;
        if (!width || !height) return;

        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(width, height);
        mount.appendChild(renderer.domElement);
        renderer.domElement.style.width = '100%';
        renderer.domElement.style.height = '100%';
        renderer.domElement.style.display = 'block';

        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-width / 2, width / 2, height / 2, -height / 2, -1000, 1000);
        camera.position.z = 10;

        let geometry: THREE.BufferGeometry;
        let material: THREE.PointsMaterial;
        let points: THREE.Points;
        let home = new Float32Array(0);
        let velocities = new Float32Array(0);
        let count = 0;
        let dotSize = 2;

        function buildParticles() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            canvas.width = width;
            canvas.height = height;

            // Support multi-line: split on "\n". Stacking shorter lines lets the
            // letters grow far taller so the name fills the hero's full height.
            const lines = text.toUpperCase().split('\n').filter(Boolean);
            const setFont = (s: number) => {
                ctx.font = `900 ${s}px "Space Grotesk", "Arial Black", system-ui, sans-serif`;
            };

            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = '#fff';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            const targetW = width * 0.96;
            const lineFactor = 0.86; // distance between baselines, in ems (tight, brutalist)
            const probe = 200;

            const widest = () => {
                let w = 1;
                for (const ln of lines) w = Math.max(w, ctx.measureText(ln).width);
                return w;
            };

            // Fit by BOTH width (widest line ≤ 96%) and height (stacked block ≤ 92%).
            setFont(probe);
            let fontSize = Math.min(
                (targetW / widest()) * probe,
                (height * 0.92) / (lines.length * lineFactor)
            );
            setFont(fontSize);
            // Guard loop re-measures with the actual fill font — never clips.
            let guard = 0;
            while (widest() > targetW && guard < 40) {
                fontSize *= 0.95;
                setFont(fontSize);
                guard++;
            }

            // Draw the lines as a vertically-centered block.
            const step = fontSize * lineFactor;
            const startY = height / 2 - (step * (lines.length - 1)) / 2;
            lines.forEach((ln, i) => ctx.fillText(ln, width / 2, startY + i * step));

            const data = ctx.getImageData(0, 0, width, height).data;

            // adapt sampling gap so the particle count stays performant (<= ~12k)
            let gap = Math.max(3, Math.round(fontSize / 38));
            let positions: number[] = [];
            for (let attempt = 0; attempt < 4; attempt++) {
                positions = [];
                for (let y = 0; y < height; y += gap) {
                    for (let x = 0; x < width; x += gap) {
                        if (data[(y * width + x) * 4 + 3] > 128) {
                            positions.push(x - width / 2, -(y - height / 2), 0);
                        }
                    }
                }
                if (positions.length / 3 <= 12000) break;
                gap += 1;
            }

            count = positions.length / 3;
            dotSize = Math.max(1.5, gap * 0.85);
            home = new Float32Array(positions);
            velocities = new Float32Array(count * 3);

            const start = new Float32Array(positions);
            for (let i = 0; i < count; i++) {
                if (reduce) break; // start in place when reduced motion
                start[i * 3] = (Math.random() - 0.5) * width * 1.6;
                start[i * 3 + 1] = (Math.random() - 0.5) * height * 1.6;
            }

            geometry = new THREE.BufferGeometry();
            geometry.setAttribute('position', new THREE.BufferAttribute(start, 3));
            material = new THREE.PointsMaterial({ color: 0x1a1a1a, size: dotSize, sizeAttenuation: false });
            points = new THREE.Points(geometry, material);
            scene.add(points);
        }

        buildParticles();
        // Re-sample once webfonts are ready so the letterforms match Space Grotesk
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(() => {
                if (!geometry) return;
                scene.remove(points);
                geometry.dispose();
                material.dispose();
                buildParticles();
            });
        }

        const mouse = new THREE.Vector2(-99999, -99999);
        const onMove = (e: PointerEvent) => {
            const r = mount.getBoundingClientRect();
            mouse.x = e.clientX - r.left - width / 2;
            mouse.y = -(e.clientY - r.top - height / 2);
        };
        const onLeave = () => mouse.set(-99999, -99999);
        window.addEventListener('pointermove', onMove);
        window.addEventListener('pointerleave', onLeave);

        const repelRadius = Math.min(width, height) * 0.22;

        let raf = 0;
        const tick = () => {
            const p = geometry.attributes.position.array as Float32Array;
            for (let i = 0; i < count; i++) {
                const ix = i * 3;
                const iy = ix + 1;
                const px = p[ix];
                const py = p[iy];

                // spring toward home
                let ax = (home[ix] - px) * 0.055;
                let ay = (home[iy] - py) * 0.055;

                // repel from cursor
                const dx = px - mouse.x;
                const dy = py - mouse.y;
                const dist = Math.hypot(dx, dy);
                if (dist < repelRadius) {
                    const f = (1 - dist / repelRadius) * 7;
                    ax += (dx / (dist || 1)) * f;
                    ay += (dy / (dist || 1)) * f;
                }

                velocities[ix] = (velocities[ix] + ax) * 0.85;
                velocities[iy] = (velocities[iy] + ay) * 0.85;
                p[ix] = px + velocities[ix];
                p[iy] = py + velocities[iy];
            }
            geometry.attributes.position.needsUpdate = true;
            renderer.render(scene, camera);
            raf = requestAnimationFrame(tick);
        };
        tick();

        const ro = new ResizeObserver(() => {
            const w = mount.clientWidth;
            const h = mount.clientHeight;
            if (!w || !h || (w === width && h === height)) return;
            width = w;
            height = h;
            renderer.setSize(width, height);
            camera.left = -width / 2;
            camera.right = width / 2;
            camera.top = height / 2;
            camera.bottom = -height / 2;
            camera.updateProjectionMatrix();
            scene.remove(points);
            geometry.dispose();
            material.dispose();
            buildParticles();
        });
        ro.observe(mount);

        return () => {
            cancelAnimationFrame(raf);
            ro.disconnect();
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('pointerleave', onLeave);
            renderer.domElement.remove();
            renderer.dispose();
            geometry?.dispose();
            material?.dispose();
        };
    }, [text]);

    return <div ref={mountRef} role="img" aria-label={text} className={className} />;
}
