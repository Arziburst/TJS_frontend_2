// Types
// import * as commonTypes from '@/bus/commonTypes';
import * as types from '../types';

// Create Order
export type FetchCreateOrderRequest = {
    phone: string;
    comment: string;
    orderedPIDs: Array<string>;
};
export type FetchCreateOrderResponse = types.Order;

// Get Data LiqPay Order
export type FetchGetDataLiqPayOrderRequest = {
    amount: string;
    description: string;
    order_id: string;
    result_url: string;
    server_url: string;
};
export type FetchGetDataLiqPayOrderResponse = {
    data: string;
    signature: string;
};
