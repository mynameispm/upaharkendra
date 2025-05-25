
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { CartItem as DBCartItem, MenuItem } from '@/types/database';
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

  // Load cart from localStorage or database
  useEffect(() => {
    if (user) {
      syncWithDatabase();
    } else {
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

  const syncWithDatabase = async () => {
    if (!user) return;

    try {
      const { data: cartItems, error } = await supabase
        .from('cart_items')
        .select(`
          *,
          menu_item:menu_items(*)
        `)
        .eq('user_id', user.id);

      if (error) throw error;

      const formattedItems: CartItem[] = cartItems?.map((item: DBCartItem & { menu_item: MenuItem }) => ({
        id: item.menu_item_id.toString(),
        foodItem: {
          id: item.menu_item.id.toString(),
          name: item.menu_item.name,
          description: item.menu_item.description || '',
          price: Number(item.menu_item.price),
          image: item.menu_item.image_url || '',
          category: 'main',
          isVeg: true,
          rating: 4.5,
          cookingTime: '15-20 mins'
        },
        quantity: item.quantity
      })) || [];

      setItems(formattedItems);
    } catch (error) {
      console.error('Error syncing cart with database:', error);
    }
  };

  const addToCart = async (foodItem: FoodItem, quantity: number = 1) => {
    if (user) {
      try {
        // Add to database
        const { error } = await supabase
          .from('cart_items')
          .upsert({
            user_id: user.id,
            menu_item_id: parseInt(foodItem.id),
            quantity: quantity
          }, {
            onConflict: 'user_id,menu_item_id'
          });

        if (error) throw error;
        await syncWithDatabase();
      } catch (error) {
        console.error('Error adding to cart:', error);
        toast({
          title: "Error",
          description: "Failed to add item to cart. Please try again.",
          variant: "destructive",
        });
        return;
      }
    } else {
      // Handle local storage for non-authenticated users
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
    }
    
    toast({
      title: "Item Added",
      description: `${foodItem.name} has been added to your cart.`,
    });
  };

  const removeFromCart = async (itemId: string) => {
    if (user) {
      try {
        const { error } = await supabase
          .from('cart_items')
          .delete()
          .eq('user_id', user.id)
          .eq('menu_item_id', parseInt(itemId));

        if (error) throw error;
        await syncWithDatabase();
      } catch (error) {
        console.error('Error removing from cart:', error);
        return;
      }
    } else {
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
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(itemId);
      return;
    }
    
    if (user) {
      try {
        const { error } = await supabase
          .from('cart_items')
          .update({ quantity })
          .eq('user_id', user.id)
          .eq('menu_item_id', parseInt(itemId));

        if (error) throw error;
        await syncWithDatabase();
      } catch (error) {
        console.error('Error updating cart quantity:', error);
        return;
      }
    } else {
      setItems(prev => {
        return prev.map(item => {
          if (item.id === itemId) {
            return { ...item, quantity };
          }
          return item;
        });
      });
    }
  };

  const clearCart = async () => {
    if (user) {
      try {
        const { error } = await supabase
          .from('cart_items')
          .delete()
          .eq('user_id', user.id);

        if (error) throw error;
      } catch (error) {
        console.error('Error clearing cart:', error);
      }
    }
    
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
