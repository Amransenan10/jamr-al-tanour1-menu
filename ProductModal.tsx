
import React, { useState } from 'react';
import { MenuItem, Size, Extra, Review } from './types';
import { CloseIcon, PlusIcon, MinusIcon, ChevronDownIcon } from './Icons';
import ImageWithFallback from './ImageWithFallback';

const CollapsibleSection: React.FC<{
  title: string;
  badge?: string;
  badgeColor?: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}> = ({ title, badge, badgeColor = "bg-orange-100 text-orange-600", isOpen, onToggle, children, disabled }) => (
  <div className={`border-b border-gray-100 last:border-0 ${disabled ? 'opacity-40 pointer-events-none' : ''}`}>
    <button onClick={onToggle} disabled={disabled} className="w-full py-5 flex items-center justify-between group focus:outline-none">
      <div className="flex items-center gap-4">
        <div className={`w-1.5 h-6 rounded-full transition-colors ${isOpen ? 'bg-orange-600' : 'bg-gray-200'}`}></div>
        <div className="text-right">
          <h3 className={`font-bold text-lg transition-colors ${isOpen ? 'text-gray-900' : 'text-gray-500'}`}>{title}</h3>
          {badge && <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold mt-1 inline-block ${badgeColor}`}>{badge}</span>}
        </div>
      </div>
      <div className={`p-2 rounded-xl transition-all ${isOpen ? 'bg-orange-50 text-orange-600 rotate-180' : 'bg-gray-50 text-gray-400'}`}>
        <ChevronDownIcon className="w-5 h-5" />
      </div>
    </button>
    <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[800px] opacity-100 pb-6' : 'max-h-0 opacity-0'}`}>
      <div className="px-1">{children}</div>
    </div>
  </div>
);

