import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  Sofa,
  MessageCircle,
  Phone,
  ArrowRight,
  Palette,
  Ruler
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const furnitureProducts = [
  {
    id: 1,
    name: "Smart LED Sofa - Milano",
    category: "Living Room",

    rating: 4.9,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format",
    features: ["LED Ambient", "USB Charging", "Reclining", "Premium Leather"],
    description: "Luxury 3-seater sofa with integrated LED ambient lighting and charging ports",
    specifications: "3-Seater • LED RGB Strips • USB Charging Ports • Premium Italian Leather • Reclining Function"
  },
  {
    id: 2,
    name: "Illuminated Coffee Table",
    category: "Tables",

    rating: 4.8,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format",
    features: ["Wireless Charging", "LED Strips", "Tempered Glass", "Storage"],
    description: "Contemporary coffee table with wireless charging pad and LED strip lighting",
    specifications: "120x60cm • Wireless Charging • LED Strips • Tempered Glass Top • Hidden Storage"
  },
  {
    id: 3,
    name: "LED Gaming Chair Pro",
    category: "Office",

    rating: 4.7,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format",
    features: ["RGB Lighting", "Ergonomic", "4D Armrests", "Lumbar Support"],
    description: "Professional gaming chair with customizable RGB lighting system",
    specifications: "Ergonomic Design • RGB LED System • 4D Armrests • Memory Foam • Height Adjustable"
  },
  {
    id: 4,
    name: "Smart Bookshelf Display",
    category: "Storage",

    rating: 4.9,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format",
    features: ["LED Accent", "5 Shelves", "Cable Management", "Remote Control"],
    description: "Minimalist bookshelf with integrated LED accent lighting and smart controls",
    specifications: "180x80x30cm • LED Accent Lighting • 5 Adjustable Shelves • Cable Management • Remote Control"
  },
  {
    id: 5,
    name: "Illuminated Dining Set",
    category: "Dining",

    rating: 4.8,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format",
    features: ["LED Base", "6 Chairs", "Extendable", "Modern Design"],
    description: "6-seater dining set with LED-illuminated base and contemporary styling",
    specifications: "6-Seater Set • LED Base Lighting • Extendable Table • Modern Design • Premium Materials"
  },
  {
    id: 6,
    name: "LED Wardrobe System",
    category: "Bedroom",

    rating: 4.9,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format",
    features: ["Interior LED", "Sliding Doors", "Motion Sensor", "Modular"],
    description: "Modular wardrobe system with motion-activated interior LED lighting",
    specifications: "Modular System • Motion Sensor LEDs • Sliding Doors • Interior Organization • Customizable"
  },
  {
    id: 7,
    name: "Smart Desk Station",
    category: "Office",

    rating: 4.8,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format",
    features: ["RGB Backlight", "Cable Management", "Adjustable Height", "USB Hub"],
    description: "Height-adjustable desk with RGB backlighting and integrated cable management",
    specifications: "Height Adjustable • RGB Backlighting • Cable Management • Built-in USB Hub • Ergonomic Design"
  },
  {
    id: 8,
    name: "LED Bar Counter",
    category: "Entertainment",

    rating: 4.7,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format",
    features: ["Color Changing", "Built-in Cooler", "Storage", "Bar Stools"],
    description: "Modern bar counter with color-changing LED system and built-in refrigeration",
    specifications: "Bar Counter Set • Color-Changing LEDs • Built-in Cooler • 2 Bar Stools • Storage Compartments"
  },
  {
    id: 9,
    name: "Illuminated TV Stand",
    category: "Entertainment",

    rating: 4.6,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format",
    features: ["LED Backlight", "Cable Management", "Floating Design", "Remote"],
    description: "Wall-mounted TV stand with ambient LED backlighting for enhanced viewing",
    specifications: "Wall Mount TV Stand • LED Backlighting • Cable Management • Floating Design • Remote Control"
  },
  {
    id: 10,
    name: "Smart Nightstand Pair",
    category: "Bedroom",

    rating: 4.8,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format",
    features: ["Touch Control", "Wireless Charging", "USB Ports", "LED Ambient"],
    description: "Set of 2 nightstands with touch-controlled LED lighting and wireless charging",
    specifications: "Set of 2 • Touch Control • Wireless Charging • USB Ports • LED Ambient Lighting"
  },
  {
    id: 11,
    name: "LED Mirror Vanity",
    category: "Bedroom",

    rating: 4.9,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format",
    features: ["Hollywood Style", "Dimmable LEDs", "Storage Drawers", "Anti-Fog"],
    description: "Hollywood-style vanity mirror with dimmable LED bulbs and storage drawers",
    specifications: "Hollywood Style • Dimmable LED Bulbs • Storage Drawers • Anti-Fog Mirror • Touch Controls"
  },
  {
    id: 12,
    name: "Floating Shelf System",
    category: "Storage",

    rating: 4.7,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format",
    features: ["LED Strip", "Invisible Mount", "3 Sizes", "Remote Control"],
    description: "Set of floating shelves with integrated LED strips and invisible mounting system",
    specifications: "3-Piece Set • Integrated LED Strips • Invisible Mounting • Remote Control • Multiple Sizes"
  }
];

