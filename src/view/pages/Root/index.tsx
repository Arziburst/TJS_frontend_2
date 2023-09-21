// Core
import React, { FC, useEffect, useRef } from 'react';

// Assets
import { SCREENS_NUMBER } from '@/assets';

// Init
import { CATEGORIES_ITEMS, ENUM_CATEGORIES } from '@/init';

// Tools
import { useWindowWidth } from '@/tools/hooks';

// Components
import { ErrorBoundary } from '@/view/components';

// Elements
import { LinkCategory } from './LinkCategory';

// Styles
import S from './styles.module.css';
import { Image, NavLink } from '@/view/elements';

const Root: FC = () => {
    const refRoot = useRef<null | HTMLDivElement>(null);
    const refGrid = useRef<null | HTMLDivElement>(null);

    const [ width ] = useWindowWidth();

    useEffect(() => {
        if (refGrid && refGrid.current) {
            const CATEGORIES_ITEMS_MAPPED = CATEGORIES_ITEMS.map((_, index) => index);

            if (width > SCREENS_NUMBER.MD) { // desktop
                let newArray: number[] = [];


                CATEGORIES_ITEMS_MAPPED.forEach((item, index) => {
                    if (index === 0) {
                        newArray.push(index);

                        return;
                    }
                    if ((index + 1) % 3 === 0) {
                        newArray.push(index);
                        newArray.push(index);
                    } else {
                        newArray.push(index);
                    }
                });


                if (newArray.length % 2 !== 0) {
                    newArray.splice(-2, 1);
                }

                const outputArray = [];

                for (let i = 0; i < newArray.length; i += 2) {
                    const firstNumber = newArray[ i ]; // 5
                    const secondNumber = newArray[ i + 1 ];
                    const combinedNumbers = `g-${firstNumber} g-${secondNumber}`;
                    outputArray.push(combinedNumbers);
                }

                const result = `"${outputArray.join('" "')}"`;

                refGrid.current.style.gridTemplate = result;
                refGrid.current.style.justifyContent = 'normal';
            } else { // mobile
                let outputArray: string[] = [];
                CATEGORIES_ITEMS_MAPPED.forEach((number) => {
                    outputArray.push(`g-${number}`);
                });

                const result = `"${outputArray.join('" "')}"`;

                refGrid.current.style.gridTemplate = result;
                refGrid.current.style.justifyContent = 'center';
            }
            if (width < 400) {
                refGrid.current.style.justifyContent = 'normal';
            }
        }
    }, [ refGrid, width ]);

    const makeJustifySelf = (index: number): string => {
        if (width < SCREENS_NUMBER.MD) {
            return 'start';
        }

        if (index === 0) {
            return 'start';
        } else if (index === 1) {
            return 'end';
        }

        if ((index + 1) % 3 === 0) {
            return 'stretch';
        } else if ((index + 1) % 2 !== 0) {
            return 'end';
        }

        return 'start';
    };

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
                            justifySelf: makeJustifySelf(index),
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
