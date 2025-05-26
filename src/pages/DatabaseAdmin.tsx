
import React, { useState, useEffect } from 'react';
import { useDatabase } from '@/hooks/useDatabase';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { MenuItem, DBCartItem, DBOrder, DBProfile } from '@/types';
import Navbar from '@/components/Navbar';
import { useToast } from '@/hooks/use-toast';

const DatabaseAdmin = () => {
  const { user } = useAuth();
  const db = useDatabase();
  const { toast } = useToast();
  
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [cartItems, setCartItems] = useState<DBCartItem[]>([]);
  const [orders, setOrders] = useState<DBOrder[]>([]);
  const [profile, setProfile] = useState<DBProfile | null>(null);
  const [loading, setLoading] = useState(false);
  
  // Form states
  const [editingMenuItem, setEditingMenuItem] = useState<MenuItem | null>(null);
  const [newMenuItem, setNewMenuItem] = useState({
    name: '',
    description: '',
    price: 0,
    image_url: '',
    category: '',
    vegetarian: false,
    rating: 0,
    cooking_time: '',
    popular: false,
    calories: 0,
    ingredients: [] as string[]
  });

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [menuData, cartData, ordersData, profileData] = await Promise.all([
        db.getMenuItems(),
        db.getCartItems(),
        db.getOrders(),
        db.getProfile()
      ]);
      
      setMenuItems(menuData);
      setCartItems(cartData);
      setOrders(ordersData);
      setProfile(profileData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMenuItem = async () => {
    try {
      await db.addMenuItem({
        ...newMenuItem,
        available: true
      });
      
      setNewMenuItem({
        name: '',
        description: '',
        price: 0,
        image_url: '',
        category: '',
        vegetarian: false,
        rating: 0,
        cooking_time: '',
        popular: false,
        calories: 0,
        ingredients: []
      });
      
      await loadData();
    } catch (error) {
      console.error('Error adding menu item:', error);
    }
  };

  const handleUpdateMenuItem = async (item: MenuItem) => {
    try {
      await db.updateMenuItem(item.id, item);
      setEditingMenuItem(null);
      await loadData();
    } catch (error) {
      console.error('Error updating menu item:', error);
    }
  };

  const handleDeleteMenuItem = async (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      try {
        await db.deleteMenuItem(id);
        await loadData();
      } catch (error) {
        console.error('Error deleting menu item:', error);
      }
    }
  };

  const handleUpdateProfile = async () => {
    if (!profile) return;
    
    try {
      await db.updateProfile(profile);
      toast({
        title: "Success",
        description: "Profile updated successfully"
      });
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Card>
            <CardContent className="p-6">
              <p className="text-center">Please login to access the database admin panel.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 pt-20 px-4">
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-8">Database Administration</h1>
          
          <Tabs defaultValue="menu" className="space-y-6">
            <TabsList>
              <TabsTrigger value="menu">Menu Items</TabsTrigger>
              <TabsTrigger value="cart">Cart Items</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>

            {/* Menu Items Tab */}
            <TabsContent value="menu" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Add New Menu Item</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Item Name"
                      value={newMenuItem.name}
                      onChange={(e) => setNewMenuItem({...newMenuItem, name: e.target.value})}
                    />
                    <Input
                      placeholder="Category"
                      value={newMenuItem.category}
                      onChange={(e) => setNewMenuItem({...newMenuItem, category: e.target.value})}
                    />
                    <Input
                      type="number"
                      placeholder="Price"
                      value={newMenuItem.price}
                      onChange={(e) => setNewMenuItem({...newMenuItem, price: Number(e.target.value)})}
                    />
                    <Input
                      placeholder="Image URL"
                      value={newMenuItem.image_url}
                      onChange={(e) => setNewMenuItem({...newMenuItem, image_url: e.target.value})}
                    />
                    <Input
                      placeholder="Cooking Time"
                      value={newMenuItem.cooking_time}
                      onChange={(e) => setNewMenuItem({...newMenuItem, cooking_time: e.target.value})}
                    />
                    <Input
                      type="number"
                      placeholder="Rating (0-5)"
                      value={newMenuItem.rating}
                      onChange={(e) => setNewMenuItem({...newMenuItem, rating: Number(e.target.value)})}
                    />
                  </div>
                  <Textarea
                    placeholder="Description"
                    value={newMenuItem.description}
                    onChange={(e) => setNewMenuItem({...newMenuItem, description: e.target.value})}
                  />
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={newMenuItem.vegetarian}
                        onChange={(e) => setNewMenuItem({...newMenuItem, vegetarian: e.target.checked})}
                        className="mr-2"
                      />
                      Vegetarian
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={newMenuItem.popular}
                        onChange={(e) => setNewMenuItem({...newMenuItem, popular: e.target.checked})}
                        className="mr-2"
                      />
                      Popular
                    </label>
                  </div>
                  <Button onClick={handleAddMenuItem} className="w-full">
                    <Plus className="mr-2" size={16} />
                    Add Menu Item
                  </Button>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {menuItems.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-4">
                      {editingMenuItem?.id === item.id ? (
                        <div className="space-y-3">
                          <Input
                            value={editingMenuItem.name}
                            onChange={(e) => setEditingMenuItem({...editingMenuItem, name: e.target.value})}
                          />
                          <Input
                            type="number"
                            value={editingMenuItem.price}
                            onChange={(e) => setEditingMenuItem({...editingMenuItem, price: Number(e.target.value)})}
                          />
                          <Textarea
                            value={editingMenuItem.description || ''}
                            onChange={(e) => setEditingMenuItem({...editingMenuItem, description: e.target.value})}
                          />
                          <div className="flex gap-2">
                            <Button size="sm" onClick={() => handleUpdateMenuItem(editingMenuItem)}>
                              <Save size={16} />
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => setEditingMenuItem(null)}>
                              <X size={16} />
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <img src={item.image_url || ''} alt={item.name} className="w-full h-32 object-cover rounded mb-3" />
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                          <p className="font-bold">₹{item.price}</p>
                          <div className="flex gap-2 mt-2">
                            {item.vegetarian && <Badge variant="secondary">Veg</Badge>}
                            {item.popular && <Badge variant="default">Popular</Badge>}
                          </div>
                          <div className="flex gap-2 mt-3">
                            <Button size="sm" variant="outline" onClick={() => setEditingMenuItem(item)}>
                              <Edit size={16} />
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleDeleteMenuItem(item.id)}>
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Cart Items Tab */}
            <TabsContent value="cart">
              <Card>
                <CardHeader>
                  <CardTitle>Current Cart Items ({cartItems.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  {cartItems.length === 0 ? (
                    <p>No items in cart</p>
                  ) : (
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex justify-between items-center p-3 border rounded">
                          <div>
                            <p className="font-medium">Cart Item ID: {item.id}</p>
                            <p className="text-sm text-gray-600">Menu Item ID: {item.menu_item_id}</p>
                            <p className="text-sm">Quantity: {item.quantity}</p>
                          </div>
                          <Button 
                            size="sm" 
                            variant="destructive" 
                            onClick={() => db.removeFromCart(item.id)}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>Order History ({orders.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  {orders.length === 0 ? (
                    <p>No orders found</p>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div key={order.id} className="p-4 border rounded">
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="font-semibold">Order #{order.id.slice(0, 8)}</h3>
                            <Badge>{order.status}</Badge>
                          </div>
                          <p>Total: ₹{order.total}</p>
                          <p className="text-sm text-gray-600">
                            Ordered on: {new Date(order.created_at).toLocaleDateString()}
                          </p>
                          {order.delivery_address && (
                            <p className="text-sm">Address: {order.delivery_address}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                </CardHeader>
                <CardContent>
                  {profile ? (
                    <div className="space-y-4">
                      <Input
                        placeholder="Full Name"
                        value={profile.full_name || ''}
                        onChange={(e) => setProfile({...profile, full_name: e.target.value})}
                      />
                      <Input
                        placeholder="Email"
                        value={profile.email || ''}
                        onChange={(e) => setProfile({...profile, email: e.target.value})}
                      />
                      <Input
                        placeholder="Phone"
                        value={profile.phone || ''}
                        onChange={(e) => setProfile({...profile, phone: e.target.value})}
                      />
                      <Textarea
                        placeholder="Address"
                        value={profile.address || ''}
                        onChange={(e) => setProfile({...profile, address: e.target.value})}
                      />
                      <Button onClick={handleUpdateProfile}>
                        Update Profile
                      </Button>
                    </div>
                  ) : (
                    <p>Loading profile...</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default DatabaseAdmin;
