import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  Lightbulb,
  Download,
  MessageCircle,
  Phone,
  Mail,
  ArrowRight,
  X,
  CheckCircle,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface Product {
  id: number;
  name: string;
  category: string;

  rating: number;
  image: string;
  features: string[];
  description: string;
  specifications: string;
}

interface InquiryForm {
  name: string;
  email: string;
  phone: string;
  company: string;
  quantity: string;
  message: string;
  urgency: 'low' | 'medium' | 'high';
  projectType: string;
}

interface InquiryStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message: string;
  inquiryId?: string;
}

const ledProducts: Product[] = [
  {
    id: 1,
    name: "Smart LED Bulb A60 WiFi",
    category: "Smart Bulbs",

    rating: 4.9,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=600&auto=format",
    features: ["16M Colors", "Voice Control", "Energy Efficient", "10W"],
    description: "WiFi-enabled smart bulb with millions of colors and scheduling features",
    specifications: "10W • E27 • 3000K-6500K • Smart App Control • Voice Compatible"
  },
  {
    id: 2,
    name: "Vintage Edison LED E27",
    category: "Decorative Bulbs", 

    rating: 4.8,
    image: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?q=80&w=600&auto=format",
    features: ["Warm 2700K", "Dimmable", "Long Life 25000h", "6W"],
    description: "Classic edison style with modern LED efficiency and warm ambiance",
    specifications: "6W • E27 • 2700K Warm White • Dimmable • 25,000 Hours Life"
  },
  {
    id: 3,
    name: "Premium LED Downlight 12W",
    category: "Downlights",

    rating: 4.9,
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?q=80&w=600&auto=format",
    features: ["IP44 Rated", "Adjustable", "High CRI 95", "3000K/4000K"],
    description: "Professional grade downlight for residential and commercial applications",
    specifications: "12W • IP44 • CRI 95 • 3000K/4000K • Adjustable Beam • 5 Year Warranty"
  },
  {
    id: 4,
    name: "Track Spotlight COB 20W",
    category: "Track Lighting",

    rating: 4.7,
    image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?q=80&w=600&auto=format",
    features: ["Beam 24°/36°", "Anti-Glare", "90° Tilt", "High Lumen"],
    description: "Precision lighting for accent and display applications with superior beam control",
    specifications: "20W COB • 24°/36° Beam • 90° Tilt • Anti-Glare Design • 1800 Lumens"
  },
  {
    id: 5,
    name: "Ultra Slim Panel 36W",
    category: "Panel Lights",

    rating: 4.8,
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?q=80&w=600&auto=format",
    features: ["12mm Thin", "Even Light", "Flicker Free", "4000K"],
    description: "Modern flat panel design for offices and commercial spaces with uniform illumination",
    specifications: "36W • 12mm Ultra Thin • 4000K Neutral • Flicker Free • 600x600mm"
  },
  {
    id: 6,
    name: "Smart Ceiling Light 24W",
    category: "Ceiling Lights",

    rating: 4.9,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=600&auto=format",
    features: ["WiFi Control", "Dimming", "Color Temperature", "Remote"],
    description: "Smart ceiling fixture with adjustable color temperature and wireless control",
    specifications: "24W • WiFi Smart • 3000K-6500K Tunable • Dimming • App Control"
  },
  {
    id: 7,
    name: "RGB LED Strip 5M Kit",
    category: "Strip Lights",

    rating: 4.8,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=600&auto=format",
    features: ["16M Colors", "Music Sync", "App Control", "60 LEDs/m"],
    description: "Flexible RGB strip with smart connectivity and music synchronization",
    specifications: "5M Strip • 60 LEDs/m • 16M Colors • Music Sync • Waterproof IP65"
  },
  {
    id: 8,
    name: "COB LED Strip Professional",
    category: "Professional Strip",

    rating: 4.9,
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?q=80&w=600&auto=format",
    features: ["Dot Free", "High Density", "Cuttable", "3000K/6000K"],
    description: "Continuous light output without visible dots for professional installations",
    specifications: "COB Technology • 320 LEDs/m • Dot Free • 3000K/6000K • CRI 95"
  },
  {
    id: 9,
    name: "Solar LED Garden Light",
    category: "Garden Lights",

    rating: 4.6,
    image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?q=80&w=600&auto=format",
    features: ["Solar Powered", "Motion Sensor", "IP65", "Auto On/Off"],
    description: "Eco-friendly solar powered garden lighting with intelligent motion detection",
    specifications: "Solar Panel 5W • Motion PIR • IP65 Waterproof • 8-10 Hours Runtime"
  },
  {
    id: 10,
    name: "LED Floodlight 50W",
    category: "Flood Lights",

    rating: 4.8,
    image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?q=80&w=600&auto=format",
    features: ["IP65", "Wide 110° Beam", "Heat Sink", "6500K"],
    description: "High power outdoor floodlight for security and area lighting applications",
    specifications: "50W • IP65 Outdoor • 110° Beam • 4500 Lumens • Aluminum Heat Sink"
  },
  {
    id: 11,
    name: "Industrial Highbay 100W",
    category: "Industrial",

    rating: 4.9,
    image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?q=80&w=600&auto=format",
    features: ["120° Beam", "13000 Lumens", "IP65", "5 Year Warranty"],
    description: "Heavy-duty industrial lighting for warehouses and high ceiling applications",
    specifications: "100W Industrial • 13,000 Lumens • IP65 • 120° Beam • 5 Year Warranty"
  },
  {
    id: 12,
    name: "Architectural Linear Light",
    category: "Architectural",

    rating: 4.8,
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?q=80&w=600&auto=format",
    features: ["Linear Design", "Linkable", "Aluminum Body", "Multiple Lengths"],
    description: "Sleek linear lighting system for modern architectural applications",
    specifications: "Linear LED • Linkable System • Aluminum Housing • 3000K/4000K/6000K"
  }
];

