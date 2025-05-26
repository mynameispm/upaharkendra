
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { CartItem, FoodItem } from '@/types';
import { useDatabase } from '@/hooks/useDatabase';

interface CartContextType {
  items: CartItem[];
  addToCart: (item: FoodItem, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  loading: boolean;
  refreshCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const db = useDatabase();

  // Convert database cart items to CartItem format
  const convertToCartItems = (dbItems: any[]): CartItem[] => {
    return dbItems.map(item => ({
      id: item.id,
      quantity: item.quantity,
      foodItem: {
        id: item.menu_item.id,
        name: item.menu_item.name,
        description: item.menu_item.description || '',
        price: item.menu_item.price,
        image: item.menu_item.image_url || '',
        category: item.menu_item.category,
        vegetarian: item.menu_item.vegetarian,
        rating: item.menu_item.rating,
        cookingTime: item.menu_item.cooking_time || '',
        popular: item.menu_item.popular,
        calories: item.menu_item.calories,
        ingredients: item.menu_item.ingredients
      }
    }));
  };

  const refreshCart = async () => {
    if (!user) {
      setItems([]);
      return;
    }

    setLoading(true);
    try {
      const dbCartItems = await db.getCartItems();
      const cartItems = convertToCartItems(dbCartItems);
      setItems(cartItems);
    } catch (error) {
      console.error('Error refreshing cart:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load cart when user changes or component mounts
  useEffect(() => {
    refreshCart();
  }, [user]);

  const addToCart = async (foodItem: FoodItem, quantity: number = 1) => {
    await db.addToCart(foodItem.id, quantity);
    await refreshCart();
  };

  const removeFromCart = async (itemId: string) => {
    await db.removeFromCart(itemId);
    await refreshCart();
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    await db.updateCartQuantity(itemId, quantity);
    await refreshCart();
  };

  const clearCart = async () => {
    await db.clearCart();
    await refreshCart();
  };

  const getTotalPrice = () => {
    return items.reduce((sum, item) => sum + (item.foodItem.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems,
        loading,
        refreshCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
