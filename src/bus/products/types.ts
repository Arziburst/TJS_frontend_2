// Core
import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';

// Types
import * as commonTypes from '../commonTypes';

// Types of Entities
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

// State
export type IsLoadings = 'products' | 'incrementViews' | 'edit' | 'delete' | 'create';
export interface ProductsState extends commonTypes.State<Record<IsLoadings, commonTypes.IsLoading>> {
    products: null | Products;
    currentProduct: null | ExtendedProduct;
}

// Actions
export type SetIsLoadingOfProductsAction = commonTypes.SetIsLoading<IsLoadings>

// Contracts
export type BaseContact<T = any> = CaseReducer<ProductsState, PayloadAction<T>>;

export type SetIsLoadingOfProductsContact = BaseContact<SetIsLoadingOfProductsAction>;
