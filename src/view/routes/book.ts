// Tools
import { LowercaseKeys } from '@/tools/utils';

// Types
type Params = {
    CATEGORY: string,
}
export type ParamsLowerCase = LowercaseKeys<Params>;

export const PARAMS: Params = {
    CATEGORY: '/:category',
};

export enum BOOK {
    // MarkerGen books
    SIGN_IN_AND_UP = '/sign-in-and-up',
    ABOUT = '/about',
    CONTACTS = '/contacts',
    CART = '/cart',
    SHOP = '/shop',
    ROOT = '/',
}
