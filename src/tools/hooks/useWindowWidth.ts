// Core
import { useState, useEffect } from 'react';

// Types
type UseWindowWidthContract = () => [ number, React.Dispatch<React.SetStateAction<number>> ];

export const useWindowWidth: UseWindowWidthContract = () => {
    const [ width, setWidth ] = useState<number>(window.innerWidth);

    const updateWidth = () => {
        setWidth(window.innerWidth);
    };

    useEffect(() => {
        updateWidth();
        window.addEventListener('resize', updateWidth);

        return () => {
            window.removeEventListener('resize', updateWidth);
        };
    }, []);

    return [ width, setWidth ];
};
