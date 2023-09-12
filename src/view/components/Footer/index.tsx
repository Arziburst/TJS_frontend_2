// Core
import React, { FC } from 'react';

// init
import { LINK_GOHARD, LINK_INSTAGRAM } from '@/init';

// Tools
import { cn } from '@/tools/lib/utils';

// Components
import { Icons, Logo } from '@/view/components';

// Elements
import { Link } from '@/view/elements';

// Styles
import S from './styles.module.css';

// Types
interface PropTypes extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
    /* type props here */
}

export const Footer: FC<PropTypes> = ({
    className,
    ...props
}) => {
    return (
        <footer
            className = { cn(
                'pt-6 pb-3.5 flex flex-col gap-5 border-t-2 border-secondary-100/10',
                className,
            ) }
            { ...props }>
            <h2 className = 'text-center'>
                <Logo
                    className = 'max-sb:text-quaternary text-[12px] tracking-[2.4px]'
                    variant = 'desktop'
                />
            </h2>
            <address className = 'flex justify-between items-end gap-4 flex-wrap not-italic text-quaternary'>
                <div>
                    <p className = { S.contact_title }>Phone:</p>
                    <p className = { S.contact_subtitle }>+38 (066) 830 10 29</p>
                </div>
                <div>
                    <Link to = { LINK_INSTAGRAM }>
                        <Icons.Instagram />
                    </Link>
                </div>
                <div>
                    <p className = { S.contact_title }>Email:</p>
                    <p className = { S.contact_subtitle }>elena-arez@ukr.net</p>
                </div>
            </address>
            <div className = 'max-sb:text-quaternary max-sb:text-center'>
                <p className = { S.contact_small }>Trend Jewelry Store 2023. All Rights Reserved</p>
                <p className = { S.contact_small }>Developed by
                    <Link
                        className = 'font-bold underline'
                        to = { LINK_GOHARD }>
                        {' '} GoHard*
                    </Link>
                </p>
            </div>
        </footer>
    );
};
