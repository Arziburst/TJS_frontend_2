// Core
import React, { FC, useLayoutEffect, useRef } from 'react';

// Assets
import { SCREENS_NUMBER } from '@/assets';

// Init
import { CSS_VARIABLES, LINK_EMAIL, LINK_PHONE } from '@/init';

// Tools
import { useCustomTranslation, useWindowHeight, useWindowWidth } from '@/tools/hooks';
import { getValueFromCSSVariable, transformLinkEmail, transformLinkPhoneNumber } from '@/tools/utils';
import { cn } from '@/tools/lib/utils';

// Components
import { ErrorBoundary } from '../../components';
import { ContactInfo } from './ContactInfo';

// Elements
import { Image } from '@/view/elements';

// Static
import { IMAGES } from './static';

// Styles
import S from './styles.module.css';

const spaces = {
    xs_pd: 'pb-[18px]',
    sb_pd: 'sb:pb-[32px]',
};

// Types
type PropTypes = {
    /* type props here */
}

const About: FC<PropTypes> = () => {
    const refTitle = useRef<null | HTMLHeadingElement>(null);
    const refContent = useRef<null | HTMLDivElement>(null);
    const refMainImage = useRef<null | HTMLImageElement>(null);

    const { t } = useCustomTranslation();

    const [ width ] = useWindowWidth();
    const [ height ] = useWindowHeight();

    const getStringHeight = (str: string = '0px') => {
        if (refTitle.current) {
            return `calc(var(--vh, 1vh) * 100 - var(${CSS_VARIABLES.HEADER}, 0px) - ${refTitle.current.clientHeight}px - ${str})`;
        }

        return 'auto';
    };

    const onResizeHandler = () => {
        if (refTitle.current && refContent.current && refMainImage.current) {
            refContent.current.style.minHeight = `calc(var(--vh, 1vh) * 100 - var(${CSS_VARIABLES.HEADER}, 0px) - ${refTitle.current.clientHeight}px`;

            const heightOfHeader = getValueFromCSSVariable(CSS_VARIABLES.HEADER);

            if (heightOfHeader && typeof heightOfHeader === 'string') {
                refMainImage.current.style.top = heightOfHeader;
            }

            if (width > SCREENS_NUMBER.SM) {
                refMainImage.current.style.height = getStringHeight('64px');
            } else {
                refMainImage.current.style.height = getStringHeight('24px');
            }
        }
    };

    useLayoutEffect(() => {
        onResizeHandler();
    }, [ height, width ]);


    return (
        <div className = { S.root }>
            <h3
                className = { `text-base uppercase leading-[28px] ${spaces.xs_pd}
                    sb:text-[32px] sb:leading-[44px] ${spaces.sb_pd}` }
                ref = { refTitle }>
                {t('pages.about.firstTitle')}
            </h3>
            <div
                className = { `flex flex-col gap-[18px]
                    sb:flex-row sb:pb-[64px] sb:gap-[24px]` }
                ref = { refContent }>
                <div className = 'sb:w-[40%]'>
                    <Image
                        alt = { t('pages.about.mainAltImage') }
                        className = { 'sticky h-full w-full rounded-[8px] min-h-[300px]' }
                        ref = { refMainImage }
                        src = 'assets/image_about_main.png'
                    />
                </div>
                <div className = { `flex flex-col
                    sb:w-[60%]` }>
                    <p className = { `text-base leading-[28px] text-quaternary uppercase ${spaces.xs_pd}
                        sb:text-[32px] sb:leading-[44px] ${spaces.sb_pd}` }>
                        {t('pages.about.firstPartOfSecondTitle')} <br />
                        {t('pages.about.secondPartOfSecondTitle')}
                    </p>
                    <div className = { `${S.grid} grow` }>
                        <div className = { cn(S.images, {
                            [ spaces.xs_pd ]: width < SCREENS_NUMBER.SB,
                        }) }>
                            <div
                                className = { `${S.container_images} flex flex-wrap justify-between gap-[6px] grow
                                    sm:justify-evenly` }>
                                {IMAGES.map((src, index) => (
                                    <Image
                                        alt = { t('altImages.product') }
                                        className = { cn(`rounded-[3px] w-[80px]
                                            sb:w-[100px]`,
                                        {
                                            'self-center': width > SCREENS_NUMBER.SB && index === 1,
                                            'self-end':    width > SCREENS_NUMBER.SB && (index === 3 || index === 2),
                                        }) }
                                        src = { `assets/${src}` }
                                        style = {{
                                            gridArea: `item_${index}`,
                                            height:   width < SCREENS_NUMBER.SB ? '64px' : index === 3 ? '140px' : '80px',
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                        <p
                            className = { `${S.text} text-base leading-[28px] uppercase ${spaces.xs_pd}
                                sb:text-2xl sb:leading-[44px] ${spaces.sb_pd}` }>
                            {t('pages.about.text')}
                        </p>
                        <div
                            className = { `${S.contacts} flex flex-wrap justify-around gap-[20px]
                            sb:flex-col sb:gap-[12px]` }>
                            <ContactInfo
                                link = { LINK_PHONE }
                                linkText = { transformLinkPhoneNumber(LINK_PHONE) }
                                title = { t('pages.about.phone') }
                            />
                            <ContactInfo
                                link = { LINK_EMAIL }
                                linkText = { transformLinkEmail(LINK_EMAIL) }
                                title = { t('pages.about.email') }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default () => (
    <ErrorBoundary>
        <About />
    </ErrorBoundary>
);
