import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Utensils, Clock, Award, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Category, FoodItem } from '@/types';
import FoodCard from '@/components/FoodCard';
import CategoryCard from '@/components/CategoryCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Loader from '@/components/Loader';
import { useMenuItems } from '@/hooks/useMenuItems';

// Mock data for categories
const categories: Category[] = [
  {
    id: 'starters',
    name: 'Starters',
    description: 'Delicious appetizers to start your meal',
    image: 'https://images.unsplash.com/photo-1541557435984-1c79685a082e?q=80&w=1970&auto=format&fit=crop',
    itemCount: 0
  },
  {
    id: 'main-course',
    name: 'Main Course',
    description: 'Hearty main dishes for a complete meal',
    image: 'https://images.unsplash.com/photo-1600335895229-6e75511892c8?q=80&w=1974&auto=format&fit=crop',
    itemCount: 0
  },
  {
    id: 'rice-dishes',
    name: 'Rice Dishes',
    description: 'Aromatic rice preparations',
    image: 'https://images.unsplash.com/photo-1596097557993-54339f4e051b?q=80&w=1975&auto=format&fit=crop',
    itemCount: 0
  },
  {
    id: 'desserts',
    name: 'Desserts',
    description: 'Sweet treats to end your meal',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=1964&auto=format&fit=crop',
    itemCount: 0
  },
];

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { menuItems, loading: menuLoading } = useMenuItems();

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const featuredFoods = menuItems.filter(item => item.popular).slice(0, 4);
  const popularFoods = menuItems.filter(item => item.popular);
  const newArrivals = menuItems.slice(0, 4);

  if (isLoading || menuLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader size="large" />
          <p className="mt-4 text-lg text-muted-foreground">Loading UpaharKendra...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-32 md:pb-24 px-4 bg-gradient-to-b from-brand-primary/10 to-transparent">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 space-y-6 mb-8 md:mb-0">
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Delicious <span className="text-brand-primary">Vegetarian</span> Food For Your Cravings
              </motion.h1>
              
              <motion.p 
                className="text-lg text-muted-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Experience the best vegetarian cuisine from our college canteen. Fresh, healthy, and tasty meals delivered to your doorstep.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Button size="lg" className="bg-brand-primary hover:bg-brand-accent text-white transition-colors">
                  <Link to="/menu" className="flex items-center">
                    Explore Menu
                    <ArrowRight size={16} className="ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline">
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </motion.div>
              
              <motion.div 
                className="flex flex-wrap gap-8 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="flex items-center">
                  <Utensils className="mr-2 text-brand-primary" size={20} />
                  <span className="text-sm">100% Vegetarian</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-2 text-brand-primary" size={20} />
                  <span className="text-sm">Fast Delivery</span>
                </div>
                <div className="flex items-center">
                  <Award className="mr-2 text-brand-primary" size={20} />
                  <span className="text-sm">Top Quality</span>
                </div>
              </motion.div>
            </div>
            
            <motion.div 
              className="md:w-1/2 relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
            >
              <img
                src="https://images.unsplash.com/photo-1543339308-43e59d6b73a6?q=80&w=2070&auto=format&fit=crop"
                alt="Vegetarian food spread"
                className="rounded-2xl shadow-xl"
              />
              
              {/* Floating card */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg hidden md:block animate-bounce">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary">
                    <Award size={24} />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">Campus Favorite</p>
                    <p className="text-xs text-muted-foreground">Voted #1 by Students</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Search and Categories Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto space-y-8">
          {/* Search */}
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                className="pl-10 bg-background border-muted focus-visible:ring-brand-primary"
                placeholder="Search for food items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          {/* Categories */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Categories</h2>
              <Link to="/menu" className="text-brand-primary hover:underline text-sm font-medium flex items-center">
                View All
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {categories.map((category, index) => (
                <CategoryCard key={category.id} category={category} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Section */}
      <section className="py-12 px-4 bg-brand-light/30">
        <div className="container mx-auto space-y-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Featured Delights</h2>
            <p className="text-muted-foreground">
              Discover our most popular vegetarian dishes, prepared with love and the freshest ingredients
            </p>
          </div>
          
          <Tabs defaultValue="popular" className="w-full max-w-4xl mx-auto">
            <TabsList className="mx-auto w-fit mb-6">
              <TabsTrigger value="popular">Popular</TabsTrigger>
              <TabsTrigger value="new">New Arrivals</TabsTrigger>
              <TabsTrigger value="offers">Special Offers</TabsTrigger>
            </TabsList>
            
            <TabsContent value="popular" className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {popularFoods.map((food) => (
                  <FoodCard key={food.id} food={food} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="new" className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {newArrivals.map((food) => (
                  <FoodCard key={food.id} food={food} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="offers" className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredFoods.slice(1, 3).map((food) => (
                  <FoodCard key={food.id} food={food} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="text-center">
            <Button size="lg" variant="outline">
              <Link to="/menu" className="flex items-center">
                Explore Full Menu
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* App Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose UpaharKendra?</h2>
            <p className="text-muted-foreground">
              Our canteen management system provides the best experience for students and staff
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-muted hover:shadow-md transition-shadow text-center">
              <div className="h-16 w-16 rounded-full bg-brand-primary/10 flex items-center justify-center mx-auto mb-4">
                <Clock className="text-brand-primary" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Order Processing</h3>
              <p className="text-muted-foreground">
                No more waiting in long lines. Place your order and get your food delivered quickly.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-muted hover:shadow-md transition-shadow text-center">
              <div className="h-16 w-16 rounded-full bg-brand-primary/10 flex items-center justify-center mx-auto mb-4">
                <Utensils className="text-brand-primary" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Ingredients</h3>
              <p className="text-muted-foreground">
                We use only the freshest and highest quality ingredients for all our dishes.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-muted hover:shadow-md transition-shadow text-center">
              <div className="h-16 w-16 rounded-full bg-brand-primary/10 flex items-center justify-center mx-auto mb-4">
                <Award className="text-brand-primary" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Special Discounts</h3>
              <p className="text-muted-foreground">
                Enjoy special discounts and offers for students and regular customers.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-brand-primary/5">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-muted-foreground">
              Don't just take our word for it, hear what our satisfied customers have to say
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-brand-accent overflow-hidden">
                  <img src="https://i.pravatar.cc/150?img=1" alt="Customer" className="w-full h-full object-cover" />
                </div>
                <div className="ml-3">
                  <h4 className="font-semibold">Rahul Singh</h4>
                  <p className="text-sm text-muted-foreground">Computer Science</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "The online ordering system has been a game-changer! I can now quickly order my favorite paneer dish without waiting in long lines."
              </p>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-brand-accent overflow-hidden">
                  <img src="https://i.pravatar.cc/150?img=5" alt="Customer" className="w-full h-full object-cover" />
                </div>
                <div className="ml-3">
                  <h4 className="font-semibold">Priya Sharma</h4>
                  <p className="text-sm text-muted-foreground">Faculty Member</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "The vegetable biryani is absolutely delicious! I appreciate being able to place orders in advance during my busy schedule."
              </p>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-brand-accent overflow-hidden">
                  <img src="https://i.pravatar.cc/150?img=8" alt="Customer" className="w-full h-full object-cover" />
                </div>
                <div className="ml-3">
                  <h4 className="font-semibold">Vijay Kumar</h4>
                  <p className="text-sm text-muted-foreground">Engineering Student</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "The app is super easy to use and the delivery is always on time. The food quality has improved dramatically since the new system was introduced."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="bg-gradient-to-r from-brand-primary to-brand-accent rounded-2xl p-8 md:p-12 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Order?</h2>
            <p className="text-white/90 max-w-2xl mx-auto mb-8">
              Get started with UpaharKendra today and enjoy delicious vegetarian meals delivered right to your doorstep.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-white text-brand-primary hover:bg-white/90">
                <Link to="/menu">Order Now</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
