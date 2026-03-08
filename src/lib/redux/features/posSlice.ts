import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Order, Product } from '../../../features/pos/_types';

interface PosState {
    selectedTableId: string | null;
    orders: Record<string, Order>;
    searchQuery: string;
    selectedCategoryId: string;
}   

const initialState: PosState = {
    selectedTableId: null,
    orders: {},
    searchQuery: '',
    selectedCategoryId: 'all',
};

export const posSlice = createSlice({
    name: 'pos',
    initialState,
    reducers: {
        setSelectedTableId: (state, action: PayloadAction<string | null>) => {
            state.selectedTableId = action.payload;
        },
        addToCart: (state, action: PayloadAction<Product>) => {
            const product = action.payload;
            const tableId = state.selectedTableId;
            if (!tableId) return;

            if (!state.orders) state.orders = {};
            const existingOrder = state.orders[tableId] || {
                id: `order-${tableId}`,
                tableId: tableId,
                items: [],
                subtotal: 0,
                tax: 0,
                discount: 0,
                total: 0,
                status: 'pending',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };

            const existingItemIndex = existingOrder.items.findIndex(item => item.productId === product.id);
            const newItems = [...existingOrder.items];

            if (existingItemIndex > -1) {
                newItems[existingItemIndex] = {
                    ...newItems[existingItemIndex],
                    quantity: newItems[existingItemIndex].quantity + 1,
                };
            } else {
                newItems.push({
                    id: `item-${Date.now()}`,
                    productId: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: 1,
                });
            }

            const subtotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            
            state.orders[tableId] = {
                ...existingOrder,
                items: newItems,
                subtotal,
                total: subtotal,
                updatedAt: new Date().toISOString(),
            };
        },
        updateQuantity: (state, action: PayloadAction<{ productId: string; delta: number }>) => {
            const { productId, delta } = action.payload;
            const tableId = state.selectedTableId;
            if (!tableId || !state.orders || !state.orders[tableId]) return;

            const tableOrder = state.orders[tableId];
            const newItems = tableOrder.items.map(item => {
                if (item.productId === productId) {
                    const newQty = Math.max(0, item.quantity + delta);
                    return { ...item, quantity: newQty };
                }
                return item;
            }).filter(item => item.quantity > 0);

            const subtotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

            state.orders[tableId] = {
                ...tableOrder,
                items: newItems,
                subtotal,
                total: subtotal,
                updatedAt: new Date().toISOString(),
            };
        },
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },
        setSelectedCategoryId: (state, action: PayloadAction<string>) => {
            state.selectedCategoryId = action.payload;
        },
        clearOrder: (state, action: PayloadAction<string>) => {
            delete state.orders[action.payload];
            if (state.selectedTableId === action.payload) {
                state.selectedTableId = null;
            }
        },
    },
});

export const { 
    setSelectedTableId, 
    addToCart, 
    updateQuantity, 
    setSearchQuery, 
    setSelectedCategoryId,
    clearOrder
} = posSlice.actions;

export default posSlice.reducer;
