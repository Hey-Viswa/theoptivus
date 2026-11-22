import React from 'react';
import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';

export interface RichTextRendererProps {
  content: string;
  className?: string;
}

const markdownComponents: Components = {
  a: ({ href, children, ...props }) => {
    const isExternal = Boolean(href && /^https?:\/\//i.test(href));
    return (
      <a
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        {...props}
      >
        {children}
      </a>
    );
  },
};

export function RichTextRenderer({
  content,
  className = '',
}: RichTextRendererProps) {
  if (!content) return null;

  return (
    <div className={`editorial-prose ${className}`.trim()}>
      <ReactMarkdown components={markdownComponents}>{content}</ReactMarkdown>
    </div>
  );
}

export default RichTextRenderer;
