import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  Zap,
  Download,
  Eye,
  Settings,
  Shield
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const electricalProducts = [
  {
    id: 1,
    name: "Smart WiFi Switch",
    category: "Switches",

    rating: 4.9,
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?q=80&w=400&auto=format",
    features: ["Voice Control", "App Control", "Scheduling", "No Neutral Wire"],
    description: "WiFi-enabled smart switch with voice control and scheduling capabilities"
  },
  {
    id: 2,
    name: "LED Dimmer Switch",
    category: "Dimmers",

    rating: 4.8,
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?q=80&w=400&auto=format",
    features: ["Trailing Edge", "Memory Function", "Soft Start", "600W"],
    description: "Advanced LED-compatible dimmer with trailing edge technology"
  },
  {
    id: 3,
    name: "Motion Sensor PIR",
    category: "Sensors",

    rating: 4.7,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=400&auto=format",
    features: ["360° Detection", "Daylight Sensor", "Adjustable Timer", "IP65"],
    description: "Advanced PIR motion sensor with 360-degree detection and daylight sensing"
  },
  {
    id: 4,
    name: "LED Driver 60W",
    category: "Drivers",

    rating: 4.8,
    image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?q=80&w=400&auto=format",
    features: ["Constant Current", "Dimmable", "Surge Protection", "5 Year Warranty"],
    description: "High-efficiency constant current LED driver with dimming capability"
  },
  {
    id: 5,
    name: "Distribution Panel 12-Way",
    category: "Panels",

    rating: 4.9,
    image: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?q=80&w=400&auto=format",
    features: ["IP65", "12 Modules", "MCB Ready", "SASO Certified"],
    description: "Professional 12-way distribution panel with weather protection"
  },
  {
    id: 6,
    name: "Smart Timer Switch",
    category: "Timers",

    rating: 4.8,
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?q=80&w=400&auto=format",
    features: ["Digital Display", "7-Day Programming", "Random Mode", "Backup Battery"],
    description: "7-day programmable timer switch with digital display and backup battery"
  },
  {
    id: 7,
    name: "Power Outlet USB",
    category: "Outlets",

    rating: 4.6,
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?q=80&w=400&auto=format",
    features: ["Dual USB", "Quick Charge", "Child Safety", "Surge Protection"],
    description: "Wall outlet with integrated USB charging ports and surge protection"
  },
  {
    id: 8,
    name: "RCBO Circuit Breaker",
    category: "Protection",

    rating: 4.9,
    image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?q=80&w=400&auto=format",
    features: ["30mA RCD", "16A MCB", "Type A", "Din Rail Mount"],
    description: "Combined RCBO providing both overcurrent and residual current protection"
  },
  {
    id: 9,
    name: "Cable Management Kit",
    category: "Accessories",

    rating: 4.7,
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?q=80&w=400&auto=format",
    features: ["Cable Tray", "Conduits", "Junction Boxes", "Complete Set"],
    description: "Complete cable management solution with trays, conduits, and junction boxes"
  },
  {
    id: 10,
    name: "Emergency Exit Light",
    category: "Emergency",

    rating: 4.8,
    image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?q=80&w=400&auto=format",
    features: ["3 Hour Battery", "Self Test", "LED Technology", "Wall/Ceiling Mount"],
    description: "LED emergency exit sign with 3-hour battery backup and self-testing"
  },
  {
    id: 11,
    name: "Voltage Stabilizer 5KVA",
    category: "Stabilizers",

    rating: 4.9,
    image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?q=80&w=400&auto=format",
    features: ["Servo Motor", "Digital Display", "High/Low Cut-off", "Overload Protection"],
    description: "Automatic voltage stabilizer with servo motor control and digital display"
  },
  {
    id: 12,
    name: "Earth Leakage ELCB",
    category: "Protection",

    rating: 4.8,
    image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?q=80&w=400&auto=format",
    features: ["4 Pole", "63A Rating", "30mA Sensitivity", "Test Button"],
    description: "Four-pole earth leakage circuit breaker for comprehensive electrical protection"
  }
];

