import { usePos } from '../../_hooks/usePos';
import { MOCK_AREAS, MOCK_TABLES } from '../../mockData';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';


const AreaTableBoard: React.FC = () => {
    const { selectedTable, setSelectedTableId } = usePos();
    return (
        <div className="flex flex-col h-full">
            {/* Area Filter Tabs */}
            <div className="flex bg-slate-200 p-1 gap-1">
                {MOCK_AREAS.map((area) => (
                    <button
                        key={area.id}
                        className={`flex-1 py-2 px-1 text-xs font-bold rounded ${
                            area.id === 'all' ? 'bg-[#004d40] text-white' : 'hover:bg-slate-300'
                        }`}
                    >
                        {area.name} ({area.tableCount})
                    </button>
                ))}
            </div>

            {/* Tables Grid */}
            <ScrollArea className="flex-1 p-2">
                <div className="space-y-4">
                    {MOCK_AREAS.filter(a => a.id !== 'all').map(area => (
                        <div key={area.id} className="space-y-2">
                            <div className="bg-[#004d40] text-white px-3 py-1 text-sm font-bold flex justify-between rounded">
                                <span>{area.name}</span>
                                <span>{area.tableCount} bàn</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                {MOCK_TABLES.filter(t => t.areaId === area.id).map(table => (
                                    <Card 
                                        key={table.id}
                                        onClick={() => setSelectedTableId(table.id)}
                                        className={`p-2 flex flex-col items-center justify-center cursor-pointer hover:shadow-md transition-shadow aspect-square ${
                                            selectedTable?.id === table.id ? 'ring-2 ring-teal-500 shadow-lg scale-105' : ''
                                        } ${
                                            table.status === 'occupied' ? 'bg-orange-500 text-white border-none' : 'bg-white'
                                        }`}
                                    >
                                        <div className="text-[10px] font-bold text-center uppercase mb-2 leading-tight">
                                            {table.name}
                                        </div>
                                        <div className="text-[10px] opacity-80">
                                            {table.status === 'occupied' ? 'Có khách' : 'Trống'}
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
};

export default AreaTableBoard;
