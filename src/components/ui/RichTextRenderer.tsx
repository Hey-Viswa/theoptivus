import React from 'react';
import ReactMarkdown from 'react-markdown';

interface RichTextRendererProps {
    content: string;
    className?: string;
}

const RichTextRenderer: React.FC<RichTextRendererProps> = ({ content, className = '' }) => {
    if (!content) return null;

    return (
        <div className={`prose prose-lg dark:prose-invert max-w-none ${className}`}>
            <ReactMarkdown
                components={{
                    img: ({ node, ...props }) => (
                        <span className="block relative h-96 w-full my-8 rounded-lg overflow-hidden">
                            <img {...props} className="object-cover w-full h-full" alt={props.alt || ''} />
                        </span>
                    ),
                    a: ({ node, ...props }) => (
                        <a {...props} className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer" />
                    ),
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
};

export default RichTextRenderer;
