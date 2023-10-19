// Core
import * as yup from 'yup';

// Init
import { CATEGORIES_ITEMS, ERRORS, VALIDATIONS } from '@/init/';

// Types
import { Product } from '@/bus/products/types';

// Types
export type DefaultValues = {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    city: string;
    department: string;
    comment: string;
};

export const validationForm = yup.object({
    firstName: yup.string()
        .required(ERRORS.REQUIRED),
    lastName: yup.string()
        .required(ERRORS.REQUIRED),
    phone: yup.string().required(ERRORS.REQUIRED)
        .matches(VALIDATIONS.PHONE, ERRORS.INVALID_PHONE),
    email: yup.string().required(ERRORS.REQUIRED)
        .email(ERRORS.INVALID_EMAIL),
    city:       yup.string().required(ERRORS.REQUIRED),
    department: yup.string().required(ERRORS.REQUIRED),
    comment:    yup.string().optional(),
});

export const defaultValues: DefaultValues = {
    firstName:  '',
    lastName:   '',
    phone:      '',
    email:      '',
    city:       '',
    department: '',
    comment:    '',
};

