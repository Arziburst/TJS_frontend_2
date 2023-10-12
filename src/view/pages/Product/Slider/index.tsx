// Core
import React, { FC, useRef } from 'react';

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
import { useProducts } from '@/bus/products';
import { Button, Image } from '@/view/elements';

// Styles
import S from './styles.module.css';
import { Icons } from '@/view/components';

// Types
type PropTypes = {
    /* type props here */
}

export const Slider: FC<PropTypes> = () => {
    const idPrevButton = 'prevButton-swiper';
    const idNextButton = 'nextButton-swiper';

    const ref = useRef<null | HTMLDivElement>(null);
    const refSwiper = useRef<null | any>(null);

    const { products: { currentProduct }} = useProducts();

    return (
        <div
            className = 'relative'
            ref = { ref }>
            <Swiper
                pagination
                roundLengths
                className = { S.root }
                modules = { [ Navigation, Pagination ] }
                navigation = {{ prevEl: `#${idPrevButton}`, nextEl: `#${idNextButton}` }}
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
            <Button
                className = { `${S.button} left-0` }
                id = { idPrevButton }
                variant = 'default'>
                <Icons.Arrow className = { `${S.arrow} rotate-180` } />
            </Button>
            <Button
                className = { `${S.button} right-0` }
                id = { idNextButton }
                variant = 'default'>
                <Icons.Arrow className = { `${S.arrow}` } />
            </Button>
        </div>
    );
};
