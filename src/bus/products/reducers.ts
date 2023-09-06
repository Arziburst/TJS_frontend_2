// Common
import { setIsLoading } from '../common';

// Types
import * as commonTypes from '../commonTypes';
import * as types from './types';

export const setProducts: types.BaseContact<types.Products> = (state, action) => ({
    ...state,
    items: action.payload,
});

export const setProduct: types.BaseContact<types.ExtendedProduct> = (state, action) => {
    if (state.products) {
        return {
            ...state,
            items: [ action.payload, ...state.products ],
        };
    }

    return {
        ...state,
        items: [ action.payload ],
    };
};

export const setDeleteProduct: types.BaseContact<string> = (state, action) => {
    if (state.products) {
        state.products.filter(({ _id }) => _id !== action.payload);
    }
};

export const setEditedProduct: types.BaseContact<types.ExtendedProduct> = (state, action) => {
    if (state.products) {
        const newItems = state.products.map((product) => {
            if (product._id === action.payload._id) {
                return {
                    ...product,
                    ...action.payload,
                };
            }

            return product;
        });

        return {
            ...state,
            items: newItems,
        };
    }

    return state;
};

export const setErrorOfProducts: types.BaseContact<commonTypes.Error> = (state, action) => ({
    ...state,
    error: action.payload,
});


export const setIsLoadingOfProducts: types.SetIsLoadingOfProductsContact = setIsLoading;
