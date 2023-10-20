// Core
import React, { FC, useEffect, useState } from 'react';
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
import { NotData, ScrollArea } from '@/view/containers';
import { CityNewPost, WarehouseNewPost } from '@/bus/newPost/types';
import { useTogglesRedux } from '@/bus/client/toggles';

// Types
interface PropTypes extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const CartDetails: FC<PropTypes> = ({ ...props }) => {
    const form = useForm({
        resolver:      yupResolver(validationForm),
        defaultValues: defaultValues,
        mode:          'onChange',
    });

    const { city, warehouse } = form.getValues();

    // Hooks of Bus
    const { togglesRedux: { isFetchCitiesNewPost, isFetchWarehousesNewPost }} = useTogglesRedux();
    const {
        newPost: { cities, warehouses },
        fetchCitiesNewPost,
        fetchWarehousesNewPost,
    } = useNewPost();

    // State
    const [ isFirstRenderState, setIsFirstRenderState ] = useState(true);

    // Handlers
    const onSubmit = (values: any) => { // todo how to remove any ???
        console.log('text');
    };

    const onClickCityHandler = (cityParam: CityNewPost) => {
        form.setValue('city', cityParam.Description, { shouldValidate: true });
        fetchWarehousesNewPost({
            cityName: city,
        });
    };

    const onClickWarehouseHandler = (warehouse: WarehouseNewPost) => {
        form.setValue('warehouse', warehouse.Description, { shouldValidate: true });
    };

    useEffect(() => {
        if (!isFirstRenderState) {
            fetchCitiesNewPost(city);

            if (cities && cities.some((citySome) => {
                return citySome.Description.toLocaleLowerCase() === city.toLocaleLowerCase()
                    || citySome.DescriptionRu.toLocaleLowerCase() === city.toLocaleLowerCase();
            })) {
                form.clearErrors('city');
                fetchWarehousesNewPost({
                    cityName: city,
                });
            } else {
                form.setError('city', { message: 'You have to write right city name' });
            }

            form.setValue('warehouse', defaultValues.warehouse);
        }
        isFirstRenderState && setIsFirstRenderState(false);
    }, [ city ]);

    useEffect(() => {
        if (!isFirstRenderState) {
            fetchWarehousesNewPost({
                cityName: city,
            });

            if (warehouses && warehouses.some((warehouseSome) => {
                return warehouseSome.Description.toLocaleLowerCase() === warehouse.toLocaleLowerCase()
                    || warehouseSome.DescriptionRu.toLocaleLowerCase() === warehouse.toLocaleLowerCase();
            })) {
                form.clearErrors('warehouse');
            } else {
                form.setError('warehouse', { message: 'You have to write right warehouse name' });
            }
        }

        isFirstRenderState && setIsFirstRenderState(false);
    }, [ warehouse ]);

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
                                            {cities && form.getFieldState('city').invalid && (
                                                <ScrollArea
                                                    className = 'h-[50vh] w-full p-4'
                                                    propViewport = {{}}>
                                                    <NotData isLoading = { isFetchCitiesNewPost }>
                                                        {cities.map((city) => (
                                                            <Button
                                                                className = 'flex-col'
                                                                key = { city.CityID }
                                                                variant = 'outline'
                                                                onClick = { () => onClickCityHandler(city) }>
                                                                <p>UA: <span className = 'text-quaternary'>{city.Description}</span></p>
                                                                <p>RU: <span className = 'text-quaternary'>{city.DescriptionRu}</span></p>
                                                            </Button>
                                                        ))}
                                                    </NotData>
                                                </ScrollArea>
                                            )}
                                        </Form.FormItem>
                                    ) }
                                />
                                <Form.FormField
                                    control = { form.control }
                                    name = 'warehouse'
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
                                            {warehouses && form.getFieldState('warehouse').invalid && (
                                                <ScrollArea
                                                    className = 'h-[50vh] w-full p-4'
                                                    propViewport = {{}}>
                                                    <NotData isLoading = { isFetchWarehousesNewPost }>
                                                        {warehouses.map((warehouse) => (
                                                            <Button
                                                                className = 'flex-col'
                                                                key = { warehouse.SiteKey }
                                                                variant = 'outline'
                                                                onClick = { () => onClickWarehouseHandler(warehouse) }>
                                                                <p>UA: <span className = 'text-quaternary'>{warehouse.Description}</span></p>
                                                                <p>RU: <span className = 'text-quaternary'>{warehouse.DescriptionRu}</span></p>

                                                            </Button>
                                                        ))}
                                                    </NotData>
                                                </ScrollArea>
                                            )}
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
