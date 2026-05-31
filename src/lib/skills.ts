import { Skill } from '@/types/skill';

const RESUME_SKILLS: Skill[] = [
    // Languages
    { name: 'JavaScript', slug: 'javascript', category: 'Languages', level: 'Expert', featured: true, order: 1 },
    { name: 'TypeScript', slug: 'typescript', category: 'Languages', level: 'Expert', featured: true, order: 2 },
    { name: 'Java', slug: 'java', category: 'Languages', level: 'Advanced', featured: true, order: 3 },
    { name: 'Kotlin', slug: 'kotlin', category: 'Languages', level: 'Advanced', featured: true, order: 4 },
    { name: 'Solidity', slug: 'solidity', category: 'Languages', level: 'Intermediate', featured: true, order: 5 },
    // Frameworks
    { name: 'React', slug: 'react', category: 'Frameworks', level: 'Expert', featured: true, order: 6 },
    { name: 'Next.js', slug: 'nextjs', category: 'Frameworks', level: 'Expert', featured: true, order: 7 },
    { name: 'Node.js', slug: 'nodejs', category: 'Frameworks', level: 'Expert', featured: true, order: 8 },
    { name: 'Express', slug: 'express', category: 'Frameworks', level: 'Expert', featured: true, order: 9 },
    // BlockChain
    { name: 'Hardhat', slug: 'hardhat', category: 'BlockChain', level: 'Intermediate', featured: true, order: 10 },
    { name: 'Smart Contracts', slug: 'smart-contracts', category: 'BlockChain', level: 'Intermediate', featured: true, order: 11 },
    { name: 'Polygon', slug: 'polygon', category: 'BlockChain', level: 'Intermediate', featured: true, order: 12 },
    { name: 'MetaMask', slug: 'metamask', category: 'BlockChain', level: 'Intermediate', featured: true, order: 13 },
    // Databases
    { name: 'MongoDB', slug: 'mongodb', category: 'Databases', level: 'Advanced', featured: true, order: 14 },
    { name: 'SQL (MySQL)', slug: 'sql', category: 'Databases', level: 'Advanced', featured: true, order: 15 },
    // Cloud
    { name: 'AWS (S3, EC2)', slug: 'aws', category: 'Cloud', level: 'Intermediate', featured: true, order: 16 },
    { name: 'Vercel', slug: 'vercel', category: 'Cloud', level: 'Advanced', featured: true, order: 17 },
    { name: 'Railway', slug: 'railway', category: 'Cloud', level: 'Advanced', featured: true, order: 18 },
    // Tools
    { name: 'Redis', slug: 'redis', category: 'Tools', level: 'Intermediate', featured: true, order: 19 },
    { name: 'Razorpay', slug: 'razorpay', category: 'Tools', level: 'Intermediate', featured: true, order: 20 },
    { name: 'Clerk', slug: 'clerk', category: 'Tools', level: 'Advanced', featured: true, order: 21 },
    { name: 'Tailwind CSS', slug: 'tailwind', category: 'Tools', level: 'Expert', featured: true, order: 22 },
    { name: 'Git', slug: 'git', category: 'Tools', level: 'Advanced', featured: true, order: 23 },
    { name: 'GitHub', slug: 'github', category: 'Tools', level: 'Advanced', featured: true, order: 24 },
    // Concepts
    { name: 'REST APIs', slug: 'rest-apis', category: 'Concepts', level: 'Expert', featured: true, order: 25 },
    { name: 'WebSockets', slug: 'websockets', category: 'Concepts', level: 'Advanced', featured: true, order: 26 },
    { name: 'RBAC', slug: 'rbac', category: 'Concepts', level: 'Advanced', featured: true, order: 27 },
    { name: 'Real-time Systems', slug: 'real-time', category: 'Concepts', level: 'Advanced', featured: true, order: 28 },
];

export async function getSkills(filter?: {
    category?: string;
    featured?: boolean;
    limit?: number;
}) {
    let filtered = [...RESUME_SKILLS];

    if (filter?.category) {
        filtered = filtered.filter(s => s.category === filter.category);
    }

    if (filter?.featured) {
        filtered = filtered.filter(s => s.featured);
    }

    if (filter?.limit) {
        filtered = filtered.slice(0, filter.limit);
    }

    return {
        skills: filtered,
        total: filtered.length
    };
}

export async function getAllSkills() {
    return getSkills();
}
