// Core
import React, { FC, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

// Assets
import { SCREENS_NUMBER } from '@/assets';

// Tools
import { useWindowWidth } from '@/tools/hooks';

// Book
import { ParamsLowerCase } from '@/view/routes/book';

// Bus
import { useProducts } from '@/bus/products';
import { useCart } from '@/bus/cart';

// Components
import { ErrorBoundary } from '@/view/components';
import { Slider } from './Slider';
import { ImageProduct } from './ImageProduct';

// Elements
import { Button, Image, Link } from '@/view/elements';

// Styles
import S from './styles.module.css';

// Types
type PropTypes = {
    /* type props here */
}

const Product: FC<PropTypes> = () => {
    const refDescriptionProduct = useRef<null | HTMLDivElement>(null);

    const { id } = useParams<Pick<ParamsLowerCase, 'id'>>();

    const [ width ] = useWindowWidth();

    // States
    const [ heightState, setHeightState ] = useState(0);

    // Hooks of Bus
    const { products: { currentProduct }, fetchProduct, setCurrentProduct } = useProducts();
    const { setProductOfCart } = useCart();

    // Handlers
    const onClickAddToCartHandler = () => {
        currentProduct && setProductOfCart(currentProduct._id);
    };

    useEffect(() => {
        if (id) {
            fetchProduct(id);
        }

        return () => {
            setCurrentProduct(null);
        };
    }, []);

    useEffect(() => {
        const result = refDescriptionProduct.current?.clientHeight; // todo how to fix this? how to get height of element from the ref?
        setHeightState(result || 0);
    }, [ currentProduct ]);

    return (
        <div
            className = { 'flex flex-row gap-6' }
            style = {{ minWidth: 0 }}>
            {width > SCREENS_NUMBER.SB && (
                <div className = 'w-1/2 space-y-[50px]'>
                    <div ref = { refDescriptionProduct }>
                        {currentProduct?.images[ 0 ] && (
                            <ImageProduct
                                index = { 1 }
                                src = { currentProduct.images[ 0 ] }
                            />
                        )}
                    </div>

                    {currentProduct && currentProduct.images.length > 1
                        && currentProduct.images.filter((_, indexFilter) => indexFilter !== 0).map((src, index) => (
                            <ImageProduct
                                index = { index + 2 }
                                key = { src }
                                src = { src }
                            />
                        ))}
                </div>
            )}
            <div
                className = { `break-all 
                sb:w-1/2` }
                style = {{ minWidth: 0 }}>
                <div
                    className = { `${S.sticky} flex flex-col gap-[32px]
                    sb:sticky sb:justify-between` }
                    style = {{ minHeight: refDescriptionProduct.current && refDescriptionProduct.current.clientHeight > 0 ? `${refDescriptionProduct.current.clientHeight}px` : 'auto' }}>
                    <div className = 'space-y-[12px]'>
                        <h2 className = { `text-[40px] leading-[54px] uppercase text-center
                        sb:text-[56px] sb:leading-[76px] sb:text-left` }>
                            {currentProduct?.type}
                        </h2>
                        {width < SCREENS_NUMBER.SB && (
                            <Slider />
                        )}
                    </div>
                    <div className = 'space-y-[32px] sb:space-y-[48px]'>
                        <div className = { `flex flex-col flex-wrap space-y-[12px]
                            sb:space-y-[24px]` }>
                            <div className = { `space-y-[8px]
                                sb:space-y-[18px]` }>
                                <p className = { `text-xs font-secondary font-bold tracking-[20%] uppercase
                                    sb:text-sm` }>
                                    {currentProduct?.title}
                                </p>
                                <p className = { `text-lg text-quaternary
                                    sb:text-2xl` }>
                                    {currentProduct?.price} ₴
                                </p>
                            </div>
                            <p className = { `text-sm tracking-[10%]
                                sb:text-base` }>
                                {currentProduct?.description}
                            </p>
                            <div>
                                <Link
                                    className = { `font-secondary text-xs font-semibold tracking-[10%] text-quaternary underline transition
                                        hover:no-underline` }
                                    to = '/'>
                                    Size Guide
                                </Link>
                            </div>
                        </div>
                        <Button onClick = { onClickAddToCartHandler }>
                            Add to Cart
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default () => (
    <ErrorBoundary>
        <Product />
    </ErrorBoundary>
);
