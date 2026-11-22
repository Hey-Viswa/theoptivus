export interface FilmCraftPillar {
  index: string;
  title: string;
  discipline: string;
  description: string;
  notes: string[];
}

export interface FilmCmsField {
  key: string;
  type: string;
  purpose: string;
}

export const FILM_PROFILE = {
  handle: 'dopviswaa',
  eyebrow: 'Director · Editor · Technical Visuals',
  headline: 'Thinking in frames, sound, and camera movement.',
  summary:
    'Outside software engineering, I write, shoot, and edit visual stories and technical visual essays. Architecture and filmmaking share the same core habit: controlling structure, pacing, and causality.',
  instagramUrl: 'https://www.instagram.com/yoitsviswa/',
  pillars: [
    {
      index: '01',
      title: 'Cinematography & Framing',
      discipline: 'Camera · Optics',
      description:
        'Deliberate focal-length choices, blocked movement, and natural light shaped around subject intent rather than gear flex.',
      notes: ['Lens & depth-of-field decisions', 'Controlled handheld & locked frames'],
    },
    {
      index: '02',
      title: 'Editing & Sound Design',
      discipline: 'Cut · Rhythm · Foley',
      description:
        'Building tension and clarity on the timeline through tight J/L cuts, room tone layering, and tactile sound beds.',
      notes: ['Pacing across short-form & essays', 'SFX layering & dialogue cleanup'],
    },
    {
      index: '03',
      title: 'Technical Visual Essays',
      discipline: 'Systems Explained Visually',
      description:
        'Scripting and directing visual breakdowns of complex engineering mechanics, from GPU triangle-rasterization pipelines to distributed state.',
      notes: ['Storyboarded technical diagrams', 'Precision motion + voiceover timing'],
    },
    {
      index: '04',
      title: '3D & VFX Craft',
      discipline: 'Compositing · Look Dev',
      description:
        'Integrating 3D camera projections, match-moved plates, and subtle post composites only when the story genuinely calls for it.',
      notes: ['Clean plate work & tracking', 'Color grading & halation restraint'],
    },
  ] satisfies FilmCraftPillar[],
  cmsRoadmap: {
    status: 'Next: Self-Hosted Director & Case-Study CMS',
    description:
      'After building Harsh Savale’s custom CMS studio, I am wiring my own database-backed system into this portfolio so software logs, director reels, frame stills, and gear notes publish directly from one unified backend.',
    schemaPreview: [
      { key: 'track', type: `'engineering' | 'film'`, purpose: 'Routes entries across code and director tracks' },
      { key: 'title / slug', type: 'string', purpose: 'Static + dynamic App Router resolution' },
      { key: 'playbackUrl', type: 'string', purpose: 'Adaptive HLS / video reel stream source' },
      { key: 'cameraNotes', type: 'string[]', purpose: 'Optics, lighting & cut notes stored beside stills' },
    ] satisfies FilmCmsField[],
  },
} as const;
