
import React, { useState, useMemo } from 'react';
import { MenuItem, Review, OrderPayload, RestaurantConfig } from './types';
import { CATEGORIES } from './data';
import { CloseIcon } from './Icons';

interface DashboardProps {
  menuItems: MenuItem[];
  deleteMenuItem: (id: string) => void;
  addMenuItem: (item: MenuItem) => void;
  updateMenuItemPrice: (id: string, newPrice: number) => void;
  toggleItemVisibility: (id: string) => void;
  restaurantConfig: RestaurantConfig;
  updateRestaurantConfig: (config: RestaurantConfig) => void;
  reviews: Review[];
  orders: OrderPayload[];
  onClose: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  menuItems, updateMenuItemPrice, toggleItemVisibility,
  restaurantConfig, updateRestaurantConfig,
  reviews, orders, onClose
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');

  if (!isAdminAuthenticated) {
    return (
      <div className="fixed inset-0 z-[100] bg-orange-600 flex items-center justify-center p-6">
        <div className="bg-white w-full max-w-sm rounded-[2.5rem] p-10 shadow-2xl text-center space-y-8">
          <h2 className="text-2xl font-black">قفل الإدارة</h2>
          <input
            type="password" placeholder="****"
            className="w-full p-5 rounded-2xl border-2 text-center text-2xl font-black outline-none focus:border-orange-500 bg-gray-50"
            value={adminPassword} onChange={e => setAdminPassword(e.target.value)}
          />
          <button onClick={() => adminPassword === '152016' ? setIsAdminAuthenticated(true) : alert('خطأ!')} className="w-full bg-gray-900 text-white py-5 rounded-2xl font-black">دخول</button>
          <button onClick={onClose} className="text-gray-400">إلغاء</button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col overflow-hidden">
      <header className="p-6 border-b flex justify-between items-center">
        <h1 className="text-xl font-black">لوحة التحكم</h1>
        <button onClick={onClose}><CloseIcon className="w-6 h-6 text-gray-400" /></button>
      </header>
      <nav className="flex p-2 bg-gray-50 border-b overflow-x-auto no-scrollbar">
        {['overview', 'orders', 'menu', 'settings'].map(t => (
          <button key={t} onClick={() => setActiveTab(t)} className={`flex-1 min-w-[100px] py-3 rounded-xl font-black text-sm ${activeTab === t ? 'bg-orange-50 text-orange-600' : 'text-gray-400'}`}>
            {t === 'overview' ? 'الإحصائيات' : t === 'orders' ? 'الطلبات' : t === 'menu' ? 'المنيو' : 'الإعدادات'}
          </button>
        ))}
      </nav>
      <div className="flex-grow overflow-y-auto p-6">
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {orders.length === 0 ? <p className="text-center py-20 text-gray-300">لا يوجد طلبات</p> : orders.map((o, i) => (
              <div key={i} className="p-6 bg-gray-50 rounded-3xl border border-gray-100 space-y-3">
                <div className="flex justify-between font-black"><span>{o.customer.name}</span><span className="text-orange-600">{o.total} ر.س</span></div>
                <div className="text-xs text-gray-400">{o.customer.phone} | {o.orderType === 'delivery' ? '🛵 توصيل' : '🏠 استلام'}</div>
                <div className="border-t pt-2 space-y-1">
                  {o.items.map((item, j) => <div key={j} className="text-sm font-bold flex justify-between"><span>{item.quantity}x {item.name}</span></div>)}
                </div>
              </div>
            ))}
          </div>
        )}
        {activeTab === 'menu' && (
          <div className="grid gap-3">
            {menuItems.map(item => (
              <div key={item.id} className="p-4 bg-white border rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={item.image} className="w-12 h-12 rounded-xl object-cover" />
                  <span className="font-bold text-sm">{item.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <input type="number" value={item.price} onChange={e => updateMenuItemPrice(item.id, Number(e.target.value))} className="w-16 p-2 border rounded-lg text-center font-black" />
                  <button onClick={() => toggleItemVisibility(item.id)} className={`p-2 rounded-lg ${item.isVisible !== false ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>{item.isVisible !== false ? '👁️' : '🚫'}</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
