// Core
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';

// Bus
import { useProfile } from '@/bus/profile';
import { useTogglesRedux } from '@/bus/client/toggles';

// Containers
import { InputGroup } from '@/view/containers';

// Components
import {
    Form,
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

    const { togglesRedux: { isLoadingLoginProfile }} = useTogglesRedux();

    const { fetchLoginProfile } = useProfile();

    const onSubmit = (values: typeof defaultValues) => {
        fetchLoginProfile({
            ...values,
            navigate,
        });
    };

    return (
        <Form.Root { ...form }>
            <InputGroup
                onSubmit = { form.handleSubmit(onSubmit) }>
                <FormTitle className = 'text-center'>
                    Please enter your authentication information.
                </FormTitle>
                <Form.FormField
                    control = { form.control }
                    name = 'email'
                    render = { ({ field, fieldState }) => (
                        <Form.FormItem>
                            <Form.FormControl>
                                <Input
                                    isValidate = { fieldState.invalid }
                                    placeholder = 'Email'
                                    { ...field }
                                />
                            </Form.FormControl>
                            <Form.FormMessage />
                        </Form.FormItem>
                    ) }
                />
                <Form.FormField
                    control = { form.control }
                    name = 'password'
                    render = { ({ field, fieldState }) => (
                        <Form.FormItem>
                            <Form.FormControl>
                                <Input
                                    isValidate = { fieldState.invalid }
                                    placeholder = 'Password'
                                    { ...field }
                                />
                            </Form.FormControl>
                            <Form.FormMessage />
                        </Form.FormItem>
                    ) }
                />
                <Button
                    isLoading = { isLoadingLoginProfile }
                    type = 'submit'
                    variant = 'contain'>
                    Submit
                </Button>
            </InputGroup>
        </Form.Root>
    );
};
