// Init
import { API_URL } from '../init';

// Types
import { ExtendedProduct } from '../bus/products/types';

type PRODUCTS_BY_PAGINATION = {
    type: string;
    limit: number;
    page: number;
    isLowToHigh: null | boolean;
}

export const API = {
    PRODUCTS: {
        ROOT:                   `${API_URL}/products`,
        PRODUCTS_BY_PAGINATION: ({ type, page, limit, isLowToHigh }: PRODUCTS_BY_PAGINATION) => `${API_URL}/products-pagination/${type}?page=${page}&limit=${limit}&isLowToHigh=${isLowToHigh}`,
        PRODUCT:                (_id: ExtendedProduct['_id']) => `${API_URL}/products/${_id}`,
        INCREMENT_VIEWS:        (_id: ExtendedProduct['_id']) => `${API_URL}/products/incrementViews/${_id}`,
    },
    PROFILE: {
        REGISTRATION: `${API_URL}/profile/registration`,
        LOGIN:        `${API_URL}/profile/login`,
        REFRESH:      `${API_URL}/profile/refresh`,
        LOGOUT:       `${API_URL}/profile/logout`,
    },
    IMAGES: {
        ROOT:   `${API_URL}/images`,
        DELETE: (id: string) => `${API_URL}/images/${id}`,
    },
};

export const HEADERS = {
    'Content-Type': 'application/json',
};
