import { Project } from '@/types/project';

const RESUME_PROJECTS: Project[] = [
    {
        $id: 'proj_freshkatta',
        $collectionId: 'projects',
        $databaseId: 'main',
        $createdAt: new Date().toISOString(),
        $updatedAt: new Date().toISOString(),
        $permissions: [],
        $sequence: 0,
        title: 'FreshKatta',
        slug: 'freshkatta',
        shortDescription: 'Production D2C fresh-meat e-commerce + last-mile delivery platform, built solo end-to-end.',
        content: `**FreshKatta** is a live, production direct-to-consumer platform for ordering fresh chicken, mutton, fish and seafood with next-morning delivery. I designed and built the entire stack solo — a Next.js PWA storefront, a Firebase serverless backend, secure Razorpay payments, transactional email, a Flutter rider app with live GPS tracking, and an admin operations console. It runs in production at [freshkatta.in](https://freshkatta.in).

## What I built

- **Server-authoritative payments.** Engineered a secure Razorpay flow through Cloud Function callables (Admin SDK) after diagnosing a blocked Firestore real-time transport — restoring reliability on flaky mobile networks.
- **Refund & dispute system.** Photo-fraud scoring via dependency-free JPEG/PNG byte-forensics (with optional LLM vision), feeding an admin review workflow.
- **Real-time operations.** Live customer presence & behaviour monitoring with one-tap FCM re-engagement nudges and multi-channel (push + email) customer messaging.
- **Rider app.** A Flutter app with a background-GPS foreground service and live OpenStreetMap order tracking.
- **Launch hardening.** Firebase App Check (reCAPTCHA v3), CSP, security headers and budget caps; cost-optimized via CDN/ISR for browse traffic and callables for the order path.
- **Licious-style product experience.** Image galleries, per-100g nutrition, a regional recipe library, and geolocation checkout with reverse-geocoding.

Built end-to-end, solo — front-of-house storefront to last-mile rider logistics.`,
        techStack: ['TypeScript', 'Next.js', 'Firebase', 'Firestore', 'Razorpay', 'Flutter', 'FCM', 'Resend', 'OpenStreetMap'],
        thumbnail: '/projects/freshkatta/storefront.png',
        galleryImages: [
            '/projects/freshkatta/storefront.png',
            '/projects/freshkatta/admin-dashboard.png',
            '/projects/freshkatta/order-tracking.png',
            '/projects/freshkatta/account.png',
        ],
        techCategories: [
            { category: 'Frontend', technologies: ['React', 'Next.js 15', 'TypeScript', 'Tailwind CSS', 'PWA'] },
            { category: 'Backend', technologies: ['Firebase', 'Cloud Functions (gen-2)', 'Node.js'] },
            { category: 'Database', technologies: ['Firestore'] },
            { category: 'Auth & Security', technologies: ['Firebase Auth', 'App Check', 'reCAPTCHA v3', 'CSP'] },
            { category: 'Payments', technologies: ['Razorpay'] },
            { category: 'Messaging', technologies: ['FCM', 'Resend'] },
            { category: 'Mobile', technologies: ['Flutter', 'Dart'] },
            { category: 'Maps', technologies: ['Leaflet', 'OpenStreetMap'] },
            { category: 'Hosting', technologies: ['Firebase App Hosting', 'Storage'] }
        ],
        liveUrl: 'https://freshkatta.in',
        published: true,
        featured: true,
        entitlementRequired: false,
        date: '2026-06-01'
    },
    {
        $id: 'proj_studioflow',
        $collectionId: 'projects',
        $databaseId: 'main',
        $createdAt: new Date().toISOString(),
        $updatedAt: new Date().toISOString(),
        $permissions: [],
        $sequence: 0,
        title: 'StudioFlow',
        slug: 'studioflow',
        shortDescription: 'Production-grade SaaS platform to manage projects, revisions, invoices, and workflows.',
        content: 'Built a production-grade SaaS platform to manage projects, revisions, invoices, and client workflows. Built with MERN, REST APIs, WebSockets, Redis, and Razorpay for real-time collaboration and payments. Deployed on Vercel/Railway with AWS S3 and RBAC-based access control.',
        techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'REST APIs', 'WebSockets', 'Redis', 'Razorpay', 'AWS S3'],
        thumbnail: '/projects/studioflow/thumbnail.png',
        galleryImages: [
            '/projects/studioflow/dashboard.png',
            '/projects/studioflow/invoice.png',
            '/projects/studioflow/rbac.png',
            '/projects/studioflow/files.png',
        ],
        techCategories: [
            { category: 'Frontend', technologies: ['React', 'Tailwind CSS', 'Shadcn UI'] },
            { category: 'Backend', technologies: ['Node.js', 'Express', 'MongoDB'] },
            { category: 'Real-time', technologies: ['Socket.IO'] },
            { category: 'Job Queue', technologies: ['Redis', 'BullMQ'] },
            { category: 'Payments', technologies: ['Razorpay'] },
            { category: 'Storage', technologies: ['AWS S3'] }
        ],
        repoUrl: 'https://github.com/Hey-Viswa/StudioFlow',
        liveUrl: 'https://www.studioflow.studio/',
        published: true,
        featured: true,
        entitlementRequired: false,
        date: '2025-10-01'
    },
    {
        $id: 'proj_civiclens',
        $collectionId: 'projects',
        $databaseId: 'main',
        $createdAt: new Date().toISOString(),
        $updatedAt: new Date().toISOString(),
        $permissions: [],
        $sequence: 0,
        title: 'CivicLens',
        slug: 'civiclens',
        shortDescription: 'AI civic platform for SIH 2025 with JWT authentication and real-time updates.',
        content: 'Backend engineer for SIH 2025 civic issue platform. Built JWT-based authentication (3 roles), REST APIs, and real-time updates using Socket.io. Implemented AI-based issue classification using OpenAI API and designed MongoDB data models.',
        techStack: ['Node.js', 'Express', 'MongoDB', 'OpenAI API', 'Socket.io', 'AWS S3', 'JWT'],
        thumbnail: '/projects/civiclens/civichome.png',
        galleryImages: [
            '/projects/civiclens/civicdashboard.png',
            '/projects/civiclens/civicstatus.png',
            '/projects/civiclens/civicresolved.png',
            '/projects/civiclens/civiclogin.png'
        ],
        repoUrl: 'https://github.com/Hey-Viswa/optimum-ho-solution.git',
        published: true,
        featured: true,
        entitlementRequired: false,
        date: '2025-01-01'
    },
    {
        $id: 'proj_propchain',
        $collectionId: 'projects',
        $databaseId: 'main',
        $createdAt: new Date().toISOString(),
        $updatedAt: new Date().toISOString(),
        $permissions: [],
        $sequence: 0,
        title: 'PropChain',
        slug: 'propchain',
        shortDescription: '[UNDER DEVELOPMENT] Blockchain-based property registry system with NFT ownership.',
        content: '[UNDER DEVELOPMENT] Blockchain-based property registry system with NFT ownership and role-based access. Implemented wallet integration, authentication logic, and data models with focus on frontend architecture and user experience.',
        techStack: ['Next.js 15', 'TypeScript', 'Solidity', 'Hardhat', 'Polygon', 'wagmi', 'viem', 'Clerk', 'MongoDB Atlas', 'Tailwind CSS', 'shadcn/ui', 'Zustand', 'ERC-721', 'Smart Contracts', 'MetaMask'],
        thumbnail: '/projects/propchain/home.png',
        galleryImages: [
            '/projects/propchain/dashboard.png',
            '/projects/propchain/mini.png',
            '/projects/propchain/network.png',
            '/projects/propchain/portfolio.png',
            '/projects/propchain/property.png'
        ],
        repoUrl: 'https://github.com/Hey-Viswa/PropChain',
        published: true,
        featured: true,
        entitlementRequired: false,
        date: '2024-01-01'
    }
];

export async function getProjects(filter?: {
    featured?: boolean;
    tech?: string;
    limit?: number;
    offset?: number;
}) {
    let filtered = [...RESUME_PROJECTS];

    if (filter?.featured) {
        filtered = filtered.filter(p => p.featured);
    }

    if (filter?.tech) {
        filtered = filtered.filter(p => p.techStack?.includes(filter.tech!));
    }

    if (filter?.offset) {
        filtered = filtered.slice(filter.offset);
    }

    if (filter?.limit) {
        filtered = filtered.slice(0, filter.limit);
    }

    return {
        projects: filtered,
        total: filtered.length
    };
}

export async function getProjectBySlug(slug: string) {
    const project = RESUME_PROJECTS.find(p => p.slug === slug);
    return project || null;
}

export async function getAllProjectSlugs() {
    return RESUME_PROJECTS.map(p => p.slug);
}
