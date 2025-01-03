import React, { useState, useEffect } from 'react';

interface AsyncImageProps {
    productID: string;
    color: string;
    number: number;
    alt: string;
    className?: string;
}

const AsyncImage: React.FC<AsyncImageProps> = ({ productID, color, number, alt, className }) => {
    const [src, setSrc] = useState<string | null>(null);

    useEffect(() => {
        const loadImage = async () => {
            try {
                const image = await import(`../assets/images/${productID}/${color.toLowerCase()}-${number}.webp`);
                setSrc(image.default);
            } catch (error) {
                console.error("Error loading image:", error);
            }
        };

        loadImage();
    }, [productID, color, number]);

    if (!src) {
        return <div className={className}>Loading...</div>;
    }

    return <img src={src} alt={alt} className={className} />;
};

export default AsyncImage;