// Network
export const API_URL = process.env.API_URL || 'http://localhost:4000';

// Local
export const APP_NAME = process.env.APP_NAME || 'burst-template';

export enum LOCAL_STORAGE {
    VIEWED_PRODUCTS = 'viewedProducts',
    CART = 'cart',
}
