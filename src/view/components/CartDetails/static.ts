// Core
import * as yup from 'yup';

// Init
import { CATEGORIES_ITEMS, ERRORS } from '@/init/';

// Types
import { Product } from '@/bus/products/types';

// Types
export type DefaultValues = Pick<Product, 'title'>;


export const validationForm = yup.object({
    title: yup.string()
        .required(ERRORS.REQUIRED),
});

export const defaultValues: DefaultValues = {
    title: '',
};

