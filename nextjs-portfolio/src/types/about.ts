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