// Core
import { SagaIterator } from '@redux-saga/core';
import { createAction } from '@reduxjs/toolkit';
import { put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

// Book
import { BOOK } from '@/view/routes/book';

// API
import { deleteProductFetcher } from '../../../api';

// Slice
import { productsActions, sliceName } from '../slice';

// Tools
import { makeRequest, removeKeysOfObject } from '../../../tools/utils';

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
        fetch:             () => deleteProductFetcher(removeKeysOfObject<types.FetchDeleteProductRequest, 'navigate'>({
            keys:   [ 'navigate' ],
            object: callAction.payload,
        })),
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
        yield put(productsActions.setDeleteProduct(result)); // todo need remove ???
        yield callAction.payload.navigate(BOOK.SHOP);
        yield toast.success('Product deleted successfully!');
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
