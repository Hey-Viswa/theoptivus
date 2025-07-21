export interface ContactSection {
  _id: string;
  _type: 'contact';
  email: string;
  phone: string;
  linkedIn: string; // URL
  github: string;   // URL
  twitter: string;  // URL
  resume: {
    asset: {
      _ref: string;
      _type: 'reference';
      url?: string; // Optional, in case you resolve it
    };
  };
}
