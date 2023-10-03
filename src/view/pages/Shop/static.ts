// Types
import { ExtendedProduct } from '@/bus/products/types';

// Constants
export enum ENUM_FILTERS_BY_PRICE {
    LOW_TO_HIGH = 'price (Low to high)',
    HIGH_TO_LOW = 'price (high to low)',
}

export const ARRAY_FILTERS_BY_PRICE = Object.values(ENUM_FILTERS_BY_PRICE);

// Functions

export const sortByPriceLowToHigh = (array: ExtendedProduct[]) => array.slice().sort((a, b) => a.price - b.price);
export const sortByPriceHighToLow = (array: ExtendedProduct[]) => array.slice().sort((a, b) => b.price - a.price);
