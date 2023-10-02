// Types
import * as commonTypes from '@/bus/commonTypes';
import * as types from '../types';

// Products
export type FetchProductsRequest = boolean | undefined; // todo improve or remove boolean???
export type FetchProductsResponse = types.Products;

// Create product
export interface FetchCreateNewProductRequest extends types.Product, commonTypes.ResetForm {}
export type FetchCreateNewProductResponse = types.ExtendedProduct;

// Delete product
export type FetchDeleteProductRequest = types.ExtendedProduct['_id'];
export type FetchDeleteProductResponse = types.ExtendedProduct['_id'];

// Edit product
export interface FetchEditProductRequest extends Pick<types.ExtendedProduct, '_id'> {
    editedProduct: types.Product;
}
export type FetchEditProductResponse = types.ExtendedProduct;

// Increment product
export type FetchIncrementProductViewsRequest = string;
export type FetchIncrementProductViewsResponse = types.ExtendedProduct;
