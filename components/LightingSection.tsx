import { motion } from 'framer-motion';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Lightbulb, Star, ArrowRight, Zap, Shield, Smartphone, Palette, Sun, Wifi } from 'lucide-react';

const lightingProducts = [
  {
    id: 1,
    name: "Premium LED Downlights",
    category: "Indoor Lighting",
    icon: Lightbulb,
    rating: 4.9,
    color: "from-amber-400 to-orange-500",
    features: ["Energy Efficient", "Dimmable", "Long Lasting"]
  },
  {
    id: 2,
    name: "Smart LED Strip Lights",
    category: "Accent Lighting",
    icon: Palette,
    rating: 4.8,
    color: "from-purple-400 to-pink-500",
    features: ["RGB Colors", "App Control", "Voice Control"]
  },
  {
    id: 3,
    name: "Outdoor LED Floodlights",
    category: "Security Lighting",
    icon: Shield,
    rating: 4.7,
    color: "from-green-400 to-blue-500",
    features: ["Weatherproof", "Motion Sensor", "High Brightness"]
  },
  {
    id: 4,
    name: "Designer Pendant Lights",
    category: "Decorative Lighting",
    icon: Sun,
    rating: 4.9,
    color: "from-yellow-400 to-amber-500",
    features: ["Modern Design", "Premium Materials", "Adjustable Height"]
  },
  {
    id: 5,
    name: "LED Panel Lights",
    category: "Office Lighting",
    icon: Zap,
    rating: 4.6,
    color: "from-blue-400 to-cyan-500",
    features: ["Uniform Light", "Flicker Free", "Energy Saving"]
  },
  {
    id: 6,
    name: "Smart Bulbs Collection",
    category: "Smart Lighting",
    icon: Wifi,
    rating: 4.8,
    color: "from-indigo-400 to-purple-500",
    features: ["WiFi Enabled", "Color Changing", "Schedule Control"]
  }
];

export function LightingSection() {
  return (
    <section id="lighting" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500/10 rounded-full mb-6">
            <Lightbulb className="w-8 h-8 text-amber-500" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Premium LED Lighting
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Illuminate your space with our cutting-edge LED lighting solutions designed for Saudi Arabia's climate and lifestyle
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {lightingProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group"
            >
              <Card className="h-full bg-card border-border hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <motion.div
                    className={`w-full h-48 bg-gradient-to-br ${product.color} flex items-center justify-center relative overflow-hidden`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"
                    />
                    <product.icon className="w-24 h-24 text-white/80 relative z-10" />
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-black/50 text-white backdrop-blur-sm">
                        {product.category}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4 flex items-center space-x-1 bg-black/50 text-white px-2 py-1 rounded-full backdrop-blur-sm">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="text-xs">{product.rating}</span>
                    </div>
                  </motion.div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2">{product.name}</h3>
                  <p className="text-lg text-amber-500 mb-4 font-medium">Contact for Quote</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.features.map((feature, featureIndex) => (
                      <Badge key={featureIndex} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 cursor-pointer"
                    onClick={() => {
                      const element = document.getElementById('contact');
                      if (element) {
                        const navHeight = 80;
                        const elementPosition = element.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - navHeight;
                        window.scrollTo({
                          top: offsetPosition,
                          behavior: 'smooth'
                        });
                      }
                    }}
                  >
                    Get Quote
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <Button 
            size="lg" 
            className="bg-amber-500 hover:bg-amber-600 text-black cursor-pointer"
            onClick={() => {
              const element = document.getElementById('catalog');
              if (element) {
                const navHeight = 80;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navHeight;
                window.scrollTo({
                  top: offsetPosition,
                  behavior: 'smooth'
                });
              }
            }}
          >
            Explore All Lighting Products
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}