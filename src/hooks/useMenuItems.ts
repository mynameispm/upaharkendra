
import { useState, useEffect } from 'react';
import { FoodItem, MenuItem } from '@/types';
import { useDatabase } from '@/hooks/useDatabase';

export const useMenuItems = () => {
  const [menuItems, setMenuItems] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const db = useDatabase();

  // Convert MenuItem to FoodItem format
  const convertToFoodItems = (items: MenuItem[]): FoodItem[] => {
    return items.map(item => ({
      id: item.id,
      name: item.name,
      description: item.description || '',
      price: item.price,
      image: item.image_url || '',
      category: item.category,
      vegetarian: item.vegetarian,
      rating: item.rating,
      cookingTime: item.cooking_time || '',
      popular: item.popular,
      calories: item.calories || undefined,
      ingredients: item.ingredients || undefined
    }));
  };

  const fetchItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const dbItems = await db.getMenuItems();
      const foodItems = convertToFoodItems(dbItems);
      setMenuItems(foodItems);
    } catch (err) {
      console.error('Error fetching menu items:', err);
      setError('Failed to fetch menu items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const addMenuItem = async (item: Omit<FoodItem, 'id'>) => {
    try {
      const menuItemData: Omit<MenuItem, 'id' | 'created_at' | 'updated_at'> = {
        name: item.name,
        description: item.description,
        price: item.price,
        image_url: item.image,
        category: item.category,
        vegetarian: item.vegetarian,
        rating: item.rating,
        cooking_time: item.cookingTime,
        popular: item.popular || false,
        calories: item.calories || null,
        ingredients: item.ingredients || null,
        available: true
      };
      
      const newItem = await db.addMenuItem(menuItemData);
      await fetchItems(); // Refresh the list
      return newItem;
    } catch (err) {
      setError('Failed to add menu item');
      throw err;
    }
  };

  const updateMenuItem = async (id: string, updates: Partial<FoodItem>) => {
    try {
      const menuItemUpdates: Partial<MenuItem> = {
        name: updates.name,
        description: updates.description,
        price: updates.price,
        image_url: updates.image,
        category: updates.category,
        vegetarian: updates.vegetarian,
        rating: updates.rating,
        cooking_time: updates.cookingTime,
        popular: updates.popular,
        calories: updates.calories,
        ingredients: updates.ingredients
      };
      
      await db.updateMenuItem(id, menuItemUpdates);
      await fetchItems(); // Refresh the list
    } catch (err) {
      setError('Failed to update menu item');
      throw err;
    }
  };

  const deleteMenuItem = async (id: string) => {
    try {
      await db.deleteMenuItem(id);
      await fetchItems(); // Refresh the list
    } catch (err) {
      setError('Failed to delete menu item');
      throw err;
    }
  };

  return {
    menuItems,
    loading,
    error,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    refreshItems: fetchItems
  };
};
