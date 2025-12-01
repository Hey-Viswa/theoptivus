'use client';
import { useState } from 'react';
import { databases, COLLECTIONS, DATABASE_ID } from '@/lib/appwrite';
import { ID } from 'appwrite';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            await databases.createDocument(
                DATABASE_ID,
                COLLECTIONS.MESSAGES,
                ID.unique(),
                {
                    ...formData,
                    timestamp: new Date().toISOString()
                }
            );
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            console.error('Error sending message:', error);
            setStatus('error');
        }
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

                <div className="bg-neutral-900/50 border border-white/5 p-8 md:p-12 rounded-3xl backdrop-blur-xl shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none transition-opacity duration-500 group-hover:opacity-100 opacity-50"></div>

                    {status === 'success' ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in zoom-in duration-500">
                            <div className="w-20 h-20 bg-green-500/10 text-green-400 rounded-full flex items-center justify-center text-4xl border border-green-500/20 shadow-[0_0_30px_rgba(74,222,128,0.2)]">
                                ✓
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold mb-2">Message Sent!</h3>
                                <p className="text-gray-400">Thanks for reaching out. I'll get back to you soon.</p>
                            </div>
                            <button
                                onClick={() => setStatus('idle')}
                                className="mt-4 px-6 py-2 bg-white/5 hover:bg-white/10 rounded-full text-sm text-white transition-all hover:scale-105"
                            >
                                Send another message
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                            <div className="space-y-2">
                                <label htmlFor="name" className="block text-xs uppercase tracking-widest text-gray-500 ml-1">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-300 placeholder:text-gray-600"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-xs uppercase tracking-widest text-gray-500 ml-1">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-300 placeholder:text-gray-600"
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="message" className="block text-xs uppercase tracking-widest text-gray-500 ml-1">Message</label>
                                <textarea
                                    id="message"
                                    required
                                    rows={4}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-300 resize-none placeholder:text-gray-600"
                                    placeholder="Tell me about your project..."
                                />
                            </div>

                            {status === 'error' && (
                                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center">
                                    Something went wrong. Please try again.
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
