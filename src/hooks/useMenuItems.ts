
import { useState, useEffect } from 'react';
import { FoodItem } from '@/types';

// Mock menu items data for now
const mockMenuItems: FoodItem[] = [
  {
    id: '1',
    name: 'Butter Chicken',
    description: 'Creamy tomato-based curry with tender chicken pieces',
    price: 299,
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500',
    category: 'main',
    vegetarian: false,
    rating: 4.5,
    cookingTime: '20-25 mins',
    popular: true,
    calories: 450
  },
  {
    id: '2',
    name: 'Paneer Tikka',
    description: 'Grilled cottage cheese marinated in spices',
    price: 249,
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500',
    category: 'starter',
    vegetarian: true,
    rating: 4.3,
    cookingTime: '15-20 mins',
    calories: 320
  },
  {
    id: '3',
    name: 'Biryani',
    description: 'Fragrant basmati rice with spiced meat and vegetables',
    price: 399,
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d51a?w=500',
    category: 'main',
    vegetarian: false,
    rating: 4.7,
    cookingTime: '30-35 mins',
    popular: true,
    calories: 520
  },
  {
    id: '4',
    name: 'Dal Tadka',
    description: 'Yellow lentils tempered with aromatic spices',
    price: 149,
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500',
    category: 'main',
    vegetarian: true,
    rating: 4.2,
    cookingTime: '15-20 mins',
    calories: 280
  }
];

export const useMenuItems = () => {
  const [menuItems, setMenuItems] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call
    const fetchItems = async () => {
      try {
        setLoading(true);
        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setMenuItems(mockMenuItems);
      } catch (err) {
        setError('Failed to fetch menu items');
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const addMenuItem = async (item: Omit<FoodItem, 'id'>) => {
    try {
      const newItem = {
        ...item,
        id: String(Date.now())
      };
      setMenuItems(prev => [...prev, newItem]);
      return newItem;
    } catch (err) {
      setError('Failed to add menu item');
      throw err;
    }
  };

  const updateMenuItem = async (id: string, updates: Partial<FoodItem>) => {
    try {
      setMenuItems(prev => 
        prev.map(item => 
          item.id === id ? { ...item, ...updates } : item
        )
      );
    } catch (err) {
      setError('Failed to update menu item');
      throw err;
    }
  };

  const deleteMenuItem = async (id: string) => {
    try {
      setMenuItems(prev => prev.filter(item => item.id !== id));
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
    deleteMenuItem
  };
};
