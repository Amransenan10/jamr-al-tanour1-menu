
import { useState, useCallback, useMemo } from 'react';
import { CartItem, MenuItem, Size, Extra, CustomerDetails, OrderType, Review, OrderPayload, RestaurantConfig } from './types';
import { INITIAL_REVIEWS, MENU_DATA } from './data';

export const DEFAULT_WHATSAPP_TEMPLATE = `*طلب جديد: {customerName} | {branch}* 📍

*نوع الاستلام:* {orderType}
----------------------------------
{items}
----------------------------------
*رسوم التوصيل: {deliveryFee} ر.س*
*الإجمالي النهائي: {total} ر.س* 💰

*موقع التوصيل:* {customerLocation}
*ملاحظات:* {customerNotes}`;

export const useCart = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(MENU_DATA.map(item => ({ ...item, isVisible: true })));
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<OrderPayload[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderType, setOrderType] = useState<OrderType>('delivery');
  const [deliveryFee, setDeliveryFee] = useState<number>(10); // الافتراضي 10 ريال
  const [selectedBranch, setSelectedBranch] = useState<string>('فرع السويدي الغربي');
  const [customer, setCustomer] = useState<CustomerDetails>({
    name: '', phone: '', notes: '', locationUrl: '', branch: 'فرع السويدي الغربي'
  });
  
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [restaurantConfig, setRestaurantConfig] = useState<RestaurantConfig>({
    isOpen: true,
    branches: [
      { name: 'فرع السويدي الغربي', whatsapp: '966504322357' },
      { name: 'فرع حي طويق', whatsapp: '966504322357' }
    ],
    orderAlertSound: 'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3',
    whatsappTemplate: DEFAULT_WHATSAPP_TEMPLATE
  });

  // وظائف الإدارة
  const updateMenuItemPrice = (id: string, newPrice: number) => {
    setMenuItems(prev => prev.map(item => item.id === id ? { ...item, price: newPrice } : item));
  };

  const toggleItemVisibility = (id: string) => {
    setMenuItems(prev => prev.map(item => item.id === id ? { ...item, isVisible: !item.isVisible } : item));
  };

  const deleteMenuItem = (id: string) => {
    setMenuItems(prev => prev.filter(item => item.id !== id));
  };

  const addMenuItem = (item: MenuItem) => {
    setMenuItems(prev => [...prev, { ...item, isVisible: true }]);
  };

  const updateRestaurantConfig = (config: RestaurantConfig) => {
    setRestaurantConfig(config);
  };

  const actualDeliveryFee = orderType === 'delivery' ? deliveryFee : 0;

  const addToCart = useCallback((item: MenuItem, selectedSizes: Size[] = [], selectedExtras: Extra[] = [], quantity: number = 1, notes: string = '', proteinType?: string) => {
    const extrasPrice = selectedExtras.reduce((sum, e) => sum + e.price, 0);
    const sizesToProcess = selectedSizes.length > 0 ? selectedSizes : [undefined];

    setCart(prev => {
      let nextCart = [...prev];
      
      sizesToProcess.forEach(size => {
        const sizePrice = size?.price || 0;
        const unitPrice = item.price + sizePrice + extrasPrice;
        const cartId = `${item.id}-${size?.id || 'default'}-${proteinType || 'none'}-${selectedExtras.map(e => e.id).sort().join(',')}-${notes}`;
        
        const existingIndex = nextCart.findIndex(i => i.cartId === cartId);
        
        if (existingIndex > -1) {
          const existing = nextCart[existingIndex];
          const newQty = existing.quantity + quantity;
          nextCart[existingIndex] = { 
            ...existing, 
            quantity: newQty, 
            totalPrice: newQty * unitPrice 
          };
        } else {
          nextCart.push({
            cartId, 
            id: item.id, 
            name: item.name, 
            ingredients: item.ingredients, 
            notes,
            basePrice: unitPrice, 
            totalPrice: unitPrice * quantity, 
            quantity,
            selectedSize: size, 
            selectedProtein: proteinType, 
            selectedExtras: [...selectedExtras], 
            image: item.image
          });
        }
      });
      return nextCart;
    });
  }, []);

  const removeFromCart = (cartId: string) => setCart(p => p.filter(i => i.cartId !== cartId));
  
  const updateQuantity = (cartId: string, delta: number) => setCart(p => p.map(i => 
    i.cartId === cartId ? {
      ...i, 
      quantity: Math.max(1, i.quantity + delta), 
      totalPrice: Math.max(1, i.quantity + delta) * i.basePrice
    } : i
  ));

  const clearCart = () => setCart([]);
  
  const totalAmount = useMemo(() => cart.reduce((sum, item) => sum + item.totalPrice, 0), [cart]);

  const addOrder = (payload: OrderPayload) => setOrders(prev => [payload, ...prev]);

  const getAverageRating = (itemId: string) => {
    const itemReviews = reviews.filter(r => r.itemId === itemId);
    if (itemReviews.length === 0) return 4.5;
    return itemReviews.reduce((s, r) => s + r.rating, 0) / itemReviews.length;
  };

  const updateBranch = (name: string) => {
    setSelectedBranch(name);
    setCustomer(c => ({ ...c, branch: name }));
  };

  return {
    menuItems,
    restaurantConfig,
    cart,
    orders,
    addOrder,
    addToCart,
    removeFromCart,
    updateQuantity,
    totalAmount,
    isCartOpen,
    setIsCartOpen,
    orderType,
    setOrderType,
    setDeliveryFee,
    customer,
    setCustomer,
    clearCart,
    reviews,
    getAverageRating,
    selectedBranch,
    updateBranch,
    // Fix: Removed the duplicate 'deliveryFee' property name from the object literal.
    // The deliveryFee returned reflects the computed actualDeliveryFee which depends on the order type.
    deliveryFee: actualDeliveryFee,
    updateMenuItemPrice,
    toggleItemVisibility,
    deleteMenuItem,
    addMenuItem,
    updateRestaurantConfig
  };
};