const ProductModal: React.FC<{ item: MenuItem; reviews: Review[]; onClose: () => void; onAdd: (s: Size[], e: Extra[], q: number, n: string, p?: string) => void; onAddReview: (r: any) => void; }> = ({ item, reviews, onClose, onAdd }) => {
  const [selectedProtein, setSelectedProtein] = useState<string | undefined>(undefined);
  const [selectedSizes, setSelectedSizes] = useState<Size[]>([]);
  const [selectedExtras, setSelectedExtras] = useState<Extra[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [itemNotes, setItemNotes] = useState('');
  const [isAdded, setIsAdded] = useState(false);
  const [tab, setTab] = useState<'options' | 'reviews'>('options');
  const [sections, setSections] = useState({ protein: true, size: true, extras: false, notes: false });

  const toggleSection = (s: keyof typeof sections) => setSections(p => ({ ...p, [s]: !p[s] }));
  const hasProteinTypes = item.proteinTypes && item.proteinTypes.length > 0;
  const hasSizes = item.sizes && item.sizes.length > 0;

  const handleAddClick = () => {
    if ((hasProteinTypes && !selectedProtein) || (hasSizes && selectedSizes.length === 0)) return;
    setIsAdded(true);
    onAdd(selectedSizes, selectedExtras, quantity, itemNotes, selectedProtein);
    setTimeout(() => { setIsAdded(false); onClose(); }, 800);
  };

  const totalPrice = (item.price + (selectedSizes[0]?.price || 0) + selectedExtras.reduce((s, e) => s + e.price, 0)) * quantity;
  const itemReviews = reviews.filter(r => r.itemId === item.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <div className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        <div className="relative h-56 sm:h-72 shrink-0">
          <ImageWithFallback src={item.image} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <button onClick={onClose} className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-2xl text-white hover:bg-white hover:text-gray-900 border border-white/20"><CloseIcon className="w-6 h-6" /></button>
          <div className="absolute bottom-6 right-6 left-6 text-white text-right">
            <h2 className="text-3xl font-black mb-1">{item.name}</h2>
            <p className="text-sm opacity-80 line-clamp-1">{item.description}</p>
          </div>
        </div>
        <div className="flex bg-gray-50 p-2 m-4 rounded-2xl border border-gray-100 shrink-0">
          {['options', 'reviews'].map(t => (
            <button key={t} onClick={() => setTab(t as any)} className={`flex-1 py-3 rounded-xl font-bold transition-all text-sm ${tab === t ? 'bg-white text-orange-600 shadow-md' : 'text-gray-400'}`}>
              {t === 'options' ? 'تخصيص الوجبة' : `آراء العملاء (${itemReviews.length})`}
            </button>
          ))}
        </div>
        <div className="flex-grow overflow-y-auto px-6 pb-6 space-y-2 no-scrollbar">
          {tab === 'options' ? (
            <div className="space-y-1">
              {hasProteinTypes && (
                <CollapsibleSection title="النوع المفضل" badge="إلزامي" badgeColor="bg-red-50 text-red-600" isOpen={sections.protein} onToggle={() => toggleSection('protein')}>
                  <div className="grid grid-cols-2 gap-3">
                    {item.proteinTypes!.map(type => (
                      <label key={type} className={`flex items-center justify-center p-4 rounded-2xl border-2 cursor-pointer transition-all ${selectedProtein === type ? 'border-orange-500 bg-orange-50 ring-2 ring-orange-100' : 'border-gray-100 bg-gray-50'}`}>
                        <input type="radio" className="hidden" checked={selectedProtein === type} onChange={() => setSelectedProtein(type)} />
                        <span className={`font-black ${selectedProtein === type ? 'text-orange-900' : 'text-gray-700'}`}>{type}</span>
                      </label>
                    ))}
                  </div>
                </CollapsibleSection>
              )}
              {hasSizes && (
                <CollapsibleSection title="اختر الحجم" badge="إلزامي" isOpen={sections.size} onToggle={() => toggleSection('size')} disabled={hasProteinTypes && !selectedProtein}>
                  <div className="space-y-3">
                    {item.sizes!.map(size => (
                      <label key={size.id} className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${selectedSizes[0]?.id === size.id ? 'border-orange-500 bg-orange-50' : 'border-gray-50'}`}>
                        <input type="radio" className="hidden" checked={selectedSizes[0]?.id === size.id} onChange={() => setSelectedSizes([size])} />
                        <span className="font-bold text-gray-700">{size.name}</span>
                        <span className="font-black text-gray-900">{item.price + size.price} ر.س</span>
                      </label>
                    ))}
                  </div>
                </CollapsibleSection>
              )}
              <div className="mt-4"><h4 className="text-sm font-bold mb-2">ملاحظات:</h4><textarea value={itemNotes} onChange={e => setItemNotes(e.target.value)} className="w-full p-4 rounded-2xl bg-gray-50 border border-gray-100 outline-none focus:bg-white text-sm resize-none font-bold text-black" rows={2}></textarea></div>
              <div className="flex items-center justify-between p-4 bg-orange-50 rounded-2xl mt-6 border border-orange-100">
                <span className="font-bold">الكمية</span>
                <div className="flex items-center gap-6">
                  <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-10 h-10 bg-white rounded-xl shadow-sm">-</button>
                  <span className="text-xl font-black">{quantity}</span>
                  <button onClick={() => setQuantity(q => q + 1)} className="w-10 h-10 bg-orange-600 rounded-xl text-white shadow-md">+</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-4 text-center text-gray-400">لا توجد تقييمات حالياً</div>
          )}
        </div>
        {tab === 'options' && (
          <div className="p-6 bg-white border-t shrink-0">
            <button disabled={isAdded} onClick={handleAddClick} className={`w-full py-5 rounded-3xl font-black text-xl flex items-center justify-between px-8 shadow-2xl transition-all ${isAdded ? 'bg-green-600 text-white' : 'bg-orange-600 text-white active:scale-95'}`}>
              <span>{isAdded ? '✅ تم الإضافة' : 'تأكيد الطلب'}</span>
              <span>{totalPrice} ر.س</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductModal;
