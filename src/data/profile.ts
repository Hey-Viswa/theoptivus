export interface ProfileFact {
  index: string;
  label: string;
  value: string;
  detail: string;
  href?: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  status: string;
  location: string;
}

export interface EngineeringPrinciple {
  index: string;
  title: string;
  description: string;
}

export const PROFILE = {
  headline: 'Engineer & Visual Director in Mumbai.',
  intro: [
    'I build backend systems, full-stack web platforms, and native Android apps in Kotlin and Jetpack Compose, and I direct and edit visual stories on the side.',
  ],
  bioParagraphs: [
    'I work best as an engineer-director: building working software systems from first principles on one hand, and framing visual stories on camera and the edit timeline on the other. I prefer shipping real work quietly over announcing plans early.',
    'My engineering work starts from concrete day-to-day friction. That pushed me to build FNet (an offline-first Kotlin and Jetpack Compose finance OS with integer-paise double-entry accounting), run FreshKatta solo in production across Next.js and Flutter, write Git internals from scratch in pure Java (Mini-VCS), and build Harsh Savale’s custom portfolio and headless CMS.',
    'Earlier I interned at JSW Steel, Dolvi (Jun – Jul 2023) building an internal Android Feedback Management System in an enterprise SAP workflow environment, and I am finishing my B.E. in Computer Engineering at PHCET (Expected 2027). Outside engineering, I shoot, edit, and sound-design short-form films and technical visual essays (@dopviswaa).',
  ],
  facts: [
    {
      index: '01',
      label: 'Live Web',
      value: 'freshkatta.in',
      detail: 'Solo D2C storefront & Flutter rider app',
      href: '/work/freshkatta',
    },
    {
      index: '02',
      label: 'Native Android',
      value: 'FNet Finance OS',
      detail: 'Kotlin, Compose, Room v6 & 360+ tests',
      href: '/work#systems',
    },
    {
      index: '03',
      label: 'Client CMS',
      value: 'Harsh Savale CMS',
      detail: 'Custom Next.js & Appwrite studio',
      href: '/work/harsh-portfolio',
    },
    {
      index: '04',
      label: 'Direction',
      value: 'Film · @dopviswaa',
      detail: 'Cinematography, editing & visual essays',
      href: '/film',
    },
  ] satisfies ProfileFact[],
  experience: [
    {
      role: 'Software Developer Intern',
      company: 'JSW Steel, Dolvi',
      period: 'Jun – Jul 2023',
      location: 'Dolvi, Maharashtra',
      summary:
        'Built and delivered an internal Android Feedback Management System during a summer software engineering internship at JSW Steel Dolvi.',
      highlights: [
        'Built and delivered an Android Feedback Management System for internal plant use.',
        'Integrated REST APIs using structured Android architecture patterns.',
        'Worked in an enterprise engineering environment with exposure to SAP-based workflows.',
      ],
    },
  ] satisfies ExperienceItem[],
  education: [
    {
      degree: 'B.E. in Computer Engineering',
      institution: 'Pillai HOC College of Engineering & Technology',
      period: 'Expected 2027',
      status: 'In Progress',
      location: 'Rasayani, Maharashtra',
    },
  ] satisfies EducationItem[],
  principles: [
    {
      index: '01',
      title: 'Work in silence, ship verifiable proof',
      description:
        'Architecture notes, double-entry ledger tests, and working software carry more weight than early announcements.',
    },
    {
      index: '02',
      title: 'Understand internals before abstractions',
      description:
        'Whether implementing SHA-1 Git object storage in Java or integer-paise ledgers in Room SQLite, know what happens underneath.',
    },
    {
      index: '03',
      title: 'Keep money and state on the server',
      description:
        'Idempotent webhooks, Razorpay HMAC verification, over-refund guards, and RBAC rules belong on verified backend boundaries.',
    },
    {
      index: '04',
      title: 'Give every craft its own CMS',
      description:
        'Harsh’s portfolio runs on a headless CMS I built for him; the same architecture powers my upcoming engineering + film publishing system.',
    },
  ] satisfies EngineeringPrinciple[],
};
