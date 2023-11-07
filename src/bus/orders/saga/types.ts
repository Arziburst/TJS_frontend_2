// Types
// import * as commonTypes from '@/bus/commonTypes';
import * as types from '../types';

// Get Orders
export type FetchGetOrdersResponse = types.Orders;

// Get Order
export type FetchGetOrderRequest = string;
export type FetchGetOrderResponse = types.Order;

// Create Order
export type FetchCreateOrderRequest = {
    phone?: string;
    comment?: string;
    orderedPIDs: Array<string>;
};
export type FetchCreateOrderResponse = types.Order;

// Get Data LiqPay Order
export type FetchGetDataLiqPayOrderRequest = {
    amount: number;
    description: string;
    order_id: string;
    result_url?: string;
    server_url?: string;
};
export type FetchGetDataLiqPayOrderResponse = {
    data: string;
    signature: string;
};

// Delete Order
export type FetchDeleteOrderRequest = string;
export type FetchDeleteOrderResponse = unknown;

// Update Order
export interface FetchUpdateOrderRequest extends Pick<types.Order, '_id'>, Partial<Omit<types.Order, '_id'>> {}
export type FetchUpdateOrderResponse = unknown;
