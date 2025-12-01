export const imageHelpers = {
    // Recommended sizes for full-width or large images
    sizes: {
        hero: '(max-width: 768px) 100vw, 50vw',
        card: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
        avatar: '100px',
    },

    // Priority guidelines
    priority: {
        hero: true, // Always prioritize LCP candidate
        lazy: false,
    },

    // Common aspect ratios
    aspect: {
        portrait: '4/5',
        square: '1/1',
        video: '16/9',
    },
};

export const getBlurDataURL = (color = '#333') =>
    `data:image/svg+xml;base64,${Buffer.from(
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"><rect width="1" height="1" fill="${color}"/></svg>`
    ).toString('base64')}`;
