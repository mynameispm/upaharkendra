
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft, CreditCard, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MapComponent from '@/components/MapComponent';
import Loader from '@/components/Loader';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'cash'>('card');
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
  
  // Delivery fee and taxes
  const subtotal = getTotalPrice();
  const deliveryFee = 20;
  const tax = Math.round(subtotal * 0.05); // 5% tax
  const total = subtotal + deliveryFee + tax;
  
  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to complete your order.",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }
    
    // Process the order
    setIsProcessingOrder(true);
    
    // Simulate order processing
    setTimeout(() => {
      toast({
        title: "Order Placed Successfully!",
        description: "Your order has been placed and will be delivered soon.",
      });
      clearCart();
      navigate('/orders');
      setIsProcessingOrder(false);
    }, 2000);
  };
  
  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <div className="flex-grow flex items-center justify-center p-4">
          <div className="text-center max-w-md mx-auto">
            <div className="mb-6 text-brand-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mx-auto"
              >
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Looks like you haven't added any items to your cart yet.
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
              Continue Shopping
            </Link>
            <h1 className="text-3xl font-bold mt-2">Your Cart</h1>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="flex flex-col sm:flex-row">
                    <div className="w-full sm:w-32 h-32">
                      <img 
                        src={item.foodItem.image} 
                        alt={item.foodItem.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow p-4">
                      <div className="flex justify-between">
                        <h3 className="font-semibold">{item.foodItem.name}</h3>
                        <p className="font-semibold">₹{(item.foodItem.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.foodItem.description}</p>
                      
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8 rounded-full"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={14} />
                          </Button>
                          
                          <span className="mx-3 w-6 text-center">{item.quantity}</span>
                          
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8 rounded-full"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus size={14} />
                          </Button>
                        </div>
                        
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-muted-foreground hover:text-destructive"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 size={18} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                  <CardDescription>Review your order details</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Delivery Location */}
                  <div className="space-y-2">
                    <h4 className="font-medium">Delivery Location</h4>
                    <MapComponent height="180px" interactive={false} />
                    <div className="flex justify-end">
                      <Button variant="link" className="text-brand-primary p-0">
                        <Link to="/location">Change Location</Link>
                      </Button>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Price Calculation */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Delivery Fee</span>
                      <span>₹{deliveryFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax (5%)</span>
                      <span>₹{tax.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>₹{total.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  {/* Payment Method */}
                  <div className="pt-2 space-y-2">
                    <h4 className="font-medium">Payment Method</h4>
                    <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as any)}>
                      <div className="flex items-center space-x-2 bg-muted/30 p-3 rounded-md">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex items-center cursor-pointer">
                          <CreditCard size={18} className="mr-2 text-brand-primary" />
                          Card Payment
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 bg-muted/30 p-3 rounded-md">
                        <RadioGroupItem value="upi" id="upi" />
                        <Label htmlFor="upi" className="flex items-center cursor-pointer">
                          <Smartphone size={18} className="mr-2 text-brand-primary" />
                          UPI / Wallet
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 bg-muted/30 p-3 rounded-md">
                        <RadioGroupItem value="cash" id="cash" />
                        <Label htmlFor="cash" className="flex items-center cursor-pointer">
                          Cash on Delivery
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
                
                <CardFooter className="flex-col space-y-2">
                  <Button 
                    className="w-full bg-brand-primary hover:bg-brand-accent text-white transition-colors"
                    onClick={handleCheckout}
                    disabled={isProcessingOrder}
                  >
                    {isProcessingOrder ? <Loader size="small" /> : "Place Order"}
                  </Button>
                  
                  <div className="text-xs text-muted-foreground text-center">
                    By placing your order, you agree to our{" "}
                    <Link to="/terms" className="text-brand-primary hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-brand-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Cart;
