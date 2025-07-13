
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, Star, Clock, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCart } from '@/contexts/CartContext';
import { FoodItem } from '@/types';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Loader from '@/components/Loader';

// Mock data for food items
const menuItems: FoodItem[] = [
  {
    id: '1',
    name: 'Veg Burger Deluxe',
    description: 'Delicious veggie patty with fresh lettuce, tomato, and our special sauce.',
    price: 120,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1965&auto=format&fit=crop',
    category: 'burgers',
    vegetarian: true,
    rating: 4.5,
    cookingTime: '15 mins',
    popular: true,
    calories: 450,
    ingredients: ['Veggie Patty', 'Lettuce', 'Tomato', 'Cheese', 'Special Sauce', 'Burger Bun'],
  },
  {
    id: '2',
    name: 'Paneer Tikka',
    description: 'Grilled cottage cheese cubes marinated in spicy yogurt sauce.',
    price: 180,
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d6?q=80&w=2017&auto=format&fit=crop',
    category: 'starters',
    vegetarian: true,
    rating: 4.4,
    cookingTime: '12 mins',
    popular: true,
    calories: 320,
    ingredients: ['Paneer', 'Yogurt', 'Spices', 'Bell Peppers', 'Onions'],
  },
  {
    id: '3',
    name: 'Vegetable Biryani',
    description: 'Fragrant basmati rice cooked with mixed vegetables and aromatic spices.',
    price: 220,
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=1974&auto=format&fit=crop',
    category: 'main-course',
    vegetarian: true,
    rating: 4.3,
    cookingTime: '25 mins',
    calories: 550,
    ingredients: ['Basmati Rice', 'Mixed Vegetables', 'Biryani Masala', 'Saffron', 'Ghee', 'Fried Onions'],
  },
  {
    id: '4',
    name: 'Chocolate Brownie',
    description: 'Rich chocolate brownie served with vanilla ice cream and chocolate sauce.',
    price: 150,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=1974&auto=format&fit=crop',
    category: 'desserts',
    vegetarian: true,
    rating: 4.7,
    cookingTime: '8 mins',
    popular: true,
    calories: 420,
    ingredients: ['Chocolate', 'Flour', 'Sugar', 'Butter', 'Eggs', 'Vanilla Extract'],
  },
  {
    id: '5',
    name: 'Masala Dosa',
    description: 'Crispy rice crepe filled with spiced potato filling, served with chutney and sambar.',
    price: 130,
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=2070&auto=format&fit=crop',
    category: 'breakfast',
    vegetarian: true,
    rating: 4.6,
    cookingTime: '10 mins',
    calories: 380,
    ingredients: ['Rice Batter', 'Potatoes', 'Onions', 'Mustard Seeds', 'Curry Leaves', 'Spices'],
  },
  {
    id: '6',
    name: 'Veg Pulao',
    description: 'Fragrant rice cooked with mixed vegetables and mild spices.',
    price: 160,
    image: 'https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?q=80&w=2080&auto=format&fit=crop',
    category: 'rice-dishes',
    vegetarian: true,
    rating: 4.2,
    cookingTime: '18 mins',
    calories: 420,
    ingredients: ['Basmati Rice', 'Mixed Vegetables', 'Cumin', 'Bay Leaf', 'Ginger', 'Garlic'],
  },
  {
    id: '7',
    name: 'Pav Bhaji',
    description: 'Spiced vegetable curry served with buttered soft bread rolls.',
    price: 140,
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=2071&auto=format&fit=crop',
    category: 'street-food',
    vegetarian: true,
    rating: 4.4,
    cookingTime: '15 mins',
    popular: true,
    calories: 460,
    ingredients: ['Mixed Vegetables', 'Pav Bhaji Masala', 'Butter', 'Bread Rolls', 'Onions', 'Tomatoes'],
  },
  {
    id: '8',
    name: 'Gulab Jamun',
    description: 'Deep-fried milk solids soaked in sugar syrup, served warm.',
    price: 100,
    image: 'https://images.unsplash.com/photo-1601303755423-fee5477e5e3c?q=80&w=2065&auto=format&fit=crop',
    category: 'desserts',
    vegetarian: true,
    rating: 4.7,
    cookingTime: '5 mins',
    calories: 350,
    ingredients: ['Milk Solids', 'Flour', 'Sugar Syrup', 'Cardamom', 'Rose Water'],
  },
];

// Similar food recommendations based on category
const getSimilarItems = (currentItem: FoodItem) => {
  return menuItems
    .filter(item => item.category === currentItem.category && item.id !== currentItem.id)
    .slice(0, 3);
};

const FoodDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [food, setFood] = useState<FoodItem | null>(null);
  const [similarItems, setSimilarItems] = useState<FoodItem[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();
  
  useEffect(() => {
    // Fetch food item details
    const fetchFood = () => {
      setIsLoading(true);
      
      // Simulate API call with delay
      setTimeout(() => {
        const foundFood = menuItems.find(item => item.id === id);
        
        if (foundFood) {
          setFood(foundFood);
          setSimilarItems(getSimilarItems(foundFood));
        }
        
        setIsLoading(false);
      }, 800);
    };
    
    fetchFood();
  }, [id]);
  
  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const handleAddToCart = () => {
    if (food) {
      addToCart(food, quantity);
      setQuantity(1); // Reset quantity after adding to cart
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader size="large" />
          <p className="mt-4 text-lg text-muted-foreground">Loading Food Details...</p>
        </div>
      </div>
    );
  }
  
  if (!food) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <div className="flex-grow flex items-center justify-center p-4">
          <div className="text-center max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-2">Food item not found</h2>
            <p className="text-muted-foreground mb-6">
              The food item you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/menu">
              <Button className="bg-brand-primary hover:bg-brand-accent text-white transition-colors">
                Browse Menu
              </Button>
            </Link>
          </div>
        </div>
        
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <div className="mb-8">
            <Link to="/menu" className="inline-flex items-center text-brand-primary hover:underline">
              <ArrowLeft size={16} className="mr-1" />
              Back to Menu
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Food Image */}
            <div className="overflow-hidden rounded-xl">
              <img 
                src={food.image} 
                alt={food.name} 
                className="w-full h-[400px] object-cover"
              />
            </div>
            
            {/* Food Details */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center mb-2">
                  <h1 className="text-3xl font-bold">{food.name}</h1>
                  {food.popular && (
                    <div className="ml-3 bg-brand-primary text-white px-2 py-1 rounded-full text-xs font-bold">
                      Popular
                    </div>
                  )}
                </div>
                <p className="text-muted-foreground">{food.description}</p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center bg-muted/30 px-3 py-1 rounded-full">
                  <Leaf size={16} className="mr-1 text-green-500" />
                  <span className="text-sm">100% Vegetarian</span>
                </div>
                <div className="flex items-center bg-muted/30 px-3 py-1 rounded-full">
                  <Clock size={16} className="mr-1 text-brand-primary" />
                  <span className="text-sm">15-20 min</span>
                </div>
                <div className="flex items-center bg-muted/30 px-3 py-1 rounded-full">
                  <Star size={16} className="mr-1 text-yellow-500" />
                  <span className="text-sm">4.8 (120 reviews)</span>
                </div>
              </div>
              
              <div className="text-3xl font-bold">₹{food.price.toFixed(2)}</div>
              
              {food.calories && (
                <div className="text-sm text-muted-foreground">
                  {food.calories} calories per serving
                </div>
              )}
              
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                <div className="flex items-center border rounded-md">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-10 w-10 rounded-none"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                  >
                    <Minus size={16} />
                  </Button>
                  
                  <div className="w-16 text-center">
                    <span className="text-lg">{quantity}</span>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-10 w-10 rounded-none"
                    onClick={increaseQuantity}
                  >
                    <Plus size={16} />
                  </Button>
                </div>
                
                <Button 
                  className="flex-grow bg-brand-primary hover:bg-brand-accent text-white transition-colors"
                  onClick={handleAddToCart}
                >
                  Add to Cart • ₹{(food.price * quantity).toFixed(2)}
                </Button>
              </div>
            </div>
          </div>
          
          {/* Additional Information */}
          <div className="mb-16">
            <Tabs defaultValue="ingredients" className="w-full">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
                <TabsTrigger value="nutrition">Nutrition Info</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="ingredients" className="pt-6">
                <div className="bg-muted/30 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Ingredients</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {food.ingredients?.map((ingredient, index) => (
                      <li key={index} className="flex items-center">
                        <div className="h-2 w-2 bg-brand-primary rounded-full mr-2" />
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
              
              <TabsContent value="nutrition" className="pt-6">
                <div className="bg-muted/30 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Nutrition Information</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="bg-white p-4 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Calories</p>
                      <p className="text-lg font-semibold">{food.calories} kcal</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Proteins</p>
                      <p className="text-lg font-semibold">8g</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Carbs</p>
                      <p className="text-lg font-semibold">35g</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Fats</p>
                      <p className="text-lg font-semibold">12g</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    * Values are approximate and may vary slightly.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="pt-6">
                <div className="bg-muted/30 p-6 rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">Customer Reviews</h3>
                    <div className="flex items-center">
                      <Star className="text-yellow-500 fill-yellow-500" size={18} />
                      <span className="ml-1 font-semibold">4.8</span>
                      <span className="text-muted-foreground ml-1">(120)</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {/* Sample reviews */}
                    <div className="bg-white p-4 rounded-lg">
                      <div className="flex justify-between mb-1">
                        <h4 className="font-semibold">Amit K.</h4>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star} 
                              size={14} 
                              className={star <= 5 ? "text-yellow-500 fill-yellow-500" : "text-muted"} 
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">2 days ago</p>
                      <p className="text-sm">
                        Excellent food! The {food.name} was delicious and very well prepared. Will definitely order again.
                      </p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg">
                      <div className="flex justify-between mb-1">
                        <h4 className="font-semibold">Priya S.</h4>
                        <div className="flex">
                          {[1, 2, 3, 4].map((star) => (
                            <Star 
                              key={star} 
                              size={14} 
                              className="text-yellow-500 fill-yellow-500" 
                            />
                          ))}
                          <Star size={14} className="text-muted" />
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">1 week ago</p>
                      <p className="text-sm">
                        Good taste and quality. The portion size could be a bit larger, but overall I enjoyed it.
                      </p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg">
                      <div className="flex justify-between mb-1">
                        <h4 className="font-semibold">Raj M.</h4>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star} 
                              size={14} 
                              className="text-yellow-500 fill-yellow-500" 
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">2 weeks ago</p>
                      <p className="text-sm">
                        Simply amazing! The {food.name} has the perfect balance of flavors. Highly recommended.
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-center mt-6">
                    <Button variant="outline">View All Reviews</Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Similar Items */}
          {similarItems.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {similarItems.map((item) => (
                  <Link to={`/food/${item.id}`} key={item.id} className="group">
                    <div className="overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
                      <div className="relative h-48">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {item.popular && (
                          <div className="absolute top-2 right-2 bg-brand-primary text-white px-2 py-1 rounded-full text-xs font-bold">
                            Popular
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <p className="text-muted-foreground text-sm line-clamp-2 mb-2">{item.description}</p>
                        <div className="font-semibold">₹{item.price.toFixed(2)}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default FoodDetails;
