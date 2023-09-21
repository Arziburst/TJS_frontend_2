// Core
import React, { FC } from 'react';

// Tools
import { cn } from '@/tools/lib/utils';

// Elements
import { Image, NavLink, NavLinkPropTypes } from '@/view/elements';

// Types
interface PropTypes extends NavLinkPropTypes {
    category: string;
}

export const LinkCategory: FC<PropTypes> = ({
    category,
    className,
    ...props
}) => {
    return (
        <NavLink
            { ...props }
            className = { cn('flex gap-3 flex-wrap items-center', className) }>
            <Image
                alt = { `Image of category ${category}` }
                className = 'w-[60px] aspect-[10/8] sb:w-[100px]'
                src = 'assets/image_category_brooch.png'
            />
            <p className = 'flex content-start flex-wrap text-[40px] leading-[54px] uppercase'>
                {category}
                <span className = 'text-base font-secondary text-quaternary'>
                    {'(03)'}
                </span>
            </p>
        </NavLink>
    );
};

