
import React, { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { useCart } from './store';
import { CartIcon, TrashIcon, PlusIcon, MinusIcon, CloseIcon, SunIcon, MoonIcon } from './Icons';
import ProductModal from './ProductModal';
import Dashboard from './Dashboard';
import ImageWithFallback from './ImageWithFallback';
import { MenuItem, OrderPayload } from './types';

const App: React.FC = () => {
  const {
    menuItems, categories, isLoading, restaurantConfig, cart, orders, addOrder, addToCart, removeFromCart, updateQuantity,
    totalAmount, isCartOpen, setIsCartOpen, orderType, setOrderType, customer, setCustomer, clearCart,
    reviews, selectedBranch, updateBranch, deliveryFee, setDeliveryFee,
    updateMenuItemPrice, toggleItemVisibility, deleteMenuItem, addMenuItem, updateRestaurantConfig, addReview
  } = useCart();

  const [activeCategory, setActiveCategory] = useState<string>('');

  useEffect(() => {
    if (categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0].id);
    }
  }, [categories, activeCategory]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<MenuItem | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const [distanceSelected, setDistanceSelected] = useState<number | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const filteredItems = menuItems.filter(item =>
    item.categoryId === activeCategory &&
    item.is_available !== false &&
    (item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const getMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const url = `https://www.google.com/maps?q=${position.coords.latitude},${position.coords.longitude}`;
        setCustomer({ ...customer, locationUrl: url });
        showToast('📍 تم تحديد موقعك بنجاح');
      }, () => alert('يرجى تفعيل الـ GPS لتحديد الموقع'));
    }
  };

  const constructWhatsAppMessage = () => {
    const itemsText = cart.map(item => {
      let details = `*${item.quantity}x ${item.name}*`;
      const choices = [];
      if (item.selectedProtein) choices.push(item.selectedProtein);
      if (item.selectedSize) choices.push(item.selectedSize.name);
      if (item.selectedExtras.length > 0) choices.push(...item.selectedExtras.map(e => e.name));

      if (choices.length > 0) details += ` (${choices.join(' - ')})`;
      if (item.notes) details += `\n   📝 ملاحظة: ${item.notes}`;

      return `- ${details} = ${item.totalPrice} ر.س`;
    }).join('\n');

    let template = restaurantConfig.whatsappTemplate;

    // Better template formatting if needed
    if (!template.includes('---')) {
      template = `مرحباً جمر التنور 👋\n\nأود طلب الآتي:\n{items}\n\n------------------\n*المجموع: {subtotal} ر.س*\n*التوصيل: {deliveryFee} ر.س*\n*الإجمالي: {total} ر.س*\n------------------\n\nنوع الطلب: {orderType}\nالفرع: {branch}\n\nمعلومات العميل:\nالاسم: {customerName}\nالجوال: {customerPhone}\nالموقع: {customerLocation}\nملاحظات: {customerNotes}`;
    }

    const replacements: Record<string, string> = {
      '{branch}': selectedBranch,
      '{orderType}': orderType === 'delivery' ? 'توصيل للمنزل 🛵' : 'استلام من الفرع 🏠',
      '{items}': itemsText,
      '{subtotal}': totalAmount.toString(),
      '{deliveryFee}': orderType === 'delivery' ? (distanceSelected || 0).toString() : '0',
      '{total}': (totalAmount + (orderType === 'delivery' ? (distanceSelected || 0) : 0)).toString(),
      '{customerName}': customer.name || 'عميل جمر التنور',
      '{customerPhone}': customer.phone,
      '{customerLocation}': orderType === 'delivery' ? (customer.locationUrl || 'لم يحدد') : 'العميل سيحضر للاستلام من الفرع 🏠',
      '{customerNotes}': customer.notes || 'لا يوجد'
    };

    Object.keys(replacements).forEach(key => {
      template = template.split(key).join(replacements[key]);
    });
    return encodeURIComponent(template);
  };

  const handleConfirmOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer.name.trim()) return alert('يرجى إدخال الاسم');
    if (!customer.phone.trim()) return alert('يرجى إدخال رقم الجوال');
    if (orderType === 'delivery') {
      if (distanceSelected === null) return alert('يرجى اختيار مسافة التوصيل لتحديد السعر');
      if (!customer.locationUrl || !customer.locationUrl.trim()) {
        return alert('يجب كتابة العنوان أو تحديد الموقع لإتمام طلب التوصيل');
      }
    }

    setIsSubmitting(true);
    const finalFee = orderType === 'delivery' ? (distanceSelected || 0) : 0;
    const payload: OrderPayload = {
      orderType,
      customer,
      items: [...cart],
      total: totalAmount + finalFee,
      deliveryFee: finalFee,
      timestamp: new Date().toISOString()
    };

    try {
      addOrder(payload);
      const branch = restaurantConfig.branches.find(b => b.name === selectedBranch);
      const waNumber = branch?.whatsapp || '966504322357';
      const waUrl = `https://wa.me/${waNumber}?text=${constructWhatsAppMessage()}`;
      window.open(waUrl, '_blank');
      setOrderSuccess(true);
      clearCart();
      setDistanceSelected(null);
      setTimeout(() => {
        setOrderSuccess(false);
        setShowCheckout(false);
        setIsCartOpen(false);
      }, 3000);
    } catch (err) { alert('حدث خطأ أثناء إرسال الطلب'); } finally { setIsSubmitting(false); }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 transition-colors duration-300 dark:bg-charcoal" dir="rtl">
      <Analytics />

      {notification && (
        <div className="fixed top-20 inset-x-4 z-[100] animate-in slide-in-from-top duration-300">
          <div className="bg-gray-900 dark:bg-orange-600 text-white px-6 py-3 rounded-2xl shadow-2xl mx-auto max-w-xs text-center font-bold text-sm border border-white/20">
            {notification}
          </div>
        </div>
      )}

      <header className="sticky top-0 z-40 bg-white/90 dark:bg-charcoal-light/90 backdrop-blur-md border-b dark:border-gray-700 px-4 py-4 flex items-center justify-between shadow-sm transition-colors duration-300">
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg cursor-pointer transition-transform active:scale-95 overflow-hidden border border-gray-100 dark:border-gray-600" onClick={() => setShowDashboard(true)}>
            <img src="/logo.png" alt="جمر التنور" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white leading-none">جمر التنور</h1>
            <p className="text-[10px] text-orange-600 font-bold mt-1 flex items-center gap-1">
              <span className={`w-2 h-2 rounded-full ${restaurantConfig.isOpen ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
              {restaurantConfig.isOpen ? 'يستقبل الطلبات' : 'مغلق حالياً'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2.5 bg-gray-100 dark:bg-gray-700 rounded-2xl text-gray-700 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            {isDarkMode ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
          </button>
          <button onClick={() => setIsCartOpen(true)} className="relative p-2.5 bg-gray-100 dark:bg-gray-700 rounded-2xl text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            <CartIcon className="w-6 h-6" />
            {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-[10px] font-bold w-5 h-5 rounded-full border-2 border-white dark:border-charcoal flex items-center justify-center">{cart.reduce((s, i) => s + i.quantity, 0)}</span>}
          </button>
        </div>
      </header>

      <main className="max-w-screen-md mx-auto p-4 space-y-6">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {restaurantConfig.branches.map(b => (
            <button key={b.name} onClick={() => updateBranch(b.name)} className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap border transition-all ${selectedBranch === b.name ? 'bg-orange-600 border-orange-600 text-white shadow-md' : 'bg-white dark:bg-charcoal-light border-gray-200 dark:border-gray-600 text-gray-400 dark:text-gray-300'}`}>{b.name}</button>
          ))}
        </div>

        <div className="relative">
          <input type="text" placeholder="ابحث عن وجبتك المفضلة..." className="w-full p-4 pr-12 rounded-2xl bg-white dark:bg-charcoal-light shadow-sm border-none text-right outline-none focus:ring-2 focus:ring-orange-500 transition-all text-black dark:text-white font-bold placeholder-gray-400" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
        </div>

        <div className="flex overflow-x-auto gap-3 no-scrollbar py-2">
          {categories.map(c => (
            <button key={c.id} onClick={() => setActiveCategory(c.id)} className={`px-5 py-3 rounded-2xl whitespace-nowrap font-bold text-sm transition-all border-2 ${activeCategory === c.id ? 'bg-orange-600 border-orange-600 text-white shadow-lg scale-105' : 'bg-white dark:bg-charcoal-light border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-100 dark:hover:border-gray-600'}`}>{c.icon} {c.name}</button>
          ))}
        </div>

        <div className="grid gap-3 grid-cols-2 sm:grid-cols-2">
          {isLoading ? (
            <div className="col-span-2 py-20 flex flex-col items-center justify-center space-y-4">
              <div className="w-10 h-10 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-400 font-bold">جاري تحميل المنيو...</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="col-span-2 py-20 text-center text-gray-400">لا يوجد أصناف متوفرة في هذا القسم حالياً</div>
          ) : filteredItems.map(item => (
            <div key={item.id} className="bg-white dark:bg-charcoal-light p-3 rounded-3xl flex flex-col shadow-md hover:shadow-xl border border-transparent hover:border-orange-100 dark:hover:border-orange-900 transition-all duration-300 cursor-pointer group active:scale-[0.98]" onClick={() => setSelectedProduct(item)}>
              <div className="relative w-full aspect-square mb-3">
                <ImageWithFallback src={item.image} className="w-full h-full rounded-2xl group-hover:scale-105 transition-transform shadow-sm object-cover" />
                <div className="absolute top-2 left-2 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-2 py-0.5 rounded-lg font-black text-orange-600 text-[10px] shadow-sm">
                  {item.price} ر.س
                </div>
              </div>
              <div className="flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white leading-tight text-xs sm:text-sm line-clamp-1">{item.name}</h3>
                  {item.ingredients && <p className="text-[9px] text-gray-400 mt-1 line-clamp-1 italic font-medium">({item.ingredients})</p>}
                  <p className="text-[9px] text-gray-400 line-clamp-1 mt-1 leading-tight">{item.description}</p>
                </div>
                <div className="flex justify-center mt-3">
                  <div className="w-full bg-orange-600 text-white py-2 rounded-xl shadow-md flex items-center justify-center gap-1 group-hover:bg-orange-700 transition-colors">
                    <PlusIcon className="w-3 h-3" />
                    <span className="text-[10px] font-bold">أضف للسلة</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {selectedProduct && (
        <ProductModal
          item={selectedProduct}
          reviews={reviews}
          onClose={() => setSelectedProduct(null)}
          onAdd={(sizes, extras, qty, notes, protein) => {
            addToCart(selectedProduct, sizes, extras, qty, notes, protein);
            showToast(`✅ تم إضافة ${selectedProduct.name} للسلة`);
          }}
          onAddReview={addReview}
        />
      )}

      {cart.length > 0 && !isCartOpen && (
        <div className="fixed bottom-6 inset-x-6 z-40">
          <button onClick={() => setIsCartOpen(true)} className="w-full bg-orange-600 text-white p-5 rounded-3xl font-black flex justify-between items-center shadow-2xl border border-white/20 animate-in slide-in-from-bottom duration-500">
            <div className="flex items-center gap-3"><CartIcon className="w-6 h-6" /><span>عرض سلة الطلبات</span></div>
            <div className="bg-white/20 px-4 py-1.5 rounded-xl border border-white/10">{totalAmount} ر.س</div>
          </button>
        </div>
      )}

      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setIsCartOpen(false)}></div>
          <div className="absolute inset-y-0 left-0 max-w-full flex">
            <div className="w-screen max-w-md bg-white dark:bg-charcoal shadow-2xl flex flex-col animate-in slide-in-from-left duration-300">
              <div className="p-6 border-b dark:border-gray-700 flex items-center justify-between">
                <h2 className="text-2xl font-bold dark:text-white">سلة الطلبات</h2>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"><CloseIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" /></button>
              </div>

              <div className="flex-grow overflow-y-auto p-6 space-y-4 no-scrollbar">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-4 text-center">
                    <div className="w-20 h-20 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center"><CartIcon className="w-10 h-10 opacity-30" /></div>
                    <p className="font-bold">السلة فارغة حالياً</p>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.cartId} className="bg-gray-50 dark:bg-charcoal-light p-4 rounded-3xl flex gap-4 items-center border border-gray-100 dark:border-gray-700">
                      <ImageWithFallback src={item.image} className="w-16 h-16 rounded-xl shrink-0 shadow-sm" />
                      <div className="flex-grow">
                        <h4 className="font-bold text-sm dark:text-white">{item.name}</h4>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {item.selectedProtein && <span className="text-[10px] bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-200 px-1.5 py-0.5 rounded-md font-bold">{item.selectedProtein}</span>}
                          {item.selectedSize && <span className="text-[10px] bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-1.5 py-0.5 rounded-md font-bold">{item.selectedSize.name}</span>}
                          {item.selectedExtras.map(e => <span key={e.id} className="text-[10px] bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-200 px-1.5 py-0.5 rounded-md font-bold">{e.name}</span>)}
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-3 bg-white dark:bg-gray-800 px-2 py-1 rounded-lg border dark:border-gray-600">
                            <button onClick={() => updateQuantity(item.cartId, -1)} className="text-gray-400 p-1"><MinusIcon className="w-4 h-4" /></button>
                            <span className="text-sm font-bold dark:text-white">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.cartId, 1)} className="text-orange-600 p-1"><PlusIcon className="w-4 h-4" /></button>
                          </div>
                          <span className="font-bold text-orange-600">{item.totalPrice} ر.س</span>
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(item.cartId)} className="text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-lg transition-colors"><TrashIcon className="w-5 h-5" /></button>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t dark:border-gray-700 bg-gray-50 dark:bg-charcoal-light space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-gray-500 dark:text-gray-400 text-sm"><span>المجموع الفرعي</span><span>{totalAmount} ر.س</span></div>
                    {orderType === 'delivery' && <div className="flex justify-between text-gray-500 dark:text-gray-400 text-sm"><span>رسوم التوصيل</span><span>{distanceSelected || 0} ر.س</span></div>}
                    <div className="flex justify-between text-2xl font-black text-gray-900 dark:text-white border-t dark:border-gray-600 pt-2"><span>الإجمالي</span><span>{totalAmount + (orderType === 'delivery' ? (distanceSelected || 0) : 0)} ر.س</span></div>
                  </div>
                  <button onClick={() => setShowCheckout(true)} className="w-full bg-orange-600 text-white py-4 rounded-3xl font-black text-lg shadow-xl shadow-orange-100 dark:shadow-none">استمرار للطلب</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {showCheckout && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <div className="bg-white dark:bg-charcoal w-full max-md rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] animate-in zoom-in duration-200">
            <div className="p-6 border-b dark:border-gray-700 flex items-center justify-between">
              <h2 className="text-2xl font-bold dark:text-white">إتمام الطلب</h2>
              <button onClick={() => setShowCheckout(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"><CloseIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" /></button>
            </div>
            <form onSubmit={handleConfirmOrder} className="flex-grow overflow-y-auto p-6 space-y-6 no-scrollbar">
              <div className="space-y-4">
                <h3 className="font-bold text-xs text-gray-400 uppercase tracking-widest">طريقة الاستلام</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button type="button" onClick={() => setOrderType('delivery')} className={`py-4 rounded-2xl font-bold border-2 transition-all ${orderType === 'delivery' ? 'bg-orange-50 dark:bg-orange-900/20 border-orange-600 text-orange-700 dark:text-orange-400 shadow-md' : 'bg-white dark:bg-charcoal-light border-gray-100 dark:border-gray-700 text-gray-400'}`}>🛵 توصيل</button>
                  <button type="button" onClick={() => { setOrderType('pickup'); setDistanceSelected(0); }} className={`py-4 rounded-2xl font-bold border-2 transition-all ${orderType === 'pickup' ? 'bg-orange-50 dark:bg-orange-900/20 border-orange-600 text-orange-700 dark:text-orange-400 shadow-md' : 'bg-white dark:bg-charcoal-light border-gray-100 dark:border-gray-700 text-gray-400'}`}>🏠 استلام</button>
                </div>

                {orderType === 'delivery' && (
                  <div className="space-y-3 p-4 bg-gray-50 dark:bg-charcoal-light rounded-2xl border border-orange-100 dark:border-gray-700">
                    <h4 className="text-xs font-bold text-red-600">* حدد مسافة التوصيل (إلزامي)</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {[
                        { d: 5, label: 'مسافة قريبة (1-3 كم)' },
                        { d: 7, label: 'مسافة متوسطة (3-6 كم)' },
                        { d: 10, label: 'مسافة بعيدة (7-10 كم)' }
                      ].map(opt => (
                        <button key={opt.d} type="button" onClick={() => setDistanceSelected(opt.d)} className={`py-3 px-4 rounded-xl text-sm font-bold border-2 text-right flex justify-between items-center transition-all ${distanceSelected === opt.d ? 'bg-white dark:bg-charcoal border-orange-600 text-orange-600 shadow-sm' : 'bg-white dark:bg-charcoal border-gray-100 dark:border-gray-600 text-gray-400'}`}>
                          <span>{opt.label}</span>
                          <span>{opt.d} ر.س</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-900 dark:text-gray-300 mr-2">الاسم بالكامل</label>
                  <input required type="text" placeholder="أدخل اسمك هنا" className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-charcoal-light border-none outline-none focus:ring-2 focus:ring-orange-500 transition-all text-right text-black dark:text-white font-bold placeholder-gray-400" value={customer.name} onChange={e => setCustomer({ ...customer, name: e.target.value })} />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-900 dark:text-gray-300 mr-2">رقم الجوال</label>
                  <input required type="tel" placeholder="05xxxxxxxx" className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-charcoal-light border-none outline-none focus:ring-2 focus:ring-orange-500 transition-all text-right text-black dark:text-white font-bold ltr placeholder-gray-400" value={customer.phone} onChange={e => setCustomer({ ...customer, phone: e.target.value })} />
                </div>

                {orderType === 'delivery' && (
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-red-600 mr-2">* عنوان التوصيل (إلزامي)</label>
                    <div className="space-y-2">
                      <button type="button" onClick={getMyLocation} className="w-full py-4 rounded-2xl border-2 border-dashed border-orange-200 dark:border-orange-900 text-orange-600 font-black flex items-center justify-center gap-2 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors">
                        📍 {customer.locationUrl && customer.locationUrl.includes('google.com') ? 'تم تحديد موقعك بدقة ✅' : 'تحديد موقعي الحالي (GPS)'}
                      </button>
                      <input required type="text" placeholder="الحي، الشارع، المعالم..." className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-charcoal-light border-none outline-none focus:ring-2 focus:ring-orange-500 transition-all text-right text-black dark:text-white font-bold placeholder-gray-400" value={customer.locationUrl} onChange={e => setCustomer({ ...customer, locationUrl: e.target.value })} />
                    </div>
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-900 dark:text-gray-300 mr-2">ملاحظات إضافية</label>
                  <textarea placeholder="مثال: الباب الجانبي..." className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-charcoal-light border-none outline-none focus:ring-2 focus:ring-orange-500 resize-none transition-all text-right text-black dark:text-white font-bold placeholder-gray-400" rows={2} value={customer.notes} onChange={e => setCustomer({ ...customer, notes: e.target.value })} />
                </div>
              </div>
            </form>
            <div className="p-6 bg-white dark:bg-charcoal border-t dark:border-gray-700">
              <button disabled={isSubmitting || orderSuccess} type="submit" onClick={handleConfirmOrder} className="w-full bg-green-600 hover:bg-green-700 text-white py-5 rounded-3xl font-black text-lg shadow-xl transition-all active:scale-95 disabled:opacity-50">
                {isSubmitting ? 'جاري الإرسال...' : (orderSuccess ? '✅ تم بنجاح' : 'تأكيد وإرسال عبر واتساب 🚀')}
              </button>
            </div>
          </div>
        </div>
      )}

      {showDashboard && (
        <Dashboard
          menuItems={menuItems}
          restaurantConfig={restaurantConfig}
          orders={orders}
          reviews={reviews}
          onClose={() => setShowDashboard(false)}
          deleteMenuItem={deleteMenuItem}
          addMenuItem={addMenuItem}
          updateMenuItemPrice={updateMenuItemPrice}
          toggleItemVisibility={toggleItemVisibility}
          updateRestaurantConfig={updateRestaurantConfig}
        />
      )}
    </div>
  );
};

export default App;
