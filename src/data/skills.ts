export type SkillDomain =
  | 'Languages'
  | 'Frontend & Mobile'
  | 'Backend & Real-time'
  | 'Databases & Storage'
  | 'Cloud & Platforms'
  | 'Payments & Tooling'
  | 'Film & Visual Craft';

export const SKILL_DOMAINS = [
  'Languages',
  'Frontend & Mobile',
  'Backend & Real-time',
  'Databases & Storage',
  'Cloud & Platforms',
  'Payments & Tooling',
  'Film & Visual Craft',
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
    name: 'TypeScript',
    slug: 'typescript',
    domain: 'Languages',
    projects: ['freshkatta', 'harsh-portfolio'],
    context: 'End-to-end typing across Next.js, Cloud Functions, ledgers, and CMS schemas',
  },
  {
    name: 'JavaScript (ES2024)',
    slug: 'javascript',
    domain: 'Languages',
    projects: ['freshkatta', 'harsh-portfolio', 'studioflow', 'civiclens'],
    context: 'Node.js APIs, React apps, and event-driven services',
  },
  {
    name: 'Kotlin',
    slug: 'kotlin',
    domain: 'Languages',
    projects: [],
    context: 'Native Android apps (FNet Finance OS) with Jetpack Compose, coroutines, and MVVM',
  },
  {
    name: 'Java',
    slug: 'java',
    domain: 'Languages',
    projects: [],
    context: 'Zero-dependency Git internals (Mini-VCS) and Android application foundations',
  },
  {
    name: 'Python',
    slug: 'python',
    domain: 'Languages',
    projects: ['civiclens'],
    context: 'FastAPI and Flask ML inference pipelines (Vanguard ClaimOS, CivicLens CLIP)',
  },
  {
    name: 'Dart',
    slug: 'dart',
    domain: 'Languages',
    projects: ['freshkatta'],
    context: 'Flutter rider app with foreground GPS tracking',
  },
  {
    name: 'SQL',
    slug: 'sql',
    domain: 'Languages',
    projects: [],
    context: 'Double-entry ledger schemas, complex aggregations, and query tuning',
  },

  // Frontend & Mobile
  {
    name: 'Next.js (App Router)',
    slug: 'nextjs',
    domain: 'Frontend & Mobile',
    projects: ['freshkatta', 'harsh-portfolio'],
    context: 'SSR/ISR storefronts, portfolios, and custom admin consoles',
  },
  {
    name: 'React',
    slug: 'react',
    domain: 'Frontend & Mobile',
    projects: ['freshkatta', 'harsh-portfolio', 'studioflow', 'civiclens'],
    context: 'UI architecture across web storefronts and dashboards',
  },
  {
    name: 'Jetpack Compose',
    slug: 'jetpack-compose',
    domain: 'Frontend & Mobile',
    projects: [],
    context: 'Declarative native Android UIs, 6-module state flows, and Material 3',
  },
  {
    name: 'Flutter',
    slug: 'flutter',
    domain: 'Frontend & Mobile',
    projects: ['freshkatta'],
    context: 'Android rider logistics app with background GPS service',
  },
  {
    name: 'Android SDK',
    slug: 'android-sdk',
    domain: 'Frontend & Mobile',
    projects: [],
    context: 'NotificationListenerService, background services, and MVVM architecture',
  },
  {
    name: 'WorkManager',
    slug: 'workmanager',
    domain: 'Frontend & Mobile',
    projects: [],
    context: 'Reliable offline-first background sync and deferred Android tasks in FNet',
  },
  {
    name: 'ML Kit OCR',
    slug: 'ml-kit-ocr',
    domain: 'Frontend & Mobile',
    projects: [],
    context: 'On-device receipt and settlement text scanning in FNet Finance OS',
  },
  {
    name: 'Tailwind CSS',
    slug: 'tailwind-css',
    domain: 'Frontend & Mobile',
    projects: ['freshkatta', 'harsh-portfolio', 'studioflow', 'civiclens'],
    context: 'Design tokens, typography systems, and responsive layouts',
  },
  {
    name: 'Vite',
    slug: 'vite',
    domain: 'Frontend & Mobile',
    projects: ['studioflow', 'civiclens'],
    context: 'Fast SPA builds for SaaS workspaces and geospatial dashboards',
  },
  {
    name: 'Mapbox GL & Leaflet',
    slug: 'maps-geospatial',
    domain: 'Frontend & Mobile',
    projects: ['freshkatta', 'civiclens'],
    context: 'Live rider tracking maps and municipal ward visualization',
  },
  {
    name: 'PWA & Service Workers',
    slug: 'pwa',
    domain: 'Frontend & Mobile',
    projects: ['freshkatta'],
    context: 'Installable storefront experience with push notifications',
  },

  // Backend & Real-time
  {
    name: 'Node.js',
    slug: 'nodejs',
    domain: 'Backend & Real-time',
    projects: ['freshkatta', 'harsh-portfolio', 'studioflow', 'civiclens'],
    context: 'REST APIs, Cloud Functions, webhooks, and settlement ledger services',
  },
  {
    name: 'Express',
    slug: 'express',
    domain: 'Backend & Real-time',
    projects: ['studioflow', 'civiclens'],
    context: 'Modular routing, RBAC middleware, and JWT session handling',
  },
  {
    name: 'FastAPI',
    slug: 'fastapi',
    domain: 'Backend & Real-time',
    projects: [],
    context: 'Typed Python APIs serving multimodal ML adjudication in Vanguard ClaimOS',
  },
  {
    name: 'PyTorch',
    slug: 'pytorch',
    domain: 'Backend & Real-time',
    projects: [],
    context: 'MobileNetV2 CNN pipelines paired with classical vision & cost fusion models',
  },
  {
    name: 'Firebase Cloud Functions',
    slug: 'cloud-functions',
    domain: 'Backend & Real-time',
    projects: ['freshkatta'],
    context: 'Gen-2 callables for checkout, refunds, and alerts',
  },
  {
    name: 'Socket.IO & WebSockets (ws)',
    slug: 'websockets',
    domain: 'Backend & Real-time',
    projects: ['studioflow', 'civiclens'],
    context: 'Live workspace revisions and real-time civic status pushes',
  },
  {
    name: 'BullMQ & Redis Queues',
    slug: 'bullmq-redis',
    domain: 'Backend & Real-time',
    projects: ['studioflow'],
    context: 'Idempotent webhook consumers, job queues, and T+1 settlement workers',
  },
  {
    name: 'Flask & CLIP Inference',
    slug: 'flask-clip',
    domain: 'Backend & Real-time',
    projects: ['civiclens'],
    context: 'Zero-shot vision-language classification for civic complaints',
  },
  {
    name: 'REST APIs & RBAC',
    slug: 'rest-rbac',
    domain: 'Backend & Real-time',
    projects: ['freshkatta', 'harsh-portfolio', 'studioflow', 'civiclens'],
    context: 'Role-scoped authorization for admins, clients, and riders',
  },

  // Databases & Storage
  {
    name: 'PostgreSQL',
    slug: 'postgresql',
    domain: 'Databases & Storage',
    projects: [],
    context: 'Double-entry settlement ledgers, deep SQL aggregations, and Neon serverless',
  },
  {
    name: 'Room SQLite',
    slug: 'room-sqlite',
    domain: 'Databases & Storage',
    projects: [],
    context: 'Offline-first Android v6 schema migrations and integer-paise transactions in FNet',
  },
  {
    name: 'Cloud Firestore',
    slug: 'firestore',
    domain: 'Databases & Storage',
    projects: ['freshkatta'],
    context: 'Order state machine, catalog, and security-rule collections',
  },
  {
    name: 'MongoDB Atlas & Mongoose',
    slug: 'mongodb',
    domain: 'Databases & Storage',
    projects: ['studioflow', 'civiclens'],
    context: 'Document schemas for SaaS workspaces and civic reports',
  },
  {
    name: 'Redis',
    slug: 'redis',
    domain: 'Databases & Storage',
    projects: ['studioflow'],
    context: 'BullMQ / Bull v4 queues, Pub/Sub, rate limiting, and state locks',
  },
  {
    name: 'AWS S3',
    slug: 'aws-s3',
    domain: 'Databases & Storage',
    projects: ['studioflow'],
    context: 'Presigned uploads and versioned client deliverable storage',
  },
  {
    name: 'Azure Blob Storage',
    slug: 'azure-blob',
    domain: 'Databases & Storage',
    projects: ['civiclens'],
    context: 'Cloud storage for citizen evidence photos and proofs',
  },
  {
    name: 'Appwrite & Firebase Storage',
    slug: 'media-storage',
    domain: 'Databases & Storage',
    projects: ['freshkatta', 'harsh-portfolio'],
    context: 'Storage buckets for CMS assets, galleries, and dispute media',
  },

  // Cloud & Platforms
  {
    name: 'Firebase Platform',
    slug: 'firebase',
    domain: 'Cloud & Platforms',
    projects: ['freshkatta'],
    context: 'App Hosting, Auth, App Check (reCAPTCHA v3), and FCM',
  },
  {
    name: 'Appwrite',
    slug: 'appwrite',
    domain: 'Cloud & Platforms',
    projects: ['harsh-portfolio'],
    context: 'Headless CMS backend, auth, collections, and media storage',
  },
  {
    name: 'Vercel',
    slug: 'vercel',
    domain: 'Cloud & Platforms',
    projects: ['harsh-portfolio', 'studioflow'],
    context: 'Edge-cached Next.js hosting and preview deployments',
  },
  {
    name: 'AWS & Railway',
    slug: 'aws-railway',
    domain: 'Cloud & Platforms',
    projects: ['studioflow'],
    context: 'Node.js API servers, Redis workers, and S3 buckets',
  },
  {
    name: 'Firebase Cloud Messaging (FCM)',
    slug: 'fcm',
    domain: 'Cloud & Platforms',
    projects: ['freshkatta'],
    context: 'Targeted customer push alerts and delivery updates',
  },

  // Payments & Tooling
  {
    name: 'Razorpay',
    slug: 'razorpay',
    domain: 'Payments & Tooling',
    projects: ['freshkatta', 'studioflow'],
    context: 'HMAC-verified orders, webhooks, over-refund guards, and invoice checkout',
  },
  {
    name: 'Resend',
    slug: 'resend',
    domain: 'Payments & Tooling',
    projects: ['freshkatta'],
    context: 'Transactional order confirmations and dispatch emails',
  },
  {
    name: 'JWT Auth',
    slug: 'auth-tooling',
    domain: 'Payments & Tooling',
    projects: ['studioflow', 'civiclens'],
    context: 'Stateless token auth and multi-role API access control',
  },
  {
    name: 'Git & GitHub',
    slug: 'git-github',
    domain: 'Payments & Tooling',
    projects: ['freshkatta', 'harsh-portfolio', 'studioflow', 'civiclens'],
    context: 'Version control, branch workflows, and deploy hooks',
  },

  // Film & Visual Craft
  {
    name: 'Cinematography & Framing',
    slug: 'cinematography-framing',
    domain: 'Film & Visual Craft',
    projects: [],
    context: 'Lens selection, camera blocking, and deliberate visual composition (@dopviswaa)',
  },
  {
    name: 'Editing & Pacing',
    slug: 'editing-pacing',
    domain: 'Film & Visual Craft',
    projects: [],
    context: 'Narrative cut structure, J/L transitions, and rhythm for short-form & visual essays',
  },
  {
    name: 'Sound Design',
    slug: 'sound-design',
    domain: 'Film & Visual Craft',
    projects: [],
    context: 'Room tone beds, foley layering, dialogue clarity, and score transitions',
  },
  {
    name: '3D & VFX',
    slug: '3d-vfx',
    domain: 'Film & Visual Craft',
    projects: [],
    context: 'Match-moved plates, technical system explainers, and restraint-first compositing',
  },
];

export function getSkillsForDomain(domain: SkillDomain): SkillItem[] {
  return SKILLS.filter((skill) => skill.domain === domain);
}

export function getSkillsByDomain(): { domain: SkillDomain; skills: SkillItem[] }[] {
  return SKILL_DOMAINS.map((domain) => ({
    domain,
    skills: getSkillsForDomain(domain),
  }));
}
