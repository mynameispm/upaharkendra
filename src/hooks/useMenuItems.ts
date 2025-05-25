
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { MenuItem } from '@/types/database';
import { FoodItem } from '@/types';

export const useMenuItems = () => {
  const [menuItems, setMenuItems] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .eq('available', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedItems: FoodItem[] = data?.map((item: MenuItem) => ({
        id: item.id.toString(),
        name: item.name,
        description: item.description || '',
        price: Number(item.price),
        image: item.image_url || 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500',
        category: 'main',
        isVeg: true,
        rating: 4.5,
        cookingTime: '15-20 mins'
      })) || [];

      setMenuItems(formattedItems);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const addMenuItem = async (item: Omit<MenuItem, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('menu_items')
        .insert([item])
        .select()
        .single();

      if (error) throw error;

      await fetchMenuItems(); // Refresh the list
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add menu item');
      throw err;
    }
  };

  const updateMenuItem = async (id: number, updates: Partial<MenuItem>) => {
    try {
      const { data, error } = await supabase
        .from('menu_items')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      await fetchMenuItems(); // Refresh the list
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update menu item');
      throw err;
    }
  };

  const deleteMenuItem = async (id: number) => {
    try {
      const { error } = await supabase
        .from('menu_items')
        .delete()
        .eq('id', id);

      if (error) throw error;

      await fetchMenuItems(); // Refresh the list
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete menu item');
      throw err;
    }
  };

  return {
    menuItems,
    loading,
    error,
    fetchMenuItems,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem
  };
};
