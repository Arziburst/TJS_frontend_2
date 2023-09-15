// Core
import * as yup from 'yup';

// Init
import { ERRORS } from '@/init/';

export const validationForm = yup.object({
    name:          yup.string().required(ERRORS.REQUIRED),
    email:         yup.string().required(ERRORS.REQUIRED),
    phone:         yup.string().required(ERRORS.REQUIRED),
    password:      yup.string().required(ERRORS.REQUIRED),
    passwordAgain: yup.string().required(ERRORS.REQUIRED),
});

export const defaultValues = {
    name:          '',
    email:         '',
    phone:         '',
    password:      '',
    passwordAgain: '',
};
