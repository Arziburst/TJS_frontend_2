// Core
import { SagaIterator } from '@redux-saga/core';
import { createAction } from '@reduxjs/toolkit';
import { put, takeLatest } from 'redux-saga/effects';

// API
import { deleteProductFetcher } from '../../../api';

// Slice
import { productsActions, sliceName } from '../slice';

// Tools
import { makeRequest } from '../../../tools/utils';

// Types
import * as commonTypes from '../../commonTypes';
import * as types from './types';

// Action
export const fetchDeleteProductAction = createAction<types.FetchDeleteProductRequest>(`${sliceName}/FETCH_DELETE_PRODUCT_ASYNC`);

// Saga
const fetchDeleteProduct = (
    callAction: ReturnType<typeof fetchDeleteProductAction>,
) => makeRequest<types.FetchDeleteProductResponse, commonTypes.Error>({
    callAction,
    fetchOptions: {
        successStatusCode: 200,
        fetch:             () => deleteProductFetcher(callAction.payload),
    },
    tryStart: function* () {
        if (callAction.payload) {
            yield put(productsActions.setIsLoadingOfProducts({
                type:  'delete',
                value: true,
            }));
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
            yield put(productsActions.setIsLoadingOfProducts({
                type:  'delete',
                value: false,
            }));
        }
    },
});

// Watcher
export function* watchFetchDeleteProduct(): SagaIterator {
    yield takeLatest(fetchDeleteProductAction.type, fetchDeleteProduct);
}
