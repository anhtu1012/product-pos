import { Printer, X } from 'lucide-react';
import React from 'react';

import { usePos } from '../../_hooks/usePos';
import type { OrderItem } from '../../_types';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ 
    isOpen, 
    onClose, 
    onConfirm 
}) => {
    const { currentOrder: order, selectedTable: table } = usePos();

    if (!isOpen || !order || !table) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
                {/* Modal Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <h3 className="text-lg font-bold text-slate-800">Xác nhận thanh toán</h3>
                    <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-full transition-colors">
                        <X size={20} className="text-slate-500" />
                    </button>
                </div>

                {/* Receipt Content */}
                <div className="flex-1 overflow-y-auto p-8 flex flex-col items-center">
                    <div className="w-full max-w-sm bg-slate-50 p-6 rounded-lg border border-dashed border-slate-300 space-y-4">
                        <div className="text-center space-y-1">
                            <h2 className="text-2xl font-black text-slate-800">HÓA ĐƠN BÁN HÀNG</h2>
                            <p className="text-[10px] text-slate-500">ĐC: 330 Hoàng Quốc Việt, An Bình, TP Cần Thơ</p>
                            <p className="text-[10px] text-slate-500">Hotline: 0865341745</p>
                        </div>

                        <div className="flex justify-between text-[10px] text-slate-600">
                            <span>Ngày: 13/2/2026</span>
                            <span>Số phiếu: 3</span>
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-600">
                            <span>Bàn: <span className="font-bold">{table.name}</span></span>
                            <span>In lúc: 21:10</span>
                        </div>

                        <Separator className="bg-slate-300" />

                        <div className="space-y-2">
                            <div className="grid grid-cols-12 text-[10px] font-bold text-slate-500 uppercase">
                                <span className="col-span-6">Mặt hàng</span>
                                <span className="col-span-1 text-center">SL</span>
                                <span className="col-span-2 text-right">Đ.Giá</span>
                                <span className="col-span-3 text-right">T.Tiền</span>
                            </div>
                            {order.items.map((item: OrderItem) => (
                                <div key={item.id} className="grid grid-cols-12 text-[10px] text-slate-700">
                                    <span className="col-span-6 font-medium">{item.name}</span>
                                    <span className="col-span-1 text-center">{item.quantity}</span>
                                    <span className="col-span-2 text-right">{item.price.toLocaleString()}</span>
                                    <span className="col-span-3 text-right font-bold">{(item.price * item.quantity).toLocaleString()}</span>
                                </div>
                            ))}
                        </div>

                        <Separator className="bg-slate-300" />

                        <div className="space-y-1">
                            <div className="flex justify-between text-[10px] text-slate-600">
                                <span>Tổng tiền hàng:</span>
                                <span>{order.subtotal.toLocaleString()}đ</span>
                            </div>
                            <div className="flex justify-between text-sm font-black text-slate-800">
                                <span>TỔNG CỘNG:</span>
                                <span>{order.total.toLocaleString()}đ</span>
                            </div>
                            <p className="text-[8px] italic text-slate-400 text-center mt-2">
                                Xin cảm ơn Quý khách! / Thank you! Hẹn gặp lại!
                            </p>
                        </div>
                    </div>

                    {/* Payment Method Selector */}
                    <div className="w-full mt-6 space-y-3">
                        <label className="text-sm font-bold text-slate-700">Hình thức thanh toán:</label>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="payment" defaultChecked className="accent-[#004d40]" />
                                <span className="text-sm">Tiền mặt</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="payment" className="accent-[#004d40]" />
                                <span className="text-sm">Chuyển khoản</span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="p-4 bg-slate-50 border-t">
                    <Button 
                        onClick={onConfirm}
                        className="w-full h-12 bg-[#2563eb] hover:bg-blue-700 text-white font-bold flex items-center justify-center gap-2 text-base rounded-lg"
                    >
                        <Printer size={20} />
                        XÁC NHẬN & IN HÓA ĐƠN
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PaymentModal;
