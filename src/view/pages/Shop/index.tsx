// Core
import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Tools
import { ParamsLowerCase } from '@/view/routes/book';

// Bus
import { useProducts } from '../../../bus/products';

// Components
import { ErrorBoundary } from '../../components';

// Types
type PropTypes = {
    /* type props here */
}

const Shop: FC<PropTypes> = () => {
    const { category } = useParams<Pick<ParamsLowerCase, 'category'>>();

    const { products, fetchProducts } = useProducts();
    // const { fetchProducts } = useProductsSaga();

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        console.log('products >>> ', products);
    }, [ products.products ]);


    useEffect(() => {
        console.log('category >>> ', category);
    }, [ category ]);

    return (
        <div>
            Page: Shop
        </div>
    );
};

export default () => (
    <ErrorBoundary>
        <Shop />
    </ErrorBoundary>
);
