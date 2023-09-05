// Core
import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';

// Types
import { State } from '../common';

// Types
export type Product = {
    title: string;
    description: string;
    type: string;
    available: boolean;
    price: number;
    discount: number;
    images: string[];
    weight: number;
};
export type ExtendedProduct = Product & {
    views: number;
    isProductNew: boolean;
    created: string;
    _id: string;
};
export type Products = ExtendedProduct[];

// Types Request / Response
// Products
export type FetchProductsRequest = boolean | undefined;
export type FetchProductsResponse = Products;

// Create product
export type FetchCreateNewProductRequest = Product;
export type FetchCreateNewProductResponse = ExtendedProduct;

// Delete product
export type FetchDeleteProductRequest = ExtendedProduct['_id'];
export type FetchDeleteProductResponse = ExtendedProduct['_id'];

// Edit product
export interface FetchEditProductRequest extends Pick<ExtendedProduct, '_id'> {
    editedProduct: Product;
}
export type FetchEditProductResponse = ExtendedProduct;

// Increment product
export type FetchIncrementProductViewsRequest = string;
export type FetchIncrementProductViewsResponse = ExtendedProduct;

// State
export interface ProductsState extends State {
    items: null | Products;
}

// Contracts
export type BaseContact<T = any> = CaseReducer<ProductsState, PayloadAction<T>>;
