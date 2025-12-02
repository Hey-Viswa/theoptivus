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

    const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        gsap.to(e.target, {
            boxShadow: '0 0 20px rgba(255,255,255,0.1)',
            borderColor: 'rgba(255,255,255,0.3)',
            duration: 0.3
        });
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        gsap.to(e.target, {
            boxShadow: 'none',
            borderColor: 'rgba(255,255,255,0.1)',
            duration: 0.3
        });
    };

    return (
        <div className="min-h-screen pt-32 pb-20 px-6 flex items-center">
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-20">
                <div>
                    <h1 className="text-6xl md:text-8xl font-display font-bold uppercase mb-10 leading-none">
                        Let's<br />
                        <span className="text-outline text-transparent stroke-white">Talk</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-md mb-10 leading-relaxed">
                        Have a project in mind or just want to say hi?
                        Fill out the form or send me an email directly.
                    </p>

                    <div className="space-y-8 text-gray-400">
                        <div className="group">
                            <span className="block text-xs uppercase tracking-widest text-gray-600 mb-2 group-hover:text-accent transition-colors">Email</span>
                            <a href="mailto:viswaranjan.dev@gmail.com" className="text-2xl md:text-3xl font-light hover:text-white transition-colors border-b border-transparent hover:border-white pb-1">
                                viswaranjan.dev@gmail.com
                            </a>
                        </div>
                        <div>
                            <span className="block text-xs uppercase tracking-widest text-gray-600 mb-4">Socials</span>
                            <div className="flex gap-6 flex-wrap">
                                <a href="https://x.com/Hey_viswa_" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors hover:scale-110 transform duration-300">Twitter</a>
                                <a href="https://www.linkedin.com/in/biswaranjangiri/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors hover:scale-110 transform duration-300">LinkedIn</a>
                                <a href="https://github.com/Hey-Viswa/Hey-Viswa" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors hover:scale-110 transform duration-300">GitHub</a>
                                <a href="https://www.instagram.com/theoptivus/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors hover:scale-110 transform duration-300">Instagram</a>
                                <a href="https://www.youtube.com/@theoptivus" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors hover:scale-110 transform duration-300">YouTube</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div ref={containerRef} className="bg-neutral-900/50 border border-white/5 p-8 md:p-12 rounded-3xl backdrop-blur-xl shadow-2xl relative overflow-hidden group min-h-[600px] flex flex-col justify-center">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none transition-opacity duration-500 group-hover:opacity-100 opacity-50"></div>

                    {status === 'success' ? (
                        <div ref={successRef} className="h-full flex flex-col items-center justify-center text-center space-y-6">
                            <div className="w-20 h-20 bg-green-500/10 text-green-400 rounded-full flex items-center justify-center text-4xl border border-green-500/20 shadow-[0_0_30px_rgba(74,222,128,0.2)]">
                                ✓
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold mb-2">Message Sent!</h3>
                                <p className="text-gray-400">Thanks for reaching out. I'll get back to you soon.</p>
                            </div>
                            <button
                                onClick={() => {
                                    setStatus('idle');
                                    // Reset form visibility
                                    if (formRef.current) {
                                        gsap.set(formRef.current, { opacity: 1, y: 0 });
                                    }
                                }}
                                className="mt-4 px-6 py-2 bg-white/5 hover:bg-white/10 rounded-full text-sm text-white transition-all hover:scale-105"
                            >
                                Send another message
                            </button>
                        </div>
                    ) : (
                        <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10 w-full">
                            {/* Honeypot Field - Hidden */}
                            <input type="text" {...register('honeypot')} className="hidden" tabIndex={-1} autoComplete="off" />

                            <div className="space-y-2">
                                <label htmlFor="name" className="block text-xs uppercase tracking-widest text-gray-500 ml-1">Name</label>
                                <input
                                    {...register('name')}
                                    type="text"
                                    id="name"
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                    className={`w-full bg-white/5 border rounded-xl px-5 py-4 focus:outline-none focus:bg-white/10 transition-all duration-300 placeholder:text-gray-600 ${errors.name ? 'border-red-500/50' : 'border-white/10'}`}
                                    placeholder="John Doe"
                                />
                                {errors.name && <p className="text-red-400 text-xs ml-1">{errors.name.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-xs uppercase tracking-widest text-gray-500 ml-1">Email</label>
                                <input
                                    {...register('email')}
                                    type="email"
                                    id="email"
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                    className={`w-full bg-white/5 border rounded-xl px-5 py-4 focus:outline-none focus:bg-white/10 transition-all duration-300 placeholder:text-gray-600 ${errors.email ? 'border-red-500/50' : 'border-white/10'}`}
                                    placeholder="john@example.com"
                                />
                                {errors.email && <p className="text-red-400 text-xs ml-1">{errors.email.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="message" className="block text-xs uppercase tracking-widest text-gray-500 ml-1">Message</label>
                                <textarea
                                    {...register('message')}
                                    id="message"
                                    rows={4}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                    className={`w-full bg-white/5 border rounded-xl px-5 py-4 focus:outline-none focus:bg-white/10 transition-all duration-300 resize-none placeholder:text-gray-600 ${errors.message ? 'border-red-500/50' : 'border-white/10'}`}
                                    placeholder="Tell me about your project..."
                                />
                                <div className="flex justify-between ml-1">
                                    {errors.message ? (
                                        <p className="text-red-400 text-xs">{errors.message.message}</p>
                                    ) : <span></span>}
                                    <span className={`text-xs ${messageValue.length > 900 ? 'text-yellow-500' : 'text-gray-600'}`}>
                                        {messageValue.length}/1000
                                    </span>
                                </div>
                            </div>

                            {status === 'error' && (
                                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center">
                                    {errorMessage || 'Something went wrong. Please try again.'}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={status === 'submitting'}
                                className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-white/5"
                            >
                                {status === 'submitting' ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
