
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from "@/hooks/use-toast";
import { CartItem, FoodItem } from '@/types';

interface CartContextType {
  items: CartItem[];
  addToCart: (item: FoodItem, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem('upaharCart');
    if (storedCart) {
      try {
        setItems(JSON.parse(storedCart));
      } catch (error) {
        console.error('Failed to parse stored cart:', error);
        localStorage.removeItem('upaharCart');
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('upaharCart', JSON.stringify(items));
  }, [items]);

  const addToCart = (foodItem: FoodItem, quantity: number = 1) => {
    setItems(prev => {
      const itemIndex = prev.findIndex(item => item.foodItem.id === foodItem.id);
      if (itemIndex >= 0) {
        // Item exists, update quantity
        const newItems = [...prev];
        newItems[itemIndex] = {
          ...newItems[itemIndex],
          quantity: newItems[itemIndex].quantity + quantity
        };
        return newItems;
      } else {
        // Item doesn't exist, add new
        return [...prev, { id: foodItem.id, foodItem, quantity }];
      }
    });
    
    toast({
      title: "Item Added",
      description: `${foodItem.name} has been added to your cart.`,
    });
  };

  const removeFromCart = (itemId: string) => {
    setItems(prev => {
      const itemToRemove = prev.find(item => item.id === itemId);
      if (!itemToRemove) return prev;
      
      const newItems = prev.filter(item => item.id !== itemId);
      
      toast({
        title: "Item Removed",
        description: `${itemToRemove.foodItem.name} has been removed from your cart.`,
      });
      
      return newItems;
    });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(itemId);
      return;
    }
    
    setItems(prev => {
      return prev.map(item => {
        if (item.id === itemId) {
          return { ...item, quantity };
        }
        return item;
      });
    });
  };

  const clearCart = () => {
    setItems([]);
    toast({
      title: "Cart Cleared",
      description: "All items have been removed from your cart.",
    });
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
        getTotalItems
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
