
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Lock, MapPin, History, LogOut, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from '@/contexts/LocationContext';
import { useToast } from "@/hooks/use-toast";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MapComponent from '@/components/MapComponent';
import Loader from '@/components/Loader';

const Profile = () => {
  const { user, updateProfile, logout } = useAuth();
  const { location } = useLocation();
  const { toast } = useToast();
  
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      await updateProfile(formData);
      setIsEditing(false);
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleCancelEdit = () => {
    setIsEditing(false);
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
    });
  };
  
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  
  // Mock order history data
  const orderHistory = [
    {
      id: 'ORD123456',
      date: '2023-06-10',
      items: ['Veg Burger Deluxe', 'Fries', 'Soda'],
      total: 280,
      status: 'Delivered',
    },
    {
      id: 'ORD123455',
      date: '2023-06-05',
      items: ['Paneer Tikka', 'Naan', 'Lassi'],
      total: 350,
      status: 'Delivered',
    },
    {
      id: 'ORD123454',
      date: '2023-05-28',
      items: ['Vegetable Biryani', 'Raita'],
      total: 240,
      status: 'Delivered',
    },
  ];
  
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <div className="flex-grow flex items-center justify-center p-4">
          <div className="text-center max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-2">Login Required</h2>
            <p className="text-muted-foreground mb-6">
              Please sign in to view your profile
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
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="pt-24 pb-16 px-4">
        <div className="container max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden border">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-brand-primary to-brand-accent p-6 text-white">
              <div className="flex items-center">
                <div className="h-16 w-16 rounded-full bg-white/30 flex items-center justify-center text-white mr-4">
                  <User size={32} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  <p>{user.email}</p>
                </div>
              </div>
            </div>
            
            {/* Profile Content */}
            <Tabs defaultValue="account" className="p-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="account">
                  <User size={16} className="mr-2" />
                  Account
                </TabsTrigger>
                <TabsTrigger value="orders">
                  <History size={16} className="mr-2" />
                  Orders
                </TabsTrigger>
                <TabsTrigger value="addresses">
                  <MapPin size={16} className="mr-2" />
                  Addresses
                </TabsTrigger>
              </TabsList>
              
              {/* Account Tab */}
              <TabsContent value="account" className="mt-6 space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Personal Information</h2>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="flex items-center"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      <Edit size={16} className="mr-1" />
                      {isEditing ? 'Cancel' : 'Edit'}
                    </Button>
                  </div>
                  
                  {isEditing ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name</label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            disabled
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number</label>
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <label htmlFor="address" className="block text-sm font-medium mb-1">Address</label>
                          <Input
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      
                      <div className="flex justify-end space-x-2">
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </Button>
                        <Button 
                          type="submit"
                          disabled={isSaving}
                        >
                          {isSaving ? <Loader size="small" /> : "Save Changes"}
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <p className="text-sm text-muted-foreground">Full Name</p>
                          <p className="font-medium">{user.name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Email</p>
                          <p className="font-medium">{user.email}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Phone Number</p>
                          <p className="font-medium">{user.phone || 'Not provided'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Address</p>
                          <p className="font-medium">{user.address || 'Not provided'}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-4">Account Actions</h2>
                  <div className="space-y-3">
                    <Link to="/change-password">
                      <Button variant="outline" className="w-full justify-start">
                        <Lock size={16} className="mr-2" />
                        Change Password
                      </Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-destructive border-destructive/20 hover:bg-destructive/10"
                      onClick={handleLogout}
                    >
                      <LogOut size={16} className="mr-2" />
                      Sign Out
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              {/* Orders Tab */}
              <TabsContent value="orders" className="mt-6">
                <h2 className="text-xl font-semibold mb-4">Order History</h2>
                
                {orderHistory.length === 0 ? (
                  <div className="text-center py-12 bg-muted/30 rounded-lg">
                    <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                    <p className="text-muted-foreground mb-4">
                      You haven't placed any orders yet
                    </p>
                    <Link to="/menu">
                      <Button>Start Ordering</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orderHistory.map((order) => (
                      <div 
                        key={order.id} 
                        className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                      >
                        <div className="bg-muted/30 px-4 py-3 flex justify-between items-center">
                          <div>
                            <p className="font-medium">{order.id}</p>
                            <p className="text-sm text-muted-foreground">{order.date}</p>
                          </div>
                          <div className="flex items-center">
                            <span className="text-sm mr-2">Status:</span>
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                              {order.status}
                            </span>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="mb-3">
                            <p className="text-sm text-muted-foreground">Items</p>
                            <p>{order.items.join(', ')}</p>
                          </div>
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-sm text-muted-foreground">Total</p>
                              <p className="font-semibold">₹{order.total.toFixed(2)}</p>
                            </div>
                            <Link to={`/orders/${order.id}`}>
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
              
              {/* Addresses Tab */}
              <TabsContent value="addresses" className="mt-6">
                <h2 className="text-xl font-semibold mb-4">Saved Addresses</h2>
                
                <div className="bg-white rounded-lg">
                  <div className="border rounded-lg overflow-hidden mb-4">
                    <div className="bg-muted/30 px-4 py-3 flex justify-between items-center">
                      <p className="font-medium">Default Address</p>
                      <Link to="/location">
                        <Button variant="outline" size="sm">
                          Change
                        </Button>
                      </Link>
                    </div>
                    <div className="p-4">
                      {location ? (
                        <div className="flex items-start">
                          <MapPin size={18} className="mr-2 text-brand-primary mt-1" />
                          <div>
                            <p>{location.address}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Lat: {location.lat.toFixed(6)}, Lng: {location.lng.toFixed(6)}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="text-muted-foreground">
                          No default address set. 
                          <Link to="/location" className="text-brand-primary hover:underline ml-1">
                            Add one
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <MapComponent height="250px" interactive={false} />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Profile;
