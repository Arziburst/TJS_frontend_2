// Core
import { SagaIterator } from '@redux-saga/core';
import { createAction } from '@reduxjs/toolkit';
import { put, takeLatest } from 'redux-saga/effects';

// API
import { productsFetch } from '../../../api';

// Slice
import { productsActions, sliceName } from '../slice';

// Tools
import { arrayComparison, makeRequest } from '../../../tools/utils';

// Types
import * as commonTypes from '../../common';
import * as types from '../types';
import { LOCAL_STORAGE } from '../../../init';

// Action
export const fetchProductsAction = createAction<types.FetchProductsRequest>(`${sliceName}/FETCH_PRODUCTS_ASYNC`);

// Saga
const fetchProducts = (
    callAction: ReturnType<typeof fetchProductsAction>,
) => makeRequest<types.FetchProductsResponse, commonTypes.Error>({
    callAction,
    fetchOptions: {
        successStatusCode: 200,
        fetch:             productsFetch,
    },
    tryStart: function* () {
        if (callAction.payload || typeof callAction.payload === 'undefined') {
            yield put(productsActions.setIsLoadingOfProducts(true));
        }
    },
    success: function* (result) {
        yield put(productsActions.setProducts(result));

        const productsIds = result.map(({ _id }) => _id);
        const viewedProducts: Array<string> = localStorage.get(LOCAL_STORAGE.VIEWED_PRODUCTS) || [];
        const cart: Array<string> = localStorage.get('cart') || [];

        // Checking viewedProducts
        if (viewedProducts && viewedProducts.length !== 0) {
            const { isAllStringsExists, newArray } = arrayComparison(productsIds, viewedProducts);

            if (!isAllStringsExists) {
                yield localStorage.set(LOCAL_STORAGE.VIEWED_PRODUCTS, newArray);
            }

            // yield put(setInitialViewedProductsState(newArray)); // todo check?
        }

        // Checkind cart
        if (cart && cart.length !== 0) {
            const { isAllStringsExists, newArray } = arrayComparison(productsIds, cart);

            if (!isAllStringsExists) {
                yield localStorage.set(LOCAL_STORAGE.CART, newArray);
            }

            // yield put(setInitialCartState(newArray)); // todo check?
        }
    },
    error: function* (error) {
        yield put(productsActions.setErrorOfProducts(error));
    },
    finallyEnd: function* () {
        if (callAction.payload || typeof callAction.payload === 'undefined') {
            yield put(productsActions.setIsLoadingOfProducts(false));
        }
    },
});

// Watcher
export function* watchFetchProducts(): SagaIterator {
    yield takeLatest(fetchProductsAction.type, fetchProducts);
}
