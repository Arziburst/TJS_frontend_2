// Core
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { TFunction } from 'i18next';

// Bus
import { useTogglesRedux } from '@/bus/client/toggles';
import { useProfile } from '@/bus/profile';

// Containers
import { InputGroup } from '@/view/containers';

// Components
import { Form } from '@/view/components';

// Elements
import { Button, FormTitle, Input } from '@/view/elements';

// Static
import { validationForm, defaultValues } from './static';

// Types
type PropTypes = {
    t: TFunction;
}

export const SignUp: FC<PropTypes> = ({
    t,
}) => {
    const navigate = useNavigate();

    const form = useForm({
        resolver: yupResolver(validationForm),
        defaultValues,
    });

    const { togglesRedux: { isLoadingRegistrationProfile }} =  useTogglesRedux();

    const { fetchRegistrationProfile } = useProfile();

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
        <Form.Root { ...form }>
            <InputGroup
                onSubmit = { form.handleSubmit(onSubmit) }>
                <FormTitle className = 'text-center'>
                    {t('pages.signInAndUp.signUp.title')}
                </FormTitle>
                <Form.FormField
                    control = { form.control }
                    name = 'name'
                    render = { ({ field, fieldState }) => (
                        <Form.FormItem>
                            <Form.FormControl>
                                <Input
                                    isValidate = { fieldState.invalid }
                                    placeholder = { t('other.placeholders.nameAndSurname') }
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
                                    placeholder = { t('other.placeholders.email') }
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
                                    placeholder = { t('other.placeholders.phone') }
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
                                    placeholder = { t('other.placeholders.password') }
                                    { ...field }
                                />
                            </Form.FormControl>
                            <Form.FormMessage />
                        </Form.FormItem>
                    ) }
                />
                <Form.FormField
                    control = { form.control }
                    name = 'passwordAgain'
                    render = { ({ field, fieldState }) => (
                        <Form.FormItem>
                            <Form.FormControl>
                                <Input
                                    isValidate = { fieldState.invalid }
                                    placeholder = { t('other.placeholders.passwordAgain') }
                                    { ...field }
                                />
                            </Form.FormControl>
                            <Form.FormMessage />
                        </Form.FormItem>
                    ) }
                />
                <Button
                    isLoading = { isLoadingRegistrationProfile }
                    type = 'submit'
                    variant = 'contain'>
                    {t('other.buttons.submit')}
                </Button>
            </InputGroup>
        </Form.Root>
    );
};
