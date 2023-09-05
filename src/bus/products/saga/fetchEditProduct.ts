// Core
import { SagaIterator } from '@redux-saga/core';
import { createAction } from '@reduxjs/toolkit';
import { put, takeLatest } from 'redux-saga/effects';

// API
import { editProductFetch } from '../../../api';

// Slice
import { productsActions, sliceName } from '../slice';

// Tools
import { makeRequest } from '../../../tools/utils';

// Types
import * as commonTypes from '../../common';
import * as types from '../types';

// Action
export const fetchEditProductAction = createAction<types.FetchEditProductRequest>(`${sliceName}/FETCH_EDIT_PRODUCT_ASYNC`);

// Saga
const fetchEditProduct = (
    callAction: ReturnType<typeof fetchEditProductAction>,
) => makeRequest<types.FetchEditProductResponse, commonTypes.Error>({
    callAction,
    fetchOptions: {
        successStatusCode: 200,
        fetch:             () => editProductFetch(callAction.payload),
    },
    tryStart: function* () {
        if (callAction.payload) {
            yield put(productsActions.setIsLoadingOfProducts(true));
        }
    },
    success: function* (result) {
        yield put(productsActions.setEditedProduct(result));
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
export function* watchFetchEditProduct(): SagaIterator {
    yield takeLatest(fetchEditProductAction.type, fetchEditProduct);
}
