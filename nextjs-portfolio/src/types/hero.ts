export interface HeroSection {
  _id: string;
  _type: "heroSection";
  headline: string;
  title: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  profileImage?: {
    asset: {
      _ref: string;
      _type: "reference";
      url?: string; // Available if resolved via GROQ or image URL builder
    };
  };
}