const PRODUCTS_PER_PAGE = 6;
const categories = ['All', 'Living Room', 'Bedroom', 'Office', 'Dining', 'Entertainment', 'Storage'];

export function FurnitureCatalogSection() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const filteredProducts = selectedCategory === 'All' 
    ? furnitureProducts 
    : furnitureProducts.filter(product => 
        product.category.toLowerCase().includes(selectedCategory.toLowerCase())
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

  const handleContactClick = (product: typeof furnitureProducts[0]) => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="furniture-catalog" className="py-20 bg-gradient-to-br from-purple-950/20 via-slate-950 to-pink-950/20 relative overflow-hidden">
      <div className="absolute inset-0">
        {Array.from({ length: 20 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-purple-400/50 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 2, 0],
              opacity: [0, 1, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: i * 0.3,
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
            className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full mb-6 backdrop-blur-sm border-2 border-purple-400/30"
            whileHover={{ scale: 1.15, rotateX: 15 }}
            animate={{ 
              boxShadow: [
                '0 0 30px rgba(168, 85, 247, 0.4)',
                '0 0 50px rgba(168, 85, 247, 0.7)',
                '0 0 30px rgba(168, 85, 247, 0.4)'
              ]
            }}
            transition={{
              boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <Sofa className="w-12 h-12 text-purple-400" />
          </motion.div>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-purple-300 via-purple-400 to-pink-500 bg-clip-text text-transparent mb-6">
            LED Furniture Catalog
          </h2>
          <p className="text-2xl text-slate-300 max-w-4xl mx-auto">
            Transform your living spaces with our innovative furniture collection featuring integrated LED lighting technology
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
                  ? 'bg-purple-500 text-white border-purple-500 shadow-2xl'
                  : 'bg-transparent text-slate-300 border-slate-600 hover:border-purple-500 hover:text-purple-400'
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
              initial={{ opacity: 0, x: 50, rotateY: 10 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: -50, rotateY: -10 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16"
              style={{ transformStyle: "preserve-3d" }}
            >
              {getCurrentPageProducts().map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30, rotateX: 15 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ 
                    y: -20, 
                    scale: 1.05,
                    rotateY: 5,
                    rotateX: -5,
                    transition: { duration: 0.3 }
                  }}
                  className="group cursor-pointer"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <Card className="h-full bg-gradient-to-br from-slate-800/60 to-slate-900/60 border-slate-700 hover:border-purple-500/60 transition-all duration-500 overflow-hidden backdrop-blur-sm">
                    <div className="relative">
                      <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        className="w-full h-56 object-cover group-hover:scale-115 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-purple-500 text-white font-medium text-sm px-3 py-1">
                          {product.category}
                        </Badge>
                      </div>
                      <div className="absolute top-4 right-4 flex items-center space-x-1 bg-black/80 text-white px-3 py-1 rounded-full">
                        <Star className="w-4 h-4 fill-purple-400 text-purple-400" />
                        <span className="text-sm font-medium">{product.rating}</span>
                      </div>

                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-purple-500/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        initial={false}
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-purple-400 transition-colors">
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
                          <Badge key={i} variant="outline" className="text-xs border-purple-400/30 text-purple-300">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                      <div className="mb-6">
                        <span className="text-lg text-purple-400 font-medium">
                          Contact for Quote
                        </span>
                      </div>
                      <div className="flex gap-3">
                        <Button 
                          size="lg" 
                          className="flex-1 bg-purple-500 hover:bg-purple-600 text-white font-medium"
                          onClick={() => handleContactClick(product)}
                        >
                          <MessageCircle className="w-5 h-5 mr-2" />
                          Get Quote
                        </Button>
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <Button 
                            size="lg" 
                            variant="outline" 
                            className="border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white"
                          >
                            <Palette className="w-5 h-5" />
                          </Button>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
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

            <div className="flex items-center space-x-3">
              {Array.from({ length: totalPages }, (_, i) => (
                <motion.button
                  key={i}
                  onClick={() => flipToPage(i)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    i === currentPage ? 'bg-purple-500 scale-125' : 'bg-slate-600 hover:bg-slate-500'
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
          <Card className="glass-effect border-purple-500/30 p-8">
            <CardContent className="p-0">
              <h3 className="text-3xl font-bold text-foreground mb-4">
                Ready to Transform Your Space?
              </h3>
              <p className="text-slate-300 mb-6 text-lg">
                Get personalized furniture recommendations and custom sizing for your perfect LED furniture setup.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call: 0570514881
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Ruler className="w-5 h-5 mr-2" />
                  Custom Design
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}