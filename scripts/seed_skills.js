const { Client, Databases, ID } = require('node-appwrite');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const client = new Client();

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const apiKey = process.env.APPWRITE_API_KEY || process.env.NEXT_PRIVATE_APPWRITE_SECRET_API_KEY;

if (!endpoint || !projectId || !apiKey) {
    console.error('Error: Missing Appwrite configuration in .env.local');
    process.exit(1);
}

client
    .setEndpoint(endpoint)
    .setProject(projectId)
    .setKey(apiKey);

const databases = new Databases(client);

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || 'theoptivus-db';
const SKILLS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_SKILLS || 'skills';

const skills = [
    // Frontend
    { name: 'React.js', category: 'Frontend', level: 'Advanced', featured: true },
    { name: 'Next.js', category: 'Frontend', level: 'Advanced', featured: true },
    { name: 'JavaScript (ES6+)', category: 'Frontend', level: 'Advanced', featured: false },
    { name: 'TypeScript', category: 'Frontend', level: 'Advanced', featured: true },
    { name: 'GSAP (Animations)', category: 'Frontend', level: 'Intermediate', featured: true },
    { name: 'TailwindCSS', category: 'Frontend', level: 'Advanced', featured: true },
    { name: 'Shadcn UI', category: 'Frontend', level: 'Advanced', featured: false },
    { name: 'HTML5', category: 'Frontend', level: 'Expert', featured: false },
    { name: 'CSS3', category: 'Frontend', level: 'Expert', featured: false },

    // Backend
    { name: 'Node.js', category: 'Backend', level: 'Advanced', featured: true },
    { name: 'Express.js', category: 'Backend', level: 'Advanced', featured: false },
    { name: 'REST APIs', category: 'Backend', level: 'Advanced', featured: false },
    { name: 'Authentication (Sessions, JWT, Clerk)', category: 'Backend', level: 'Intermediate', featured: false },
    { name: 'RBAC & Entitlement Enforcement', category: 'Backend', level: 'Intermediate', featured: false },
    { name: 'WebSockets (Socket.io)', category: 'Backend', level: 'Intermediate', featured: false },
    { name: 'Redis + BullMQ Queues', category: 'Backend', level: 'Intermediate', featured: false },
    { name: 'Cron Jobs / Background Workers', category: 'Backend', level: 'Intermediate', featured: false },

    // Databases
    { name: 'MongoDB', category: 'Database', level: 'Advanced', featured: true },
    { name: 'Appwrite Database', category: 'Database', level: 'Advanced', featured: true },
    { name: 'Mongoose', category: 'Database', level: 'Advanced', featured: false },

    // DevOps / Cloud
    { name: 'Vercel (Frontend Deployment)', category: 'DevOps', level: 'Advanced', featured: false },
    { name: 'Railway (Backend Deployment)', category: 'DevOps', level: 'Intermediate', featured: false },
    { name: 'AWS S3 (File Storage)', category: 'DevOps', level: 'Intermediate', featured: false },
    { name: 'Razorpay Integration (Payments)', category: 'DevOps', level: 'Intermediate', featured: false },
    { name: 'CI/CD Fundamentals', category: 'DevOps', level: 'Intermediate', featured: false },

    // Mobile Development
    { name: 'Kotlin (Jetpack Compose)', category: 'Mobile', level: 'Intermediate', featured: false },
    { name: 'Android MVVM Architecture', category: 'Mobile', level: 'Intermediate', featured: false },
    { name: 'Firebase (Auth, Firestore, Storage)', category: 'Mobile', level: 'Intermediate', featured: false },
    { name: 'Dependency Injection (Hilt / Koin)', category: 'Mobile', level: 'Intermediate', featured: false },

    // Tools
    { name: 'Git & GitHub', category: 'Tools', level: 'Advanced', featured: false },
    { name: 'Postman', category: 'Tools', level: 'Advanced', featured: false },
    { name: 'Jira / Agile Workflow', category: 'Tools', level: 'Intermediate', featured: false },
    { name: 'Figma (UI/UX)', category: 'Tools', level: 'Intermediate', featured: false },
];

function slugify(text) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
}

async function seed() {
    console.log('Seeding Skills...');

    let order = 0;
    for (const skill of skills) {
        order++;
        const slug = slugify(skill.name);

        try {
            await databases.createDocument(
                DATABASE_ID,
                SKILLS_COLLECTION_ID,
                ID.unique(),
                {
                    name: skill.name,
                    slug: slug,
                    category: skill.category,
                    level: skill.level,
                    featured: skill.featured,
                    order: order,
                }
            );
            console.log(`Added skill: ${skill.name}`);
        } catch (error) {
            console.error(`Failed to add skill ${skill.name}:`, error.message);
        }
        // Small delay to prevent rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log('Seeding complete!');
}

seed().catch(console.error);
