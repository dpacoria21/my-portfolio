import { useEffect, useState } from 'react';

export const useDimensions = () => {

    const [width, setWidth] = useState<number>(window.innerWidth);
    const [height, setHeight] = useState<number>(window.innerHeight);

    const handleDimensions = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    };

    useEffect(() => {

        window.addEventListener('resize', handleDimensions);

        return () => {
            window.removeEventListener('resize', handleDimensions);
        };

    }, [width, height]);

    return {
        width,
        height
    };
};
