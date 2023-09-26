// Tools
import { LowercaseKeys } from '@/tools/utils';

// Types
type Params = {
    CATEGORY: string,
    ID: string,
}
export type ParamsLowerCase = LowercaseKeys<Params>;

export enum PARAMS {
    CATEGORY = '/:category',
    ID = '/:ID',
}

export enum BOOK {
    // MarkerGen books
    ITEM = '/item',
    ADD_ITEM = '/add-item',
    MANAGEMENT = '/management',
    SIGN_IN_AND_UP = '/sign-in-and-up',
    ABOUT = '/about',
    CONTACTS = '/contacts',
    CART = '/cart',
    SHOP = '/shop',
    ROOT = '/',
}
