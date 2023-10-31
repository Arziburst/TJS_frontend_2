// Core
import { SagaIterator } from '@redux-saga/core';
import { all, call } from 'redux-saga/effects';

// Tools
import { useDispatch } from '../../../tools/hooks';

// MarkerGen Watchers & Actions
import { fetchOrdersAction, watchFetchOrders } from './fetchOrders';
import { fetchCreateOrderAction, watchFetchCreateOrder } from './fetchCreateOrder';
import { fetchGetDataLiqPayOrderAction, watchFetchGetDataLiqPayOrder } from './fetchGetDataLiqPayOrder';
import { fetchDeleteOrderAction, watchFetchDeleteOrder } from './fetchDeleteOrder';
import { fetchUpdateOrderAction, watchFetchUpdateOrder } from './fetchUpdateOrder';

// Types
import * as types from './types';

export const useOrdersSaga = () => {
    const dispatch = useDispatch();

    return {
        fetchOrders:             () => dispatch(fetchOrdersAction()),
        fetchCreateOrder:        (payload: types.FetchCreateOrderRequest) => dispatch(fetchCreateOrderAction(payload)),
        fetchGetDataLiqPayOrder: (
            payload: types.FetchGetDataLiqPayOrderRequest,
        ) => dispatch(fetchGetDataLiqPayOrderAction(payload)),
        fetchDeleteOrder: (payload: types.FetchDeleteOrderRequest) => dispatch(fetchDeleteOrderAction(payload)),
        fetchUpdateOrder: (payload: types.FetchUpdateOrderRequest) => dispatch(fetchUpdateOrderAction(payload)),
        // MarkerGen function
    };
};

export function* watchOrders(): SagaIterator {
    yield all([
        // MarkerGen watchers
        call(watchFetchOrders),
        call(watchFetchCreateOrder),
        call(watchFetchGetDataLiqPayOrder),
        call(watchFetchDeleteOrder),
        call(watchFetchUpdateOrder),
    ]);
}
