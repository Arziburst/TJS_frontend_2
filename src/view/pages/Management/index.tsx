// Core
import React, { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// Init
import { CATEGORIES_ITEMS } from '@/init';

// Bus
import { useProducts } from '@/bus/products';

// Containers
import { InputGroup } from '@/view/containers';

// Components
import {
    ErrorBoundary,
    Form,
    Select,
} from '@/view/components';

// Elements
import {
    Button,
    FormTitle,
    Input,
    Switch,
    Textarea,
} from '@/view/elements';

// Styles
import S from './styles.module.css';

// Static
import { validationForm, defaultValues } from './static';

// Types
type PropTypes = {
    /* type props here */
}

const Management: FC<PropTypes> = () => {
    const { products: { isLoadings }, fetchCreateNewProduct } = useProducts();

    const form = useForm({
        resolver: yupResolver(validationForm),
        defaultValues,
    });

    const onSubmit = (values: typeof defaultValues) => {
        fetchCreateNewProduct(values);
    };

    const gotValues = form.getValues();

    useEffect(() => {
        console.log('gotValues >>> ', gotValues.available);
    }, [ gotValues ]);

    return (
        <div>
            <Form.Root { ...form }>
                <FormTitle className = 'text-center'>
                    Please enter product information.
                </FormTitle>
                <form
                    className = { S.grid }
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
                    <Form.FormField
                        control = { form.control }
                        name = 'type'
                        render = { ({ field }) => (
                            <Form.FormItem style = {{ gridArea: field.name }}>
                                <Form.FormLabel>
                                    Choose the correct type for the product:
                                </Form.FormLabel>
                                <Select.Root
                                    defaultValue = { field.value }
                                    onValueChange = { field.onChange }>
                                    <Form.FormControl>
                                        <Select.SelectTrigger
                                            variant = 'outline'>
                                            <Select.SelectValue>
                                                <span className = 'capitalize'>
                                                    {field.value}
                                                </span>
                                            </Select.SelectValue>
                                        </Select.SelectTrigger>
                                    </Form.FormControl>
                                    <Select.SelectContent
                                        variant = 'shadow'>
                                        {CATEGORIES_ITEMS.map((item) => (
                                            <Select.SelectItem
                                                className = 'capitalize'
                                                key = { item }
                                                value = { item }
                                                variant = 'secondary'>
                                                {item}
                                            </Select.SelectItem>
                                        ))}
                                    </Select.SelectContent>
                                </Select.Root>
                                <Form.FormMessage />
                            </Form.FormItem>
                        ) }
                    />
                    <Form.FormField
                        control = { form.control }
                        name = 'description'
                        render = { ({ field, fieldState }) => (
                            <Form.FormItem style = {{ gridArea: field.name }}>
                                <Form.FormLabel>
                                    Enter description:
                                </Form.FormLabel>
                                <Form.FormControl>
                                    <Textarea
                                        { ...field }
                                        isValidate = { fieldState.invalid }
                                        placeholder = 'Enter some data...'
                                    />
                                </Form.FormControl>
                                <Form.FormMessage />
                            </Form.FormItem>
                        ) }
                    />
                    <Form.FormField
                        control = { form.control }
                        name = 'weight'
                        render = { ({ field, fieldState }) => (
                            <Form.FormItem style = {{ gridArea: field.name }}>
                                <Form.FormLabel>
                                    Enter the product weight in grams:
                                </Form.FormLabel>
                                <Form.FormControl>
                                    <Input
                                        isValidate = { fieldState.invalid }
                                        placeholder = 'Enter some data...'
                                        type = 'number'
                                        { ...field }
                                    />
                                </Form.FormControl>
                                <Form.FormMessage />
                            </Form.FormItem>
                        ) }
                    />
                    <Form.FormField
                        control = { form.control }
                        name = 'price'
                        render = { ({ field, fieldState }) => (
                            <Form.FormItem style = {{ gridArea: field.name }}>
                                <Form.FormLabel>
                                    Enter product price in UAH/₴:
                                </Form.FormLabel>
                                <Form.FormControl>
                                    <Input
                                        isValidate = { fieldState.invalid }
                                        placeholder = 'Enter some data...'
                                        type = 'number'
                                        { ...field }
                                    />
                                </Form.FormControl>
                                <Form.FormMessage />
                            </Form.FormItem>
                        ) }
                    />
                    <Form.FormField
                        control = { form.control }
                        name = 'discount'
                        render = { ({ field, fieldState }) => (
                            <Form.FormItem style = {{ gridArea: field.name }}>
                                <Form.FormLabel>
                                    Enter discount %:
                                </Form.FormLabel>
                                <Form.FormControl>
                                    <Input
                                        isValidate = { fieldState.invalid }
                                        placeholder = 'Enter some data...'
                                        type = 'number'
                                        { ...field }
                                    />
                                </Form.FormControl>
                                <Form.FormMessage />
                            </Form.FormItem>
                        ) }
                    />
                    <Form.FormField
                        control = { form.control }
                        name = 'available'
                        render = { ({ field }) => (
                            <Form.FormItem style = {{ gridArea: field.name }}>
                                <Form.FormLabel className = 'block'>
                                    Product available:
                                </Form.FormLabel>
                                <Switch
                                    checked = { field.value }
                                    onCheckedChange = { field.onChange }>
                                    {field.value ? 'Availability' : 'Non-availability'}
                                </Switch>
                                <Form.FormMessage />
                            </Form.FormItem>
                        ) }
                    />
                    <Button
                        className = 'max-w-[300px]'
                        isLoading = { isLoadings.create }
                        style = {{ gridArea: 'submit' }}
                        type = 'submit'
                        variant = 'contain'>
                        Submit
                    </Button>
                </form>
            </Form.Root>
        </div>
    );
};

export default () => (
    <ErrorBoundary>
        <Management />
    </ErrorBoundary>
);
