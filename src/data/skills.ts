export type SkillDomain =
  | 'Languages'
  | 'Frontend & Mobile'
  | 'Backend & Real-time'
  | 'Databases & Storage'
  | 'Cloud & Platforms'
  | 'Payments & Tooling'
  // Retained strictly for SkillForm.tsx / SkillCategory type compatibility; excluded from SKILL_DOMAINS & SKILLS.
  | 'Film & Visual Craft';

export const SKILL_DOMAINS = [
  'Languages',
  'Frontend & Mobile',
  'Backend & Real-time',
  'Databases & Storage',
  'Cloud & Platforms',
  'Payments & Tooling',
] as const satisfies readonly SkillDomain[];

export type SkillItem = {
  name: string;
  slug: string;
  domain: SkillDomain;
  projects: string[];
  context?: string;
};

export const SKILLS: SkillItem[] = [
  // Languages
  {
    name: 'Kotlin',
    slug: 'kotlin',
    domain: 'Languages',
    projects: ['fnet'],
    context: 'Represents money in integer paise and gives each ledger command an explicit type.',
  },
  {
    name: 'TypeScript',
    slug: 'typescript',
    domain: 'Languages',
    projects: ['freshkatta', 'harsh-portfolio'],
    context: 'End-to-end typing across Next.js storefronts, Firebase Cloud Functions, and CMS schemas.',
  },
  {
    name: 'JavaScript',
    slug: 'javascript',
    domain: 'Languages',
    projects: ['freshkatta', 'harsh-portfolio', 'studioflow', 'civiclens'],
    context: 'Node.js APIs, React apps, and real-time event services.',
  },
  {
    name: 'Python',
    slug: 'python',
    domain: 'Languages',
    projects: ['civiclens'],
    context: 'Flask inference service running zero-shot CLIP verification on civic issue photos.',
  },
  {
    name: 'Dart',
    slug: 'dart',
    domain: 'Languages',
    projects: ['freshkatta'],
    context: 'Companion Flutter rider delivery app with foreground GPS tracking.',
  },
  {
    name: 'SQL',
    slug: 'sql',
    domain: 'Languages',
    projects: ['fnet'],
    context: 'Relational ledger schemas and local Room SQLite queries.',
  },

  // Frontend & Mobile
  {
    name: 'Jetpack Compose',
    slug: 'jetpack-compose',
    domain: 'Frontend & Mobile',
    projects: ['fnet'],
    context: 'Builds the expense keypad, activity filters, and ledger dashboard on Android.',
  },
  {
    name: 'WorkManager',
    slug: 'workmanager',
    domain: 'Frontend & Mobile',
    projects: ['fnet'],
    context: 'Checks scheduled investment entries in the background, with foreground catch-up when Android delays a worker.',
  },
  {
    name: 'Next.js (App Router)',
    slug: 'nextjs',
    domain: 'Frontend & Mobile',
    projects: ['freshkatta', 'harsh-portfolio'],
    context: 'SSR/ISR storefronts, dynamic case study routes, and custom admin studios.',
  },
  {
    name: 'React',
    slug: 'react',
    domain: 'Frontend & Mobile',
    projects: ['freshkatta', 'harsh-portfolio', 'studioflow', 'civiclens'],
    context: 'Component architecture across storefronts, CMS interfaces, SaaS workspaces, and dashboards.',
  },
  {
    name: 'Flutter',
    slug: 'flutter',
    domain: 'Frontend & Mobile',
    projects: ['freshkatta'],
    context: 'Android rider app running a foreground location service for live delivery tracking.',
  },
  {
    name: 'Tailwind CSS',
    slug: 'tailwind-css',
    domain: 'Frontend & Mobile',
    projects: ['freshkatta', 'harsh-portfolio', 'studioflow', 'civiclens'],
    context: 'Design tokens, editorial typography systems, and responsive layouts.',
  },
  {
    name: 'Vite',
    slug: 'vite',
    domain: 'Frontend & Mobile',
    projects: ['studioflow', 'civiclens'],
    context: 'Fast SPA builds for multi-role SaaS workspaces and geospatial civic dashboards.',
  },
  {
    name: 'Mapbox GL & Leaflet',
    slug: 'maps-geospatial',
    domain: 'Frontend & Mobile',
    projects: ['freshkatta', 'civiclens'],
    context: 'Live OpenStreetMap rider tracking and Mapbox GL municipal ward mapping.',
  },
  {
    name: 'PWA & Service Workers',
    slug: 'pwa',
    domain: 'Frontend & Mobile',
    projects: ['freshkatta'],
    context: 'Installable storefront experience with push notification delivery.',
  },

  // Backend & Real-time
  {
    name: 'Node.js',
    slug: 'nodejs',
    domain: 'Backend & Real-time',
    projects: ['freshkatta', 'harsh-portfolio', 'studioflow', 'civiclens'],
    context: 'REST APIs, Firebase Cloud Functions, webhook handlers, and backend services.',
  },
  {
    name: 'Express',
    slug: 'express',
    domain: 'Backend & Real-time',
    projects: ['studioflow', 'civiclens'],
    context: 'Modular routing, RBAC middleware, and JWT session verification.',
  },
  {
    name: 'Firebase Cloud Functions',
    slug: 'cloud-functions',
    domain: 'Backend & Real-time',
    projects: ['freshkatta'],
    context: 'Gen-2 callables for server-authoritative Razorpay checkout, refund scoring, and alerts.',
  },
  {
    name: 'Socket.IO & WebSockets (ws)',
    slug: 'websockets',
    domain: 'Backend & Real-time',
    projects: ['studioflow', 'civiclens'],
    context: 'Live workspace revision rooms and native WebSocket complaint status broadcasts.',
  },
  {
    name: 'Bull v4 & Redis Queues',
    slug: 'bull-redis',
    domain: 'Backend & Real-time',
    projects: ['studioflow'],
    context: 'Background worker queues for transactional reminders, invoice follow-ups, and audit logs.',
  },
  {
    name: 'Flask & CLIP Inference',
    slug: 'flask-clip',
    domain: 'Backend & Real-time',
    projects: ['civiclens'],
    context: 'Zero-shot vision-language verification scoring citizen infrastructure photos against issue categories.',
  },
  {
    name: 'REST APIs & RBAC',
    slug: 'rest-rbac',
    domain: 'Backend & Real-time',
    projects: ['freshkatta', 'harsh-portfolio', 'studioflow', 'civiclens'],
    context: 'Role-scoped authorization for operators, studio clients, riders, and municipal officers.',
  },

  // Databases & Storage
  {
    name: 'Room SQLite',
    slug: 'room',
    domain: 'Databases & Storage',
    projects: ['fnet'],
    context: 'Commits journal entries and account postings together in one offline transaction.',
  },
  {
    name: 'DataStore',
    slug: 'datastore',
    domain: 'Databases & Storage',
    projects: ['fnet'],
    context: 'Restores appearance and notification preferences across app restarts.',
  },
  {
    name: 'Cloud Firestore',
    slug: 'firestore',
    domain: 'Databases & Storage',
    projects: ['freshkatta'],
    context: 'Order state machine, product catalog, and security-ruled collections.',
  },
  {
    name: 'MongoDB Atlas & Mongoose',
    slug: 'mongodb',
    domain: 'Databases & Storage',
    projects: ['studioflow', 'civiclens'],
    context: 'Document schemas for multi-role SaaS workspaces and geospatial civic complaints.',
  },
  {
    name: 'Redis',
    slug: 'redis',
    domain: 'Databases & Storage',
    projects: ['studioflow'],
    context: 'Backs Bull v4 job queues and asynchronous background workers.',
  },
  {
    name: 'AWS S3',
    slug: 'aws-s3',
    domain: 'Databases & Storage',
    projects: ['studioflow'],
    context: 'Presigned upload and download pipeline for versioned studio deliverables.',
  },
  {
    name: 'Azure Blob Storage',
    slug: 'azure-blob',
    domain: 'Databases & Storage',
    projects: ['civiclens'],
    context: 'Cloud object storage for citizen evidence photos and field resolution proofs.',
  },
  {
    name: 'Appwrite & Firebase Storage',
    slug: 'media-storage',
    domain: 'Databases & Storage',
    projects: ['freshkatta', 'harsh-portfolio'],
    context: 'Storage buckets for CMS media galleries and dispute evidence.',
  },

  // Cloud & Platforms
  {
    name: 'Firebase Platform',
    slug: 'firebase',
    domain: 'Cloud & Platforms',
    projects: ['freshkatta'],
    context: 'Auth, Firestore, Cloud Functions, App Check (reCAPTCHA v3), and FCM.',
  },
  {
    name: 'Appwrite',
    slug: 'appwrite',
    domain: 'Cloud & Platforms',
    projects: ['harsh-portfolio'],
    context: 'Headless CMS backend, authentication, document collections, and cloud media storage.',
  },
  {
    name: 'Vercel',
    slug: 'vercel',
    domain: 'Cloud & Platforms',
    projects: ['harsh-portfolio'],
    context: 'Edge-cached Next.js hosting and dynamic revalidation for live client portfolios.',
  },
  {
    name: 'Firebase Cloud Messaging (FCM)',
    slug: 'fcm',
    domain: 'Cloud & Platforms',
    projects: ['freshkatta'],
    context: 'Targeted customer push alerts and delivery status updates.',
  },

  // Payments & Tooling
  {
    name: 'Razorpay',
    slug: 'razorpay',
    domain: 'Payments & Tooling',
    projects: ['freshkatta', 'studioflow'],
    context: 'HMAC-verified order creation, checkout verification, and invoice settlement.',
  },
  {
    name: 'Resend',
    slug: 'resend',
    domain: 'Payments & Tooling',
    projects: ['freshkatta'],
    context: 'Transactional order confirmations and dispatch notifications.',
  },
  {
    name: 'JWT Auth',
    slug: 'jwt-auth',
    domain: 'Payments & Tooling',
    projects: ['studioflow', 'civiclens'],
    context: 'Stateless token authentication and multi-role API access control.',
  },
  {
    name: 'Git & GitHub',
    slug: 'git-github',
    domain: 'Payments & Tooling',
    projects: ['freshkatta', 'harsh-portfolio', 'studioflow', 'civiclens'],
    context: 'Version control and collaborative workflows across production and hackathon builds.',
  },
];

export function getSkillsForDomain(domain: SkillDomain): SkillItem[] {
  return SKILLS.filter((skill) => skill.domain === domain);
}

export function getSkillsByDomain(): { domain: SkillDomain; skills: SkillItem[] }[] {
  return SKILL_DOMAINS.map((domain) => ({
    domain,
    skills: getSkillsForDomain(domain),
  })).filter((group) => group.skills.length > 0);
}
