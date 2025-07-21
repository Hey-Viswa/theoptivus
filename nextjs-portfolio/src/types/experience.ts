export interface ExperienceSection {
  _id: string;
  _type: 'experience';
  company: string;
  role: string;
  startDate: string; // ISO date string (e.g. "2024-06-01")
  endDate: string;   // ISO date string (or handle null for present)
  description: string;
  companyLogo: {
    asset: {
      _ref: string;
      _type: 'reference';
      url?: string; // Optional if resolved in GROQ query
    };
  };
}
