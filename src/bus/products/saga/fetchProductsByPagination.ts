// Core
import { SagaIterator } from '@redux-saga/core';
import { createAction } from '@reduxjs/toolkit';
import { put, takeLatest } from 'redux-saga/effects';

// Init
import { LOCAL_STORAGE } from '../../../init';

// API
import { productsByPaginationFetcher } from '../../../api';

// Slice
import { cartActions } from '@/bus/cart/slice';
import { productsActions, sliceName } from '../slice';

// Tools
import { ls, makeRequest } from '../../../tools/utils';

// Types
import * as commonTypes from '../../commonTypes';
import * as types from './types';

// Action
export const fetchProductsByPaginationAction = createAction<types.FetchProductsByPaginationRequest>(`${sliceName}/FETCH_PRODUCTS_BY_PAGINATION_ASYNC`);

// Saga
const fetchProductsByPagination = (
    callAction: ReturnType<typeof fetchProductsByPaginationAction>,
) => makeRequest<types.FetchProductsByPaginationResponse, commonTypes.Error>({
    callAction,
    fetchOptions: {
        successStatusCode: 200,
        fetch:             () => productsByPaginationFetcher(callAction.payload),
    },
    tryStart: function* () {
        yield put(productsActions.setIsLoadingOfProducts({
            type:  'fetchProducts',
            value: true,
        }));
    },
    success: function* (result) {
        yield put(productsActions.setProducts(result.data));
        yield put(productsActions.setTotalOfProducts(result.total));
        yield put(productsActions.setTotalShowedOfProducts(result.totalShowed));

        const cart: Array<string> = ls.get(LOCAL_STORAGE.CART);

        // Checking cart
        if (cart) {
            yield put(cartActions.resetCart(cart));
        }
    },
    error: function* (error) {
        yield put(productsActions.setErrorOfProducts(error));
    },
    finallyEnd: function* () {
        yield put(productsActions.setIsLoadingOfProducts({
            type:  'fetchProducts',
            value: false,
        }));
    },
});

// Watcher
export function* watchFetchProductsByPagination(): SagaIterator {
    yield takeLatest(fetchProductsByPaginationAction.type, fetchProductsByPagination);
}
