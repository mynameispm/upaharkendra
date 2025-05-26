
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
  ingredients?: string[];
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
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  category: string;
  vegetarian: boolean;
  rating: number;
  cooking_time: string | null;
  popular: boolean;
  calories: number | null;
  ingredients: string[] | null;
  available: boolean;
  created_at: string;
  updated_at: string;
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
  id: string;
  user_id: string;
  menu_item_id: string;
  quantity: number;
  added_at: string;
  menu_item?: MenuItem;
}

export interface DBOrder {
  id: string;
  user_id: string;
  status: string;
  total: number;
  delivery_address?: string;
  payment_method?: string;
  created_at: string;
  updated_at: string;
}

export interface DBOrderItem {
  id: string;
  order_id: string;
  menu_item_id: string;
  quantity: number;
  price_at_order: number;
  created_at: string;
}

export interface DBProfile {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  created_at: string;
  updated_at: string;
}
