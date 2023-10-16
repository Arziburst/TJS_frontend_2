// Core
import { SagaIterator } from '@redux-saga/core';
import { createAction } from '@reduxjs/toolkit';
import { put, takeLatest } from 'redux-saga/effects';

// API
import { productFetcher } from '../../../api';

// Slice
import { productsActions, sliceName } from '../slice';

// Tools
import { makeRequest } from '../../../tools/utils';

// Types
import * as commonTypes from '../../commonTypes';
import * as types from './types';

// Action
export const fetchProductAction = createAction<types.FetchProductRequest>(`${sliceName}/FETCH_PRODUCT_ASYNC`);

// Saga
const fetchProduct = (
    callAction: ReturnType<typeof fetchProductAction>,
) => makeRequest<types.FetchProductResponse, commonTypes.Error>({
    callAction,
    fetchOptions: {
        successStatusCode: 200,
        fetch:             () => productFetcher(callAction.payload),
    },
    tryStart: function* () {
        yield put(productsActions.setIsLoadingOfProducts({
            type:  'fetchProduct',
            value: true,
        }));
    },
    success: function* (result) {
        yield put(productsActions.setCurrentProduct(result));
    },
    error: function* (error) {
        yield put(productsActions.setErrorOfProducts(error));
    },
    finallyEnd: function* () {
        yield put(productsActions.setIsLoadingOfProducts({
            type:  'fetchProduct',
            value: false,
        }));
    },
});

// Watcher
export function* watchFetchProduct(): SagaIterator {
    yield takeLatest(fetchProductAction.type, fetchProduct);
}
