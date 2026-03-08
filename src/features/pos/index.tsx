import React, { useState } from 'react';
import AreaTableBoard from './_components/AreaTableBoard';
import ProductCatalog from './_components/ProductCatalog';
import OrderPanel from './_components/OrderPanel';
import PaymentModal from './_components/PaymentModal';
import { usePos } from './_hooks/usePos';

const POSFeature: React.FC = () => {
    const pos = usePos();
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);

    const handleConfirmPayment = () => {
        // Logic to clear order/mark paid would go here
        setIsPaymentOpen(false);
        pos.setSelectedTableId(null);
    };

    return (
        <div className="flex h-full w-full gap-2 bg-slate-100 p-2 overflow-hidden">
            {/* Left Panel: Area & Tables */}
            <div className="w-[30%] flex-shrink-0 bg-white rounded-lg shadow-sm overflow-hidden flex flex-col">
                <AreaTableBoard />
            </div>

            {/* Middle Panel: Product Catalog */}
            <div className="w-[35%] flex-shrink-0 bg-white rounded-lg shadow-sm overflow-hidden flex flex-col">
                <ProductCatalog 
                    addToCart={pos.addToCart}
                    searchQuery={pos.searchQuery}
                    setSearchQuery={pos.setSearchQuery}
                    selectedCategoryId={pos.selectedCategoryId}
                    setSelectedCategoryId={pos.setSelectedCategoryId}
                    filteredProducts={pos.filteredProducts}
                />
            </div>

            {/* Right Panel: Active Order */}
            <div className="flex-1 bg-white rounded-lg shadow-sm overflow-hidden flex flex-col">
                <OrderPanel onCheckout={() => setIsPaymentOpen(true)} />
            </div>

            {/* Payment Modal */}
            <PaymentModal 
                isOpen={isPaymentOpen}
                onClose={() => setIsPaymentOpen(false)}
                onConfirm={handleConfirmPayment}
            />
        </div>
    );
};

export default POSFeature;
