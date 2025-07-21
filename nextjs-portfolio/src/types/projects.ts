export interface Project {
  _id: string;
  _type: 'project';
  title: string;
  slug: {
    _type: 'slug';
    current: string;
  };
  description?: string;
  liveUrl?: string;
  githubUrl?: string;
  techStack?: string[];
  image?: {
    asset: {
      _ref: string;
      _type: 'reference';
      url?: string; // Optional – depends on your GROQ or image URL builder
    };
  };
}
