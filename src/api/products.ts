// Config of API
import { API, HEADERS } from './config';

// Types
import * as types from '../bus/products/types';

export const productsFetch = () => {
    return fetch(API.PRODUCTS, {
        method:  'GET',
        headers: {
            ...HEADERS,
        },
    });
};

export const createNewProductFetch = (body: types.Product) => {
    return fetch(API.PRODUCTS, {
        method:      'POST',
        credentials: 'include',
        headers:     {
            ...HEADERS,
        },
        body: JSON.stringify(body),
    });
};

export const deleteProductFetch = (payload: types.FetchDeleteProductRequest) => {
    return fetch(API.PRODUCT(payload), {
        method:      'DELETE',
        credentials: 'include',
        headers:     {
            ...HEADERS,
        },
    });
};

export const editProductFetch = (payload: types.FetchEditProductRequest) => {
    return fetch(API.PRODUCT(payload._id), {
        method:      'PUT',
        credentials: 'include',
        headers:     {
            ...HEADERS,
        },
        body: JSON.stringify(payload.editedProduct),
    });
};

export const incrementProductViewsFetch = (_id: types.FetchIncrementProductViewsRequest) => {
    return fetch(API.INCREMENT_VIEWS(_id), {
        method:      'POST',
        credentials: 'include',
        headers:     {
            ...HEADERS,
        },
    });
};

