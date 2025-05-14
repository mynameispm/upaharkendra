
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Clock, XCircle, Package, CreditCard, MapPin, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Loader from '@/components/Loader';

// Mock order data (same as in Orders.tsx)
const mockOrders = [
  {
    id: 'ORD123456',
    date: '2023-06-10',
    time: '12:30 PM',
    items: [
      { name: 'Veg Burger Deluxe', quantity: 1, price: 120 },
      { name: 'Fries', quantity: 1, price: 80 },
      { name: 'Soda', quantity: 1, price: 60 }
    ],
    total: 260,
    subtotal: 260,
    delivery_fee: 20,
    tax: 13,
    grand_total: 293,
    status: 'delivered',
    delivery_address: '123 College Road, Campus Area',
    payment_method: 'card',
    delivery_instructions: 'Please leave at reception'
  },
  {
    id: 'ORD123455',
    date: '2023-06-05',
    time: '7:45 PM',
    items: [
      { name: 'Paneer Tikka', quantity: 1, price: 180 },
      { name: 'Naan', quantity: 2, price: 30 },
      { name: 'Lassi', quantity: 1, price: 70 }
    ],
    total: 310,
    subtotal: 310,
    delivery_fee: 20,
    tax: 15.5,
    grand_total: 345.5,
    status: 'delivered',
    delivery_address: '123 College Road, Campus Area',
    payment_method: 'cash',
    delivery_instructions: ''
  },
  {
    id: 'ORD123454',
    date: '2023-05-28',
    time: '1:15 PM',
    items: [
      { name: 'Veget able Biryani', quantity: 1, price: 220 },
      { name: 'Raita', quantity: 1, price: 40 }
    ],
    total: 260,
    subtotal: 260,
    delivery_fee: 20,
    tax: 13,
    grand_total: 293,
    status: 'delivered',
    delivery_address: '123 College Road, Campus Area',
    payment_method: 'upi',
    delivery_instructions: 'Call when arrived'
  },
  {
    id: 'ORD123457',
    date: '2023-06-15',
    time: '6:00 PM',
    items: [
      { name: 'Masala Dosa', quantity: 2, price: 130 },
      { name: 'Veg Pulao', quantity: 1, price: 160 }
    ],
    total: 420,
    subtotal: 420,
    delivery_fee: 20,
    tax: 21,
    grand_total: 461,
    status: 'preparing',
    delivery_address: '123 College Road, Campus Area',
    payment_method: 'card',
    delivery_instructions: ''
  },
  {
    id: 'ORD123458',
    date: '2023-06-14',
    time: '8:30 PM',
    items: [
      { name: 'Pav Bhaji', quantity: 1, price: 140 },
      { name: 'Gulab Jamun', quantity: 2, price: 100 }
    ],
    total: 340,
    subtotal: 340,
    delivery_fee: 20,
    tax: 17,
    grand_total: 377,
    status: 'cancelled',
    delivery_address: '123 College Road, Campus Area',
    payment_method: 'upi',
    delivery_instructions: ''
  }
];

const OrderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState<any | null>(null);
  
  useEffect(() => {
    // Simulate API call
    const fetchOrder = () => {
      setIsLoading(true);
      
      setTimeout(() => {
        const foundOrder = mockOrders.find(order => order.id === id);
        setOrder(foundOrder || null);
        setIsLoading(false);
      }, 1000);
    };
    
    fetchOrder();
  }, [id]);
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle size={18} className="text-green-500" />;
      case 'preparing':
        return <Clock size={18} className="text-brand-primary" />;
      case 'cancelled':
        return <XCircle size={18} className="text-destructive" />;
      default:
        return <Package size={18} className="text-muted-foreground" />;
    }
  };
  
  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'Delivered';
      case 'preparing':
        return 'Preparing';
      case 'cancelled':
        return 'Cancelled';
      default:
        return 'Unknown';
    }
  };
  
  const getPaymentIcon = (method: string) => {
    switch (method) {
      case 'card':
        return <CreditCard size={16} className="text-brand-primary" />;
      case 'upi':
        return <Smartphone size={16} className="text-brand-primary" />;
      default:
        return null;
    }
  };
  
  const getPaymentText = (method: string) => {
    switch (method) {
      case 'card':
        return 'Card Payment';
      case 'upi':
        return 'UPI / Wallet';
      case 'cash':
        return 'Cash on Delivery';
      default:
        return 'Unknown';
    }
  };
  
  const handleReorder = () => {
    toast({
      title: "Reorder Initiated",
      description: "Your reorder has been added to cart",
    });
  };
  
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <div className="flex-grow flex items-center justify-center p-4">
          <div className="text-center max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-2">Login Required</h2>
            <p className="text-muted-foreground mb-6">
              Please sign in to view order details
            </p>
            <Link to="/login">
              <Button className="bg-brand-primary hover:bg-brand-accent text-white transition-colors">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
        
        <Footer />
      </div>
    );
  }
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader size="large" />
          <p className="mt-4 text-lg text-muted-foreground">Loading Order Details...</p>
        </div>
      </div>
    );
  }
  
  if (!order) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <div className="flex-grow flex items-center justify-center p-4">
          <div className="text-center max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-2">Order Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The order you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/orders">
              <Button className="bg-brand-primary hover:bg-brand-accent text-white transition-colors">
                View All Orders
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
        <div className="container max-w-4xl mx-auto">
          <div className="mb-8">
            <Link to="/orders" className="inline-flex items-center text-brand-primary hover:underline">
              <ArrowLeft size={16} className="mr-1" />
              Back to Orders
            </Link>
            <h1 className="text-3xl font-bold mt-2">Order Details</h1>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            {/* Order Header */}
            <div className="bg-brand-primary/10 p-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div>
                  <div className="flex items-center">
                    <h2 className="text-xl font-semibold">{order.id}</h2>
                    <div className="ml-3 px-3 py-1 rounded-full bg-white flex items-center text-sm">
                      {getStatusIcon(order.status)}
                      <span className="ml-2">{getStatusText(order.status)}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground mt-1">
                    Placed on {order.date} at {order.time}
                  </p>
                </div>
                
                {order.status !== 'cancelled' && (
                  <Button onClick={handleReorder}>Reorder</Button>
                )}
              </div>
            </div>
            
            {/* Order Items */}
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold mb-4">Order Items</h3>
              <div className="space-y-4">
                {order.items.map((item: any, index: number) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-muted/30 rounded-md flex items-center justify-center text-brand-primary">
                        {item.quantity}x
                      </div>
                      <div className="ml-3">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          ₹{item.price.toFixed(2)} each
                        </p>
                      </div>
                    </div>
                    <p className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span>₹{order.delivery_fee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax (5%)</span>
                  <span>₹{order.tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 mt-2 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₹{order.grand_total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            {/* Delivery Information */}
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold mb-4">Delivery Information</h3>
              <div className="flex items-start mb-4">
                <MapPin size={18} className="mr-2 text-brand-primary mt-1" />
                <div>
                  <p className="font-medium">Delivery Address</p>
                  <p className="text-muted-foreground">{order.delivery_address}</p>
                </div>
              </div>
              
              {order.delivery_instructions && (
                <div className="bg-muted/30 p-3 rounded-md">
                  <p className="font-medium">Delivery Instructions</p>
                  <p className="text-muted-foreground">{order.delivery_instructions}</p>
                </div>
              )}
            </div>
            
            {/* Payment Information */}
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Payment Information</h3>
              <div className="flex items-center">
                {getPaymentIcon(order.payment_method)}
                <span className={getPaymentIcon(order.payment_method) ? "ml-2" : ""}>
                  {getPaymentText(order.payment_method)}
                </span>
              </div>
            </div>
          </div>
          
          {/* Help Section */}
          <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-4">Need Help?</h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/contact">
                <Button variant="outline" className="w-full sm:w-auto">
                  Contact Support
                </Button>
              </Link>
              {order.status === 'preparing' && (
                <Button variant="outline" className="w-full sm:w-auto text-destructive border-destructive/20 hover:bg-destructive/10">
                  Cancel Order
                </Button>
              )}
              {order.status === 'delivered' && (
                <Button variant="outline" className="w-full sm:w-auto">
                  Report Issue
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default OrderDetail;
