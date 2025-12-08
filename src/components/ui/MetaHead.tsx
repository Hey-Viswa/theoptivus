import React from 'react';
import Head from 'next/head';

interface MetaHeadProps {
    title: string;
    description?: string;
    image?: string;
    url?: string;
}

const MetaHead: React.FC<MetaHeadProps> = ({
    title,
    description = 'Portfolio and Case Studies',
    image,
    url
}) => {
    const siteTitle = `${title} | StudioFlow`;
    const fullUrl = url ? `${process.env.NEXT_PUBLIC_SITE_URL}${url}` : process.env.NEXT_PUBLIC_SITE_URL;
    const ogImage = image || `${process.env.NEXT_PUBLIC_SITE_URL}/og-default.jpg`;

    return (
        <Head>
            <title>{siteTitle}</title>
            <meta name="description" content={description} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />

            {/* Open Graph */}
            <meta property="og:title" content={siteTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:image" content={ogImage} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={siteTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImage} />
        </Head>
    );
};

export default MetaHead;
