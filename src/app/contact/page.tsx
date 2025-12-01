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
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-20">
                <div>
                    <h1 className="text-6xl md:text-8xl font-display font-bold uppercase mb-10 leading-none">
                        Let's<br />
                        <span className="text-outline text-transparent stroke-white">Talk</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-md mb-10">
                        Have a project in mind or just want to say hi?
                        Fill out the form or send me an email directly.
                    </p>

                    <div className="space-y-4 text-gray-400">
                        <div>
                            <span className="block text-xs uppercase tracking-widest text-gray-600 mb-1">Email</span>
                            <a href="mailto:hello@viswa.dev" className="text-xl hover:text-white transition-colors">hello@viswa.dev</a>
                        </div>
                        <div>
                            <span className="block text-xs uppercase tracking-widest text-gray-600 mb-1">Socials</span>
                            <div className="flex gap-4 flex-wrap">
                                <a href="https://x.com/Hey_viswa_" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter</a>
                                <a href="https://www.linkedin.com/in/biswaranjangiri/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
                                <a href="https://github.com/Hey-Viswa/Hey-Viswa" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
                                <a href="https://www.instagram.com/theoptivus/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
                                <a href="https://www.youtube.com/@theoptivus" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">YouTube</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-2xl backdrop-blur-sm">
                    {status === 'success' ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                            <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center text-3xl">
                                ✓
                            </div>
                            <h3 className="text-2xl font-bold">Message Sent!</h3>
                            <p className="text-gray-400">Thanks for reaching out. I'll get back to you soon.</p>
                            <button
                                onClick={() => setStatus('idle')}
                                className="mt-4 text-sm text-accent hover:underline"
                            >
                                Send another message
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-accent transition-colors"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-accent transition-colors"
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                                <textarea
                                    id="message"
                                    required
                                    rows={4}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-accent transition-colors resize-none"
                                    placeholder="Tell me about your project..."
                                />
                            </div>

                            {status === 'error' && (
                                <div className="text-red-500 text-sm">
                                    Something went wrong. Please try again.
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={status === 'submitting'}
                                className="w-full bg-white text-black font-bold py-4 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
