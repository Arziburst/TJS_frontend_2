// Core
import { SagaIterator } from '@redux-saga/core';
import { createAction } from '@reduxjs/toolkit';
import { put, takeLatest } from 'redux-saga/effects';

// API
import { deleteProductFetch } from '../../../api';

// Slice
import { productsActions, sliceName } from '../slice';

// Tools
import { makeRequest } from '../../../tools/utils';

// Types
import * as commonTypes from '../../common';
import * as types from '../types';

// Action
export const fetchDeleteProductAction = createAction<types.FetchDeleteProductRequest>(`${sliceName}/FETCH_DELETE_PRODUCT_ASYNC`);

// Saga
const fetchDeleteProduct = (
    callAction: ReturnType<typeof fetchDeleteProductAction>,
) => makeRequest<types.FetchDeleteProductResponse, commonTypes.Error>({
    callAction,
    fetchOptions: {
        successStatusCode: 200,
        fetch:             () => deleteProductFetch(callAction.payload),
    },
    tryStart: function* () {
        if (callAction.payload) {
            yield put(productsActions.setIsLoadingOfProducts(true));
        }
    },
    success: function* (result) {
        yield put(productsActions.setDeleteProduct(result));
    },
    error: function* (error) {
        yield put(productsActions.setErrorOfProducts(error));
    },
    finallyEnd: function* () {
        if (callAction.payload) {
            yield put(productsActions.setIsLoadingOfProducts(false));
        }
    },
});

// Watcher
export function* watchFetchDeleteProduct(): SagaIterator {
    yield takeLatest(fetchDeleteProductAction.type, fetchDeleteProduct);
}
