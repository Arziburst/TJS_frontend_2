// Core
import React, { FC, useEffect, useRef, useState } from 'react';

// Init
import { CSS_VARIABLES } from '@/init';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { Navigation, Pagination } from 'swiper/modules';

// Bus
import { useProducts } from '@/bus/products';

// Components
import { Icons } from '@/view/components';

// Elements
import { Button, Image } from '@/view/elements';

// Styles
import S from './styles.module.css';

// Types
type PropTypes = {
    /* type props here */
}

export const Slider: FC<PropTypes> = () => {
    const refPrev = useRef<null | HTMLButtonElement>(null);
    const refNext = useRef<null | HTMLButtonElement>(null);

    const refPagination = useRef<null | HTMLDivElement>(null);

    const { products: { currentProduct }} = useProducts();

    const [ scrollbarWidth, setScrollbarWidth ] = useState(0); // todo how to fix this?

    useEffect(() => {
        const getScrollbarWidth = () => {
            const outer = document.createElement('div');
            outer.style.visibility = 'hidden';
            outer.style.width = '100px';
            // outer.style.msOverflowStyle = 'scrollbar'; // for Internet Explorer
            document.body.appendChild(outer);
            const widthNoScroll = outer.offsetWidth;
            outer.style.overflow = 'scroll';
            const inner = document.createElement('div');
            inner.style.width = '100%';
            outer.appendChild(inner);
            const widthWithScroll = inner.offsetWidth;
            outer.parentNode && outer.parentNode.removeChild(outer);

            const result = widthNoScroll - widthWithScroll;

            setScrollbarWidth(result);
        };

        getScrollbarWidth();

        window.addEventListener('resize', getScrollbarWidth);

        return () => {
            window.removeEventListener('resize', getScrollbarWidth);
        };
    }, []);

    return (
        <Swiper
            roundLengths
            className = { S.root }
            modules = { [ Navigation, Pagination ] }
            navigation = {{
                prevEl: refPrev.current,
                nextEl: refNext.current,
            }}
            pagination = {{ el: refPagination.current, clickable: true }}
            slidesPerView = { 1 }
            style = {{ width: `calc(100vw - var(${CSS_VARIABLES.WRAPPER_LEFT_PADDING}) - var(${CSS_VARIABLES.WRAPPER_LEFT_PADDING}) - ${scrollbarWidth}px)` }}>
            {currentProduct?.images.map((image, index) => (
                <SwiperSlide key = { image }>
                    <Image
                        alt = { `${index} image of the product` }
                        className = 'w-full'
                        src = { image }
                        style = {{ height: `calc(60vh - var(${CSS_VARIABLES.HEADER}))` }}
                    />
                </SwiperSlide>
            ))}
            <Button
                className = { `${S.button} left-0 translate-y-[-50%]` }
                ref = { refPrev }
                variant = 'default'>
                <Icons.Arrow className = { `${S.arrow} rotate-180` } />
            </Button>
            <Button
                className = { `${S.button} right-0` }
                ref = { refNext }
                variant = 'default'>
                <Icons.Arrow className = { `${S.arrow}` } />
            </Button>
            <div
                className = 'flex justify-center py-[6px]'
                ref = { refPagination }>
            </div>
        </Swiper>
    );
};
