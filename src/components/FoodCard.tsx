
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { FoodItem } from '@/types';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface FoodCardProps {
  food: FoodItem;
}

const FoodCard = ({ food }: FoodCardProps) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart(food, quantity);
    setQuantity(1); // Reset quantity after adding to cart
  };

  return (
    <Card className="food-card overflow-hidden h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={food.image} 
          alt={food.name} 
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
        />
        {food.popular && (
          <div className="absolute top-2 right-2 bg-brand-primary text-white px-2 py-1 rounded-full text-xs font-bold">
            Popular
          </div>
        )}
      </div>
      
      <CardContent className="p-4 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg line-clamp-1">{food.name}</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link to={`/food/${food.id}`} className="text-muted-foreground hover:text-brand-primary transition-colors">
                  <Info size={16} />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>View Details</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <p className="text-muted-foreground text-sm line-clamp-2 mb-3 flex-grow">{food.description}</p>
        
        {food.calories && (
          <div className="text-sm text-muted-foreground mb-2">
            {food.calories} calories
          </div>
        )}
        
        <div className="flex justify-between items-center mt-auto">
          <div className="font-semibold text-lg">₹{food.price.toFixed(2)}</div>
          
          <div className="flex items-center">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8 rounded-full"
              onClick={decreaseQuantity}
              disabled={quantity <= 1}
            >
              <Minus size={14} />
            </Button>
            
            <span className="mx-2 w-6 text-center">{quantity}</span>
            
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8 rounded-full"
              onClick={increaseQuantity}
            >
              <Plus size={14} />
            </Button>
          </div>
        </div>
        
        <Button 
          className="w-full mt-3 bg-brand-primary hover:bg-brand-accent text-white transition-colors"
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default FoodCard;
