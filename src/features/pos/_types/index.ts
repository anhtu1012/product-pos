export type TableStatus = 'available' | 'occupied' | 'reserved';

export interface Area {
    id: string;
    name: string;
    tableCount: number;
}

export interface Table {
    id: string;
    name: string;
    status: TableStatus;
    areaId: string;
    currentOrderId?: string;
}

export interface Category {
    id: string;
    name: string;
}

export interface Product {
    id: string;
    name: string;
    price: number;
    categoryId: string;
    imageUrl?: string;
}

export interface OrderItem {
    id: string;
    productId: string;
    name: string;
    quantity: number;
    price: number;
    note?: string;
}

export interface Order {
    id: string;
    tableId: string;
    items: Array<OrderItem>;
    subtotal: number;
    tax: number;
    discount: number;
    total: number;
    status: 'pending' | 'paid' | 'cancelled';
    createdAt: string;
    updatedAt: string;
}
