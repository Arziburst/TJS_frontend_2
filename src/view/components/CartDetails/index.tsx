// Core
import React, { FC } from 'react';

// Elements
import { Button, FormTitle, Input, TitlePage } from '@/view/elements';
import { Form } from '../Form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { defaultValues, validationForm } from './static';

// Types
interface PropTypes extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const CartDetails: FC<PropTypes> = ({ ...props }) => {
    const form = useForm({
        resolver:      yupResolver(validationForm),
        defaultValues: defaultValues,
    });

    const onSubmit = (values: any) => { // todo how to remove any ???
        console.log('text');
    };

    return (
        <div { ...props }>
            <TitlePage>cart</TitlePage>
            <Form.Root { ...form }>
                <FormTitle className = 'text-center'>
                    Please enter product information.
                </FormTitle>
                <form
                    onSubmit = { form.handleSubmit(onSubmit) }>
                    <Form.FormField
                        control = { form.control }
                        name = 'title'
                        render = { ({ field, fieldState }) => (
                            <Form.FormItem style = {{ gridArea: field.name }}>
                                <Form.FormLabel>
                                    Enter title:
                                </Form.FormLabel>
                                <Form.FormControl>
                                    <Input
                                        isValidate = { fieldState.invalid }
                                        placeholder = 'Enter some data...'
                                        { ...field }
                                    />
                                </Form.FormControl>
                                <Form.FormMessage />
                            </Form.FormItem>
                        ) }
                    />
                    <Button
                        className = 'max-w-[300px]'
                        style = {{ gridArea: 'submit' }}
                        type = 'submit'
                        variant = 'contain'>
                        submit
                    </Button>
                </form>
            </Form.Root>
        </div>
    );
};
