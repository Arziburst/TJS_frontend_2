// Core
import { SagaIterator } from '@redux-saga/core';
import { createAction } from '@reduxjs/toolkit';
import { put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

// API
import { editProductFetcher } from '../../../api';

// Slice
import { productsActions, sliceName } from '../slice';

// Tools
import { makeRequest, removeKeysOfObject } from '../../../tools/utils';

// Types
import * as commonTypes from '../../commonTypes';
import * as types from './types';

// Action
export const fetchEditProductAction = createAction<types.FetchEditProductRequest>(`${sliceName}/FETCH_EDIT_PRODUCT_ASYNC`);

// Saga
const fetchEditProduct = (
    callAction: ReturnType<typeof fetchEditProductAction>,
) => makeRequest<types.FetchEditProductResponse, commonTypes.Error>({
    callAction,
    fetchOptions: {
        successStatusCode: 200,
        fetch:             () => editProductFetcher(removeKeysOfObject<types.FetchEditProductRequest, 'navigate'>({
            keys:   [ 'navigate' ],
            object: callAction.payload,
        })),
    },
    tryStart: function* () {
        if (callAction.payload) {
            yield put(productsActions.setIsLoadingOfProducts({
                type:  'edit',
                value: true,
            }));
        }
    },
    success: function* (result) {
        yield put(productsActions.setEditedProduct(result));
        yield toast.success('Product edited successfully!');
    },
    error: function* (error) {
        yield put(productsActions.setErrorOfProducts(error));
    },
    finallyEnd: function* () {
        if (callAction.payload) {
            yield put(productsActions.setIsLoadingOfProducts({
                type:  'edit',
                value: false,
            }));
        }
    },
});

// Watcher
export function* watchFetchEditProduct(): SagaIterator {
    yield takeLatest(fetchEditProductAction.type, fetchEditProduct);
}
