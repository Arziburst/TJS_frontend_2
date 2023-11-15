// Core
import { createSlice } from '@reduxjs/toolkit';

// Types
import * as types from './types';

// Reducers
import * as reducers from './reducers';
// MarkerGen import extraReducers

export const initialLimitOfProducts = 20;
export const initialPageOfProducts = 1;

export const initialState: types.ProductsState = {
    limit:          initialLimitOfProducts,
    page:           initialPageOfProducts,
    totalShowed:    0,
    total:          0,
    products:       null,
    currentProduct: null,
};

export const productsSlice = createSlice<types.ProductsState, typeof reducers>({
    name: 'products',
    initialState,
    reducers,
    // MarkerGen use extraReducers
});

export const sliceName = productsSlice.name;
export const productsActions = productsSlice.actions;
export default productsSlice.reducer;
