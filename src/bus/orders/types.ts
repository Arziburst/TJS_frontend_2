// Core
import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';

// Types of Entities
export type OrderedProduct = {
    pid: string;
    image: string;
    price: number;
}

export type OrderedProducts = Array<OrderedProduct>;

export type Order = {
    total: number;
    email?: string;
    comment?: string;
    status: number;
    phone: string;
    orderedProducts: OrderedProducts;
    created: Date;
    _id: string;
};

export type LiqPay = {
    data: string;
    signature: string;
};

// State
export type Orders = Array<Order>
export type OrdersState = {
    orders: Orders | null;
    liqPay: LiqPay | null;
}

// Contracts
export type BaseContact<T = any> = CaseReducer<OrdersState, PayloadAction<T>>
