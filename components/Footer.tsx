import React from 'react';
import { motion } from 'framer-motion';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  ExternalLink,
  Lightbulb,
  Zap,
  Home,
  MessageCircle
} from 'lucide-react';

import sahahAlTawridLogo from '../assets/3f877098e81cedb3498ccf39e7ce8c5c7a1f38ff.png';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  const quickLinks = [
    { name: 'LED Lighting', href: '#lighting', icon: Lightbulb },
    { name: 'Furniture', href: '#furniture', icon: Home },
    { name: 'Electrical', href: '#electrical', icon: Zap },
    { name: 'Product Catalog', href: '#catalog', icon: ExternalLink },
    { name: 'Forum', href: '#forum', icon: MessageCircle },
    { name: 'Contact Us', href: '#contact', icon: Phone }
  ];

  const services = [
    'LED Strip Lighting',
    'Smart Home Solutions', 
    'Office Furniture',
    'Electrical Installations',
    'Consultation Services',
    'Custom Projects'
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' }
  ];

  const handleScrollTo = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      const navHeight = 0; // No navigation bar
      const targetPosition = element.offsetTop - navHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="relative bg-gradient-to-b from-slate-900 to-black border-t border-slate-800 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-green-600/10 to-amber-600/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.6, 0.3, 0.6]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Company Information with New Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            {/* New Ambienco Logo */}
            <motion.div 
              className="flex items-center mb-6"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <motion.img 
                src={"../assets/73fac93bfe79ff6db08ec87812f30e661ef459c3.png"} 
                alt="Ambienco - Design. Power. Shine." 
                className="h-16 w-16 object-contain mr-3"
                animate={{
                  filter: [
                    'brightness(1.1) drop-shadow(0 0 10px rgba(255, 255, 255, 0.3))',
                    'brightness(1.3) drop-shadow(0 0 15px rgba(255, 255, 255, 0.5))',
                    'brightness(1.1) drop-shadow(0 0 10px rgba(255, 255, 255, 0.3))'
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <div>
                <h3 className="brand-name text-2xl font-bold">Ambi-Enco</h3>
                <p className="text-xs text-slate-400 uppercase tracking-wider">Design • Power • Shine</p>
              </div>
            </motion.div>
            
            <p className="text-slate-400 mb-6 leading-relaxed">
              Leading Saudi Arabia's lighting revolution with premium LED solutions, innovative furniture, 
              and comprehensive electrical services since our founding.
            </p>
            
            {/* Contact Information */}
            <div className="space-y-3">
              <motion.div 
                className="flex items-center text-slate-300 hover:text-amber-400 transition-colors group cursor-pointer"
                whileHover={{ x: 5 }}
                onClick={() => window.open('tel:+966570514881')}
              >
                <Phone className="w-4 h-4 mr-3 text-amber-400 group-hover:animate-pulse" />
                <span>+966 570514881</span>
              </motion.div>
              
              <motion.div 
                className="flex items-center text-slate-300 hover:text-amber-400 transition-colors group cursor-pointer"
                whileHover={{ x: 5 }}
                onClick={() => window.open('mailto:unaise@ambi-enco.it.com')}
              >
                <Mail className="w-4 h-4 mr-3 text-amber-400" />
                <span>unaise@ambi-enco.it.com</span>
              </motion.div>
              
              <motion.div 
                className="flex items-start text-slate-300 group"
                whileHover={{ x: 5 }}
              >
                <MapPin className="w-4 h-4 mr-3 mt-1 text-amber-400" />
                <span>Riyadh, Kingdom of Saudi Arabia</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-white font-semibold mb-6 flex items-center">
              <ExternalLink className="w-5 h-5 mr-2 text-amber-400" />
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <button
                    onClick={() => handleScrollTo(link.href)}
                    className="flex items-center text-slate-400 hover:text-white transition-colors group"
                  >
                    <link.icon className="w-4 h-4 mr-3 text-amber-400/70 group-hover:text-amber-400 transition-colors" />
                    {link.name}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-white font-semibold mb-6 flex items-center">
              <Zap className="w-5 h-5 mr-2 text-amber-400" />
              Our Services
            </h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <motion.li 
                  key={service}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center"
                >
                  <div className="w-2 h-2 bg-amber-400 rounded-full mr-3 flex-shrink-0" />
                  {service}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact & Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-white font-semibold mb-6 flex items-center">
              <MessageCircle className="w-5 h-5 mr-2 text-amber-400" />
              Connect With Us
            </h4>
            
            <p className="text-slate-400 mb-6 leading-relaxed">
              Follow us for the latest updates on LED technology, project showcases, and lighting innovations.
            </p>
            
            {/* Social Media Links */}
            <div className="flex space-x-4 mb-6">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-amber-600 transition-all duration-300 border border-slate-700 hover:border-amber-500"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  title={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
            
            {/* CTA Button */}
            <Button 
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black font-semibold"
              onClick={() => handleScrollTo('#contact')}
            >
              Get Free Consultation
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </div>

        {/* Partners Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <h4 className="text-white font-semibold text-xl mb-3 flex items-center justify-center">
              <ExternalLink className="w-5 h-5 mr-2 text-amber-400" />
              Our Partners
            </h4>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Collaborating with leading industry partners to deliver exceptional LED lighting solutions across Saudi Arabia
            </p>
          </div>
          
          <div className="flex items-center justify-center">
            {/* Sahah Al Tawrid Trading Est. Partner */}
            <motion.div
              className="flex flex-col items-center space-y-6 group cursor-pointer max-w-md"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="w-96 h-28 flex items-center justify-center p-4">
                <ImageWithFallback
                  src={"../assets/3f877098e81cedb3498ccf39e7ce8c5c7a1f38ff.png"}
                  alt="Sahah Al Tawrid Trading Est."
                  className="w-full h-full object-contain filter brightness-110 group-hover:brightness-125 group-hover:scale-105 transition-all duration-300"
                />
              </div>
              
              <div className="text-center space-y-2">
                <h5 className="text-white font-semibold text-lg group-hover:text-amber-400 transition-colors">
                  Sahah Al Tawrid Trading Est.
                </h5>
                <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                  Strategic Partner • Established
                </p>
                <div className="flex items-center justify-center text-xs text-slate-500 group-hover:text-slate-400 transition-colors">
                  <MapPin className="w-3 h-3 mr-1" />
                  <span>Riyadh, Saudi Arabia</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <Separator className="bg-slate-800 mb-8" />

        {/* Bottom Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          <div className="text-slate-400 text-center md:text-left">
            <p>&copy; {currentYear} Ambi-Enco. All rights reserved.</p>
            <p className="text-sm mt-1">Illuminating Saudi Arabia with Premium LED Solutions</p>
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-slate-400">
            <motion.a 
              href="#privacy" 
              className="hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              Privacy Policy
            </motion.a>
            <motion.a 
              href="#terms" 
              className="hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              Terms of Service
            </motion.a>
            <motion.span 
              className="text-amber-400 font-medium"
              animate={{
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              ✨ Built by Unaise
            </motion.span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}