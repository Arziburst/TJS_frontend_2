// Core
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
// Bus
import { useProfile } from '@/bus/profile';

// Containers
import { InputGroup } from '@/view/containers';

// Components
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/view/components';

// Elements
import { Button, FormTitle, Input } from '@/view/elements';

// Static
import { validationForm, defaultValues } from './static';

// Types
type PropTypes = {
    /* type props here */
}

export const SignUp: FC<PropTypes> = () => {
    const navigate = useNavigate();

    const form = useForm({
        resolver: yupResolver(validationForm),
        defaultValues,
    });

    const { profile: { isLoadings }, fetchRegistrationProfile } = useProfile();

    const onSubmit = (values: typeof defaultValues) => {
        fetchRegistrationProfile({
            name:     values.name,
            phone:    values.phone,
            email:    values.email,
            password: values.password,
            navigate,
        });
    };

    return (
        <Form { ...form }>
            <InputGroup
                onSubmit = { form.handleSubmit(onSubmit) }>
                <FormTitle className = 'text-center'>
                    Please enter your registration information.
                </FormTitle>
                <FormField
                    control = { form.control }
                    name = 'name'
                    render = { ({ field, fieldState }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    isValidate = { fieldState.invalid }
                                    placeholder = 'Name and Surname'
                                    { ...field }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    ) }
                />
                <FormField
                    control = { form.control }
                    name = 'email'
                    render = { ({ field, fieldState }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    isValidate = { fieldState.invalid }
                                    placeholder = 'Email'
                                    { ...field }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    ) }
                />
                <FormField
                    control = { form.control }
                    name = 'phone'
                    render = { ({ field, fieldState }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    isValidate = { fieldState.invalid }
                                    placeholder = 'Phone'
                                    { ...field }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    ) }
                />
                <FormField
                    control = { form.control }
                    name = 'password'
                    render = { ({ field, fieldState }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    isValidate = { fieldState.invalid }
                                    placeholder = 'Password'
                                    { ...field }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    ) }
                />
                <FormField
                    control = { form.control }
                    name = 'passwordAgain'
                    render = { ({ field, fieldState }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    isValidate = { fieldState.invalid }
                                    placeholder = 'Password again'
                                    { ...field }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    ) }
                />
                <Button
                    isLoading = { isLoadings.profile }
                    type = 'submit'
                    variant = 'default'>
                    Submit
                </Button>
            </InputGroup>
        </Form>
    );
};
