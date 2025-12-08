import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
// In a real app, we would check auth here.
// For now, we'll assume we are protecting this via middleware or client-side check, 
// but since this is a layout, server-side check is better.
// I'll add a placeholder check.

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // TODO: Add actual authentication check here.
    // const session = await getSession();
    // if (!session) redirect('/login');

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 hidden md:block">
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">StudioFlow CMS</h2>
                </div>
                <nav className="mt-6 px-4 space-y-2">
                    <Link
                        href="/dashboard/projects"
                        className="block px-4 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        Projects
                    </Link>
                    <Link
                        href="/dashboard/settings"
                        className="block px-4 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        Settings
                    </Link>
                    <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                        <Link
                            href="/"
                            className="block px-4 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                        >
                            View Site
                        </Link>
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
