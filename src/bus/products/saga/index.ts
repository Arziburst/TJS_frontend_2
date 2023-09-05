// Core
import { SagaIterator } from '@redux-saga/core';
import { all, call } from 'redux-saga/effects';

// Tools
import { useDispatch } from '../../../tools/hooks';

// Watchers & Actions
import { fetchProductsAction, watchFetchProducts } from './fetchProducts';
import { fetchCreateNewProductAction, watchFetchCreateNewProduct } from './fetchCreateNewProduct';
import { fetchDeleteProductAction } from './fetchDeleteProduct';
import { fetchEditProductAction } from './fetchEditProduct';
import { fetchIncrementProductViewsAction } from './fetchIncrementProduct';

// Types
import * as types from '../types';

export const useProductsSaga = () => {
    const dispatch = useDispatch();

    return {
        fetchProducts:         () => dispatch(fetchProductsAction(true)),
        fetchCreateNewProduct: (payload: types.FetchCreateNewProductRequest) => dispatch(
            fetchCreateNewProductAction(payload),
        ),
        fetchDeleteProduct: (_id: types.FetchDeleteProductRequest) => dispatch(fetchDeleteProductAction(_id)),
        fetchEditProduct:   (payload: types.FetchEditProductRequest) => dispatch(fetchEditProductAction(payload)),

        fetchIncrementProductViews: (
            _id: types.FetchIncrementProductViewsRequest,
        ) => dispatch(fetchIncrementProductViewsAction(_id)),
    };
};

export function* watchProducts(): SagaIterator {
    yield all([
        call(watchFetchProducts),
        call(watchFetchCreateNewProduct),
    ]);
}
