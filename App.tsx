import { useEffect, useState } from 'react';
import { Hero } from './components/Hero';
import { Navigation } from './components/Navigation';
import { LightingSection } from './components/LightingSection';
import { FurnitureSection } from './components/FurnitureSection';
import { ElectricalSection } from './components/ElectricalSection';
import { CatalogSection } from './components/CatalogSection';
import { AboutSection } from './components/AboutSection';
import { ForumSection } from './components/ForumSection';
import { ContactSection } from './components/ContactSection';
import { DownloadSection } from './components/DownloadSection';
import { Footer } from './components/Footer';
import { AdminDashboard } from './components/AdminDashboard';
import { AdminLogin } from './components/AdminLogin';
import { AILightingAssistant } from './components/AILightingAssistant';
import { WhatsAppChat } from './components/WhatsAppChat';

// Utility function for smooth scrolling
const smoothScrollTo = (sectionId: string) => {
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

export default function App() {
  const [currentView, setCurrentView] = useState<'website' | 'admin' | 'admin-login'>('website');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [secretSequence, setSecretSequence] = useState<string[]>([]);
  const [showSecretAdminAccess, setShowSecretAdminAccess] = useState(false);
  
  // Secret sequence: "UNAISE" (U-N-A-I-S-E)
  const secretCode = ['u', 'n', 'a', 'i', 's', 'e'];

  useEffect(() => {
    // Set dark theme by default
    document.documentElement.classList.add('dark');
    
    // Smooth scroll behavior for the entire app
    document.documentElement.style.scrollBehavior = 'smooth';

    // Secret key sequence handler
    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      
      setSecretSequence(prev => {
        const newSequence = [...prev, key].slice(-secretCode.length);
        
        // Check if the sequence matches
        if (newSequence.length === secretCode.length && 
            newSequence.every((k, i) => k === secretCode[i])) {
          setShowSecretAdminAccess(true);
          // Auto-hide after 10 seconds
          setTimeout(() => setShowSecretAdminAccess(false), 10000);
          return [];
        }
        
        return newSequence;
      });
    };

    // Check if admin route is requested (only if secret access is shown)
    const checkAdminRoute = () => {
      const path = window.location.pathname;
      if ((path === '/admin' || window.location.hash === '#admin') && showSecretAdminAccess) {
        setCurrentView('admin-login');
      }
    };

    // Use setTimeout to prevent blocking
    setTimeout(checkAdminRoute, 0);

    // Listen for hash changes
    const handleHashChange = () => {
      if (window.location.hash === '#admin' && showSecretAdminAccess) {
        // Always require login for admin access
        setCurrentView('admin-login');
        setIsAdminAuthenticated(false);
      } else if (window.location.hash !== '#admin') {
        setCurrentView('website');
        setIsAdminAuthenticated(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('hashchange', handleHashChange);

    // Simulate loading completion after a short delay
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('hashchange', handleHashChange);
      clearTimeout(loadingTimer);
    };
  }, [showSecretAdminAccess]);

  // Admin Login View
  if (currentView === 'admin-login') {
    return (
      <AdminLogin 
        onLogin={(success) => {
          if (success) {
            setIsAdminAuthenticated(true);
            setCurrentView('admin');
          }
        }}
        onBackToWebsite={() => {
          window.location.hash = '';
          setCurrentView('website');
          setIsAdminAuthenticated(false);
        }}
      />
    );
  }

  // Admin Dashboard View (only accessible after authentication)
  if (currentView === 'admin' && isAdminAuthenticated) {
    return (
      <AdminDashboard 
        onLogout={() => {
          setIsAdminAuthenticated(false);
          setCurrentView('website');
          window.location.hash = '';
        }}
      />
    );
  }

  // Loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background dark flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-white mb-2">Ambi-Enco</h2>
          <p className="text-slate-400">Loading premium LED solutions...</p>
        </div>
      </div>
    );
  }

  // Main Website View
  return (
    <div className="relative min-h-screen bg-background dark overflow-x-hidden">
      {/* Shooting Stars - Optimized for performance */}
      <div className="fixed inset-0 pointer-events-none z-10" style={{ pointerEvents: 'none' }}>
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="shooting-star pointer-events-none"
            style={{
              top: `${Math.random() * 30}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              pointerEvents: 'none'
            }}
          />
        ))}
      </div>

      {/* Secret Admin Access Button - Only visible when secret sequence is entered */}
      {showSecretAdminAccess && (
        <div className="fixed bottom-4 right-20 z-40">
          <button
            onClick={() => {
              window.location.hash = '#admin';
              setCurrentView('admin-login');
              setIsAdminAuthenticated(false);
            }}
            className="bg-gradient-to-r from-amber-500/90 to-orange-500/90 hover:from-amber-400 hover:to-orange-400 text-black px-4 py-2 rounded-lg text-sm font-semibold border border-amber-400 backdrop-blur-sm transition-all shadow-lg animate-pulse"
            title="Secret Admin Access - Authorized Personnel Only"
          >
            🔐 Admin Access
          </button>
          <div className="absolute -top-8 right-0 bg-amber-500/90 text-black px-2 py-1 rounded text-xs font-medium">
            Secret Access Granted
          </div>
        </div>
      )}

      {/* Secret sequence hint - only show briefly when typing */}
      {secretSequence.length > 0 && !showSecretAdminAccess && (
        <div className="fixed top-4 right-4 z-40">
          <div className="bg-slate-900/90 text-amber-400 px-3 py-2 rounded-lg text-xs border border-slate-600 backdrop-blur-sm">
            Sequence: {secretSequence.map((_, i) => '●').join('')}
          </div>
        </div>
      )}

      {/* Built by Unaise Credit */}
      <div className="fixed bottom-4 left-4 z-40">
        <div className="bg-slate-900/80 text-slate-400 px-3 py-2 rounded-lg text-xs border border-slate-600 backdrop-blur-sm opacity-30 hover:opacity-100 transition-all">
          <span className="text-amber-400">✨ Built by Unaise</span>
        </div>
      </div>

      {/* Navigation */}
      <Navigation />

      {/* AI Lighting Assistant */}
      <AILightingAssistant />

      {/* WhatsApp Chat */}
      <WhatsAppChat />

      <main className="relative z-20">
        {/* Hero Section with Ambienco Logo */}
        <Hero />
        
        {/* Product Overview Sections */}
        <LightingSection />
        <FurnitureSection />
        <ElectricalSection />
        
        {/* Unified Catalog Section */}
        <CatalogSection />
        
        {/* Company Information */}
        <AboutSection />
        
        {/* Community Forum Section */}
        <ForumSection />
        
        {/* Download Center */}
        <DownloadSection />
        
        {/* Contact & Inquiry Section */}
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}