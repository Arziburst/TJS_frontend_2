// Core
import React, { FC } from 'react';

// Tools
import { cn } from '@/tools/lib/utils';

// Elements
import { Image, NavLink } from '@/view/elements';

// Types
interface PropTypes extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
    category: string;
}

export const LinkCategory: FC<PropTypes> = ({
    className,
    category,
    ...props
}) => {
    return (
        <div
            { ...props }
            className = { cn('flex sm:justify-center', className) }>
            <NavLink
                className = { cn('flex gap-3 flex-wrap items-center', className) }
                to = { `/${category}` }>
                <Image
                    alt = { `Image of category ${category}` }
                    className = 'w-[60px] aspect-[10/8] sb:w-[100px]'
                    src = 'assets/image_category_brooch.png'
                />
                <p className = { `flex content-start flex-wrap text-[40px] leading-[54px] uppercase
                max-[420px]:text-3xl
                max-[350px]:text-xl
                ` }>
                    {category}
                    <span className = 'text-base font-secondary text-quaternary'>
                        {'(03)'}
                    </span>
                </p>
            </NavLink>
        </div>
    );
};

