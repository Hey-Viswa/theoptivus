export type ProjectCategory = 'Live Product' | 'Client Work' | 'SaaS' | 'Hackathon AI';

export const PROJECT_CATEGORIES = [
  'All',
  'Live Product',
  'Client Work',
  'SaaS',
  'Hackathon AI',
] as const;

export type ProjectGalleryItem = {
  src: string;
  alt: string;
  caption: string;
};

export interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  shortTitle?: string;
  cardSummary: string;
  tagline: string;
  shortDescription: string;
  category: ProjectCategory;
  year: string;
  date: string;
  role: string;
  client: string;
  status: string;
  featured: boolean;
  thumbnail: string;
  thumbnailAlt: string;
  gallery: ProjectGalleryItem[];
  deliverables: string[];
  techStack: string[];
  techCategories: { category: string; technologies: string[] }[];
  liveUrl?: string;
  repoUrl?: string;
  content: string;
}

export const PROJECTS: PortfolioProject[] = [
  {
    id: 'proj_freshkatta',
    slug: 'freshkatta',
    title: 'FreshKatta',
    cardSummary: 'Solo D2C storefront, Cloud Functions checkout & Flutter rider app.',
    tagline: 'Production D2C fresh-meat storefront, operations console, and Flutter rider delivery app.',
    shortDescription:
      'D2C fresh-meat e-commerce and last-mile delivery platform built solo end-to-end with Next.js 15, Firebase Cloud Functions, Razorpay checkout, admin console, and a Flutter GPS rider app.',
    category: 'Live Product',
    year: '2026',
    date: '2026-06-01',
    role: 'Solo Founder & Full-Stack Engineer',
    client: 'FreshKatta (Pen, Raigad · Live Production)',
    status: 'Live in Production',
    featured: true,
    thumbnail: '/projects/freshkatta/storefront.png',
    thumbnailAlt: 'FreshKatta production storefront showing categories, delivery promise, and product catalog',
    gallery: [
      {
        src: '/projects/freshkatta/storefront.png',
        alt: 'FreshKatta D2C storefront hero and fresh meat categories',
        caption: 'Next.js 15 PWA storefront with regional cut selection, per-100g nutrition data, and geolocation checkout.',
      },
      {
        src: '/projects/freshkatta/admin-dashboard.png',
        alt: 'FreshKatta live operations and order management admin console',
        caption: 'Real-time operations console with revenue metrics, live customer presence, FCM push nudges, and refund review.',
      },
      {
        src: '/projects/freshkatta/order-tracking.png',
        alt: 'FreshKatta live customer order tracking map powered by Leaflet and OpenStreetMap',
        caption: 'Live order tracking screen streaming rider GPS telemetry from the companion Flutter rider app onto OpenStreetMap.',
      },
    ],
    deliverables: [
      'Next.js 15 PWA Storefront',
      'Server-Authoritative Razorpay Checkout',
      'Admin Operations & Refund Console',
      'Flutter Rider GPS Delivery App',
      'FCM Push & Resend Email Pipeline',
    ],
    techStack: [
      'TypeScript',
      'Next.js 15',
      'Firebase',
      'Cloud Functions',
      'Firestore',
      'Razorpay',
      'Flutter',
      'FCM',
      'Resend',
      'OpenStreetMap',
    ],
    techCategories: [
      { category: 'Storefront', technologies: ['Next.js 15', 'React', 'TypeScript', 'Tailwind CSS', 'PWA'] },
      { category: 'Serverless Backend', technologies: ['Firebase Cloud Functions (Gen-2)', 'Node.js', 'Firebase Admin SDK'] },
      { category: 'Database & Auth', technologies: ['Cloud Firestore', 'Firebase Auth', 'App Check (reCAPTCHA v3)', 'CSP'] },
      { category: 'Payments & Comms', technologies: ['Razorpay', 'Firebase Cloud Messaging (FCM)', 'Resend'] },
      { category: 'Mobile & Maps', technologies: ['Flutter', 'Dart', 'Leaflet', 'OpenStreetMap'] },
    ],
    liveUrl: 'https://freshkatta.in',
    content: `**FreshKatta** is a production direct-to-consumer platform for ordering fresh chicken, mutton, fish, and seafood with next-morning delivery in Raigad, Maharashtra. I designed, built, and run the entire stack solo across the customer PWA storefront, serverless payment backend, admin console, and a companion Flutter Android app for delivery riders. Live at [freshkatta.in](https://freshkatta.in).

## Architectural Highlights

- **Server-authoritative checkout & payments.** Built Razorpay order creation and HMAC signature verification inside Gen-2 Firebase Cloud Function callables (Admin SDK) after diagnosing blocked Firestore WebChannel connections on carrier mobile networks, keeping order placement reliable on 4G links.
- **Dispute & refund forensics.** Built a structured refund request workflow with dependency-free JPEG/PNG byte inspection and automated fraud-risk scoring that feeds directly into the operator review queue.
- **Real-time operations & presence console.** Equipped store operators with live customer presence tracking, inventory toggles, one-tap FCM push re-engagement notifications, and multi-channel transactional messaging via Resend.
- **Last-mile Flutter rider app.** Developed a companion Flutter rider application running an Android foreground location service that streams live coordinates to the customer's OpenStreetMap / Leaflet tracking link.
- **Production hardening & cost control.** Protected public endpoints with Firebase App Check (reCAPTCHA v3), strict Content Security Policy headers, Firestore security rules, and ISR/CDN caching for catalog browse traffic.`,
  },
  {
    id: 'proj_harsh_portfolio',
    slug: 'harsh-portfolio',
    title: 'Harsh Savale Portfolio & CMS',
    shortTitle: 'Harsh Savale CMS',
    cardSummary: 'Portfolio and custom headless CMS for a Mumbai designer.',
    tagline: 'Design portfolio and custom headless CMS built for Mumbai communication designer Harsh Savale.',
    shortDescription:
      'Custom portfolio and headless admin CMS built for Mumbai communication designer Harsh Savale, with dynamic case studies, filtered work archives, and cloud media management.',
    category: 'Client Work',
    year: '2026',
    date: '2026-09-01',
    role: 'Full-Stack Engineer & CMS Architect',
    client: 'Harsh Savale — Communication Designer (Mumbai, IN)',
    status: 'Live Client Platform',
    featured: true,
    thumbnail: '/projects/harsh-portfolio/case-study.png',
    thumbnailAlt: 'Harsh Savale Olympic Medal Design case study page for IOC Dakar 2026 Youth Olympic Games',
    gallery: [
      {
        src: '/projects/harsh-portfolio/case-study.png',
        alt: 'Olympic Medal Design case study page showcasing IOC Dakar 2026 shortlist recognition',
        caption: 'CMS-driven case study layout featuring full-bleed hero media, client metadata, and IOC endorsement blocks.',
      },
      {
        src: '/projects/harsh-portfolio/work.png',
        alt: 'Harsh Savale Work index with discipline category filtering and two-column project showcase',
        caption: 'Discipline-filtered work archive covering Brand Identity, Medal Design, Editorial Design, and Packaging.',
      },
      {
        src: '/projects/harsh-portfolio/home.png',
        alt: 'Harsh Savale homepage showreel hero and minimal navigation bar',
        caption: 'Editorial landing showcase with showreel playback controls, live IST studio clock, and curated project index.',
      },
      {
        src: '/projects/harsh-portfolio/about.png',
        alt: 'Harsh Savale Biography, Studio Practice, and Recognition & Honors archive',
        caption: 'Biography and studio practice page detailing ISDI Mumbai background, honors, and brand collaborations.',
      },
    ],
    deliverables: [
      'Custom Editorial Frontend',
      'Headless CMS Admin Studio',
      'Dynamic Case Study Builder',
      'Cloud Media & Asset Pipeline',
      'Discipline Filter & Archive Index',
    ],
    techStack: [
      'Next.js',
      'TypeScript',
      'React',
      'Tailwind CSS',
      'Appwrite',
      'Node.js',
      'Vercel',
    ],
    techCategories: [
      { category: 'Public Showcase', technologies: ['Next.js (App Router)', 'React', 'TypeScript', 'Tailwind CSS'] },
      { category: 'Headless CMS', technologies: ['Custom Admin Studio', 'Appwrite Backend', 'Structured Case-Study Blocks'] },
      { category: 'Data & Media', technologies: ['Appwrite Databases', 'Appwrite Cloud Storage', 'Responsive Video & Image Delivery'] },
      { category: 'Deployment', technologies: ['Vercel Edge Network', 'SSR / Dynamic Revalidation'] },
    ],
    liveUrl: 'https://harsh-portfolio-one-beta.vercel.app',
    content: `**Harsh Savale Portfolio & CMS** is a custom web platform and headless content management studio built for Mumbai communication designer Harsh Savale (ISDI Mumbai graduate and shortlisted designer in the IOC Dakar 2026 Youth Olympic Games Medal Design Competition).

## Client Problem & Engineering Solution

Communication designers publish multi-format case studies that mix high-resolution product renders, print spreads, showreel video, and client endorsements across Brand Identity, Medal Design, Packaging, Window Display, and Editorial Design. Off-the-shelf templates either flatten the layout or force developer edits for every update.

I architected a two-part system: a quiet, typography-led public showcase paired with a private headless CMS studio so the client can compose, reorder, and publish case studies independently.

## What I Built

- **Structured case-study engine.** Dynamic project routes (\`/projects/[slug]\`) supporting rich hero media, client/year metadata, endorsement pull-quotes (such as the IOC Dakar 2026 Youth Olympics shortlist recognition), and sequential next-project navigation.
- **Discipline-filtered work archive.** Instant filtering across All Works, Brand Identity, Medal Design, Environment Design, Packaging Design, Ad Design, Window Display, and Editorial Design.
- **Biography & recognition index.** Dedicated studio practice page (\`/info\`) managing biography copy, visual carousel items, recognition distinctions, downloadable resume, and partner links.
- **Headless CMS workflow.** Authenticated studio interface allowing the designer to upload high-resolution media assets, edit project metadata, and update live portfolio sections without touching code.`,
  },
  {
    id: 'proj_studioflow',
    slug: 'studioflow',
    title: 'StudioFlow',
    cardSummary: 'Agency SaaS with Socket.IO collaboration, Redis queues & Razorpay.',
    tagline: 'Multi-role agency & client workflow SaaS with real-time revisions, Redis/Bull job queues, and Razorpay invoicing.',
    shortDescription:
      'Full-stack MERN SaaS platform for creative studios to manage client projects, file revisions, real-time notifications, AWS S3 asset delivery, and Razorpay invoice payments under strict RBAC.',
    category: 'SaaS',
    year: '2025',
    date: '2025-10-01',
    role: 'Full-Stack Engineer',
    client: 'Independent SaaS Architecture',
    status: 'Open-Source Reference Platform',
    featured: true,
    thumbnail: '/projects/studioflow/thumbnail.png',
    thumbnailAlt: 'StudioFlow SaaS overview showing project workspaces, revisions, and invoicing',
    gallery: [
      {
        src: '/projects/studioflow/thumbnail.png',
        alt: 'StudioFlow platform overview and workspace summary',
        caption: 'Unified workspace for managing studio engagements, revision cycles, and client deliverables.',
      },
      {
        src: '/projects/studioflow/dashboard.png',
        alt: 'StudioFlow project operations dashboard',
        caption: 'Project dashboard tracking active milestones, revision turnaround, and real-time activity streams.',
      },
      {
        src: '/projects/studioflow/invoice.png',
        alt: 'StudioFlow Razorpay invoice generation and payment status view',
        caption: 'Integrated invoicing module with Razorpay checkout verification and automated receipt tracking.',
      },
      {
        src: '/projects/studioflow/rbac.png',
        alt: 'StudioFlow role-based access control matrix',
        caption: 'Granular Role-Based Access Control (RBAC) separating studio owners, team members, and external clients.',
      },
      {
        src: '/projects/studioflow/files.png',
        alt: 'StudioFlow AWS S3 deliverable and revision file manager',
        caption: 'Versioned file delivery pipeline backed by AWS S3 presigned URLs and revision approval gates.',
      },
    ],
    deliverables: [
      'Multi-Role Workspace UI',
      'RBAC Authorization Engine',
      'Socket.IO Real-Time Collaboration',
      'Bull v4 & Redis Background Queues',
      'Razorpay Invoicing & AWS S3 Files',
    ],
    techStack: [
      'React',
      'Node.js',
      'Express',
      'MongoDB',
      'Socket.IO',
      'Redis',
      'Bull v4',
      'Razorpay',
      'AWS S3',
      'RBAC',
    ],
    techCategories: [
      { category: 'Frontend', technologies: ['React', 'Vite', 'Tailwind CSS', 'Shadcn UI'] },
      { category: 'Backend API', technologies: ['Node.js', 'Express', 'MongoDB', 'Mongoose', 'RBAC Middleware'] },
      { category: 'Real-Time & Queues', technologies: ['Socket.IO', 'Redis', 'Bull v4 Job Queues'] },
      { category: 'Payments & Storage', technologies: ['Razorpay Webhooks', 'AWS S3 Presigned Uploads'] },
    ],
    repoUrl: 'https://github.com/Hey-Viswa/StudioFlow',
    content: `**StudioFlow** is a full-stack SaaS platform engineered to replace fragmented email threads, cloud drive links, and manual payment follow-ups between creative agencies and their clients. Built on the MERN stack with Redis-backed background workers and real-time WebSockets, it centralizes project milestones, file revisions, role permissions, and billing in one system.

## Engineering Architecture

- **Role-Based Access Control (RBAC).** Enforced strict permission boundaries across studio admins, internal collaborators, and external client stakeholders at both the Express middleware layer and React route level.
- **Asynchronous job processing with Bull v4 & Redis.** Offloaded transactional email dispatches, invoice due-date reminders, and audit log aggregation into Redis-backed Bull v4 worker queues with retry policies.
- **Real-time workspace synchronization.** Integrated Socket.IO rooms scoped by project ID so revision comments, status transitions, and file uploads appear live across connected client and studio sessions.
- **Razorpay billing & AWS S3 deliverables.** Paired presigned AWS S3 upload/download flows with Razorpay order generation and signature verification so deliverable release can be tied cleanly to invoice settlement.`,
  },
  {
    id: 'proj_civiclens',
    slug: 'civiclens',
    title: 'CivicLens',
    cardSummary: 'AI civic reporting platform with Flask + CLIP & Mapbox GL.',
    tagline: 'AI civic issue reporting and municipal dispatch platform built for HackOverflow 2026 (SIH25031).',
    shortDescription:
      'Geospatial civic infrastructure platform built for HackOverflow 2026 / SIH25031 with a React + Mapbox GL dashboard, Node/Express + MongoDB Atlas API, native WebSockets, and a Flask + CLIP image verifier.',
    category: 'Hackathon AI',
    year: '2026',
    date: '2026-03-11',
    role: 'Backend & AI Integration Engineer',
    client: 'HackOverflow 2026 · Problem Statement SIH25031',
    status: 'Hackathon Prototype',
    featured: true,
    thumbnail: '/projects/civiclens/civichome.png',
    thumbnailAlt: 'CivicLens landing portal for AI-assisted municipal issue reporting and tracking',
    gallery: [
      {
        src: '/projects/civiclens/civichome.png',
        alt: 'CivicLens public portal and civic reporting overview',
        caption: 'Citizen reporting portal for submitting geotagged municipal infrastructure issues with photo evidence.',
      },
      {
        src: '/projects/civiclens/civicdashboard.png',
        alt: 'CivicLens municipal operator dashboard with geospatial analytics',
        caption: 'Municipal command dashboard displaying CLIP-verified issue priority, department routing, and ward metrics.',
      },
      {
        src: '/projects/civiclens/civicstatus.png',
        alt: 'CivicLens real-time complaint lifecycle and WebSocket status tracker',
        caption: 'Live complaint status timeline broadcasting stage updates to citizens over native WebSockets (ws).',
      },
      {
        src: '/projects/civiclens/civicresolved.png',
        alt: 'CivicLens resolution verification and proof-of-work screen',
        caption: 'Field resolution workflow storing before/after evidence in Azure Blob Storage.',
      },
    ],
    deliverables: [
      'Node/Express REST & WebSocket API',
      'Python Flask + CLIP AI Verifier',
      'Three-Role JWT Auth System',
      'Mapbox GL Geospatial Dashboard',
      'Azure Blob Evidence Pipeline',
    ],
    techStack: [
      'React',
      'Vite',
      'Mapbox GL',
      'Node.js',
      'Express',
      'MongoDB Atlas',
      'WebSockets (ws)',
      'Python Flask',
      'CLIP',
      'Azure Blob Storage',
      'JWT',
    ],
    techCategories: [
      { category: 'Frontend & GIS', technologies: ['React', 'Vite', 'Mapbox GL', 'Tailwind CSS'] },
      { category: 'Core Backend', technologies: ['Node.js', 'Express', 'MongoDB Atlas', 'Native WebSockets (ws)', 'JWT Auth'] },
      { category: 'AI Verification', technologies: ['Python', 'Flask', 'OpenAI CLIP (Zero-Shot Vision-Language Model)'] },
      { category: 'Cloud Media', technologies: ['Azure Blob Storage'] },
    ],
    repoUrl: 'https://github.com/Hey-Viswa/optimum-ho-solution',
    content: `**CivicLens** was built for **HackOverflow 2026** (addressing Smart India Hackathon problem statement **SIH25031**) to solve a core bottleneck in municipal grievance systems: unverified, duplicate, or misrouted citizen reports overwhelming field departments.

## System Design & My Contributions

- **Multimodal CLIP verification microservice.** Built and integrated a Python Flask inference service running OpenAI's **CLIP** vision-language model to score uploaded citizen photos against reported issue categories (potholes, streetlighting, sanitation, water leakage) before routing to municipal queues.
- **Three-role JWT backend & MongoDB Atlas schemas.** Designed the Node.js + Express API and MongoDB Atlas geospatial models supporting Citizens, Department Officers, and Municipal Admins with role-scoped JWT middleware.
- **Native WebSocket (\`ws\`) live dispatch.** Implemented low-overhead native WebSocket broadcasting so status transitions, officer assignments, and resolution proofs push immediately to connected citizen trackers and operator views.
- **Mapbox GL spatial intelligence & Azure Blob Storage.** Connected the React + Vite frontend to Mapbox GL ward maps and stored high-resolution citizen and field-officer photo evidence in Azure Blob Storage.`,
  },
];

export function getAllProjects(): PortfolioProject[] {
  return [...PROJECTS];
}

export function getFeaturedProjects(): PortfolioProject[] {
  return PROJECTS.filter((project) => project.featured);
}

export function getProjectBySlug(slug: string): PortfolioProject | null {
  return PROJECTS.find((project) => project.slug === slug) ?? null;
}

export function getAllProjectSlugs(): string[] {
  return PROJECTS.map((project) => project.slug);
}

export function getAdjacentProjects(slug: string): {
  prev: PortfolioProject | null;
  next: PortfolioProject | null;
} {
  const index = PROJECTS.findIndex((project) => project.slug === slug);
  if (index === -1) {
    return { prev: null, next: null };
  }
  const prev = PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length] ?? null;
  const next = PROJECTS[(index + 1) % PROJECTS.length] ?? null;
  return { prev, next };
}
