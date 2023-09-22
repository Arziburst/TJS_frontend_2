// Core
import React, { FC, useRef } from 'react';

// Assets

// Init
import { CATEGORIES_ITEMS, ENUM_CATEGORIES } from '@/init';

// Tools
import { useWindowWidth } from '@/tools/hooks';

// Components
import { ErrorBoundary } from '@/view/components';

// Elements
import { Image, NavLink } from '@/view/elements';
import { LinkCategory } from './LinkCategory';

// Static
import { makeJustifySelf, useStatic } from './static';

// Styles
import S from './styles.module.css';

const Root: FC = () => {
    const refRoot = useRef<null | HTMLDivElement>(null);
    const refGrid = useRef<null | HTMLDivElement>(null);

    const [ width ] = useWindowWidth();

    useStatic({ width, refGrid });

    return (
        <div
            className = { `${S.root} flex flex-col` }
            ref = { refRoot }>
            <div
                className = { `${S.grid} grid gap-3 h-full overflow-hidden` }
                ref = { refGrid }>

                {CATEGORIES_ITEMS.map((category, index) => (
                    <LinkCategory
                        category = { category }
                        className = { `${S.el}` }
                        key = { category }
                        style = {{
                            gridArea:    `g-${index}`,
                            justifySelf: makeJustifySelf({ index, width }),
                        }}
                    />
                ))}

            </div>
            <div className = { `${S.footer} flex flex-col gap-3 py-6 justify-between
                sb:flex-row` }>
                <p className = { `text-[14px] leading-[180%] uppercase 
                    md:text-[24px]
                    sb:max-w-[680px] sb:gap-5` }>
                    <span className = 'text-quaternary'>
                        TJStore
                    </span> is a store of fashionable and stylish jewelry, which the author-designer brings to life.
                </p>
                <div className = 'flex gap-6 justify-end items-center'>
                    <NavLink
                        className = 'text-sm font-secondary font-semibold capitalize'
                        to = { `/${ENUM_CATEGORIES.ALL}` }
                        variant = 'underline'>
                        see all
                    </NavLink>
                    <Image
                        alt = 'Image see all'
                        className = { `w-[60px] aspect-[10/8]
                            sb:w-[100px]` }
                        src = 'assets/image_category_see_all.png'
                    />
                </div>
            </div>
        </div>
    );
};

export default () => (
    <ErrorBoundary>
        <Root />
    </ErrorBoundary>
);
