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

// Hooks
import { useCustomTranslation } from '@/tools/hooks';

// Book
import { BOOK, ParamsLowerCase } from '@/view/routes/book';

// Bus
import { useTogglesRedux } from '@/bus/client/toggles';
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

    const { t } = useCustomTranslation();

    const { togglesRedux: { isLoadingFetchOrder } } = useTogglesRedux();

    const { profile } = useProfile();
    const { orders: { currentOrder }, fetchOrder, fetchUpdateOrder } = useOrders();

    const [isFirstRenderState, setIsFirstRenderState] = useState(true);

    const form = useForm({
        resolver: yupResolver(validationForm),
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
    }, [currentOrder]);

    useEffect(() => {
        if (currentOrder && gotStatus && gotStatus.length > 0) {
            if (!isFirstRenderState) {
                fetchUpdateOrder({
                    _id: currentOrder._id,
                    status: Number(gotStatus),
                });
            } else {
                setIsFirstRenderState(false);
            }
        }
    }, [gotStatus]);

    if (!currentOrder) {
        return (
            <NotData
                isLoading={isLoadingFetchOrder}
                t={t}
                textIfNotData={t('pages.order.textIfNotData')}
            />
        );
    }

    return (
        <div>
            <NotData
                className='flex flex-col gap-[24px]'
                isLoading={isLoadingFetchOrder}
                t={t}>
                <NotData
                    className={`flex flex-wrap gap-[14px] justify-center
                        sb:gap-[20px]` }
                    isLoading={isLoadingFetchOrder}
                    t={t}>
                    {currentOrder?.orderedProducts.map((product) => (
                        <CardItem
                            _id={product.pid}
                            firstImage={{ src: product.image, alt: t('altImages.product') }}
                            key={product.pid}
                            price={product.price}
                            role={profile?.role}
                            t={t}
                            to={`${BOOK.PRODUCT}/${product.pid}`}
                            onClickEditItem={() => onClickEditItemHandler(product.pid)}
                        />
                    ))}
                </NotData>
                <p
                    className={`text-center text-lg
                        sb:text-2xl` }>
                    {t('pages.common.total')}: <span className='text-quaternary'>{`${currentOrder?.orderedProducts.reduce((acc, product) => acc + product.price, 0)} ₴`}</span>
                </p>
                <div className='text-center space-y-[18px]'>
                    <FormTitle>
                        {t('pages.order.firstTitle')}
                    </FormTitle>
                    <p>{t('pages.order.email')}: {currentOrder?.email}</p>
                    <p>{t('pages.order.phone')}: {currentOrder?.phone}</p>
                    <p>{t('pages.order.comment')}: {currentOrder?.comment}</p>
                </div>
                <div className='flex flex-col items-center'>
                    <Form.Root {...form}>
                        <FormTitle className='text-center'>
                            {t('pages.order.secondTitle')}
                        </FormTitle>
                        <form>
                            <Form.FormField
                                control={form.control}
                                name='status'
                                render={({ field }) => (
                                    <Form.FormItem>
                                        <Form.FormLabel>
                                            {t('pages.order.label')}:
                                        </Form.FormLabel>
                                        <Select.Root
                                            defaultValue={gotStatus}
                                            onValueChange={field.onChange}>
                                            <Form.FormControl>
                                                <Select.SelectTrigger
                                                    isArrow
                                                    className={cn(returnStylesStatus(Number(field.value)))}
                                                    variant='outline'>
                                                    <Select.SelectValue>
                                                        <span className='capitalize'>
                                                            {t(`cards.order.status.${transformStatusToString(Number(field.value))}`)}
                                                        </span>
                                                    </Select.SelectValue>
                                                </Select.SelectTrigger>
                                            </Form.FormControl>
                                            <Select.SelectContent
                                                variant='shadow'>
                                                {VALUES_OF_STATUS.map((valueOfStatus, index) => {
                                                    return (
                                                        <Select.SelectItem
                                                            className='capitalize'
                                                            key={index}
                                                            value={String(index)}
                                                            variant='contain'>
                                                            {t(`cards.order.status.${transformStatusToString(index)}`)}
                                                        </Select.SelectItem>
                                                    );
                                                })}
                                            </Select.SelectContent>
                                        </Select.Root>
                                        <Form.FormMessage t={t} />
                                    </Form.FormItem>
                                )}
                            />
                        </form>
                    </Form.Root>
                </div>
            </NotData>
        </div>
    );
};

const OrderWithErrorBoundary: FC = () => (
    <ErrorBoundary>
        <Order />
    </ErrorBoundary>
);

OrderWithErrorBoundary.displayName = 'OrderWithErrorBoundary';

export default OrderWithErrorBoundary;
