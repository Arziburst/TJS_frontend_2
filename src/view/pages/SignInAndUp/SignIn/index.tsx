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
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
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

export const SignIn: FC<PropTypes> = () => {
    const navigate = useNavigate();

    const form = useForm({
        resolver: yupResolver(validationForm),
        defaultValues,
    });

    const { profile: { isLoadings }, fetchLoginProfile } = useProfile();

    const onSubmit = (values: typeof defaultValues) => {
        fetchLoginProfile({
            ...values,
            navigate,
        });
    };

    return (
        <Form { ...form }>
            <InputGroup
                onSubmit = { form.handleSubmit(onSubmit) }>
                <FormTitle className = 'text-center'>
                    Please enter your authentication information.
                </FormTitle>
                <FormField
                    control = { form.control }
                    name = 'email'
                    render = { ({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
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
                    name = 'password'
                    render = { ({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    placeholder = 'Password'
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
