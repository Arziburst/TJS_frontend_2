// Core
import { SagaIterator } from '@redux-saga/core';
import { all, call } from 'redux-saga/effects';

// Tools
import { useDispatch } from '../../../tools/hooks';

// MarkerGen Watchers & Actions
import { fetchProductsByPaginationAction, watchFetchProductsByPagination } from './fetchProductsByPagination';
import { fetchProductsByPaginationAtEndAction, watchFetchProductsByPaginationAtEnd } from './fetchProductsByPaginationAtEnd';
import { fetchProductsAction, watchFetchProducts } from './fetchProducts';
import { fetchCreateNewProductAction, watchFetchCreateNewProduct } from './fetchCreateNewProduct';
import { fetchDeleteProductAction, watchFetchDeleteProduct } from './fetchDeleteProduct';
import { fetchEditProductAction, watchFetchEditProduct } from './fetchEditProduct';
import { fetchIncrementProductViewsAction, watchFetchIncrementProductViews } from './fetchIncrementProduct';

// Types
import * as types from './types';

export const useProductsSaga = () => {
    const dispatch = useDispatch();

    return {
        fetchProductsByPagination: (
            payload: types.FetchProductsByPaginationRequest,
        ) => dispatch(fetchProductsByPaginationAction(payload)),
        fetchProductsByPaginationAtEnd: (
            payload: types.FetchProductsByPaginationAtEndRequest,
        ) => dispatch(fetchProductsByPaginationAtEndAction(payload)),
        fetchProducts:         () => dispatch(fetchProductsAction()),
        fetchCreateNewProduct: (payload: types.FetchCreateNewProductRequest) => dispatch(
            fetchCreateNewProductAction(payload),
        ),
        fetchDeleteProduct: (_id: types.FetchDeleteProductRequest) => dispatch(fetchDeleteProductAction(_id)),
        fetchEditProduct:   (payload: types.FetchEditProductRequest) => dispatch(fetchEditProductAction(payload)),

        fetchIncrementProductViews: (
            _id: types.FetchIncrementProductViewsRequest,
        ) => dispatch(fetchIncrementProductViewsAction(_id)),
        // MarkerGen function
    };
};

export function* watchProducts(): SagaIterator {
    yield all([
        // MarkerGen watchers
        call(watchFetchProductsByPagination),
        call(watchFetchProductsByPaginationAtEnd),
        call(watchFetchProducts),
        call(watchFetchCreateNewProduct),
        call(watchFetchDeleteProduct),
        call(watchFetchEditProduct),
        call(watchFetchIncrementProductViews),
    ]);
}
