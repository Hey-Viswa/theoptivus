export interface Tech {
  _id: string;
  _type: 'tech';
  name: string;
  logo?: {
    asset: {
      _ref: string;
      _type: 'reference';
      url?: string; // Optional: typically derived using @sanity/image-url
    };
  };
  category?: string; // Example: "frontend", "backend", "tool"
}
