export interface AboutMe {
    _id: string;
    name: string;
    role: string;
    description: string;
    profileImage: {
        asset: {
            url: string;
            metadata: {
                dimensions: {
                    width: number;
                    height: number;
                };
            };
        };
    };
}