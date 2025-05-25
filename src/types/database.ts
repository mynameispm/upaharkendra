
export interface MenuItem {
  id: number;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  available: boolean;
  created_at: string;
}

export interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  created_at: string;
}

export interface CartItem {
  id: number;
  user_id: string;
  menu_item_id: number;
  quantity: number;
  added_at: string;
  menu_item?: MenuItem;
}

export interface Order {
  id: number;
  user_id: string | null;
  status: string;
  total: number | null;
  created_at: string;
}

export interface OrderItem {
  id: number;
  order_id: number;
  menu_item_id: number | null;
  quantity: number;
  price_at_order: number;
  menu_item?: MenuItem;
}
