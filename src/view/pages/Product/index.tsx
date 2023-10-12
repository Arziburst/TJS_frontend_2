// Core
import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Assets
import { SCREENS_NUMBER } from '@/assets';

// Tools
import { useWindowWidth } from '@/tools/hooks';

// Book
import { ParamsLowerCase } from '@/view/routes/book';

// Bus
import { useProducts } from '@/bus/products';

// Components
import { ErrorBoundary } from '@/view/components';
import { Slider } from './Slider';

// Types
type PropTypes = {
    /* type props here */
}

const Product: FC<PropTypes> = () => {
    const { id } = useParams<Pick<ParamsLowerCase, 'id'>>();

    const [ width ] = useWindowWidth();

    // Hooks of Bus
    const { products: { currentProduct }, fetchProduct, setCurrentProduct } = useProducts();

    useEffect(() => {
        if (id) {
            fetchProduct(id);
        }

        return () => {
            setCurrentProduct(null);
        };
    }, []);

    return (
        <div className = { `flex flex-col gap-6
            sb:flex-row sb:gap-8` }>
            <h2 className = { `text-[40px] leading-[54px] uppercase text-center
                sb:text-[56px] sb:leading-[76px] sb:text-left` }>
                {currentProduct?.type}
            </h2>
            {width < SCREENS_NUMBER.SB ? (
                <Slider />
            ) : (
                <div>
                    imagas
                </div>
            )}
        </div>
    );
};

export default () => (
    <ErrorBoundary>
        <Product />
    </ErrorBoundary>
);
