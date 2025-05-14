
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Filter, Package, CheckCircle, Clock, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Loader from '@/components/Loader';

// Mock order data
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
    status: 'delivered',
    delivery_address: '123 College Road, Campus Area',
    payment_method: 'card'
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
    status: 'delivered',
    delivery_address: '123 College Road, Campus Area',
    payment_method: 'cash'
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
    status: 'delivered',
    delivery_address: '123 College Road, Campus Area',
    payment_method: 'upi'
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
    status: 'preparing',
    delivery_address: '123 College Road, Campus Area',
    payment_method: 'card'
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
    status: 'cancelled',
    delivery_address: '123 College Road, Campus Area',
    payment_method: 'upi'
  }
];

const Orders = () => {
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');
  const [orders, setOrders] = useState(mockOrders);
  const [filteredOrders, setFilteredOrders] = useState(mockOrders);
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    // Filter and sort orders
    let filtered = [...orders];
    
    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(order => 
        order.id.toLowerCase().includes(term) || 
        order.items.some(item => item.name.toLowerCase().includes(term))
      );
    }
    
    // Sort orders
    if (sortOrder === 'newest') {
      filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sortOrder === 'oldest') {
      filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else if (sortOrder === 'highest') {
      filtered.sort((a, b) => b.total - a.total);
    } else if (sortOrder === 'lowest') {
      filtered.sort((a, b) => a.total - b.total);
    }
    
    setFilteredOrders(filtered);
  }, [orders, statusFilter, searchTerm, sortOrder]);
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'preparing':
        return <Clock size={16} className="text-brand-primary" />;
      case 'cancelled':
        return <XCircle size={16} className="text-destructive" />;
      default:
        return <Package size={16} className="text-muted-foreground" />;
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
  
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <div className="flex-grow flex items-center justify-center p-4">
          <div className="text-center max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-2">Login Required</h2>
            <p className="text-muted-foreground mb-6">
              Please sign in to view your orders
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
          <p className="mt-4 text-lg text-muted-foreground">Loading Orders...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="pt-24 pb-16 px-4">
        <div className="container max-w-4xl mx-auto">
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center text-brand-primary hover:underline">
              <ArrowLeft size={16} className="mr-1" />
              Back to Home
            </Link>
            <h1 className="text-3xl font-bold mt-2">Your Orders</h1>
            <p className="text-muted-foreground">
              View and track all your orders
            </p>
          </div>
          
          {/* Search and Filter Controls */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 mb-8">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                className="pl-10 bg-background border-muted focus-visible:ring-brand-primary"
                placeholder="Search orders by ID or items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-auto">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Orders</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="preparing">Preparing</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="w-full sm:w-auto">
                <Select value={sortOrder} onValueChange={setSortOrder}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="highest">Price: High to Low</SelectItem>
                    <SelectItem value="lowest">Price: Low to High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          {/* Orders List */}
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12 bg-muted/30 rounded-lg">
              <h3 className="text-lg font-medium mb-2">No orders found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || statusFilter !== 'all' 
                  ? "Try adjusting your filters to see more orders" 
                  : "You haven't placed any orders yet"}
              </p>
              {searchTerm || statusFilter !== 'all' ? (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm('');
                    setStatusFilter('all');
                  }}
                >
                  Clear Filters
                </Button>
              ) : (
                <Link to="/menu">
                  <Button>Browse Menu</Button>
                </Link>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <Link to={`/orders/${order.id}`} key={order.id}>
                  <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow bg-white">
                    <div className="bg-muted/30 px-4 py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                      <div>
                        <div className="flex items-center">
                          <p className="font-medium">{order.id}</p>
                          <div className="ml-2 px-2 py-0.5 rounded-full bg-muted flex items-center text-xs">
                            {getStatusIcon(order.status)}
                            <span className="ml-1">{getStatusText(order.status)}</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {order.date} • {order.time}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">₹{order.total.toFixed(2)}</p>
                        <p className="text-xs text-muted-foreground">
                          {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                        </p>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="mb-3">
                        <p className="text-sm text-muted-foreground">Items</p>
                        <p className="truncate">
                          {order.items.map(item => `${item.quantity}x ${item.name}`).join(', ')}
                        </p>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-muted-foreground">Delivery Address</p>
                          <p className="truncate max-w-xs">{order.delivery_address}</p>
                        </div>
                        <Button variant="ghost" size="sm" className="text-brand-primary">
                          View Details
                          <ArrowLeft size={14} className="ml-1 rotate-180" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Orders;
