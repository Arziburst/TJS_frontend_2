// Core
import * as yup from 'yup';

// Init
import { ERRORS, INPUT_VALIDATION_VALUES } from '@/init/';

// Types
type DefaultValues = {
    email: string;
    password: string;
}

export const validationForm = yup.object({
    email: yup.string().required(ERRORS.REQUIRED)
        .email(ERRORS.INVALID_EMAIL),
    password: yup.string().required(ERRORS.REQUIRED)
        .min(INPUT_VALIDATION_VALUES.PASSWORD, ERRORS.PASSWORD_MIN_LENGTH),
});

export const defaultValues: DefaultValues = process.env.NODE_ENV === 'development' ? {
    email:    '',
    password: '12345678',
} : {
    email:    '',
    password: '',
};

