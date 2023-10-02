// Config of API
import { API, HEADERS } from './config';

// Types
import * as types from '../bus/products/saga/types';

export const productsFetcher = () => {
    return fetch(API.PRODUCTS.ROOT, {
        method:  'GET',
        headers: {
            ...HEADERS,
        },
    });
};

export const createNewProductFetcher = (body: Omit<types.FetchCreateNewProductRequest, 'reset'>) => {
    return fetch(API.PRODUCTS.ROOT, {
        method:      'POST',
        credentials: 'include',
        headers:     {
            ...HEADERS,
        },
        body: JSON.stringify(body),
    });
};

export const deleteProductFetcher = (payload: types.FetchDeleteProductRequest) => {
    return fetch(API.PRODUCTS.PRODUCT(payload), {
        method:      'DELETE',
        credentials: 'include',
        headers:     {
            ...HEADERS,
        },
    });
};

export const editProductFetcher = (payload: types.FetchEditProductRequest) => {
    return fetch(API.PRODUCTS.PRODUCT(payload._id), {
        method:      'PUT',
        credentials: 'include',
        headers:     {
            ...HEADERS,
        },
        body: JSON.stringify(payload.editedProduct),
    });
};

export const incrementProductViewsFetcher = (_id: types.FetchIncrementProductViewsRequest) => {
    return fetch(API.PRODUCTS.INCREMENT_VIEWS(_id), {
        method:      'POST',
        credentials: 'include',
        headers:     {
            ...HEADERS,
        },
    });
};

