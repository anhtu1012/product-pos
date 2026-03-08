import { Plus, Search } from 'lucide-react';
import React from 'react';

import { MOCK_CATEGORIES } from '../../mockData';
import type { Product } from '../../_types';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ProductCatalogProps {
    addToCart: (product: Product) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    selectedCategoryId: string;
    setSelectedCategoryId: (id: string) => void;
    filteredProducts: Array<Product>;
}

const ProductCatalog: React.FC<ProductCatalogProps> = React.memo(({
    addToCart,
    searchQuery,
    setSearchQuery,
    selectedCategoryId,
    setSelectedCategoryId,
    filteredProducts
}) => {
    console.log("ĐÃ CODE POS XONG ÒI NÈ");
    
    return (
        <div className="flex flex-col h-full bg-slate-50">
            {/* Category Selector */}
            <div className="p-2 border-b bg-white flex items-center justify-between">
                <span className="font-bold text-sm">Danh mục:</span>
                <select 
                    className="border rounded p-1 text-xs"
                    value={selectedCategoryId}
                    onChange={(e) => setSelectedCategoryId(e.target.value)}
                >
                    {MOCK_CATEGORIES.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>
            </div>

            {/* Search Bar */}
            <div className="p-2 bg-white relative">
                <Input 
                    placeholder="Tìm kiếm món..." 
                    className="pl-8 h-8 text-xs bg-slate-100 border-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            </div>

            {/* Product Table Header */}
            <div className="grid grid-cols-12 gap-1 p-2 text-[10px] font-bold text-slate-500 uppercase">
                <div className="col-span-1 text-center">STT</div>
                <div className="col-span-6">Tên món</div>
                <div className="col-span-3 text-right">Đơn giá</div>
                <div className="col-span-2"></div>
            </div>

            {/* Product List */}
            <ScrollArea className="flex-1">
                <div className="divide-y text-slate-700">
                    {filteredProducts.map((product, index) => (
                        <div key={product.id} className="grid grid-cols-12 gap-1 p-2 items-center hover:bg-slate-100 bg-white">
                            <div className="col-span-1 text-center text-xs text-slate-400">{index + 1}</div>
                            <div className="col-span-6 text-xs font-medium">{product.name}</div>
                            <div className="col-span-3 text-right text-xs font-bold text-[#004d40]">
                                {product.price.toLocaleString()}
                            </div>
                            <div className="col-span-2 flex justify-center">
                                <button 
                                    onClick={() => addToCart(product)}
                                    className="bg-[#004d40] text-white rounded p-1 hover:bg-teal-700 transition-colors"
                                >
                                    <Plus size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                    {filteredProducts.length === 0 && (
                        <div className="p-10 text-center text-slate-400 text-xs italic">
                            Không tìm thấy món phù hợp...
                        </div>
                    )}
                </div>
            </ScrollArea>
        </div>
    );
});

ProductCatalog.displayName = 'ProductCatalog';

export default ProductCatalog;
