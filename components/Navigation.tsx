import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Menu, X, Package, MessageSquare, Mail, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import newAmbiencoLogo from '../assets/3f877098e81cedb3498ccf39e7ce8c5c7a1f38ff.png';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { href: '#catalog', label: 'Products', icon: Package },
    { href: '#contact', label: 'Contact', icon: Mail },
    { href: '#forum', label: 'Forums', icon: MessageSquare },
    { href: '#download', label: 'Download', icon: Download },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      const navHeight = 60; // Optimized navigation height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
    
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <div className="cosmic-particles"></div>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'glass-effect shadow-2xl' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <motion.button 
              className="flex items-center bg-transparent border-none cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={() => scrollToSection('#home')}
            >
              <div className="relative">
                <motion.img 
                  src={newAmbiencoLogo} 
                  alt="Ambienco - Illuminate. Empower. Live." 
                  className="h-16 w-auto object-contain filter brightness-110"
                  whileHover={{ scale: 1.1, filter: "brightness(1.25)" }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.button>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-6">
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  className="relative text-foreground/90 hover:text-amber-400 transition-colors duration-300 group text-sm font-medium flex items-center cursor-pointer bg-transparent border-none"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.icon && (
                    <item.icon className="w-3 h-3 mr-1" />
                  )}
                  {item.label}
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 to-amber-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                    layoutId="underline"
                  />
                </motion.button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="relative"
                >
                  <AnimatePresence mode="wait">
                    {isMenuOpen ? (
                      <motion.div
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <X className="h-6 w-6" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Menu className="h-6 w-6" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden overflow-hidden glass-effect rounded-b-xl border-t border-border/50"
              >
                <div className="flex flex-col py-4">
                  {menuItems.map((item, index) => (
                    <motion.button
                      key={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(item.href);
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center px-6 py-3 text-foreground/80 hover:text-amber-400 hover:bg-amber-400/5 transition-all duration-300 w-full text-left bg-transparent border-none cursor-pointer"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ x: 10 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {item.icon && (
                        <item.icon className="w-4 h-4 mr-3" />
                      )}
                      {item.label}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
    </>
  );
}