interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  location: string;
  summary: string;
}

interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  location: string;
}

export const PROFILE = {
  bioParagraphs: [
    'I’m Viswa, a software engineer in Mumbai. I build web products, backend systems, and Android apps.',
    'I built FNet to keep financial records on the phone. Most of the interesting work happens after tapping Save, from making sure a transfer balances to spotting a payment alert that has already been recorded.',
  ],
  experience: [
    {
      role: 'Software Developer Intern',
      company: 'JSW Steel, Dolvi',
      period: 'Jun – Jul 2023',
      location: 'Dolvi, Maharashtra',
      summary: 'Built an internal Android app for managing feedback and integrated it with REST APIs.',
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
