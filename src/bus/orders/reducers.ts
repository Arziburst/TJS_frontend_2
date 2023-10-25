// Types
import * as types from './types';

// Initial State
import { initialState } from './slice';

export const setOrders: types.BaseContact<types.Orders> = (state, action) => {
    return {
        ...state,
        orders: action.payload,
    };
};

export const setDataLiqPayOrders: types.BaseContact<types.OrdersState['liqPay']> = (state, action) => {
    return {
        ...state,
        liqPay: action.payload,
    };
};

export const reset = () => initialState;
