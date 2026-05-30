'use client';
import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import gsap from 'gsap';

const contactFormSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    message: z.string().min(10, 'Message must be at least 10 characters').max(1000, 'Message too long'),
    honeypot: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactPage() {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const formRef = useRef<HTMLFormElement>(null);
    const successRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors }
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            name: '',
            email: '',
            message: '',
            honeypot: ''
        }
    });

    const messageValue = watch('message', '');

    useEffect(() => {
        // Initial animation
        const ctx = gsap.context(() => {
            gsap.fromTo(containerRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
            );
        });
        return () => ctx.revert();
    }, []);

    const onSubmit = async (data: ContactFormData) => {
        setStatus('submitting');
        setErrorMessage('');

        // Animate form out
        if (formRef.current) {
            await gsap.to(formRef.current, {
                opacity: 0,
                y: -20,
                duration: 0.4,
                ease: 'power2.in'
            });
        }

        try {
            const response = await fetch('/api/contact/send-message', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.details || result.error || 'Failed to send message');
            }

            setStatus('success');
            reset();

            // Animate success in
            if (successRef.current) {
                gsap.fromTo(successRef.current,
                    { opacity: 0, scale: 0.9 },
                    { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' }
                );
            }
        } catch (error: any) {
            console.error('Error sending message:', error);
            setStatus('error');
            setErrorMessage(error.message || 'Something went wrong');

            // Animate form back in on error
            if (formRef.current) {
                gsap.to(formRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 0.4,
                    ease: 'power2.out'
                });
            }
        }
    };

    // Tailwind handles focus states natively via focus:border-accent

    return (
        <div className="min-h-screen pt-32 pb-20 px-6 flex items-center bg-background">
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-20">
                <div>
                    <span className="font-mono text-sm uppercase tracking-widest text-foreground/50 mb-6 block">04 // CONTACT</span>
                    <h1 className="text-7xl md:text-[10rem] font-display font-black mb-12 leading-none tracking-tight text-foreground border-b border-foreground pb-12">
                        Let's <br className="hidden md:block"/><span className="highlight-blue text-surface">talk</span>
                    </h1>
                    <div className="text-2xl md:text-4xl text-foreground font-sans leading-relaxed max-w-2xl mb-12">
                        <span>Have a project in mind or just want to say hi? Fill out the form or send me an email <span className="highlight-yellow">directly</span>.</span>
                    </div>

                    <div className="space-y-8 text-foreground">
                        <div className="group">
                            <span className="block font-mono text-sm uppercase tracking-widest text-foreground/50 mb-4 group-hover:text-accent transition-colors">Email</span>
                            <a href="mailto:viswaranjan.dev@gmail.com" className="text-3xl md:text-5xl font-display font-black hover:text-accent transition-colors border-b-4 border-transparent hover:border-accent pb-1">
                                viswaranjan.dev@gmail.com
                            </a>
                        </div>
                        <div>
                            <span className="block font-mono text-xs uppercase tracking-widest text-foreground/50 mb-4">Socials</span>
                            <div className="flex gap-6 flex-wrap font-mono uppercase text-sm">
                                <a href="https://x.com/Hey_viswa_" target="_blank" rel="noopener noreferrer" className="hover:text-accent hover:underline transition-colors transform duration-300">Twitter</a>
                                <a href="https://www.linkedin.com/in/biswaranjangiri/" target="_blank" rel="noopener noreferrer" className="hover:text-accent hover:underline transition-colors transform duration-300">LinkedIn</a>
                                <a href="https://github.com/Hey-Viswa/Hey-Viswa" target="_blank" rel="noopener noreferrer" className="hover:text-accent hover:underline transition-colors transform duration-300">GitHub</a>
                                <a href="https://www.instagram.com/theoptivus/" target="_blank" rel="noopener noreferrer" className="hover:text-accent hover:underline transition-colors transform duration-300">Instagram</a>
                                <a href="https://www.youtube.com/@theoptivus" target="_blank" rel="noopener noreferrer" className="hover:text-accent hover:underline transition-colors transform duration-300">YouTube</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div ref={containerRef} className="bg-surface border border-foreground p-8 md:p-12 relative overflow-hidden min-h-[600px] flex flex-col justify-center">
                    
                    {status === 'success' ? (
                        <div ref={successRef} className="h-full flex flex-col items-center justify-center text-center space-y-6">
                            <div className="w-20 h-20 bg-accent text-surface rounded-none flex items-center justify-center text-4xl border border-foreground font-display font-black">
                                ✓
                            </div>
                            <div>
                                <h3 className="text-3xl font-display font-black mb-2 text-foreground">Message Sent!</h3>
                                <p className="text-foreground/70 font-sans">Thanks for reaching out. I'll get back to you soon.</p>
                            </div>
                            <button
                                onClick={() => {
                                    setStatus('idle');
                                    if (formRef.current) {
                                        gsap.set(formRef.current, { opacity: 1, y: 0 });
                                    }
                                }}
                                className="editorial-btn mt-4"
                            >
                                SEND ANOTHER MESSAGE
                            </button>
                        </div>
                    ) : (
                        <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10 w-full">
                            {/* Honeypot Field */}
                            <input type="text" {...register('honeypot')} className="hidden" tabIndex={-1} autoComplete="off" />

                            <div className="space-y-2">
                                <label htmlFor="name" className="block font-mono text-xs uppercase tracking-widest text-foreground">Name</label>
                                <input
                                    {...register('name')}
                                    type="text"
                                    id="name"
                                    className={`w-full bg-surface-alt border-b-2 px-0 py-6 focus:outline-none transition-all duration-300 placeholder:text-foreground/30 font-sans text-2xl md:text-3xl ${errors.name ? 'border-red-500' : 'border-foreground focus:border-accent'}`}
                                    placeholder="John Doe"
                                    style={{ boxShadow: 'none' }}
                                />
                                {errors.name && <p className="text-[#FF5E5E] text-xs font-mono font-bold mt-1">{errors.name.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="block font-mono text-xs uppercase tracking-widest text-foreground">Email</label>
                                <input
                                    {...register('email')}
                                    type="email"
                                    id="email"
                                    className={`w-full bg-surface-alt border-b-2 px-0 py-6 focus:outline-none transition-all duration-300 placeholder:text-foreground/30 font-sans text-2xl md:text-3xl ${errors.email ? 'border-red-500' : 'border-foreground focus:border-accent'}`}
                                    placeholder="john@example.com"
                                    style={{ boxShadow: 'none' }}
                                />
                                {errors.email && <p className="text-[#FF5E5E] text-xs font-mono font-bold mt-1">{errors.email.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="message" className="block font-mono text-xs uppercase tracking-widest text-foreground">Message</label>
                                <textarea
                                    {...register('message')}
                                    id="message"
                                    rows={4}
                                    className={`w-full bg-surface-alt border-b-2 px-0 py-6 focus:outline-none transition-all duration-300 resize-none placeholder:text-foreground/30 font-sans text-2xl md:text-3xl ${errors.message ? 'border-red-500' : 'border-foreground focus:border-accent'}`}
                                    placeholder="Tell me about your project..."
                                    style={{ boxShadow: 'none' }}
                                />
                                <div className="flex justify-between">
                                    {errors.message ? (
                                        <p className="text-[#FF5E5E] text-xs font-mono font-bold">{errors.message.message}</p>
                                    ) : <span></span>}
                                    <span className={`text-xs font-mono ${messageValue.length > 900 ? 'text-yellow-600' : 'text-foreground/50'}`}>
                                        {messageValue.length}/1000
                                    </span>
                                </div>
                            </div>

                            {status === 'error' && (
                                <div className="p-4 bg-[#FF5E5E]/10 border border-[#FF5E5E] text-foreground font-bold text-sm text-center">
                                    {errorMessage || 'Something went wrong. Please try again.'}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={status === 'submitting'}
                                className="editorial-btn w-full mt-4"
                            >
                                {status === 'submitting' ? 'SENDING...' : 'SEND MESSAGE'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
