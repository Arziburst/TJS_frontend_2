// Core
import { cn } from '@/tools/lib/utils';
import React, { FC } from 'react';

// Types
interface PropTypes extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
    src: string;
    alt: string;
}

export const Image: FC<PropTypes> = ({ src, className, ...props }) => {
    return (
        <img
            className = { cn('block max-w-full h-auto object-cover', className) }
            src = { src }
            { ...props }
        />
    );
};
