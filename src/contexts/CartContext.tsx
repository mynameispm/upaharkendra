
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { CartItem, FoodItem } from '@/types';

interface CartContextType {
  items: CartItem[];
  addToCart: (item: FoodItem, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  syncWithDatabase: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { toast } = useToast();
  const { user } = useAuth();

  // Load cart from localStorage on initial load
  useEffect(() => {
    if (!user) {
      const storedCart = localStorage.getItem('upaharCart');
      if (storedCart) {
        try {
          setItems(JSON.parse(storedCart));
        } catch (error) {
          console.error('Failed to parse stored cart:', error);
          localStorage.removeItem('upaharCart');
        }
      }
    }
  }, [user]);

  // Save cart to localStorage whenever it changes (for non-authenticated users)
  useEffect(() => {
    if (!user) {
      localStorage.setItem('upaharCart', JSON.stringify(items));
    }
  }, [items, user]);

  // Temporary sync function - will be implemented later when Supabase types are updated
  const syncWithDatabase = async () => {
    if (!user) return;
    
    // For now, just log that sync would happen here
    console.log('Database sync would happen here when types are available');
  };

  const addToCart = async (foodItem: FoodItem, quantity: number = 1) => {
    // For now, only handle local storage
    setItems(prev => {
      const itemIndex = prev.findIndex(item => item.foodItem.id === foodItem.id);
      if (itemIndex >= 0) {
        const newItems = [...prev];
        newItems[itemIndex] = {
          ...newItems[itemIndex],
          quantity: newItems[itemIndex].quantity + quantity
        };
        return newItems;
      } else {
        return [...prev, { id: foodItem.id, foodItem, quantity }];
      }
    });
    
    toast({
      title: "Item Added",
      description: `${foodItem.name} has been added to your cart.`,
    });
  };

  const removeFromCart = async (itemId: string) => {
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

  const updateQuantity = async (itemId: string, quantity: number) => {
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

  const clearCart = async () => {
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
        getTotalItems,
        syncWithDatabase
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
