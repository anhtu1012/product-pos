import { CreditCard, Minus, Plus, Repeat, Search, Trash2, XCircle } from 'lucide-react';
import React from 'react';

import { usePos } from '../../_hooks/usePos';
import type { OrderItem } from '../../_types';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface OrderPanelProps {
    onCheckout: () => void;
}

const OrderPanel: React.FC<OrderPanelProps> = ({
    onCheckout
}) => {
    const { 
        selectedTable, 
        currentOrder, 
        updateQuantity 
    } = usePos();

    return (
        <div className="flex flex-col h-full bg-white">
            {/* Order Header */}
            <div className="p-3 border-b">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <div className="text-[10px] text-slate-400 italic font-medium">Chi tiết đặt bàn</div>
                        <h2 className="text-xl font-bold text-[#004d40]">
                            {selectedTable?.name || 'CHƯA CHỌN BÀN'}
                        </h2>
                    </div>
                    <div className="text-right">
                        <div className="text-xs text-slate-500 font-medium">13/2/2026</div>
                        <div className="text-sm font-bold">21:08</div>
                    </div>
                </div>
                <div className="relative">
                    <input 
                        className="w-full text-xs italic bg-slate-50 p-2 rounded border border-dashed border-slate-300 pl-8 focus:outline-none"
                        placeholder="Nhập SĐT để tìm/thêm khách hàng..."
                    />
                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                </div>
            </div>

            {/* Order Items Table Header */}
            <div className="grid grid-cols-12 gap-1 px-3 py-2 text-[10px] font-bold text-slate-500 uppercase bg-slate-50">
                <div className="col-span-1">#</div>
                <div className="col-span-5">Món</div>
                <div className="col-span-3 text-center">SL</div>
                <div className="col-span-2 text-right">ĐG</div>
                <div className="col-span-1 text-right">TT</div>
            </div>

            {/* Active Order Items */}
            <ScrollArea className="flex-1">
                <div className="divide-y divide-dashed">
                    {!currentOrder || currentOrder.items.length === 0 ? (
                        <div className="p-10 text-center text-slate-400 text-xs italic">
                            Chưa có món nào trong đơn hàng...
                        </div>
                    ) : (
                        currentOrder.items.map((item: OrderItem, index: number) => (
                            <div key={item.id} className="px-3 py-2 grid grid-cols-12 gap-1 items-center bg-blue-50/20">
                                <div className="col-span-1 text-[10px] text-slate-400 italic">{index + 1}</div>
                                <div className="col-span-5">
                                    <div className="text-xs font-bold">{item.name}</div>
                                    <div className="text-[10px] text-slate-400 italic">Ghi chú...</div>
                                </div>
                                <div className="col-span-3 flex items-center justify-center gap-1">
                                    <button 
                                        onClick={() => updateQuantity(item.productId, -1)}
                                        className="bg-red-500 text-white rounded p-0.5"
                                    >
                                        <Minus size={12} />
                                    </button>
                                    <span className="text-xs font-bold min-w-[20px] text-center">{item.quantity}</span>
                                    <button 
                                        onClick={() => updateQuantity(item.productId, 1)}
                                        className="bg-[#004d40] text-white rounded p-0.5"
                                    >
                                        <Plus size={12} />
                                    </button>
                                </div>
                                <div className="col-span-2 text-right text-[10px] font-medium text-slate-500">
                                    {item.price.toLocaleString()}
                                </div>
                                <div className="col-span-1 flex flex-col items-end">
                                    <div className="text-xs font-bold">{(item.price * item.quantity).toLocaleString()}</div>
                                    <Trash2 
                                        size={12} 
                                        className="text-red-300 cursor-pointer mt-1" 
                                        onClick={() => updateQuantity(item.productId, -item.quantity)}
                                    />
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </ScrollArea>

            {/* Order Totals & Summary */}
            <div className="p-3 bg-slate-50 border-t space-y-2">
                <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-slate-500">Giảm %:</span>
                        <input className="flex-1 border rounded text-xs p-1 text-center" defaultValue="0" />
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-slate-500">Phụ thu:</span>
                        <input className="flex-1 border rounded text-xs p-1 text-center" defaultValue="0" />
                    </div>
                </div>

                <div className="flex justify-between items-center text-[10px] text-slate-500">
                    <span>Tổng tiền hàng:</span>
                    <span className="font-bold">{(currentOrder?.subtotal || 0).toLocaleString()}đ</span>
                </div>

                <div className="flex justify-between items-center border-t border-slate-200 pt-1">
                    <span className="text-xs font-bold text-slate-700">Khách phải trả:</span>
                    <span className="text-lg font-bold text-orange-600">{(currentOrder?.total || 0).toLocaleString()}đ</span>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold text-slate-500">Khách đưa:</span>
                        <input className="border rounded text-sm p-1 font-bold text-center" defaultValue="0" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold text-slate-500">Tiền thừa:</span>
                        <div className="bg-slate-200 rounded text-sm p-1 font-bold text-center text-slate-500">0đ</div>
                    </div>
                </div>

                {/* Quick Cash Buttons */}
                <div className="flex gap-1">
                    {['+50k', '+100k', '+200k', '+500k'].map(val => (
                        <button key={val} className="flex-1 py-1 text-[10px] font-bold border rounded bg-white hover:bg-slate-100">{val}</button>
                    ))}
                    <button className="border rounded bg-white p-1 flex items-center justify-center"><Repeat size={14} className="text-red-500" /></button>
                </div>

                {/* Primary Action Buttons */}
                <div className="grid grid-cols-3 gap-2 mt-2 pt-2 border-t">
                    <Button variant="destructive" className="flex flex-col h-auto py-2 gap-1 bg-red-500">
                        <XCircle size={14} />
                        <span className="text-[10px] font-bold uppercase">Hủy đơn</span>
                    </Button>
                    <Button className="flex flex-col h-auto py-2 gap-1 bg-orange-600 hover:bg-orange-700 text-white">
                        <Repeat size={14} />
                        <span className="text-[10px] font-bold uppercase">Chuyển/Gộp</span>
                    </Button>
                    <Button 
                        disabled={!currentOrder || currentOrder.items.length === 0}
                        onClick={onCheckout}
                        className="flex-1 py-2 text-[10px] font-bold rounded bg-[#004d40] hover:bg-teal-800 text-white flex flex-col items-center gap-1"
                    >
                        <CreditCard size={14} />
                        <span className="uppercase">Thanh toán</span>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default OrderPanel;
