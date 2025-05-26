
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { MenuItem, DBCartItem, DBOrder, DBProfile } from '@/types';

export const useDatabase = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  // Menu Items Operations
  const getMenuItems = async (): Promise<MenuItem[]> => {
    try {
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .eq('available', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching menu items:', error);
      toast({
        title: "Error",
        description: "Failed to fetch menu items",
        variant: "destructive"
      });
      return [];
    }
  };

  const addMenuItem = async (item: Omit<MenuItem, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('menu_items')
        .insert([item])
        .select()
        .single();

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Menu item added successfully"
      });
      
      return data;
    } catch (error) {
      console.error('Error adding menu item:', error);
      toast({
        title: "Error",
        description: "Failed to add menu item",
        variant: "destructive"
      });
      throw error;
    }
  };

  const updateMenuItem = async (id: string, updates: Partial<MenuItem>) => {
    try {
      const { data, error } = await supabase
        .from('menu_items')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Menu item updated successfully"
      });
      
      return data;
    } catch (error) {
      console.error('Error updating menu item:', error);
      toast({
        title: "Error",
        description: "Failed to update menu item",
        variant: "destructive"
      });
      throw error;
    }
  };

  const deleteMenuItem = async (id: string) => {
    try {
      const { error } = await supabase
        .from('menu_items')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Menu item deleted successfully"
      });
    } catch (error) {
      console.error('Error deleting menu item:', error);
      toast({
        title: "Error",
        description: "Failed to delete menu item",
        variant: "destructive"
      });
      throw error;
    }
  };

  // Cart Operations
  const getCartItems = async (): Promise<DBCartItem[]> => {
    if (!user) return [];
    
    try {
      const { data, error } = await supabase
        .from('cart_items')
        .select(`
          *,
          menu_item:menu_items(*)
        `)
        .eq('user_id', user.id);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching cart items:', error);
      return [];
    }
  };

  const addToCart = async (menuItemId: string, quantity: number = 1) => {
    if (!user) {
      toast({
        title: "Please Login",
        description: "You need to login to add items to cart",
        variant: "destructive"
      });
      return;
    }

    try {
      // Check if item already exists in cart
      const { data: existingItem } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', user.id)
        .eq('menu_item_id', menuItemId)
        .single();

      if (existingItem) {
        // Update quantity
        const { error } = await supabase
          .from('cart_items')
          .update({ quantity: existingItem.quantity + quantity })
          .eq('id', existingItem.id);

        if (error) throw error;
      } else {
        // Insert new item
        const { error } = await supabase
          .from('cart_items')
          .insert([{
            user_id: user.id,
            menu_item_id: menuItemId,
            quantity
          }]);

        if (error) throw error;
      }

      toast({
        title: "Added to Cart",
        description: "Item added to your cart successfully"
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive"
      });
    }
  };

  const updateCartQuantity = async (cartItemId: string, quantity: number) => {
    try {
      if (quantity <= 0) {
        await removeFromCart(cartItemId);
        return;
      }

      const { error } = await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('id', cartItemId);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating cart quantity:', error);
      toast({
        title: "Error",
        description: "Failed to update cart quantity",
        variant: "destructive"
      });
    }
  };

  const removeFromCart = async (cartItemId: string) => {
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', cartItemId);

      if (error) throw error;
      
      toast({
        title: "Removed",
        description: "Item removed from cart"
      });
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast({
        title: "Error",
        description: "Failed to remove item from cart",
        variant: "destructive"
      });
    }
  };

  const clearCart = async () => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;
      
      toast({
        title: "Cart Cleared",
        description: "All items removed from cart"
      });
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast({
        title: "Error",
        description: "Failed to clear cart",
        variant: "destructive"
      });
    }
  };

  // Profile Operations
  const getProfile = async (): Promise<DBProfile | null> => {
    if (!user) return null;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
  };

  const updateProfile = async (updates: Partial<DBProfile>) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Profile updated successfully"
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive"
      });
    }
  };

  // Order Operations
  const createOrder = async (cartItems: DBCartItem[], total: number, deliveryAddress?: string) => {
    if (!user || cartItems.length === 0) return;
    
    try {
      // Create order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([{
          user_id: user.id,
          total,
          delivery_address: deliveryAddress,
          status: 'pending'
        }])
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = cartItems.map(item => ({
        order_id: order.id,
        menu_item_id: item.menu_item_id,
        quantity: item.quantity,
        price_at_order: 0 // You'll need to get the price from menu_item
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Clear cart after successful order
      await clearCart();
      
      toast({
        title: "Order Placed",
        description: "Your order has been placed successfully"
      });
      
      return order;
    } catch (error) {
      console.error('Error creating order:', error);
      toast({
        title: "Error",
        description: "Failed to place order",
        variant: "destructive"
      });
    }
  };

  const getOrders = async (): Promise<DBOrder[]> => {
    if (!user) return [];
    
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching orders:', error);
      return [];
    }
  };

  return {
    // Menu operations
    getMenuItems,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    
    // Cart operations
    getCartItems,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    
    // Profile operations
    getProfile,
    updateProfile,
    
    // Order operations
    createOrder,
    getOrders
  };
};
