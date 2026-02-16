import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import { Separator } from './ui/separator';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Upload, 
  Package, 
  Users, 
  MessageSquare, 
  Mail, 
  ArrowLeft,
  Save,
  X,
  Image as ImageIcon,
  Eye,
  LogOut,
  Shield
} from 'lucide-react';
import { toast } from 'sonner';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface Product {
  id: string;
  name: string;
  description: string;
  category: 'lighting' | 'furniture' | 'electrical';
  specifications: string;
  features: string[];
  image?: string;
  createdAt: string;
  updatedAt: string;
}

interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  productInterest?: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'closed';
}

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  createdAt: string;
  replies: Array<{
    id: string;
    content: string;
    author: string;
    createdAt: string;
  }>;
}

interface AdminDashboardProps {
  onLogout?: () => void;
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [forumPosts, setForumPosts] = useState<ForumPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [useLocalStorage, setUseLocalStorage] = useState(false);

  // Product form state
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    category: 'lighting' as 'lighting' | 'furniture' | 'electrical',
    specifications: '',
    features: [''],
    image: null as File | null
  });

  const apiBase = `https://${projectId}.supabase.co/functions/v1/make-server-52299eb6`;

  // Fetch data functions
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiBase}/products`, {
        headers: { 'Authorization': `Bearer ${publicAnonKey}` }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      if (result.success) {
        setProducts(result.data || []);
        setUseLocalStorage(false);
      } else {
        throw new Error(result.error || 'Failed to load products');
      }
    } catch (error) {
      // Silently fallback to localStorage without logging errors
      const localProducts = localStorage.getItem('ambienco_products');
      if (localProducts) {
        setProducts(JSON.parse(localProducts));
        setUseLocalStorage(true);
      } else {
        setProducts([]);
        setUseLocalStorage(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchContacts = async () => {
    try {
      const response = await fetch(`${apiBase}/contacts`, {
        headers: { 'Authorization': `Bearer ${publicAnonKey}` }
      });
      const result = await response.json();
      if (result.success) {
        setContacts(result.data || []);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
      // Fail silently to avoid interrupting the UI if backend is offline
    }
  };

  const fetchForumPosts = async () => {
    try {
      const response = await fetch(`${apiBase}/forum/posts`, {
        headers: { 'Authorization': `Bearer ${publicAnonKey}` }
      });
      const result = await response.json();
      if (result.success) {
        setForumPosts(result.data || []);
      }
    } catch (error) {
      console.error('Error fetching forum posts:', error);
      // Fail silently
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchContacts();
    fetchForumPosts();
  }, []);

  // Product management functions
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (useLocalStorage) {
      // Handle localStorage mode
      const newProduct: Product = {
        id: `${productForm.category}-${Date.now()}`,
        name: productForm.name,
        description: productForm.description,
        category: productForm.category,
        specifications: productForm.specifications,
        features: productForm.features.filter(f => f.trim() !== ''),
        image: productForm.image ? URL.createObjectURL(productForm.image) : undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      const updatedProducts = [...products, newProduct];
      setProducts(updatedProducts);
      localStorage.setItem('ambienco_products', JSON.stringify(updatedProducts));
      
      toast.success('Product added successfully (Local Storage)');
      setShowAddProduct(false);
      resetProductForm();
      return;
    }
    
    try {
      setLoading(true);
      
      const formData = new FormData();
      formData.append('productData', JSON.stringify({
        name: productForm.name,
        description: productForm.description,
        category: productForm.category,
        specifications: productForm.specifications,
        features: productForm.features.filter(f => f.trim() !== '')
      }));
      
      if (productForm.image) {
        formData.append('image', productForm.image);
      }
      
      const response = await fetch(`${apiBase}/products`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${publicAnonKey}` },
        body: formData
      });
      
      const result = await response.json();
      if (result.success) {
        toast.success('Product added successfully');
        setShowAddProduct(false);
        resetProductForm();
        fetchProducts();
      } else {
        toast.error(result.error || 'Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    
    if (useLocalStorage) {
      // Handle localStorage mode
      const updatedProduct: Product = {
        ...editingProduct,
        name: productForm.name,
        description: productForm.description,
        category: productForm.category,
        specifications: productForm.specifications,
        features: productForm.features.filter(f => f.trim() !== ''),
        image: productForm.image ? URL.createObjectURL(productForm.image) : editingProduct.image,
        updatedAt: new Date().toISOString()
      };
      
      const updatedProducts = products.map(p => p.id === editingProduct.id ? updatedProduct : p);
      setProducts(updatedProducts);
      localStorage.setItem('ambienco_products', JSON.stringify(updatedProducts));
      
      toast.success('Product updated successfully (Local Storage)');
      setEditingProduct(null);
      resetProductForm();
      return;
    }
    
    try {
      setLoading(true);
      
      const formData = new FormData();
      formData.append('productData', JSON.stringify({
        name: productForm.name,
        description: productForm.description,
        category: productForm.category,
        specifications: productForm.specifications,
        features: productForm.features.filter(f => f.trim() !== '')
      }));
      
      if (productForm.image) {
        formData.append('image', productForm.image);
      }
      
      const response = await fetch(`${apiBase}/products/${editingProduct.id}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${publicAnonKey}` },
        body: formData
      });
      
      const result = await response.json();
      if (result.success) {
        toast.success('Product updated successfully');
        setEditingProduct(null);
        resetProductForm();
        fetchProducts();
      } else {
        toast.error(result.error || 'Failed to update product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Failed to update product');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (useLocalStorage) {
      // Handle localStorage mode
      const updatedProducts = products.filter(p => p.id !== id);
      setProducts(updatedProducts);
      localStorage.setItem('ambienco_products', JSON.stringify(updatedProducts));
      toast.success('Product deleted successfully (Local Storage)');
      return;
    }
    
    try {
      const response = await fetch(`${apiBase}/products/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${publicAnonKey}` }
      });
      
      const result = await response.json();
      if (result.success) {
        toast.success('Product deleted successfully');
        fetchProducts();
      } else {
        toast.error(result.error || 'Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    }
  };

  const resetProductForm = () => {
    setProductForm({
      name: '',
      description: '',
      category: 'lighting',
      specifications: '',
      features: [''],
      image: null
    });
  };

  const startEditing = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      description: product.description,
      category: product.category,
      specifications: product.specifications,
      features: product.features.length > 0 ? product.features : [''],
      image: null
    });
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...productForm.features];
    newFeatures[index] = value;
    setProductForm({ ...productForm, features: newFeatures });
  };

  const addFeature = () => {
    setProductForm({ ...productForm, features: [...productForm.features, ''] });
  };

  const removeFeature = (index: number) => {
    const newFeatures = productForm.features.filter((_, i) => i !== index);
    setProductForm({ ...productForm, features: newFeatures.length > 0 ? newFeatures : [''] });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Shield className="w-8 h-8 text-amber-400" />
              <div>
                <h1 className="text-3xl font-bold text-white mb-1">Ambienco Admin Dashboard</h1>
                <p className="text-slate-400">Secure administration panel</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="text-right mr-3">
              <p className="text-sm text-slate-300 font-medium">Administrator</p>
              <p className="text-xs text-slate-500">Authenticated Session</p>
            </div>
            
            <Button
              variant="outline"
              onClick={onLogout}
              className="border-red-600 text-red-400 hover:bg-red-600/20"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
            
            <Button
              variant="outline"
              onClick={() => {
                if (onLogout) {
                  onLogout();
                } else {
                  window.location.hash = '';
                  window.location.reload();
                }
              }}
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Website
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Package className="w-8 h-8 text-amber-400" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-300">Total Products</p>
                  <p className="text-2xl font-bold text-white">{products.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Mail className="w-8 h-8 text-blue-400" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-300">Contact Inquiries</p>
                  <p className="text-2xl font-bold text-white">{contacts.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center">
                <MessageSquare className="w-8 h-8 text-green-400" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-300">Forum Posts</p>
                  <p className="text-2xl font-bold text-white">{forumPosts.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="w-8 h-8 text-purple-400" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-300">New Contacts</p>
                  <p className="text-2xl font-bold text-white">
                    {contacts.filter(c => c.status === 'new').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-slate-800 border-slate-700">
            <TabsTrigger value="products" className="data-[state=active]:bg-amber-600">
              <Package className="w-4 h-4 mr-2" />
              Products
            </TabsTrigger>
            <TabsTrigger value="contacts" className="data-[state=active]:bg-amber-600">
              <Mail className="w-4 h-4 mr-2" />
              Contacts
            </TabsTrigger>
            <TabsTrigger value="forum" className="data-[state=active]:bg-amber-600">
              <MessageSquare className="w-4 h-4 mr-2" />
              Forum
            </TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Product Management</h2>
              <Button
                onClick={() => {
                  setShowAddProduct(true);
                  resetProductForm();
                }}
                className="bg-amber-600 hover:bg-amber-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </div>

            {/* Add/Edit Product Form */}
            {(showAddProduct || editingProduct) && (
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    {editingProduct ? 'Edit Product' : 'Add New Product'}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setShowAddProduct(false);
                        setEditingProduct(null);
                        resetProductForm();
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-slate-200">Product Name</Label>
                        <Input
                          id="name"
                          value={productForm.name}
                          onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                          className="bg-slate-700 border-slate-600 text-white"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="category" className="text-slate-200">Category</Label>
                        <Select
                          value={productForm.category}
                          onValueChange={(value) => setProductForm({ ...productForm, category: value as any })}
                        >
                          <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="lighting">LED Lighting</SelectItem>
                            <SelectItem value="furniture">Furniture</SelectItem>
                            <SelectItem value="electrical">Electrical</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-slate-200">Description</Label>
                      <Textarea
                        id="description"
                        value={productForm.description}
                        onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                        className="bg-slate-700 border-slate-600 text-white"
                        rows={3}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="specifications" className="text-slate-200">Specifications</Label>
                      <Textarea
                        id="specifications"
                        value={productForm.specifications}
                        onChange={(e) => setProductForm({ ...productForm, specifications: e.target.value })}
                        className="bg-slate-700 border-slate-600 text-white"
                        rows={3}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-slate-200">Features</Label>
                      {productForm.features.map((feature, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            value={feature}
                            onChange={(e) => updateFeature(index, e.target.value)}
                            placeholder={`Feature ${index + 1}`}
                            className="bg-slate-700 border-slate-600 text-white"
                          />
                          {productForm.features.length > 1 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => removeFeature(index)}
                              className="border-slate-600 text-slate-300 hover:bg-slate-700"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addFeature}
                        className="border-slate-600 text-slate-300 hover:bg-slate-700"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Feature
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="image" className="text-slate-200">Product Image</Label>
                      <div className="flex items-center gap-4">
                        <Input
                          id="image"
                          type="file"
                          accept="image/*"
                          onChange={(e) => setProductForm({ ...productForm, image: e.target.files?.[0] || null })}
                          className="bg-slate-700 border-slate-600 text-white"
                        />
                        <ImageIcon className="w-5 h-5 text-slate-400" />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        type="submit"
                        disabled={loading}
                        className="bg-amber-600 hover:bg-amber-700"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        {editingProduct ? 'Update Product' : 'Add Product'}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setShowAddProduct(false);
                          setEditingProduct(null);
                          resetProductForm();
                        }}
                        className="border-slate-600 text-slate-300 hover:bg-slate-700"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Products List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="bg-slate-800 border-slate-700">
                  <CardContent className="p-4">
                    {product.image && (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-md mb-4"
                      />
                    )}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-white">{product.name}</h3>
                        <Badge variant="secondary" className="bg-amber-600/20 text-amber-400">
                          {product.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-300 line-clamp-2">{product.description}</p>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => startEditing(product)}
                          className="border-slate-600 text-slate-300 hover:bg-slate-700"
                        >
                          <Edit3 className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-red-600 text-red-400 hover:bg-red-600/20"
                            >
                              <Trash2 className="w-3 h-3 mr-1" />
                              Delete
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="bg-slate-800 border-slate-700">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-white">Delete Product</AlertDialogTitle>
                              <AlertDialogDescription className="text-slate-300">
                                Are you sure you want to delete "{product.name}"? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="border-slate-600 text-slate-300 hover:bg-slate-700">
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteProduct(product.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Contacts Tab */}
          <TabsContent value="contacts" className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Contact Inquiries</h2>
            <div className="space-y-4">
              {contacts.map((contact) => (
                <Card key={contact.id} className="bg-slate-800 border-slate-700">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-white">{contact.name}</h3>
                        <p className="text-slate-300">{contact.email}</p>
                        {contact.phone && <p className="text-slate-300">{contact.phone}</p>}
                        {contact.company && <p className="text-slate-300">{contact.company}</p>}
                      </div>
                      <Badge
                        variant={contact.status === 'new' ? 'destructive' : contact.status === 'contacted' ? 'default' : 'secondary'}
                      >
                        {contact.status}
                      </Badge>
                    </div>
                    <p className="text-slate-300 mb-4">{contact.message}</p>
                    {contact.productInterest && (
                      <p className="text-sm text-amber-400">Interested in: {contact.productInterest}</p>
                    )}
                    <p className="text-xs text-slate-500 mt-2">
                      Received: {new Date(contact.createdAt).toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Forum Tab */}
          <TabsContent value="forum" className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Forum Posts</h2>
            <div className="space-y-4">
              {forumPosts.map((post) => (
                <Card key={post.id} className="bg-slate-800 border-slate-700">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-white">{post.title}</h3>
                        <p className="text-slate-400">by {post.author}</p>
                      </div>
                      <Badge variant="outline" className="border-amber-600 text-amber-400">
                        {post.category}
                      </Badge>
                    </div>
                    <p className="text-slate-300 mb-4">{post.content}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-slate-500">
                        Posted: {new Date(post.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-slate-400">
                        {post.replies.length} replies
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}