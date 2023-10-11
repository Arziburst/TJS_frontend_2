// Core
import React, { FC, useEffect, useRef } from 'react';


// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import S from './styles.module.css';

// import required modules
import { Navigation, Pagination } from 'swiper/modules';
import { useProducts } from '@/bus/products';
import { Image } from '@/view/elements';
import { CSS_VARIABLES } from '@/init';

// Types
type PropTypes = {
    /* type props here */
}

export const Slider: FC<PropTypes> = () => {
    const ref = useRef<null | HTMLDivElement>(null);
    const refSwiper = useRef<null | any>(null);

    const { products: { currentProduct }} = useProducts();

    useEffect(() => {
        console.log('refSwiper.current >>> ', refSwiper.current.style);
    }, [ refSwiper ]);

    return (
        <div
            className = 'relative'
            ref = { ref }>
            <Swiper
                navigation
                pagination
                roundLengths
                className = { S.root }
                modules = { [ Navigation, Pagination ] }
                ref = { refSwiper }
                slidesPerView = { 1 }
                style = {{ width: `calc(100vw - var(${CSS_VARIABLES.WRAPPER_LEFT_PADDING}) - var(${CSS_VARIABLES.WRAPPER_LEFT_PADDING}))` }}>
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
            </Swiper>
        </div>
    );
};
