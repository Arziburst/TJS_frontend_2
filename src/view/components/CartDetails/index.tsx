// Core
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// Bus
import { useNewPost } from '@/bus/newPost';

// Components
import { Form } from '../Form';
import { ContainerFields } from './ContainerFields';

// Elements
import { Button, FormTitle, Input, Textarea, TitlePage } from '@/view/elements';

// Static
import { defaultValues, validationForm } from './static';

// Types
interface PropTypes extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const CartDetails: FC<PropTypes> = ({ ...props }) => {
    const form = useForm({
        resolver:      yupResolver(validationForm),
        defaultValues: defaultValues,
    });

    // const { images } = form.getValues();
    // form.watch('images');

    // Hooks of Bus
    const { newPost: { cities }, setCitiesNewPost, fetchCitiesNewPost } = useNewPost();

    // Handlers
    const onSubmit = (values: any) => { // todo how to remove any ???
        console.log('text');
    };


    return (
        <div { ...props }>
            <TitlePage>cart</TitlePage>
            <Form.Root { ...form }>
                <form
                    onSubmit = { form.handleSubmit(onSubmit) }>
                    <div className = { `flex flex-col gap-[34px]
                        sb:gap-[48px]` }>
                        <div>
                            <FormTitle>
                                <span className = 'text-quaternary'>1.</span> Contact Details
                            </FormTitle>
                            <ContainerFields>
                                <Form.FormField
                                    control = { form.control }
                                    name = 'firstName'
                                    render = { ({ field, fieldState }) => (
                                        <Form.FormItem>
                                            <Form.FormControl>
                                                <Input
                                                    isValidate = { fieldState.invalid }
                                                    placeholder = 'First Name'
                                                    { ...field }
                                                />
                                            </Form.FormControl>
                                            <Form.FormMessage />
                                        </Form.FormItem>
                                    ) }
                                />
                                <Form.FormField
                                    control = { form.control }
                                    name = 'lastName'
                                    render = { ({ field, fieldState }) => (
                                        <Form.FormItem>
                                            <Form.FormControl>
                                                <Input
                                                    isValidate = { fieldState.invalid }
                                                    placeholder = 'Last Name'
                                                    { ...field }
                                                />
                                            </Form.FormControl>
                                            <Form.FormMessage />
                                        </Form.FormItem>
                                    ) }
                                />
                                <Form.FormField
                                    control = { form.control }
                                    name = 'phone'
                                    render = { ({ field, fieldState }) => (
                                        <Form.FormItem>
                                            <Form.FormControl>
                                                <Input
                                                    isValidate = { fieldState.invalid }
                                                    placeholder = 'Phone'
                                                    { ...field }
                                                />
                                            </Form.FormControl>
                                            <Form.FormMessage />
                                        </Form.FormItem>
                                    ) }
                                />
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
                            </ContainerFields>
                        </div>
                        <div>
                            <FormTitle>
                                <span className = 'text-quaternary'>2.</span> Shipping details
                            </FormTitle>
                            <ContainerFields>
                                <Form.FormField
                                    control = { form.control }
                                    name = 'city'
                                    render = { ({ field, fieldState }) => (
                                        <Form.FormItem>
                                            <Form.FormControl>
                                                <Input
                                                    isValidate = { fieldState.invalid }
                                                    placeholder = 'City'
                                                    { ...field }
                                                />
                                            </Form.FormControl>
                                            <Form.FormMessage />
                                        </Form.FormItem>
                                    ) }
                                />
                                <Form.FormField
                                    control = { form.control }
                                    name = 'department'
                                    render = { ({ field, fieldState }) => (
                                        <Form.FormItem>
                                            <Form.FormControl>
                                                <Input
                                                    isValidate = { fieldState.invalid }
                                                    placeholder = 'Choose post office'
                                                    { ...field }
                                                />
                                            </Form.FormControl>
                                            <Form.FormMessage />
                                        </Form.FormItem>
                                    ) }
                                />
                                <Form.FormField
                                    control = { form.control }
                                    name = 'comment'
                                    render = { ({ field, fieldState }) => (
                                        <Form.FormItem>
                                            <Form.FormControl>
                                                <Textarea
                                                    { ...field }
                                                    isValidate = { fieldState.invalid }
                                                    placeholder = 'Information that can help fulfill an order'
                                                />
                                            </Form.FormControl>
                                            <Form.FormMessage />
                                        </Form.FormItem>
                                    ) }
                                />
                            </ContainerFields>
                        </div>
                        <div>
                            <FormTitle>
                                <span className = 'text-quaternary'>3.</span> Payment options
                            </FormTitle>
                            <ContainerFields>
                                <Button variant = 'outline'>
                                    pay with APPLE
                                </Button>
                                <Button variant = 'outline'>
                                    pay GOOGLE
                                </Button>
                            </ContainerFields>
                        </div>
                        <div>
                            <div className = { `border-y-2 border-tertiary-100/10 py-[18px] mb-[18px]
                                sb:py-[32px] sb:mb-[32px]` }>
                                <div className = 'flex justify-between flex-wrap'>
                                    <FormTitle>
                                        Your Order
                                    </FormTitle>
                                    <FormTitle className = 'text-quaternary'>
                                        4660 ₴
                                    </FormTitle>
                                </div>
                                <div className = 'flex justify-between flex-wrap'>
                                    <FormTitle>
                                        Shipping
                                    </FormTitle>
                                    <FormTitle className = 'text-quaternary'>
                                        80 ₴
                                    </FormTitle>
                                </div>
                                <div className = 'flex justify-between flex-wrap'>
                                    <FormTitle className = 'mb-0 sb:mb-0'>
                                        Tax
                                    </FormTitle>
                                    <FormTitle className = 'mb-0 sb:mb-0 text-quaternary'>
                                        0 ₴
                                    </FormTitle>
                                </div>
                            </div>
                            <div className = 'flex justify-between flex-wrap'>
                                <FormTitle className = 'mb-0 sb:mb-0 text-quaternary'>
                                    TOTAL
                                </FormTitle>
                                <FormTitle className = 'mb-0 sb:mb-0 text-quaternary'>
                                    4740 ₴
                                </FormTitle>
                            </div>
                        </div>
                        <Button
                            className = 'capitalize'
                            type = 'submit'
                            variant = 'contain'>
                            Make Order
                        </Button>
                    </div>
                </form>
            </Form.Root>
        </div>
    );
};
