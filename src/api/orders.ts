// Config of API
import { API, HEADERS } from './config';

// Types
import * as types from '../bus/orders/saga/types';

export const createOrderFetcher = (body: types.FetchCreateOrderRequest) => {
    return fetch('', {
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
