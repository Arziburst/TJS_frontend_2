// Core
import React, { FC } from 'react';

// Assets
import { SCREENS_NUMBER } from '@/assets/themes';

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
import { useWindowWidth } from '@/tools/hooks';

// Types
interface PropTypes extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
    /* type props here */
}

export const SPACE_FOOTER = 'mt-6';

export const Footer: FC<PropTypes> = ({
    className,
    ...props
}) => {
    const [ width ] = useWindowWidth();

    return (
        <footer
            className = { cn(
                `${S.footer} ${SPACE_FOOTER} border-secondary-100/10`,
                className,
            ) }
            { ...props }>
            {width < SCREENS_NUMBER.SB && (
                <h2 className = 'footer_logo text-center'>
                    <Logo
                        className = 'max-sb:text-quaternary text-[12px] tracking-[2.4px]'
                        variant = 'desktop'
                    />
                </h2>
            )}
            <address className = { `${S.footer_address} flex justify-evenly items-end gap-4 flex-wrap not-italic text-quaternary
               
                sb:justify-center sb:items-center
                xl:gap-8` }>
                <div>
                    {width < SCREENS_NUMBER.SB && (
                        <p className = { S.contact_title }>Phone:</p>
                    )}
                    <a
                        className = { S.contact_subtitle }
                        href = 'tel:+38066-830-1029'>
                        +38 (066) 830 10 29
                    </a>
                </div>
                <div>
                    <Link to = { LINK_INSTAGRAM }>
                        <Icons.Instagram />
                    </Link>
                </div>
                <div>
                    {width < SCREENS_NUMBER.SB && (
                        <p className = { S.contact_title }>Email:</p>
                    )}
                    <a
                        className = { S.contact_subtitle }
                        href = 'mailto:elena-arez@ukr.net'>
                        elena-arez@ukr.net
                    </a>
                </div>
            </address>
            <div className = { `${S.footer_description_1}` }>
                <p className = { S.contact_small }>Trend Jewelry Store 2023. All Rights Reserved</p>
            </div>
            <div className = { `${S.footer_description_2}` }>
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