const PRODUCTS_PER_PAGE = 6;
const categories = ['All', 'Switches', 'Sensors', 'Drivers', 'Panels', 'Protection', 'Accessories'];

export function ElectricalCatalogSection() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const filteredProducts = selectedCategory === 'All' 
    ? electricalProducts 
    : electricalProducts.filter(product => 
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

  return (
    <section id="electrical-catalog" className="py-20 bg-gradient-to-br from-blue-950/20 via-slate-950 to-cyan-950/20 relative overflow-hidden">
      <div className="absolute inset-0">
        {Array.from({ length: 18 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1.3, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              delay: i * 0.25,
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
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full mb-6 backdrop-blur-sm border border-blue-400/30"
            whileHover={{ scale: 1.1 }}
          >
            <Zap className="w-10 h-10 text-blue-400" />
          </motion.div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-300 via-blue-400 to-cyan-500 bg-clip-text text-transparent mb-4">
            Electrical Components
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Professional electrical infrastructure and components for your LED lighting installations
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setCurrentPage(0);
              }}
              className={`px-6 py-3 rounded-full border transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white border-blue-500 shadow-lg'
                  : 'bg-transparent text-slate-300 border-slate-600 hover:border-blue-500 hover:text-blue-400'
              }`}
              whileHover={{ scale: 1.05 }}
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
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
            >
              {getCurrentPageProducts().map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group cursor-pointer"
                >
                  <Card className="h-full bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700 hover:border-blue-500/50 transition-all duration-300 overflow-hidden">
                    <div className="relative">
                      <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-blue-500 text-white">
                          {product.category}
                        </Badge>
                      </div>
                      <div className="absolute top-3 right-3 flex items-center space-x-1 bg-black/70 text-white px-2 py-1 rounded-full">
                        <Star className="w-3 h-3 fill-blue-400 text-blue-400" />
                        <span className="text-xs">{product.rating}</span>
                      </div>
                      <div className="absolute bottom-3 right-3">
                        <Shield className="w-5 h-5 text-green-400" />
                      </div>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={false}
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-blue-400 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {product.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {product.features.map((feature, i) => (
                          <Badge key={i} variant="outline" className="text-xs border-blue-400/30">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg text-blue-400 font-medium">
                          Contact for Quote
                        </span>
                        <div className="flex items-center space-x-1 text-xs text-green-400">
                          <Shield className="w-3 h-3" />
                          <span>SASO</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1 bg-blue-500 hover:bg-blue-600 text-white">
                          <Eye className="w-4 h-4 mr-2" />
                          Get Quote
                        </Button>
                        <Button size="sm" variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Page Navigation */}
          <div className="flex items-center justify-between border-t border-slate-700 pt-6">
            <div className="flex items-center space-x-4">
              <motion.button
                onClick={() => flipToPage(currentPage - 1)}
                disabled={currentPage === 0 || isFlipping}
                className="flex items-center space-x-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
                whileHover={{ scale: currentPage > 0 ? 1.05 : 1 }}
                whileTap={{ scale: currentPage > 0 ? 0.95 : 1 }}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </motion.button>
              
              <motion.button
                onClick={() => flipToPage(currentPage + 1)}
                disabled={currentPage === totalPages - 1 || isFlipping}
                className="flex items-center space-x-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
                whileHover={{ scale: currentPage < totalPages - 1 ? 1.05 : 1 }}
                whileTap={{ scale: currentPage < totalPages - 1 ? 0.95 : 1 }}
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Page Indicators */}
            <div className="flex items-center space-x-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <motion.button
                  key={i}
                  onClick={() => flipToPage(i)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    i === currentPage ? 'bg-blue-500 scale-125' : 'bg-slate-600 hover:bg-slate-500'
                  }`}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>

            <div className="text-sm text-muted-foreground">
              Page {currentPage + 1} of {totalPages} • {filteredProducts.length} products
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}