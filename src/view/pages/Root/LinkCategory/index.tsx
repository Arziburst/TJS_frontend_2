// Core
import React, { FC } from 'react';

// Book
import { BOOK } from '@/view/routes/book';

// Tools
import { cn } from '@/tools/lib/utils';

// Elements
import { Image, NavLink } from '@/view/elements';

// Styles
import S from './styles.module.css';

// Types
interface PropTypes extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    category: string;
    numberItems: number;
    image: string;
}

export const LinkCategory: FC<PropTypes> = ({
    className,
    category,
    numberItems,
    image,
    ...props
}) => {
    return (
        <div
            { ...props }
            className = { cn('flex sm:justify-center', className) }>
            <NavLink
                className = { cn(`${S.root} flex gap-3 flex-wrap items-center`, className) }
                to = { `${BOOK.SHOP}/${category}` }
                variant = 'none'>
                <Image
                    alt = { `Image of category ${category}` }
                    className = 'w-[60px] aspect-[10/8] sb:w-[100px]'
                    src = { `assets/${image}` }
                />
                <p className = { `flex content-start flex-wrap text-[40px] leading-[54px] uppercase
                max-[420px]:text-3xl
                max-[350px]:text-xl
                ` }>
                    {category}
                    <span className = 'text-base font-secondary text-quaternary'>
                        {`(${numberItems < 10 ? `0${numberItems}` : numberItems})`}
                    </span>
                </p>
            </NavLink>
        </div>
    );
};

