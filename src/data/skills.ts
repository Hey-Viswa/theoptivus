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
] as const satisfies readonly SkillDomain[];

export type SkillItem = {
  name: string;
  slug: string;
  domain: SkillDomain;
  projects: string[];
  context?: string;
};

export const SKILLS: SkillItem[] = [
  {
    "name": "Kotlin",
    "slug": "kotlin",
    "domain": "Languages",
    "projects": [
      "fnet"
    ],
    "context": "Represents money in integer paise and gives each ledger command an explicit type."
  },
  {
    "name": "Jetpack Compose",
    "slug": "jetpack-compose",
    "domain": "Frontend & Mobile",
    "projects": [
      "fnet"
    ],
    "context": "Builds the expense keypad, activity filters and dashboard on Android."
  },
  {
    "name": "Room",
    "slug": "room",
    "domain": "Databases & Storage",
    "projects": [
      "fnet"
    ],
    "context": "Commits journal entries and postings together, including when the phone is offline."
  },
  {
    "name": "WorkManager",
    "slug": "workmanager",
    "domain": "Frontend & Mobile",
    "projects": [
      "fnet"
    ],
    "context": "Checks scheduled investment entries in the background. A foreground check catches up when Android delays a worker."
  },
  {
    "name": "DataStore",
    "slug": "datastore",
    "domain": "Databases & Storage",
    "projects": [
      "fnet"
    ],
    "context": "Restores appearance preferences when the app restarts."
  }
];

export function getSkillsForDomain(domain: SkillDomain): SkillItem[] {
  return SKILLS.filter((skill) => skill.domain === domain);
}

export function getSkillsByDomain(): { domain: SkillDomain; skills: SkillItem[] }[] {
  return SKILL_DOMAINS.map((domain) => ({
    domain,
    skills: getSkillsForDomain(domain),
  })).filter(group => group.skills.length > 0);
}
