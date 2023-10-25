// Tools
import { useDispatch, useSelector } from '../../tools/hooks'; /* Typed selector */

// Slice
import { ordersActions } from './slice';

// Types
import * as types from './types';

// MarkerGen middleware
import { useOrdersSaga } from './saga'; /* Choose one technology, Saga or Thunk */

export const useOrders = () => {
    // MarkerGen api hook
    const ordersSagas = useOrdersSaga();  /* Saga api hook */

    const dispatch = useDispatch();
    const orders = useSelector((state) => state.orders);

    return {
        orders,
        setOrders:           (payload: types.Orders) => dispatch(ordersActions.setOrders(payload)),
        setDataLiqPayOrders: (payload: types.OrdersState['liqPay']) => dispatch(ordersActions.setDataLiqPayOrders(payload)),
        reset:               () => dispatch(ordersActions.reset()),
        ...ordersSagas,
    };
};
