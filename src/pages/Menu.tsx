
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { FoodItem, Category } from '@/types';
import FoodCard from '@/components/FoodCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Loader from '@/components/Loader';

// Mock data for menu items
const menuItems: FoodItem[] = [
  {
    id: '1',
    name: 'Veg Burger Deluxe',
    description: 'Delicious veggie patty with fresh lettuce, tomato, and our special sauce.',
    price: 120,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1965&auto=format&fit=crop',
    category: 'burgers',
    vegetarian: true,
    popular: true,
    calories: 450,
  },
  {
    id: '2',
    name: 'Paneer Tikka',
    description: 'Grilled cottage cheese cubes marinated in spicy yogurt sauce.',
    price: 180,
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d6?q=80&w=2017&auto=format&fit=crop',
    category: 'starters',
    vegetarian: true,
    popular: true,
    calories: 320,
  },
  {
    id: '3',
    name: 'Vegetable Biryani',
    description: 'Fragrant basmati rice cooked with mixed vegetables and aromatic spices.',
    price: 220,
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=1974&auto=format&fit=crop',
    category: 'main-course',
    vegetarian: true,
    calories: 550,
  },
  {
    id: '4',
    name: 'Chocolate Brownie',
    description: 'Rich chocolate brownie served with vanilla ice cream and chocolate sauce.',
    price: 150,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=1974&auto=format&fit=crop',
    category: 'desserts',
    vegetarian: true,
    popular: true,
    calories: 420,
  },
  {
    id: '5',
    name: 'Masala Dosa',
    description: 'Crispy rice crepe filled with spiced potato filling, served with chutney and sambar.',
    price: 130,
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=2070&auto=format&fit=crop',
    category: 'breakfast',
    vegetarian: true,
    calories: 380,
  },
  {
    id: '6',
    name: 'Veg Pulao',
    description: 'Fragrant rice cooked with mixed vegetables and mild spices.',
    price: 160,
    image: 'https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?q=80&w=2080&auto=format&fit=crop',
    category: 'rice-dishes',
    vegetarian: true,
    calories: 420,
  },
  {
    id: '7',
    name: 'Pav Bhaji',
    description: 'Spiced vegetable curry served with buttered soft bread rolls.',
    price: 140,
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=2071&auto=format&fit=crop',
    category: 'street-food',
    vegetarian: true,
    popular: true,
    calories: 460,
  },
  {
    id: '8',
    name: 'Gulab Jamun',
    description: 'Deep-fried milk solids soaked in sugar syrup, served warm.',
    price: 100,
    image: 'https://images.unsplash.com/photo-1601303755423-fee5477e5e3c?q=80&w=2065&auto=format&fit=crop',
    category: 'desserts',
    vegetarian: true,
    calories: 350,
  },
];

// Mock data for categories
const categories: Category[] = [
  {
    id: 'all',
    name: 'All Items',
    image: '',
  },
  {
    id: 'starters',
    name: 'Starters',
    image: 'https://images.unsplash.com/photo-1541557435984-1c79685a082e?q=80&w=1970&auto=format&fit=crop',
  },
  {
    id: 'main-course',
    name: 'Main Course',
    image: 'https://images.unsplash.com/photo-1600335895229-6e75511892c8?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: 'rice-dishes',
    name: 'Rice Dishes',
    image: 'https://images.unsplash.com/photo-1596097557993-54339f4e051b?q=80&w=1975&auto=format&fit=crop',
  },
  {
    id: 'desserts',
    name: 'Desserts',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=1964&auto=format&fit=crop',
  },
  {
    id: 'burgers',
    name: 'Burgers',
    image: '',
  },
  {
    id: 'breakfast',
    name: 'Breakfast',
    image: '',
  },
  {
    id: 'street-food',
    name: 'Street Food',
    image: '',
  },
];

const Menu = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('popularity');
  const [isLoading, setIsLoading] = useState(true);
  const [showPopularOnly, setShowPopularOnly] = useState(false);
  const [filteredItems, setFilteredItems] = useState<FoodItem[]>([]);
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Update URL when category changes
    if (activeCategory !== 'all') {
      setSearchParams({ category: activeCategory });
    } else {
      setSearchParams({});
    }

    // Filter items based on active category, search term, and popular filter
    let filtered = [...menuItems];
    
    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(item => item.category === activeCategory);
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(term) || 
        item.description.toLowerCase().includes(term)
      );
    }
    
    // Filter by popularity
    if (showPopularOnly) {
      filtered = filtered.filter(item => item.popular);
    }
    
    // Sort items
    if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'popularity') {
      filtered.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
    }
    
    setFilteredItems(filtered);
  }, [activeCategory, searchTerm, sortBy, showPopularOnly, setSearchParams]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader size="large" />
          <p className="mt-4 text-lg text-muted-foreground">Loading Menu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          {/* Page Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl font-bold mb-4">Our Menu</h1>
            <p className="text-muted-foreground">
              Explore our wide selection of delicious vegetarian dishes prepared with love and care
            </p>
          </div>
          
          {/* Search and Filter Controls */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 mb-8">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                className="pl-10 bg-background border-muted focus-visible:ring-brand-primary"
                placeholder="Search menu items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-auto">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popularity">Popularity</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2 bg-muted/30 px-3 py-2 rounded-md">
                <Checkbox
                  id="popular"
                  checked={showPopularOnly}
                  onCheckedChange={(checked) => setShowPopularOnly(checked as boolean)}
                />
                <Label htmlFor="popular" className="cursor-pointer">Popular Only</Label>
              </div>
            </div>
          </div>
          
          {/* Categories Tabs */}
          <Tabs defaultValue={activeCategory} onValueChange={setActiveCategory} className="w-full mb-8">
            <div className="overflow-x-auto pb-2">
              <TabsList className="w-full justify-start">
                {categories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id} className="px-4">
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            {/* Menu Items */}
            <div className="pt-4">
              {filteredItems.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold mb-2">No items found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filter criteria
                  </p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => {
                      setSearchTerm('');
                      setActiveCategory('all');
                      setShowPopularOnly(false);
                      setSortBy('popularity');
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredItems.map((food) => (
                    <FoodCard key={food.id} food={food} />
                  ))}
                </div>
              )}
            </div>
          </Tabs>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Menu;
