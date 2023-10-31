// Config of API
import { API, HEADERS } from './config';

// Types
import * as types from '../bus/orders/saga/types';

export const createOrderFetcher = (body: types.FetchCreateOrderRequest) => {
    return fetch(API.ORDERS.ROOT, {
        method:      'POST',
        credentials: 'include',
        headers:     {
            ...HEADERS,
        },
        body: JSON.stringify(body),
    });
};

export const getDataLiqPayOrderFetcher = (body: types.FetchGetDataLiqPayOrderRequest) => {
    return fetch(API.ORDERS.LIQ_PAY, {
        method:      'POST',
        credentials: 'include',
        headers:     {
            ...HEADERS,
        },
        body: JSON.stringify(body),
    });
};

export const deleteOrderFetcher = (payload: types.FetchDeleteOrderRequest) => {
    return fetch(API.ORDERS.DELETE(payload), {
        method:      'DELETE',
        credentials: 'include',
        headers:     {
            ...HEADERS,
        },
    });
};

export const updateOrderFetcher = (payload: types.FetchUpdateOrderRequest) => {
    const { _id, ...body } = payload;

    return fetch(API.ORDERS.UPDATE(_id), {
        method:      'PUT',
        credentials: 'include',
        headers:     {
            ...HEADERS,
        },
        body: JSON.stringify(body),
    });
};