// Core
import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// Init
import { LINK_LIQ_PAY } from '@/init';

// Bus
import { useTogglesRedux } from '@/bus/client/toggles';
import { useOrders } from '@/bus/orders';
import { useNewPost } from '@/bus/newPost';
import { CityNewPost, WarehouseNewPost } from '@/bus/newPost/types';
import { useCart } from '@/bus/cart';

// Book
import { BOOK } from '@/view/routes/book';

// Containers
import { NotData, ScrollArea } from '@/view/containers';

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
    const {
        orders: { liqPay, currentOrder },
        fetchGetDataLiqPayOrder,
        fetchCreateOrder,
        fetchDeleteOrder,
        fetchUpdateOrder,
    } = useOrders();
    const { cart } = useCart();

    // State
    const [ isFirstRenderState, setIsFirstRenderState ] = useState(true);

    // Handlers
    const onSubmit = (values: any) => { // todo how to remove any ???
        console.log('text');
        if (currentOrder) {
            console.log('text2');

            const gotData = form.getValues();

            fetchUpdateOrder({
                _id:       currentOrder._id,
                firstName: gotData.firstName,
                lastName:  gotData.lastName,
                phone:     gotData.phone,
                email:     gotData.email,
                city:      gotData.city,
                warehouse: gotData.warehouse,
                comment:   gotData.comment,
            });
        }
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

    useEffect(() => {
        if (cart && cart.length > 0) {
            fetchCreateOrder({
                orderedPIDs: cart,
                phone:       'null',
            });
        }
    }, [ cart ]);

    useEffect(() => {
        if (currentOrder) {
            const id = currentOrder._id;

            fetchGetDataLiqPayOrder({
                amount:      `${currentOrder.orderedProducts.length + 1}`,
                description: `Замовлення №${id}`,
                order_id:    id,
                result_url:  process.env.API_URL + `/orders/change-status?id=${id}` || '',
            });
        }

        return () => {
            if (
                currentOrder && !window.location.href.toLowerCase().includes(LINK_LIQ_PAY)
                && !window.location.href.toLowerCase().includes(process.env.PUBLIC_URL + BOOK.CART)
            ) {
                fetchDeleteOrder(currentOrder._id);
            }
        };
    }, [ currentOrder ]);

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
                        {form.formState.isValid && liqPay ? (
                            <form
                                acceptCharset = 'utf-8'
                                action = { `${LINK_LIQ_PAY}/api/3/checkout` }
                                method = 'POST'>
                                <input
                                    name = 'data'
                                    type = 'hidden'
                                    value = { liqPay.data }
                                />
                                <input
                                    name = 'signature'
                                    type = 'hidden'
                                    value = { liqPay.signature }
                                />
                                <Button
                                    className = 'capitalize'
                                    type = 'submit'
                                    variant = 'contain'
                                    onClick = { onSubmit }>
                                    Make Order
                                </Button>
                            </form>
                        ) : (
                            <Button
                                className = 'capitalize'
                                type = 'submit'
                                variant = 'contain'>
                                Make Order
                            </Button>
                        )}
                    </div>
                </form>
            </Form.Root>
        </div>
    );
};
