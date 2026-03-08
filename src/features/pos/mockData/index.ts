import type { Area, Category, Product, Table } from '../_types';

export const MOCK_AREAS: Array<Area> = [
    { id: 'all', name: 'TẤT CẢ', tableCount: 27 },
    { id: 'vip', name: 'KHU VỰC VIP', tableCount: 6 },
    { id: 'garden', name: 'SÂN VƯỜN', tableCount: 6 },
    { id: 'ground', name: 'TẦNG TRỆT', tableCount: 15 },
];

export const MOCK_TABLES: Array<Table> = [
    // VIP Area
    { id: 'v1', name: 'BÀN VIP 1', status: 'occupied', areaId: 'vip' },
    { id: 'v2', name: 'BÀN VIP 2', status: 'available', areaId: 'vip' },
    { id: 'v3', name: 'BÀN VIP 3', status: 'available', areaId: 'vip' },
    { id: 'v4', name: 'BÀN VIP 4', status: 'available', areaId: 'vip' },
    { id: 'v5', name: 'BÀN VIP 5', status: 'available', areaId: 'vip' },
    { id: 'v6', name: 'BÀN VIP 6', status: 'available', areaId: 'vip' },
    // Garden Area
    { id: 'g1', name: 'SÂN VƯỜN 1', status: 'available', areaId: 'garden' },
    { id: 'g2', name: 'SÂN VƯỜN 2', status: 'available', areaId: 'garden' },
    { id: 'g3', name: 'SÂN VƯỜN 3', status: 'available', areaId: 'garden' },
    // Ground Area
    { id: 'gr1', name: 'TRỆT 1', status: 'available', areaId: 'ground' },
];

export const MOCK_CATEGORIES: Array<Category> = [
    { id: 'all', name: 'Tất cả' },
    { id: 'coffee', name: 'Cà phê' },
    { id: 'tea', name: 'Trà sữa' },
    { id: 'smoothie', name: 'Sinh tố' },
    { id: 'juice', name: 'Nước ép' },
    { id: 'cake', name: 'Bánh ngọt' },
];

export const MOCK_PRODUCTS: Array<Product> = [
    { id: 'p1', name: 'Cà phê đen', price: 20000, categoryId: 'coffee' },
    { id: 'p2', name: 'Cà phê sữa', price: 25000, categoryId: 'coffee' },
    { id: 'p3', name: 'Bạc xỉu', price: 30000, categoryId: 'coffee' },
    { id: 'p4', name: 'Trà sữa truyền thống', price: 35000, categoryId: 'tea' },
    { id: 'p5', name: 'Trà sữa Matcha', price: 40000, categoryId: 'tea' },
    { id: 'p6', name: 'Sinh tố bơ', price: 45000, categoryId: 'smoothie' },
    { id: 'p7', name: 'Nước ép cam', price: 35000, categoryId: 'juice' },
    { id: 'p8', name: 'Bánh Tiramisu', price: 50000, categoryId: 'cake' },
];
