// Core
import React, { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// Init
import { VALUES_OF_STATUS } from '@/init';

// Utils
import { cn } from '@/tools/lib/utils';
import { returnStylesStatus, transformStatusToString } from '@/tools/utils';

// Book
import { BOOK, ParamsLowerCase } from '@/view/routes/book';

// Bus
import { useOrders } from '@/bus/orders';
import { useProfile } from '@/bus/profile';

// Containers
import { NotData } from '@/view/containers';

// Components
import { CardItem, ErrorBoundary, Form, Select } from '../../components';

// Elements
import { FormTitle } from '@/view/elements';

// Static
import { defaultValues, validationForm } from './static';

// Types
import { OrderedProduct } from '@/bus/orders/types';

type PropTypes = {
    /* type props here */
}

const Order: FC<PropTypes> = () => {
    const navigate = useNavigate();
    const { id } = useParams<Pick<ParamsLowerCase, 'id'>>();

    const { profile: { profile }} = useProfile();
    const { orders: { currentOrder }, fetchOrder, fetchUpdateOrder } = useOrders();

    const [ isFirstRenderState, setIsFirstRenderState ] = useState(true);

    const form = useForm({
        resolver:      yupResolver(validationForm),
        defaultValues: currentOrder ? { status: String(currentOrder.status) } : defaultValues,
    });

    form.watch();
    const gotStatus = form.getValues('status');

    const onClickEditItemHandler = (pid: OrderedProduct['pid']) => {
        navigate(`${BOOK.PRODUCT}/${pid}${BOOK.MANAGEMENT}`);
    };

    useEffect(() => {
        id && fetchOrder(id);
    }, []);

    useEffect(() => {
        currentOrder && form.setValue('status', String(currentOrder.status));
    }, [ currentOrder ]);

    useEffect(() => {
        console.log('gotStatus >>> ', gotStatus);
        if (currentOrder && gotStatus && gotStatus.length > 0) {
            if (!isFirstRenderState) {
                fetchUpdateOrder({
                    _id:    currentOrder._id,
                    status: Number(gotStatus),
                });
            } else {
                setIsFirstRenderState(false);
            }
        }
    }, [ gotStatus ]);

    return (
        <div className = 'flex flex-col gap-[24px]'>
            <NotData
                className = { `flex flex-wrap gap-[14px] justify-center
                    sb:gap-[20px]` }
                isLoading = { false }>
                {currentOrder?.orderedProducts.map((product) => (
                    <CardItem
                        firstImage = {{ src: product.image, alt: 'Image of Product' }}
                        key = { product.pid }
                        price = { product.price }
                        role = { profile?.role }
                        to = { `${BOOK.PRODUCT}/${product.pid}` }
                        onClickEditItem = { () => onClickEditItemHandler(product.pid) }
                    />
                ))}
            </NotData>
            <p
                className = { `text-center text-lg
                    sb:text-2xl` }>
                Total: <span className = 'text-quaternary'>{`${currentOrder?.orderedProducts.reduce((acc, product) => acc + product.price, 0) } ₴`}</span>
            </p>
            <div className = 'text-center space-y-[18px]'>
                <FormTitle>
                    Information about order
                </FormTitle>
                <p>Email: {currentOrder?.email}</p>
                <p>Phone: {currentOrder?.phone}</p>
                <p>Comment: {currentOrder?.comment}</p>
            </div>
            <div className = 'flex flex-col items-center'>
                <Form.Root { ...form }>
                    <FormTitle className = 'text-center'>
                        Please enter product information.
                    </FormTitle>
                    <form>
                        <Form.FormField
                            control = { form.control }
                            name = 'status'
                            render = { ({ field }) => (
                                <Form.FormItem>
                                    <Form.FormLabel>
                                        Choose the correct type for the product:
                                    </Form.FormLabel>
                                    <Select.Root
                                        defaultValue = { gotStatus }
                                        onValueChange = { field.onChange }>
                                        <Form.FormControl>
                                            <Select.SelectTrigger
                                                isArrow
                                                className = { cn(returnStylesStatus(Number(field.value))) }
                                                variant = 'outline'>
                                                <Select.SelectValue>
                                                    <span className = 'capitalize'>
                                                        {transformStatusToString(Number(field.value))}
                                                    </span>
                                                </Select.SelectValue>
                                            </Select.SelectTrigger>
                                        </Form.FormControl>
                                        <Select.SelectContent
                                            variant = 'shadow'>
                                            {VALUES_OF_STATUS.map((valueOfStatus, index) => {
                                                return (
                                                    <Select.SelectItem
                                                        className = 'capitalize'
                                                        key = { index }
                                                        value = { String(index) }
                                                        variant = 'contain'>
                                                        {transformStatusToString(index)}
                                                    </Select.SelectItem>
                                                );
                                            })}
                                        </Select.SelectContent>
                                    </Select.Root>
                                    <Form.FormMessage />
                                </Form.FormItem>
                            ) }
                        />
                    </form>
                </Form.Root>
            </div>
        </div>
    );
};

export default () => (
    <ErrorBoundary>
        <Order />
    </ErrorBoundary>
);
