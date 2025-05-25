
export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  vegetarian: boolean; // Changed from isVeg to vegetarian for consistency
  rating: number;
  cookingTime: string;
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
  description: string;
  price: number;
  image: string;
  category: string;
  vegetarian: boolean;
  spiceLevel: number;
  preparationTime: string;
  ingredients: string[];
  nutritionalInfo: {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
  };
}
