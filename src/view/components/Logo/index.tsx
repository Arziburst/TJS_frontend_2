// Core
import React, { FC, forwardRef } from 'react';
import { LinkProps } from 'react-router-dom';

// Tools
import { clsx, cn } from '@/tools/lib/utils';

// Book
import * as BOOK from '@/view/routes/book';

// Elements
import { Link } from '@/view/elements';

// Types
interface PropTypes extends Omit<LinkProps, 'to'> {
    variant: 'mobile' | 'desktop';
}

export const Logo: FC<PropTypes> = ({ variant, className, ...props }) => {
    const isMobile = variant === 'mobile';

    return (
        <Link
            className = { cn(
                [
                    `uppercase text-sm font-secondary font-bold text-secondary-100
                    hover:opacity-70`,
                ],
                { 'text-xs': isMobile },
                { 'text-sm': !isMobile },
                className,
            ) }
            { ...props }
            to = { BOOK.ROOT }>
            {isMobile ? 'TJS' : 'Trend Jewelry Store'}
        </Link>
    );
};

// export const Logo: FC<any> = forwardRef(({ variant, ...props }, forwardRefProp) => {
//     const isMobile = variant === 'mobile';

//     return (
//         <Link
//             className = { cn(
//                 [
//                     `uppercase text-sm font-secondary text-secondary-100
//                     hover:opacity-70`,
//                 ],
//                 { 'text-xs': isMobile },
//                 { 'text-sm': !isMobile },
//             ) }
//             { ...props }
//             ref = { forwardRefProp }
//             to = { BOOK.SHOP }>
//             {/* to = { BOOK.ROOT }> */}
//             {isMobile ? 'TJS' : 'Trend Jewelry Store'}
//         </Link>
//     );
// });
