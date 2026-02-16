import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Search, Package, Lightbulb, Sofa, Zap, Phone, Mail, MessageCircle, Eye } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
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

export function CatalogSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState('name');
  const [useLocalStorage, setUseLocalStorage] = useState(false);

  const apiBase = `https://${projectId}.supabase.co/functions/v1/make-server-52299eb6`;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Try to fetch from backend
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
      }
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'category':
        return a.category.localeCompare(b.category);
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      default:
        return 0;
    }
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'lighting': return <Lightbulb className="w-5 h-5" />;
      case 'furniture': return <Sofa className="w-5 h-5" />;
      case 'electrical': return <Zap className="w-5 h-5" />;
      default: return <Package className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'lighting': return 'bg-amber-500/20 text-amber-400 border-amber-400/30';
      case 'furniture': return 'bg-blue-500/20 text-blue-400 border-blue-400/30';
      case 'electrical': return 'bg-green-500/20 text-green-400 border-green-400/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-400/30';
    }
  };

  if (loading) {
    return (
      <section id="catalog" className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full mx-auto"
          />
          <p className="text-white mt-4">Loading products...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="catalog" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center justify-center p-2 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 rounded-full mb-6 border border-amber-400/30"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Package className="w-8 h-8 text-amber-400 mr-2" />
            <span className="text-amber-400 font-semibold">Product Catalog</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Our Premium
            <span className="block bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 bg-clip-text text-transparent">
              Product Range
            </span>
          </h2>
          
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Discover our comprehensive collection of premium LED lighting solutions, modern furniture, and electrical products designed for Saudi Arabia's future.
          </p>
        </motion.div>

        {/* Search and Filter Controls */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12 space-y-4 lg:space-y-0 lg:flex lg:items-center lg:gap-6"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-amber-400"
            />
          </div>
          
          <div className="flex gap-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-40 bg-slate-800/50 border-slate-600 text-white">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="lighting">LED Lighting</SelectItem>
                <SelectItem value="furniture">Furniture</SelectItem>
                <SelectItem value="electrical">Electrical</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-32 bg-slate-800/50 border-slate-600 text-white">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="category">Category</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Package className="w-16 h-16 text-slate-500 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-slate-300 mb-2">No Products Found</h3>
            <p className="text-slate-400 max-w-md mx-auto">
              {searchTerm || selectedCategory !== 'all' 
                ? "Try adjusting your search or filter criteria." 
                : "Products will be displayed here once they are added to the catalog."
              }
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card className="bg-slate-800/50 border-slate-700 overflow-hidden backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300">
                  {product.image && (
                    <div className="relative h-48 overflow-hidden">
                      <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <Badge className={`absolute top-3 left-3 ${getCategoryColor(product.category)}`}>
                        {getCategoryIcon(product.category)}
                        <span className="ml-1 capitalize">{product.category}</span>
                      </Badge>
                    </div>
                  )}
                  
                  <CardContent className="p-6">
                    <CardTitle className="text-white mb-3 group-hover:text-amber-400 transition-colors">
                      {product.name}
                    </CardTitle>
                    
                    <CardDescription className="text-slate-300 mb-4 line-clamp-2">
                      {product.description}
                    </CardDescription>

                    {product.features && product.features.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-slate-200 mb-2">Key Features:</h4>
                        <ul className="text-sm text-slate-400 space-y-1">
                          {product.features.slice(0, 3).map((feature, idx) => (
                            <li key={idx} className="flex items-center">
                              <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mr-2" />
                              {feature}
                            </li>
                          ))}
                          {product.features.length > 3 && (
                            <li className="text-xs text-slate-500">
                              +{product.features.length - 3} more features
                            </li>
                          )}
                        </ul>
                      </div>
                    )}

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-amber-400 border-amber-400/50">
                          Contact for Quote
                        </Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
                          onClick={() => {
                            const element = document.getElementById('contact');
                            if (element) {
                              element.scrollIntoView({ behavior: 'smooth' });
                            }
                          }}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <Card className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 border-slate-700 backdrop-blur-sm">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Need More Information?
              </h3>
              <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                Contact our team for detailed product specifications, customization options, and competitive quotes tailored to your project needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  className="bg-green-500 hover:bg-green-600 text-black"
                  onClick={() => {
                    const element = document.getElementById('contact');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Get Quote
                </Button>
                <Button
                  variant="outline"
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                  onClick={() => window.open('tel:0570514881')}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call: 0570514881
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}