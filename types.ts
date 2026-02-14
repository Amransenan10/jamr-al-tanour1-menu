
export interface Extra {
  id: string;
  name: string;
  price: number;
}

export interface Size {
  id: string;
  name: string;
  price: number;
}

export interface Review {
  id: string;
  itemId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface MenuItem {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  ingredients?: string;
  price: number;
  image: string;
  sizes?: Size[];
  proteinTypes?: string[];
  extras?: Extra[];
  rating?: number;
  reviewCount?: number;
  isVisible?: boolean; // خاصية جديدة للتحكم في الظهور
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface CartItem {
  cartId: string;
  id: string;
  name: string;
  ingredients?: string;
  notes?: string;
  basePrice: number;
  totalPrice: number;
  quantity: number;
  selectedSize?: Size;
  selectedProtein?: string;
  selectedExtras: Extra[];
  image: string;
}

export type OrderType = 'delivery' | 'pickup';

export interface CustomerDetails {
  name: string;
  phone: string;
  notes: string;
  locationUrl?: string;
  branch?: string;
}

export interface OrderPayload {
  orderType: OrderType;
  customer: CustomerDetails;
  items: CartItem[];
  total: number;
  deliveryFee: number;
  timestamp: string;
}

export interface BranchConfig {
  name: string;
  whatsapp: string;
}

export interface RestaurantConfig {
  isOpen: boolean;
  branches: BranchConfig[];
  orderAlertSound: string;
  whatsappTemplate: string;
}
