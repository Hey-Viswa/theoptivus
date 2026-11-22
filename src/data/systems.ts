export interface SystemBuild {
  id: string;
  index: string;
  name: string;
  category: string;
  summary: string;
  highlights: string[];
  stack: string[];
  repoUrl: string;
  status: string;
}

export const SYSTEM_BUILDS: SystemBuild[] = [
  {
    id: 'sys_fnet',
    index: '01',
    name: 'FNet',
    category: 'Native Android · Kotlin',
    summary:
      'Offline-first 6-module personal and shop finance OS built with Jetpack Compose, Room SQLite v6, WorkManager, and ML Kit OCR.',
    highlights: [
      'Exact integer-paise double-entry ledger with zero floating-point drift.',
      'Local NotificationListenerService + regex/NER transaction parsing.',
      'BharatPe settlement fee checksums, CSV reconciliation & 360+ unit tests.',
    ],
    stack: ['Kotlin', 'Jetpack Compose', 'Room SQLite v6', 'WorkManager', 'ML Kit OCR'],
    repoUrl: 'https://github.com/Hey-Viswa',
    status: 'Android App',
  },
  {
    id: 'sys_vanguard',
    index: '02',
    name: 'Vanguard ClaimOS',
    category: 'ML Systems · FastAPI',
    summary:
      'Multimodal car insurance claims adjudication pipeline combining visual damage scoring, classical features, and cost underwriting.',
    highlights: [
      'PyTorch MobileNetV2 CNN paired with SVM + HOG and K-Means HSV segmentation.',
      'Random Forest underwriting and repair cost fusion across claim evidence.',
      'Backed by Next.js 14 frontend, FastAPI inference API & Neon Serverless PostgreSQL.',
    ],
    stack: ['Next.js 14', 'FastAPI', 'PyTorch', 'MobileNetV2', 'Neon PostgreSQL'],
    repoUrl: 'https://github.com/Hey-Viswa',
    status: 'ML Pipeline',
  },
  {
    id: 'sys_minivcs',
    index: '03',
    name: 'Mini-VCS',
    category: 'Systems · Pure Java',
    summary:
      'Core Git internals implemented from first principles in pure Java with zero third-party libraries.',
    highlights: [
      'SHA-1 content-addressable object store (`blob <len>\\0`, 2/38 hex sharding).',
      'Custom binary/text staging index tracks working-tree diffs accurately.',
      'Merkle tree directory snapshots and immutable commit history graph.',
    ],
    stack: ['Java', 'SHA-1 Object Store', 'Merkle Trees', 'File I/O'],
    repoUrl: 'https://github.com/Hey-Viswa',
    status: 'Internals',
  },
  {
    id: 'sys_distributed',
    index: '04',
    name: 'Backend & Distributed Ledgers',
    category: 'Settlement · Sentinel · FinTrack · GridLock',
    summary:
      'Production-patterned backend services focused on idempotent financial state machines, async queues, and multi-tenant coordination.',
    highlights: [
      'Multi-PSP Settlement Ledger: webhook deduplication, over-refund guards & T+1 reconciliation.',
      'Deep SQL aggregations, Redis Pub/Sub coordination & BullMQ job pipelines.',
      'RBAC authentication, audit logs, and presigned AWS S3 workflows.',
    ],
    stack: ['Node.js', 'TypeScript', 'PostgreSQL', 'Redis Pub/Sub', 'BullMQ', 'AWS S3'],
    repoUrl: 'https://github.com/Hey-Viswa',
    status: 'Backend Systems',
  },
];
