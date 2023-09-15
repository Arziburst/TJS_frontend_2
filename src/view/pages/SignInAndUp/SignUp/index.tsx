// Core
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

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

export const SignUp: FC<PropTypes> = () => {
    const form = useForm({
        resolver: yupResolver(validationForm),
        defaultValues,
    });

    const onSubmit = (values: any) => {
        console.log(values);
    };

    return (
        <Form { ...form }>
            <InputGroup
                onSubmit = { form.handleSubmit(onSubmit) }>
                <FormTitle className = 'text-center'>Please enter your data</FormTitle>
                <FormField
                    control = { form.control }
                    name = 'name'
                    render = { ({ field }) => (
                        <FormItem>
                            {/* <FormLabel>Username</FormLabel> */}
                            <FormControl>
                                <Input
                                    placeholder = 'Name and Surname'
                                    { ...field }
                                />
                            </FormControl>
                            {/* <FormDescription>
                                    This is your public display name.
                                </FormDescription> */}
                            <FormMessage />
                        </FormItem>
                    ) }
                />
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
                    name = 'phone'
                    render = { ({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
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
                <FormField
                    control = { form.control }
                    name = 'passwordAgain'
                    render = { ({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    placeholder = 'Password again'
                                    { ...field }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    ) }
                />
                <Button
                    type = 'submit'
                    variant = 'default'>
                    Submit
                </Button>
            </InputGroup>
        </Form>
    );
};
