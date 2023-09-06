// Core
import { SagaIterator } from '@redux-saga/core';
import { createAction } from '@reduxjs/toolkit';
import { put, takeLatest } from 'redux-saga/effects';

// API
import { createNewProductFetcher } from '../../../api';

// Slice
import { productsActions, sliceName } from '../slice';

// Tools
import { makeRequest } from '../../../tools/utils';

// Types
import * as commonTypes from '../../commonTypes';
import * as types from './types';

// Action
export const fetchCreateNewProductAction = createAction<types.FetchCreateNewProductRequest>(`${sliceName}/FETCH_CREATE_NEW_PRODUCT_ASYNC`);

// Saga
const fetchCreateNewProduct = (
    callAction: ReturnType<typeof fetchCreateNewProductAction>,
) => makeRequest<types.FetchCreateNewProductResponse, commonTypes.Error>({
    callAction,
    fetchOptions: {
        successStatusCode: 200,
        fetch:             () => createNewProductFetcher(callAction.payload),
    },
    tryStart: function* () {
        yield put(productsActions.setIsLoadingOfProducts({
            type:  'create',
            value: true,
        }));
    },
    success: function* (result) {
        yield put(productsActions.setProduct(result));
    },
    error: function* (error) {
        yield put(productsActions.setErrorOfProducts(error));
    },
    finallyEnd: function* () {
        yield put(productsActions.setIsLoadingOfProducts({
            type:  'create',
            value: false,
        }));
    },
});

// Watcher
export function* watchFetchCreateNewProduct(): SagaIterator {
    yield takeLatest(fetchCreateNewProductAction.type, fetchCreateNewProduct);
}
