
export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  vegetarian: boolean;
  rating: number;
  cookingTime: string;
  popular?: boolean;
  calories?: number;
}

export interface CartItem {
  id: string;
  foodItem: FoodItem;
  quantity: number;
}

export interface User {
  id: string;
  email?: string;
  name?: string;
  address?: string;
  phone?: string;
  created_at: string;
}

export interface MenuItem {
  id: number;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  available: boolean;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  itemCount: number;
}

export interface LocationInfo {
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface DBCartItem {
  id: number;
  user_id: string;
  menu_item_id: number;
  quantity: number;
  added_at: string;
}

export interface DBOrder {
  id: number;
  user_id: string | null;
  status: string;
  total: number;
  created_at: string;
}

export interface DBOrderItem {
  id: number;
  order_id: number;
  menu_item_id: number | null;
  quantity: number;
  price_at_order: number;
}

export interface DBProfile {
  id: string;
  full_name: string | null;
  email: string | null;
  created_at: string;
}
