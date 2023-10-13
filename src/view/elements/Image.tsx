// Core
import { cn } from '@/tools/lib/utils';
import React, { FC, forwardRef } from 'react';

// Types
export interface ImagePropTypes
    extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
    src: string;
    alt: string;
}

export const Image = forwardRef<HTMLImageElement, ImagePropTypes>(({ src, className, ...props }, ref) => {
    return (
        <img
            className = { cn('block max-w-full h-auto object-cover', className) }
            ref = { ref }
            src = { src }
            { ...props }
        />
    );
});

// export const Image: FC<ImagePropTypes> = ({ src, className, ref, ...props }) => {
//     return (
//         <img
//             className = { cn('block max-w-full h-auto object-cover', className) }
//             ref = { ref }
//             src = { src }
//             { ...props }
//         />
//     );
// };
