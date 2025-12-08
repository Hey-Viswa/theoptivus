import React from 'react';
import Image from 'next/image';

interface GalleryProps {
    fileIds: string[];
    className?: string;
}

const Gallery: React.FC<GalleryProps> = ({ fileIds, className = '' }) => {
    if (!fileIds || fileIds.length === 0) return null;

    return (
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${className}`}>
            {fileIds.map((fileId, index) => {
                const imageUrl = `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/project-assets/files/${fileId}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`;

                return (
                    <div key={fileId} className={`relative h-64 w-full overflow-hidden rounded-lg ${index % 3 === 0 ? 'md:col-span-2 md:h-96' : ''}`}>
                        <Image
                            src={imageUrl}
                            alt={`Gallery image ${index + 1}`}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default Gallery;
