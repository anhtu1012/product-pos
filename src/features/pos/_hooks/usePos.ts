import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { MOCK_PRODUCTS, MOCK_TABLES } from '../mockData';

import type { RootState } from '@/lib/redux/RootReducer';
import type { Product } from '../_types';
import { addToCart as addToCartAction, setSearchQuery as setSearchQueryAction, setSelectedCategoryId as setSelectedCategoryIdAction, setSelectedTableId as setSelectedTableIdAction, updateQuantity as updateQuantityAction } from '@/lib/redux/features/posSlice';

export const usePos = () => {
    const dispatch = useDispatch();
    
    const selectedTableId = useSelector((state: RootState) => state.pos.selectedTableId);
    const orders = useSelector((state: RootState) => state.pos.orders);
    const searchQuery = useSelector((state: RootState) => state.pos.searchQuery);
    const selectedCategoryId = useSelector((state: RootState) => state.pos.selectedCategoryId);

    const selectedTable = useMemo(() => 
        selectedTableId ? (MOCK_TABLES.find(t => t.id === selectedTableId) ?? null) : null
    , [selectedTableId]);

    const currentOrder = useMemo(() => 
        (selectedTableId && orders) ? (orders[selectedTableId] ?? null) : null
    , [selectedTableId, orders]);

    const addToCart = useCallback((product: Product) => {
        dispatch(addToCartAction(product));
    }, [dispatch]);

    const updateQuantity = useCallback((productId: string, delta: number) => {
        dispatch(updateQuantityAction({ productId, delta }));
    }, [dispatch]);

    const setSearchQuery = useCallback((query: string) => {
        dispatch(setSearchQueryAction(query));
    }, [dispatch]);

    const setSelectedCategoryId = useCallback((id: string) => {
        dispatch(setSelectedCategoryIdAction(id));
    }, [dispatch]);

    const setSelectedTableId = useCallback((id: string | null) => {
        dispatch(setSelectedTableIdAction(id));
    }, [dispatch]);

    const filteredProducts = useMemo(() => {
        return MOCK_PRODUCTS.filter(p => {
            const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategoryId === 'all' || p.categoryId === selectedCategoryId;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategoryId]);

    return {
        selectedTable,
        setSelectedTableId,
        currentOrder,
        addToCart,
        updateQuantity,
        searchQuery,
        setSearchQuery,
        selectedCategoryId,
        setSelectedCategoryId,
        filteredProducts,
    };
};
