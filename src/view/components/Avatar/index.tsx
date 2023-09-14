// Core
import React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';

// Elements
import { Root } from './Root';
import { Image } from './Image';
import { Fallback } from './Fallback';

// Types
interface PropTypes extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
    src: string;
    alt: string;
    fallback: string;
}

export const Avatar = React.forwardRef<
React.ElementRef<typeof AvatarPrimitive.Root>,
PropTypes
>(({ className, src, alt, fallback, ...props }, ref) => {
    if (fallback.length > 2) {
        throw new Error('Fallback must be 2 characters or less');
    }

    return (
        <Root
            className = { className }
            ref = { ref }
            { ...props }>
            <Image
                alt = { alt }
                src = { src }
            />
            <Fallback>
                {fallback}
            </Fallback>
        </Root>
    );
});
