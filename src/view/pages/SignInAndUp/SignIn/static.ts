// Core
import * as yup from 'yup';

// Init
import { ERRORS } from '@/init/';

// Types
type DefaultValues = {
    email: string;
    password: string;
}

export const validationForm = yup.object({
    email:    yup.string().required(ERRORS.REQUIRED),
    password: yup.string().required(ERRORS.REQUIRED),
});

export const defaultValues: DefaultValues = process.env.NODE_ENV === 'development' ? {
    email:    '',
    password: '12345678',
} : {
    email:    '',
    password: '',
};

