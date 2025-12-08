'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Project, ProjectDTO } from '@/types/project';
import { Skill } from '@/types/skill';
import { Client, Databases, Query } from 'appwrite';

// Initialize Appwrite Client for client-side fetching
const client = new Client();
const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

if (endpoint && projectId) {
    client.setEndpoint(endpoint).setProject(projectId);
}

const databases = new Databases(client);

interface ProjectFormProps {
    initialData?: Project;
    isEditMode?: boolean;
}

export default function ProjectForm({ initialData, isEditMode = false }: ProjectFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [availableSkills, setAvailableSkills] = useState<Skill[]>([]);

    const [formData, setFormData] = useState<ProjectDTO & { skills?: string[] }>({
        title: initialData?.title || '',
        slug: initialData?.slug || '',
        shortDescription: initialData?.shortDescription || '',
        content: initialData?.content || '',
        techStack: initialData?.techStack || [],
        skills: initialData?.skills || [],
        repoUrl: initialData?.repoUrl || '',
        liveUrl: initialData?.liveUrl || '',
        published: initialData?.published || false,
        featured: initialData?.featured || false,
        date: initialData?.date || new Date().toISOString(),
        entitlementRequired: initialData?.entitlementRequired || false,
        heroFileId: initialData?.heroFileId || '',
        galleryFileIds: initialData?.galleryFileIds || [],
    });

    const [techInput, setTechInput] = useState('');

    useEffect(() => {
        // Fetch available skills
        const fetchSkills = async () => {
            if (!process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID) return;

            try {
                const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_SKILLS || 'skills';
                const response = await databases.listDocuments(
                    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
                    collectionId,
                    [Query.limit(100), Query.orderAsc('name')]
                );
                setAvailableSkills(response.documents as unknown as Skill[]);
            } catch (err) {
                console.error('Failed to fetch skills', err);
            }
        };
        fetchSkills();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: checked }));
    };

    const handleTechAdd = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && techInput.trim()) {
            e.preventDefault();
            if (!formData.techStack?.includes(techInput.trim())) {
                setFormData(prev => ({
                    ...prev,
                    techStack: [...(prev.techStack || []), techInput.trim()]
                }));
            }
            setTechInput('');
        }
    };

    const removeTech = (tech: string) => {
        setFormData(prev => ({
            ...prev,
            techStack: prev.techStack?.filter(t => t !== tech)
        }));
    };

    const handleSkillToggle = (skillId: string) => {
        setFormData(prev => {
            const currentSkills = prev.skills || [];
            if (currentSkills.includes(skillId)) {
                return { ...prev, skills: currentSkills.filter(id => id !== skillId) };
            } else {
                return { ...prev, skills: [...currentSkills, skillId] };
            }
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const url = isEditMode
                ? `/api/projects?id=${initialData?.$id}`
                : '/api/projects';

            const method = isEditMode ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to save project');
            }

            router.push('/dashboard/projects');
            router.refresh();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 p-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Slug</label>
                    <input
                        type="text"
                        name="slug"
                        value={formData.slug}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 p-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date</label>
                    <input
                        type="datetime-local"
                        name="date"
                        value={formData.date ? new Date(formData.date).toISOString().slice(0, 16) : ''}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 p-2"
                    />
                </div>

                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Short Description</label>
                    <textarea
                        name="shortDescription"
                        value={formData.shortDescription}
                        onChange={handleChange}
                        rows={3}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 p-2"
                    />
                </div>

                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Content (Markdown)</label>
                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        rows={10}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 p-2 font-mono"
                    />
                </div>

                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Linked Skills</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-60 overflow-y-auto p-2 border border-gray-200 dark:border-gray-700 rounded-md">
                        {availableSkills.map(skill => (
                            <label key={skill.$id} className="flex items-center space-x-2 p-1 hover:bg-gray-50 dark:hover:bg-gray-800 rounded cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.skills?.includes(skill.$id) || false}
                                    onChange={() => handleSkillToggle(skill.$id)}
                                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                                <span className="text-sm text-gray-700 dark:text-gray-300">{skill.name}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tech Stack (Legacy/Manual Tags)</label>
                    <input
                        type="text"
                        value={techInput}
                        onChange={(e) => setTechInput(e.target.value)}
                        onKeyDown={handleTechAdd}
                        placeholder="Press Enter to add"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 p-2"
                    />
                    <div className="mt-2 flex flex-wrap gap-2">
                        {formData.techStack?.map(tech => (
                            <span key={tech} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center">
                                {tech}
                                <button type="button" onClick={() => removeTech(tech)} className="ml-2 text-blue-600 hover:text-blue-900">&times;</button>
                            </span>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Repo URL</label>
                    <input
                        type="url"
                        name="repoUrl"
                        value={formData.repoUrl}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 p-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Live URL</label>
                    <input
                        type="url"
                        name="liveUrl"
                        value={formData.liveUrl}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 p-2"
                    />
                </div>

                <div className="col-span-2 flex gap-6">
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            name="published"
                            checked={formData.published}
                            onChange={handleCheckboxChange}
                            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Published</span>
                    </label>

                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            name="featured"
                            checked={formData.featured}
                            onChange={handleCheckboxChange}
                            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Featured</span>
                    </label>
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                    {loading ? 'Saving...' : (isEditMode ? 'Update Project' : 'Create Project')}
                </button>
            </div>
        </form>
    );
}
