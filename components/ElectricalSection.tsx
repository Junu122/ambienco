import { motion } from 'framer-motion';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Zap, ArrowRight, Shield, Award, Wrench, ToggleLeft, Battery, Radar, Settings } from 'lucide-react';

const electricalProducts = [
  {
    id: 1,
    name: "Smart Switches & Dimmers",
    category: "Controls",
    description: "WiFi-enabled switches with dimming capabilities",
    icon: ToggleLeft,
    color: "from-blue-400 to-cyan-500",
    features: ["Voice Control", "App Integration", "Energy Monitoring"]
  },
  {
    id: 2,
    name: "LED Drivers & Transformers",
    category: "Power Supply",
    description: "High-efficiency drivers for LED lighting systems",
    icon: Battery,
    color: "from-green-400 to-emerald-500",
    features: ["Constant Current", "Surge Protection", "Dimming Compatible"]
  },
  {
    id: 3,
    name: "Motion Sensors",
    category: "Automation",
    description: "Advanced PIR sensors for automated lighting control",
    icon: Radar,
    color: "from-purple-400 to-violet-500",
    features: ["360° Detection", "Daylight Sensor", "Adjustable Timer"]
  },
  {
    id: 4,
    name: "Electrical Panels & Boxes",
    category: "Infrastructure",
    description: "Premium electrical distribution panels",
    icon: Settings,
    color: "from-orange-400 to-red-500",
    features: ["Weather Resistant", "Easy Installation", "Safety Certified"]
  }
];

const certifications = [
  { icon: Shield, label: "SASO Certified" },
  { icon: Award, label: "ISO Quality" },
  { icon: Wrench, label: "Professional Installation" }
];

export function ElectricalSection() {
  return (
    <section id="electrical" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500/10 rounded-full mb-6">
            <Zap className="w-8 h-8 text-amber-500" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Electrical Solutions
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Complete electrical infrastructure and components for your LED lighting installations in Saudi Arabia
          </p>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-8 mb-16"
        >
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center p-4 bg-muted/50 rounded-lg"
            >
              <cert.icon className="w-8 h-8 text-amber-500 mb-2" />
              <span className="text-sm font-medium text-foreground">{cert.label}</span>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {electricalProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="h-full bg-card border-border hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="flex flex-col md:flex-row h-full">
                  <div className="md:w-1/2 relative">
                    <motion.div
                      className={`w-full h-48 md:h-full bg-gradient-to-br ${product.color} flex items-center justify-center relative overflow-hidden`}
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        animate={{ 
                          rotate: [0, 360],
                          opacity: [0.3, 0.7, 0.3]
                        }}
                        transition={{ 
                          rotate: { duration: 30, repeat: Infinity, ease: "linear" },
                          opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                        }}
                        className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                      />
                      <product.icon className="w-20 h-20 text-white/90 relative z-10" />
                    </motion.div>
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-black/50 text-white backdrop-blur-sm">
                        {product.category}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="md:w-1/2 p-6 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">{product.name}</h3>
                      <p className="text-muted-foreground mb-4">{product.description}</p>
                      <div className="space-y-2 mb-6">
                        {product.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black cursor-pointer"
                      onClick={() => {
                        const element = document.getElementById('contact');
                        if (element) {
                          const navHeight = 80;
                          const targetPosition = element.offsetTop - navHeight;
                          window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                          });
                        }
                      }}
                    >
                      Get Quote
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </CardContent>
                </div>
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
                const targetPosition = element.offsetTop - navHeight;
                window.scrollTo({
                  top: targetPosition,
                  behavior: 'smooth'
                });
              }
            }}
          >
            Explore All Electrical Solutions
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}