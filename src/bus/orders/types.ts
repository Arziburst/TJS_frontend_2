// Core
import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';

// Types of Entities
export type OrderedProduct = {
    pid: string;
    title: string;
    available: boolean;
    image: string;
    price: number;
}

export type OrderedProducts = Array<OrderedProduct>;

export type Order = {
    _id: string;
    firstName: string;
    lastName: string;
    phone?: string;
    email?: string;
    city?: string;
    warehouse?: string;
    comment?: string;

    total: number;
    status: number;
    statusPayment: number;
    orderedProducts: OrderedProducts;
    created: Date;
};

export type LiqPay = {
    data: string;
    signature: string;
};

// State
export type Orders = Array<Order>
export type OrdersState = {
    orders: Orders | null;
    currentOrder: Order | null;
    liqPay: LiqPay | null;
}

// Contracts
export type BaseContact<T = any> = CaseReducer<OrdersState, PayloadAction<T>>
