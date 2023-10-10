// Core
import { SagaIterator } from '@redux-saga/core';
import { createAction } from '@reduxjs/toolkit';
import { put, takeLatest } from 'redux-saga/effects';

// Init
import { LOCAL_STORAGE } from '../../../init';

// API
import { productsByPaginationFetcher } from '../../../api';

// Slice
import { productsActions, sliceName } from '../slice';

// Tools
import { arrayComparison, ls, makeRequest } from '../../../tools/utils';

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

        const productsIds = result.data.map(({ _id }) => _id);
        const cart: Array<string> = ls.get(LOCAL_STORAGE.CART) || [];

        // Checkind cart
        if (cart && cart.length !== 0) {
            const { isAllStringsExists, newArray } = arrayComparison(productsIds, cart);

            if (!isAllStringsExists) {
                yield ls.set(LOCAL_STORAGE.CART, newArray);
            }

            // yield put(setInitialCartState(newArray)); // todo check?
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
