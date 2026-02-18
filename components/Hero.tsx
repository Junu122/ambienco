import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from './ui/button';
import { ArrowRight, Zap, Home, Lightbulb, Sparkles, Orbit, Eye, MessageCircle, Bot } from 'lucide-react';
import { useRef } from 'react';
import newAmbiencoLogo from '../assets/73fac93bfe79ff6db08ec87812f30e661ef459c3.png';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95]);

  const floatingElements = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 10 + 6,
    delay: Math.random() * 3,
  }));

  return (
    <section ref={ref} id="home" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden scroll-mt-0">
      {/* Enhanced 3D Background Elements */}
      <div className="absolute inset-0">
        {floatingElements.map((element) => (
          <motion.div
            key={element.id}
            className="absolute bg-gradient-to-r from-purple-400 via-green-500 to-purple-600 rounded-full opacity-20 blur-sm"
            style={{
              width: element.size,
              height: element.size,
              left: `${element.x}%`,
              top: `${element.y}%`,
            }}
            animate={{
              y: [-30, 30, -30],
              x: [-15, 15, -15],
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.4, 0.1],
              rotate: [0, 360],
            }}
            transition={{
              duration: element.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: element.delay,
            }}
          />
        ))}
        
        {/* 3D Orbital rings */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-[500px] h-[500px] border-2 border-purple-400/20 rounded-full"
          style={{ x: "-50%", y: "-50%", transformStyle: "preserve-3d" }}
          animate={{ 
            rotate: 360,
            rotateX: [0, 20, 0],
            rotateY: [0, 15, 0]
          }}
          transition={{ 
            rotate: { duration: 40, repeat: Infinity, ease: "linear" },
            rotateX: { duration: 8, repeat: Infinity, ease: "easeInOut" },
            rotateY: { duration: 12, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 border border-green-400/30 rounded-full"
          style={{ x: "-50%", y: "-50%", transformStyle: "preserve-3d" }}
          animate={{ 
            rotate: -360,
            rotateX: [0, -15, 0],
            rotateZ: [0, 10, 0]
          }}
          transition={{ 
            rotate: { duration: 30, repeat: Infinity, ease: "linear" },
            rotateX: { duration: 10, repeat: Infinity, ease: "easeInOut" },
            rotateZ: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
        />
      </div>

      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        style={{ y, opacity, scale }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mb-8"
        >
          {/* New Ambienco Logo Display */}
          <motion.div
            className="inline-flex items-center justify-center mb-16"
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <motion.div
              className="relative p-8"
              whileHover={{ scale: 1.15, rotateY: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Main Logo */}
              <motion.img 
                src={"/images/73fac93bfe79ff6db08ec87812f30e661ef459c3.png"} 
                alt="Ambienco - Design. Power. Shine." 
                className="h-80 w-80 object-contain relative z-10 drop-shadow-2xl"
                animate={{
                  filter: [
                    'brightness(1.2) drop-shadow(0 0 40px rgba(255, 255, 255, 0.6)) drop-shadow(0 0 80px rgba(255, 255, 255, 0.3))',
                    'brightness(1.4) drop-shadow(0 0 60px rgba(255, 255, 255, 0.8)) drop-shadow(0 0 100px rgba(255, 255, 255, 0.4))',
                    'brightness(1.2) drop-shadow(0 0 40px rgba(255, 255, 255, 0.6)) drop-shadow(0 0 80px rgba(255, 255, 255, 0.3))'
                  ]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Rotating outer glow ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-white/30"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.8, 0.3]
                }}
                transition={{
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                  opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
              />
              
              {/* Inner pulsing ring */}
              <motion.div
                className="absolute inset-4 rounded-full border border-white/40"
                animate={{
                  rotate: [360, 0],
                  scale: [1, 1.1, 1],
                  opacity: [0.4, 0.9, 0.4]
                }}
                transition={{
                  rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                  scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                  opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }}
              />
              
              {/* Outer energy ring */}
              <motion.div
                className="absolute -inset-4 rounded-full border border-slate-200/20"
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0, 0.6, 0]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Secondary outer ring */}
              <motion.div
                className="absolute -inset-8 rounded-full border border-slate-100/15"
                animate={{
                  scale: [1, 1.6, 1],
                  opacity: [0, 0.4, 0]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2.5
                }}
              />
            </motion.div>
          </motion.div>

          <motion.h1 
            className="text-6xl sm:text-8xl lg:text-9xl font-bold mb-8"
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.3, duration: 1.2, ease: "easeOut" }}
          >
            <motion.span
              className="block bg-gradient-to-r from-white via-slate-100 to-white bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                textShadow: [
                  '0 0 30px rgba(255, 255, 255, 0.6)',
                  '0 0 60px rgba(255, 255, 255, 0.8)',
                  '0 0 30px rgba(255, 255, 255, 0.6)'
                ]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              AMBIENCO
            </motion.span>
            <motion.span
              className="block bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['100% 50%', '0% 50%', '100% 50%']
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "linear",
                delay: 0.5
              }}
            >
              LIGHTING
            </motion.span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-3xl sm:text-4xl mb-12 max-w-5xl mx-auto relative"
          >
            {/* Clean White Text - No Golden Neon Effects */}
            <motion.div
              className="relative inline-block"
              animate={{
                scale: [1, 1.01, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {/* Simple white text with subtle glow */}
              <motion.span
                className="relative z-10 text-white font-semibold"
                animate={{
                  textShadow: [
                    '0 0 20px rgba(255, 255, 255, 0.4), 0 0 40px rgba(255, 255, 255, 0.2)',
                    '0 0 30px rgba(255, 255, 255, 0.6), 0 0 60px rgba(255, 255, 255, 0.3)',
                    '0 0 20px rgba(255, 255, 255, 0.4), 0 0 40px rgba(255, 255, 255, 0.2)'
                  ]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Illuminating Saudi Arabia's Future with Premium LED Solutions
              </motion.span>
            </motion.div>
          </motion.div>

          {/* WhatsApp Connection */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mb-8"
          >
            <motion.a
              href="https://wa.me/966570514881?text=Hello%20Ambienco!%20I'm%20interested%20in%20your%20LED%20lighting%20solutions."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-400/30 rounded-full px-8 py-4 backdrop-blur-sm group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              animate={{
                boxShadow: [
                  '0 0 20px rgba(34, 197, 94, 0.3)',
                  '0 0 40px rgba(34, 197, 94, 0.6)',
                  '0 0 20px rgba(34, 197, 94, 0.3)'
                ]
              }}
              transition={{
                boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <div className="w-8 h-8 mr-4 relative">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1633354931133-27ac1ee5d853?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGF0c2FwcCUyMGljb24lMjBncmVlbiUyMGNoYXR8ZW58MXx8fHwxNzU3NjYwNTE1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="WhatsApp"
                  className="w-8 h-8 object-contain filter brightness-0 invert sepia saturate-[500%] hue-rotate-[100deg]"
                />
              </div>
              <span className="text-green-400 font-semibold text-lg group-hover:text-green-300 transition-colors">
                💬 Chat with us on WhatsApp - Instant Response!
              </span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <MessageCircle className="w-6 h-6 text-green-400 ml-4" />
              </motion.div>
            </motion.a>
          </motion.div>

          {/* AI Assistant Highlight */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="mb-12"
          >
            <motion.div
              className="inline-flex items-center justify-center bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-400/30 rounded-full px-6 py-3 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              animate={{
                boxShadow: [
                  '0 0 20px rgba(245, 158, 11, 0.3)',
                  '0 0 40px rgba(245, 158, 11, 0.6)',
                  '0 0 20px rgba(245, 158, 11, 0.3)'
                ]
              }}
              transition={{
                boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <Bot className="w-5 h-5 text-amber-400 mr-3" />
              </motion.div>
              <span className="text-amber-400 font-semibold text-lg">
                💡 AI Lighting Assistant Available - Ask Me Anything!
              </span>
              <Sparkles className="w-5 h-5 text-amber-400 ml-3" />
            </motion.div>
          </motion.div>

          {/* Enhanced Brand Values */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-12 mb-16"
          >
            {[
              { icon: Lightbulb, label: "Design", color: "from-purple-400 to-purple-600", description: "Innovative Solutions" },
              { icon: Zap, label: "Power", color: "from-green-400 to-green-600", description: "Energy Efficiency" },
              { icon: Sparkles, label: "Shine", color: "from-yellow-400 to-orange-500", description: "Premium Quality" }
            ].map((value, index) => (
              <motion.div
                key={value.label}
                className="flex flex-col items-center space-y-4 group cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.3, duration: 0.8 }}
                whileHover={{ scale: 1.15, y: -10 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className={`p-4 rounded-2xl bg-gradient-to-r ${value.color} group-hover:shadow-2xl transition-all duration-500 relative`}
                  animate={{
                    boxShadow: [
                      '0 0 30px rgba(139, 92, 246, 0.4)',
                      '0 0 50px rgba(34, 197, 94, 0.7)',
                      '0 0 30px rgba(139, 92, 246, 0.4)'
                    ],
                    rotateY: [0, 10, 0]
                  }}
                  transition={{
                    boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.7 },
                    rotateY: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <value.icon className="w-8 h-8 text-white" />
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/20 to-transparent"
                    animate={{ opacity: [0, 0.5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  />
                </motion.div>
                <div className="text-center">
                  <span className="text-2xl font-bold text-foreground group-hover:text-green-400 transition-colors block">
                    {value.label}
                  </span>
                  <span className="text-sm text-muted-foreground group-hover:text-slate-300 transition-colors">
                    {value.description}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center mb-20"
          >
            <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-black shadow-2xl glow-green group px-8 py-4 text-lg cursor-pointer"
                onClick={() => {
                  const element = document.getElementById('catalog');
                  if (element) {
                    const navHeight = 0;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - navHeight;
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                  }
                }}
              >
                <Eye className="mr-3 w-6 h-6 group-hover:animate-pulse" />
                View Product Catalog
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black glass-effect group px-8 py-4 text-lg cursor-pointer"
                onClick={() => {
                  const element = document.getElementById('contact');
                  if (element) {
                    const navHeight = 0;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - navHeight;
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                  }
                }}
              >
                <Orbit className="mr-3 w-6 h-6" />
                Contact Our Team
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-black glass-effect group px-8 py-4 text-lg cursor-pointer"
              >
                <Bot className="mr-3 w-6 h-6 group-hover:animate-bounce" />
                Chat with AI Assistant
                <MessageCircle className="ml-3 w-6 h-6" />
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Enhanced Tech Features Display */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 1.2, ease: "easeOut" }}
          className="relative max-w-4xl mx-auto mt-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: Lightbulb, 
                title: "Smart LED Systems", 
                description: "Advanced lighting automation",
                color: "from-purple-400 to-purple-600"
              },
              { 
                icon: Zap, 
                title: "Energy Efficient", 
                description: "Sustainable power solutions",
                color: "from-green-400 to-green-600"
              },
              { 
                icon: Sparkles, 
                title: "Premium Quality", 
                description: "Industry-leading products",
                color: "from-amber-400 to-amber-600"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="relative group"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.4 + index * 0.2, duration: 0.8 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <motion.div
                  className={`bg-gradient-to-br ${feature.color} rounded-2xl p-8 text-center glass-effect border border-white/20`}
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(139, 92, 246, 0.3)',
                      '0 0 40px rgba(34, 197, 94, 0.5)',
                      '0 0 20px rgba(139, 92, 246, 0.3)'
                    ]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 1.5
                  }}
                >
                  <motion.div
                    className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-white/90">{feature.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}