import React from 'react';

interface TechPillsProps {
    techStack: string[];
    className?: string;
}

const TechPills: React.FC<TechPillsProps> = ({ techStack, className = '' }) => {
    if (!techStack || techStack.length === 0) return null;

    return (
        <div className={`flex flex-wrap gap-2 ${className}`}>
            {techStack.map((tech) => (
                <span
                    key={tech}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700"
                >
                    {tech}
                </span>
            ))}
        </div>
    );
};

export default TechPills;