const PRODUCTS_PER_PAGE = 6;
const categories = ['All', 'Smart Bulbs', 'Downlights', 'Panel Lights', 'Strip Lights', 'Outdoor', 'Industrial', 'Architectural'];

export function LEDCatalogSection() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [inquiryForm, setInquiryForm] = useState<InquiryForm>({
    name: '',
    email: '',
    phone: '',
    company: '',
    quantity: '1',
    message: '',
    urgency: 'medium',
    projectType: 'general'
  });
  const [inquiryStatus, setInquiryStatus] = useState<InquiryStatus>({ type: 'idle', message: '' });
  
  const filteredProducts = selectedCategory === 'All' 
    ? ledProducts 
    : ledProducts.filter(product => 
        product.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        (selectedCategory === 'Outdoor' && (product.category.includes('Garden') || product.category.includes('Flood')))
      );
  
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  
  const getCurrentPageProducts = () => {
    const startIndex = currentPage * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  };
  
  const flipToPage = (pageIndex: number) => {
    if (pageIndex < 0 || pageIndex >= totalPages || isFlipping) return;
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentPage(pageIndex);
      setIsFlipping(false);
    }, 300);
  };

  const openInquiryForm = (product: Product) => {
    setSelectedProduct(product);
    setInquiryForm(prev => ({
      ...prev,
      message: `I'm interested in ${product.name}. Please provide more information and a quote.`
    }));
    setShowInquiryForm(true);
    setInquiryStatus({ type: 'idle', message: '' });
  };

  const closeInquiryForm = () => {
    setShowInquiryForm(false);
    setSelectedProduct(null);
    setInquiryForm({
      name: '',
      email: '',
      phone: '',
      company: '',
      quantity: '1',
      message: '',
      urgency: 'medium',
      projectType: 'general'
    });
    setInquiryStatus({ type: 'idle', message: '' });
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inquiryForm.name || !inquiryForm.email || !selectedProduct) {
      setInquiryStatus({ type: 'error', message: 'Please fill in all required fields' });
      return;
    }
    
    setInquiryStatus({ type: 'loading', message: 'Submitting your inquiry...' });
    
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-52299eb6/product-inquiry`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({
          ...inquiryForm,
          productId: selectedProduct.id.toString(),
          productName: selectedProduct.name,
          productCategory: selectedProduct.category,
          productPrice: "Contact for Quote"
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        setInquiryStatus({ 
          type: 'success', 
          message: result.message,
          inquiryId: result.inquiryId
        });
        
        setTimeout(() => {
          closeInquiryForm();
        }, 3000);
      } else {
        setInquiryStatus({ 
          type: 'error', 
          message: result.error || 'Failed to submit inquiry. Please try again.' 
        });
      }
    } catch (error) {
      console.error('Product inquiry submission error:', error);
      setInquiryStatus({ 
        type: 'error', 
        message: 'Network error. Please check your connection and try again.' 
      });
    }
  };

  return (
    <section id="led-catalog" className="py-20 bg-gradient-to-br from-amber-950/20 via-slate-950 to-yellow-950/20 relative overflow-hidden">
      <div className="absolute inset-0">
        {Array.from({ length: 25 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-amber-400/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1.5, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 rounded-full mb-6 backdrop-blur-sm border-2 border-amber-400/30"
            whileHover={{ scale: 1.1, rotateY: 10 }}
            animate={{ 
              boxShadow: [
                '0 0 30px rgba(245, 158, 11, 0.4)',
                '0 0 50px rgba(245, 158, 11, 0.7)',
                '0 0 30px rgba(245, 158, 11, 0.4)'
              ]
            }}
            transition={{
              boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <Lightbulb className="w-12 h-12 text-amber-400" />
          </motion.div>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent mb-6">
            LED Lighting Catalog
          </h2>
          <p className="text-2xl text-slate-300 max-w-4xl mx-auto">
            Discover our complete range of premium LED lighting solutions designed for every application and environment
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setCurrentPage(0);
              }}
              className={`px-8 py-4 rounded-full border-2 transition-all duration-300 text-lg font-medium ${
                selectedCategory === category
                  ? 'bg-amber-500 text-black border-amber-500 shadow-2xl glow-amber'
                  : 'bg-transparent text-slate-300 border-slate-600 hover:border-amber-500 hover:text-amber-400'
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedCategory}-${currentPage}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16"
            >
              {getCurrentPageProducts().map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -15, scale: 1.03 }}
                  className="group cursor-pointer"
                >
                  <Card className="h-full bg-gradient-to-br from-slate-800/60 to-slate-900/60 border-slate-700 hover:border-amber-500/60 transition-all duration-500 overflow-hidden backdrop-blur-sm">
                    <div className="relative">
                      <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        className="w-full h-56 object-cover group-hover:scale-115 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-amber-500 text-black font-medium text-sm px-3 py-1">
                          {product.category}
                        </Badge>
                      </div>
                      <div className="absolute top-4 right-4 flex items-center space-x-1 bg-black/80 text-white px-3 py-1 rounded-full">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span className="text-sm font-medium">{product.rating}</span>
                      </div>

                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-amber-500/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        initial={false}
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-amber-400 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                        {product.description}
                      </p>
                      <p className="text-xs text-slate-400 mb-4 font-mono">
                        {product.specifications}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {product.features.map((feature, i) => (
                          <Badge key={i} variant="outline" className="text-xs border-amber-400/30 text-amber-300">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                      <div className="mb-6">
                        <span className="text-lg text-amber-400 font-medium">
                          Contact for Quote
                        </span>
                      </div>
                      <div className="flex gap-3">
                        <Button 
                          size="lg" 
                          className="flex-1 bg-amber-500 hover:bg-amber-600 text-black font-medium"
                          onClick={() => openInquiryForm(product)}
                        >
                          <MessageCircle className="w-5 h-5 mr-2" />
                          Get Quote
                        </Button>
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <Button 
                            size="lg" 
                            variant="outline" 
                            className="border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black"
                          >
                            <Download className="w-5 h-5" />
                          </Button>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Enhanced Navigation */}
          <motion.div
            className="flex items-center justify-between border-t border-slate-700 pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center space-x-4">
              <motion.button
                onClick={() => flipToPage(currentPage - 1)}
                disabled={currentPage === 0 || isFlipping}
                className="flex items-center space-x-3 px-6 py-3 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-colors border border-slate-600"
                whileHover={{ scale: currentPage > 0 ? 1.05 : 1 }}
                whileTap={{ scale: currentPage > 0 ? 0.95 : 1 }}
              >
                <ChevronLeft className="w-5 h-5" />
                <span className="font-medium">Previous</span>
              </motion.button>
              
              <motion.button
                onClick={() => flipToPage(currentPage + 1)}
                disabled={currentPage === totalPages - 1 || isFlipping}
                className="flex items-center space-x-3 px-6 py-3 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-colors border border-slate-600"
                whileHover={{ scale: currentPage < totalPages - 1 ? 1.05 : 1 }}
                whileTap={{ scale: currentPage < totalPages - 1 ? 0.95 : 1 }}
              >
                <span className="font-medium">Next</span>
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Page Indicators */}
            <div className="flex items-center space-x-3">
              {Array.from({ length: totalPages }, (_, i) => (
                <motion.button
                  key={i}
                  onClick={() => flipToPage(i)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    i === currentPage ? 'bg-amber-500 scale-125' : 'bg-slate-600 hover:bg-slate-500'
                  }`}
                  whileHover={{ scale: 1.3 }}
                />
              ))}
            </div>

            <div className="text-lg text-muted-foreground">
              Page {currentPage + 1} of {totalPages} • {filteredProducts.length} products
            </div>
          </motion.div>
        </div>

        {/* Contact CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Card className="glass-effect border-amber-500/30 p-8">
            <CardContent className="p-0">
              <h3 className="text-3xl font-bold text-foreground mb-4">
                Need Help Choosing the Right LED Solution?
              </h3>
              <p className="text-slate-300 mb-6 text-lg">
                Our lighting experts are ready to help you select the perfect LED products for your project.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call: 0570514881
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Email Consultation
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Product Inquiry Modal */}
      <AnimatePresence>
        {showInquiryForm && selectedProduct && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={closeInquiryForm}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="relative bg-slate-900 border border-amber-500/30 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 20 }}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-foreground">Product Inquiry</h3>
                  <p className="text-amber-400 font-medium">{selectedProduct.name}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={closeInquiryForm}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>

              {/* Status Messages */}
              {inquiryStatus.type !== 'idle' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg border flex items-center space-x-3 mb-6 ${
                    inquiryStatus.type === 'success' 
                      ? 'bg-green-500/10 border-green-500/30 text-green-400'
                      : inquiryStatus.type === 'error'
                      ? 'bg-red-500/10 border-red-500/30 text-red-400'
                      : 'bg-blue-500/10 border-blue-500/30 text-blue-400'
                  }`}
                >
                  {inquiryStatus.type === 'loading' && <Loader2 className="w-5 h-5 animate-spin" />}
                  {inquiryStatus.type === 'success' && <CheckCircle className="w-5 h-5" />}
                  {inquiryStatus.type === 'error' && <AlertCircle className="w-5 h-5" />}
                  <div>
                    <p className="font-medium">{inquiryStatus.message}</p>
                    {inquiryStatus.inquiryId && (
                      <p className="text-sm opacity-80">Reference ID: {inquiryStatus.inquiryId}</p>
                    )}
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Name *</label>
                    <Input
                      type="text"
                      value={inquiryForm.name}
                      onChange={(e) => setInquiryForm(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Your full name"
                      className="bg-slate-800/50 border-slate-600 focus:border-amber-500"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Email *</label>
                    <Input
                      type="email"
                      value={inquiryForm.email}
                      onChange={(e) => setInquiryForm(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="your.email@company.com"
                      className="bg-slate-800/50 border-slate-600 focus:border-amber-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Phone</label>
                    <Input
                      type="tel"
                      value={inquiryForm.phone}
                      onChange={(e) => setInquiryForm(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+966 50 123 4567"
                      className="bg-slate-800/50 border-slate-600 focus:border-amber-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Company</label>
                    <Input
                      type="text"
                      value={inquiryForm.company}
                      onChange={(e) => setInquiryForm(prev => ({ ...prev, company: e.target.value }))}
                      placeholder="Your company name"
                      className="bg-slate-800/50 border-slate-600 focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Quantity</label>
                    <Input
                      type="number"
                      value={inquiryForm.quantity}
                      onChange={(e) => setInquiryForm(prev => ({ ...prev, quantity: e.target.value }))}
                      placeholder="1"
                      min="1"
                      className="bg-slate-800/50 border-slate-600 focus:border-amber-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Urgency</label>
                    <select
                      value={inquiryForm.urgency}
                      onChange={(e) => setInquiryForm(prev => ({ ...prev, urgency: e.target.value as 'low' | 'medium' | 'high' }))}
                      className="w-full px-3 py-2 bg-slate-800/50 border border-slate-600 rounded-md focus:border-amber-500 text-foreground"
                    >
                      <option value="low">Low - General inquiry</option>
                      <option value="medium">Medium - Planning phase</option>
                      <option value="high">High - Urgent project</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Message</label>
                  <Textarea
                    value={inquiryForm.message}
                    onChange={(e) => setInquiryForm(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Tell us about your project requirements..."
                    rows={4}
                    className="bg-slate-800/50 border-slate-600 focus:border-amber-500 resize-none"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button 
                    type="submit" 
                    className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-medium"
                    disabled={inquiryStatus.type === 'loading'}
                  >
                    {inquiryStatus.type === 'loading' ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <MessageCircle className="w-5 h-5 mr-2" />
                        Submit Inquiry
                      </>
                    )}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={closeInquiryForm}
                    className="border-slate-600 text-slate-300 hover:bg-slate-800"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}