import type { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/data/site';
import { getAllProjectSlugs } from '@/data/projects';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/film`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/skills`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.7,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = getAllProjectSlugs().map(
    (slug) => ({
      url: `${baseUrl}/work/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    })
  );

  return [...staticRoutes, ...projectRoutes];
}
