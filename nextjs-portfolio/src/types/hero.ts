export interface HeroSection {
  _id: string;
  headline: string;
  title: string;
  subtitle?: string;
  description?: string;
  profileImage?: {
    asset: {
      _id: string;
      url: string;
    };
    alt?: string;
  };
  ctaText?: string;
  ctaLink?: string;
}
