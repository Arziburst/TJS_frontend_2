// Core
import React, { FC, useRef } from 'react';

// Images
import image_category_see_all from '@/assets/images/image_category_see_all.png';

// Init
import { ENUM_CATEGORIES } from '@/init';

// Tools
import { useCustomTranslation, useWindowWidth } from '@/tools/hooks';

// Book
import { BOOK } from '@/view/routes/book';

// Components
import { ErrorBoundary } from '@/view/components';

// Elements
import { Image, NavLink } from '@/view/elements';
import { LinkCategory } from './LinkCategory';

// Static
import { CATEGORIES_ITEMS_WITH_IMAGES, makeJustifySelf, useStatic } from './static';

// Styles
import S from './styles.module.css';

const Root: FC = () => {
    const refRoot = useRef<null | HTMLDivElement>(null);
    const refGrid = useRef<null | HTMLDivElement>(null);

    const { t } = useCustomTranslation();

    const [width] = useWindowWidth();

    useStatic({ width, refGrid });

    return (
        <div
            className={`${S.root} flex flex-col`}
            ref={refRoot}>
            <div
                className={`${S.grid} grid gap-3 h-full overflow-hidden`}
                ref={refGrid}>

                {CATEGORIES_ITEMS_WITH_IMAGES.map((obj, index) => (
                    <LinkCategory
                        category={obj.category}
                        className={`${S.el}`}
                        image={obj.image}
                        key={obj.category}
                        numberItems={index + 1}
                        style={{
                            gridArea: `g-${index}`,
                            justifySelf: makeJustifySelf({ index, width }),
                        }}
                        t={t}
                    />
                ))}

            </div>
            <div className={`${S.footer} flex flex-col gap-3 py-6 justify-between
                sb:flex-row` }>
                <p className={`text-[14px] leading-[180%] uppercase 
                    md:text-[24px]
                    sb:max-w-[680px] sb:gap-5` }>
                    <span className='text-quaternary'>
                        TJStore
                    </span> {t('pages.root.text')}
                </p>
                <div className='flex gap-6 justify-end items-center'>
                    <NavLink
                        className='text-sm font-secondary font-semibold capitalize'
                        to={`${BOOK.SHOP}/${ENUM_CATEGORIES.ALL}`}
                        variant='underline'>
                        {t('pages.root.seeAll')}
                    </NavLink>
                    <Image
                        alt={t('pages.root.altImage')}
                        className={`w-[60px] aspect-[10/8]
                            sb:w-[100px]` }
                        src={image_category_see_all}
                    />
                </div>
            </div>
        </div>
    );
};

const RootWithErrorBoundary: FC = () => (
    <ErrorBoundary>
        <Root />
    </ErrorBoundary>
);

RootWithErrorBoundary.displayName = 'RootWithErrorBoundary';

export default RootWithErrorBoundary;
