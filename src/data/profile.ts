interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  location: string;
  summary: string;
  highlights?: string[];
}

interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  location: string;
}

export const PROFILE = {
  headline: 'Software engineer building dependable web products, backend systems, and Android apps.',
  bioParagraphs: [
    'I’m Viswaranjan Giri (Viswa), a software engineer in Mumbai. I build full-stack web products, backend systems, and native Android apps.',
    'I built FNet to keep reliable financial records on a phone without needing a network connection. Most of the careful engineering happens after tapping Save, from ensuring transfers move balances without inflating income to sending ambiguous payment alerts for review.',
    'Outside software engineering, I have an ongoing interest in short films and visual storytelling, and plan to share a deliberate creative preview once a personal collection is ready.',
  ],
  experience: [
    {
      role: 'Software Developer Intern',
      company: 'JSW Steel, Dolvi',
      period: 'Jun – Jul 2023',
      location: 'Dolvi, Maharashtra',
      summary:
        'Built and delivered an internal Android Feedback Management System during an on-site summer software engineering internship at JSW Steel Dolvi, integrating REST APIs within an enterprise engineering environment.',
      highlights: [
        'Built and delivered an Android Feedback Management System for internal plant use.',
        'Integrated REST APIs and applied structured Android architecture patterns.',
        'Worked within an enterprise engineering environment with exposure to SAP-based workflows.',
      ],
    },
  ] satisfies ExperienceItem[],
  education: [
    {
      degree: 'B.E. in Computer Engineering',
      institution: 'Pillai HOC College of Engineering & Technology',
      period: 'Expected 2027',
      location: 'Rasayani, Maharashtra',
    },
  ] satisfies EducationItem[],
};
