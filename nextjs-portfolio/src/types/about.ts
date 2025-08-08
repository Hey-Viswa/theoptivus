import { PortableTextBlock } from '@portabletext/types';

export interface SocialLink {
  platform: string;
  url: string;
  icon: 'github' | 'linkedin' | 'twitter' | 'instagram' | 'youtube' | 'dribbble' | 'behance';
}

export interface Award {
  title: string;
  year: number;
}

export interface AboutSection {
  _id: string;
  authorName: string;
  sectionTitle: string;
  bio: PortableTextBlock[]; // Sanity block content
  portraitImage?: {
    asset: {
      _ref: string;
      _type: string;
      url?: string;
    };
    alt?: string;
  };
  portraitVideo?: {
    asset: {
      _ref: string;
      _type: string;
      url?: string;
    };
  };
  resume?: {
    asset: {
      _ref: string;
      _type: string;
      url?: string;
    };
    title?: string;
  };
  socialLinks?: SocialLink[];
  awards?: Award[];
  skills?: string[];
}

// Keep backward compatibility
export interface AboutMe {
  _id: string;
  _type: 'about';
  bio: string;
  image?: {
    asset: {
      _ref: string;
      _type: 'reference';
      url?: string;
    };
  };
  skills?: string[];
}

export default AboutMe;