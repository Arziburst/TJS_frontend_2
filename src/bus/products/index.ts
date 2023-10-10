// Tools
import { useDispatch, useSelector } from '../../tools/hooks'; /* Typed selector */

// Slice
import { productsActions } from './slice';

// Types
import * as commonTypes from '../commonTypes';
import * as types from './types';

// MarkerGen middleware
import { useProductsSaga } from './saga';

export const useProducts = () => {
    // MarkerGen api hook
    const productsSagas = useProductsSaga();  /* Saga api hook */

    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);

    return {
        products,
        setProducts:        (payload: types.Products) => dispatch(productsActions.setProducts(payload)),
        setProduct:         (payload: types.ExtendedProduct) => dispatch(productsActions.setProduct(payload)),
        setLimitOfProducts: (payload: types.ProductsState['limit']) => dispatch(productsActions.setLimitOfProducts(payload)),
        setTotalOfProducts: (payload: types.ProductsState['total']) => dispatch(productsActions.setTotalOfProducts(payload)),
        setPageOfProducts:  (payload: types.ProductsState['page']) => dispatch(productsActions.setPageOfProducts(payload)),
        setCurrentProduct:  (payload: types.ExtendedProduct) => dispatch(productsActions.setCurrentProduct(payload)),
        setCreatedProduct:  (
            payload: types.ExtendedProduct,
        ) => dispatch(productsActions.setProduct(payload)),
        setEditedProduct: (
            payload: types.ExtendedProduct,
        ) => dispatch(productsActions.setEditedProduct(payload)),
        setIsLoadingOfProducts: (
            payload: types.SetIsLoadingOfProductsAction,
        ) => dispatch(productsActions.setIsLoadingOfProducts(payload)),
        setErrorOfProducts: (payload: commonTypes.Error) => dispatch(productsActions.setErrorOfProducts(payload)), // todo need???
        resetProducts:      () => dispatch(productsActions.resetProducts()),
        ...productsSagas,
    };
};
