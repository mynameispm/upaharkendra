
export interface User {
  id: string;
  email: string;
  name?: string;
  address?: string;
  phone?: string;
  created_at: string;
}

export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  vegetarian: boolean;
  popular?: boolean;
  calories?: number;
  ingredients?: string[];
}

export interface CartItem {
  id: string;
  foodItem: FoodItem;
  quantity: number;
}

export interface Order {
  id: string;
  user_id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'preparing' | 'delivering' | 'completed' | 'cancelled';
  payment_method: 'card' | 'cash' | 'upi';
  delivery_address: string;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

export interface LocationInfo {
  address: string;
  lat: number;
  lng: number;
}
