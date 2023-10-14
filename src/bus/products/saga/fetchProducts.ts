// Core
import { SagaIterator } from '@redux-saga/core';
import { createAction } from '@reduxjs/toolkit';
import { put, takeLatest } from 'redux-saga/effects';

// Init
import { LOCAL_STORAGE } from '../../../init';

// API
import { productsFetcher } from '../../../api';

// Slice
import { productsActions, sliceName } from '../slice';

// Tools
import { arrayComparison, ls, makeRequest } from '../../../tools/utils';

// Types
import * as commonTypes from '../../commonTypes';
import * as types from './types';
import { cartActions } from '@/bus/cart/slice';

// Action
export const fetchProductsAction = createAction(`${sliceName}/FETCH_PRODUCTS_ASYNC`);

// Saga
const fetchProducts = (
    callAction: ReturnType<typeof fetchProductsAction>,
) => makeRequest<types.FetchProductsResponse, commonTypes.Error>({
    callAction,
    fetchOptions: {
        successStatusCode: 200,
        fetch:             productsFetcher,
    },
    tryStart: function* () {
        yield put(productsActions.setIsLoadingOfProducts({
            type:  'fetchProducts',
            value: true,
        }));
    },
    success: function* (result) {
        yield put(productsActions.setProducts(result));

        const productsIds = result.map(({ _id }) => _id);
        const cart: Array<string> = ls.get(LOCAL_STORAGE.CART) || [];

        // Checking cart
        if (cart && cart.length !== 0) {
            const { isAllStringsExists, newArray } = arrayComparison(productsIds, cart);

            if (!isAllStringsExists) {
                yield ls.set(LOCAL_STORAGE.CART, newArray);
            }
            console.log('newArray:', newArray);

            yield put(cartActions.resetCart(newArray));
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
export function* watchFetchProducts(): SagaIterator {
    yield takeLatest(fetchProductsAction.type, fetchProducts);
}
