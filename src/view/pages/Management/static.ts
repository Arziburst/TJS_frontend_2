// Core
import * as yup from 'yup';

// Init
import { CATEGORIES_ITEMS, ERRORS } from '@/init/';

// Types
import { FetchCreateNewProductRequest } from '@/bus/products/saga/types';

// Types
type DefaultValues = FetchCreateNewProductRequest;

const minLength = 3;

export const validationForm = yup.object({
    title: yup.string().min(minLength)
        .required(ERRORS.REQUIRED),
    description: yup.string().min(minLength)
        .required(ERRORS.REQUIRED),
    type:      yup.string().required(ERRORS.REQUIRED),
    available: yup.boolean().required(ERRORS.REQUIRED),
    price:     yup.number().required(ERRORS.REQUIRED),
    discount:  yup.number().required(ERRORS.REQUIRED),
    images:    yup.array().required(ERRORS.REQUIRED), // todo string[]
    weight:    yup.number().required(ERRORS.REQUIRED),
});

export const defaultValues: DefaultValues = {
    title:       '',
    description: '',
    type:        CATEGORIES_ITEMS[ 0 ],
    available:   true,
    price:       0,
    discount:    0,
    images:      [],
    weight:      0,
};

