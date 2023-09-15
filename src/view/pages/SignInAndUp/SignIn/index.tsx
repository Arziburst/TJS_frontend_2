// Core
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

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
import { Input } from '@/view/elements';

// Static
import { validationForm, defaultValues } from './static';

// Types
type PropTypes = {
    /* type props here */
}

export const SignIn: FC<PropTypes> = () => {
    const form = useForm({
        resolver: yupResolver(validationForm),
        defaultValues,
    });

    const onSubmit = (values: any) => {
        console.log(values);
    };

    return (
        <div>
            {/* Enter your name and surname:
            Enter your e-mail:
            Enter your phone:
            Enter your password:
            Enter password again: */}

            <p>Please enter your data</p>

            <Form { ...form }>
                <form
                    className = 'space-y-8'
                    onSubmit = { form.handleSubmit(onSubmit) }>
                    <FormField
                        control = { form.control }
                        name = 'name'
                        render = { ({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder = 'shadcn'
                                        { ...field }
                                    />
                                </FormControl>
                                <FormDescription>
                                    This is your public display name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        ) }
                    />
                    <button type = 'submit'>Submit</button>
                </form>
            </Form>

        </div>
    );
};
