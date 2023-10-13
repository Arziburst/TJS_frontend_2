// Core
import React, { Ref, forwardRef } from 'react';

// Elements
import { Image } from '@/view/elements';

// Styles
import S from './styles.module.css';

// Types
type PropTypes = {
    src: string;
    index: number;
    ref?: Ref<HTMLImageElement> | undefined;
}

export const ImageProduct = forwardRef<HTMLImageElement, PropTypes>(({
    index,
    src,
    ...props },
ref) => {
    return (
        <Image
            { ...props }
            alt = { `${index} image of the product` }
            className = { `${S.img} aspect-square w-full rounded-[8px]` }
            ref = { ref }
            src = { src }
        />
    );
});

