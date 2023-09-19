// Core
import * as yup from 'yup';

// Init
import { ERRORS } from '@/init/';

// Types
type DefaultValues = {
    name: string;
    email: string;
    phone: string;
    password: string;
    passwordAgain: string;
}

export const validationForm = yup.object({
    name:          yup.string().required(ERRORS.REQUIRED),
    email:         yup.string().required(ERRORS.REQUIRED),
    phone:         yup.string().required(ERRORS.REQUIRED),
    password:      yup.string().required(ERRORS.REQUIRED),
    passwordAgain: yup.string().required(ERRORS.REQUIRED),
});

const getTimeForDevelopmentMode = new Date().getTime();

export const defaultValues: DefaultValues = process.env.NODE_ENV === 'development' ? {
    name:          `user_${getTimeForDevelopmentMode}`,
    email:         `email${getTimeForDevelopmentMode}@gmail.com`,
    phone:         `+${getTimeForDevelopmentMode.toString().slice(-8) }`,
    password:      '12345678',
    passwordAgain: '12345678',
} : {
    name:          '',
    email:         '',
    phone:         '',
    password:      '',
    passwordAgain: '',
};

