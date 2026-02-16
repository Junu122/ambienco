import { motion } from 'framer-motion';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Sofa, ArrowRight, Coffee, BookOpen, Monitor } from 'lucide-react';

const furnitureProducts = [
  {
    id: 1,
    name: "Modern LED-Integrated Sofa",
    description: "Luxury sofa with built-in LED ambient lighting",
    icon: Sofa,
    color: "from-blue-400 to-indigo-500"
  },
  {
    id: 2,
    name: "Smart Coffee Table with Lighting",
    description: "Contemporary coffee table with wireless charging and LED strips",
    icon: Coffee,
    color: "from-amber-400 to-orange-500"
  },
  {
    id: 3,
    name: "LED Bookshelf Display",
    description: "Minimalist bookshelf with integrated LED accent lighting",
    icon: BookOpen,
    color: "from-green-400 to-teal-500"
  },
  {
    id: 4,
    name: "Gaming Desk with RGB Lighting",
    description: "Ergonomic gaming desk with customizable RGB lighting system",
    icon: Monitor,
    color: "from-purple-400 to-pink-500"
  }
];

export function FurnitureSection() {
  return (
    <section id="furniture" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500/10 rounded-full mb-6">
            <Sofa className="w-8 h-8 text-amber-500" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            LED-Integrated Furniture
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transform your living spaces with our innovative furniture collection featuring integrated LED lighting solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {furnitureProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="group"
            >
              <Card className="overflow-hidden bg-card border-border hover:shadow-xl transition-all duration-300">
                <div className="relative">
                  <motion.div
                    className={`w-full h-64 bg-gradient-to-br ${product.color} flex items-center justify-center relative overflow-hidden`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      animate={{ 
                        rotate: [0, 360],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                        scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                      }}
                      className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                    />
                    <product.icon className="w-32 h-32 text-white/90 relative z-10" />
                  </motion.div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                    <p className="text-sm text-gray-200">{product.description}</p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg text-amber-500 font-medium">Contact for Quote</span>
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
                  </div>
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
                const targetPosition = element.offsetTop - navHeight;
                window.scrollTo({
                  top: targetPosition,
                  behavior: 'smooth'
                });
              }
            }}
          >
            Explore All LED Furniture
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}