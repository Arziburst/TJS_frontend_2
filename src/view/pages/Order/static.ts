// Core
import * as yup from 'yup';

export const validationForm = yup.object({
    status: yup.string(),
});

export const defaultValues = {
    status: '',
};
