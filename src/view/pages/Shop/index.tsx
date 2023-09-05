// Core
import React, { FC, useEffect } from 'react';

// Bus
// import {} from '../../../bus/'
import { useProducts } from '../../../bus/products';
import { useProductsSaga } from '../../../bus/products/saga';

// Components
import { ErrorBoundary } from '../../components';

// Styles
import * as S from './styles';

// Types
type PropTypes = {
    /* type props here */
}

const Shop: FC<PropTypes> = () => {
    const { products, fetchProducts } = useProducts();
    // const { fetchProducts } = useProductsSaga();

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        // console.log('text');
        console.log('products >>> ', products);
    }, [ products.items ]);

    return (
        <S.Container>
            Page: Shop
        </S.Container>
    );
};

export default () => (
    <ErrorBoundary>
        <Shop />
    </ErrorBoundary>
);
