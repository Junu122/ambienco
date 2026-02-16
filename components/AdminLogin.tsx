import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import { Lock, Shield, Eye, EyeOff, ArrowLeft } from 'lucide-react';

interface AdminLoginProps {
  onLogin: (success: boolean) => void;
  onBackToWebsite: () => void;
}

export function AdminLogin({ onLogin, onBackToWebsite }: AdminLoginProps) {
  const [credentials, setCredentials] = useState({
    adminId: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Admin credentials - In production, these would be environment variables or from a secure database
  const ADMIN_CREDENTIALS = {
    adminId: 'unaise98',
    password: 'Unualakandy@98'
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate network delay for security
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (
      credentials.adminId === ADMIN_CREDENTIALS.adminId &&
      credentials.password === ADMIN_CREDENTIALS.password
    ) {
      onLogin(true);
    } else {
      setError('Invalid Admin ID or Password. Access denied.');
      // Clear password field for security
      setCredentials(prev => ({ ...prev, password: '' }));
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background dark flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="shooting-stars-container">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="shooting-star"
              style={{
                top: `${Math.random() * 30}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${4 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
        
        {/* Cosmic particles */}
        <motion.div
          className="absolute top-20 left-20 w-2 h-2 bg-amber-400/60 rounded-full"
          animate={{
            y: [0, -100, 0],
            x: [0, 50, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-32 right-32 w-1 h-1 bg-purple-400/60 rounded-full"
          animate={{
            y: [0, 80, 0],
            x: [0, -30, 0],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-md px-4">
        {/* Back to Website Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Button
            variant="ghost"
            onClick={onBackToWebsite}
            className="text-slate-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Website
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Card className="bg-slate-900/90 border-slate-700 backdrop-blur-xl shadow-2xl">
            <CardHeader className="text-center pb-6">
              <motion.div
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-full mb-4 mx-auto"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <Shield className="w-8 h-8 text-amber-400" />
              </motion.div>
              
              <CardTitle className="text-2xl font-bold text-white mb-2">
                Admin Access
              </CardTitle>
              <p className="text-slate-400 text-sm">
                Secure login required for Ambienco administration
              </p>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="adminId" className="text-slate-300 flex items-center">
                    <Lock className="w-4 h-4 mr-2" />
                    Admin ID
                  </Label>
                  <Input
                    id="adminId"
                    type="text"
                    value={credentials.adminId}
                    onChange={(e) => setCredentials(prev => ({ ...prev, adminId: e.target.value }))}
                    className="bg-slate-800/50 border-slate-600 text-white focus:border-amber-400"
                    placeholder="Enter your admin ID"
                    required
                    autoComplete="username"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-slate-300 flex items-center">
                    <Shield className="w-4 h-4 mr-2" />
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={credentials.password}
                      onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                      className="bg-slate-800/50 border-slate-600 text-white focus:border-amber-400 pr-10"
                      placeholder="Enter your password"
                      required
                      autoComplete="current-password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 text-slate-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Alert className="border-red-500/50 bg-red-500/10">
                      <AlertDescription className="text-red-400">
                        {error}
                      </AlertDescription>
                    </Alert>
                  </motion.div>
                )}

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    disabled={isLoading || !credentials.adminId || !credentials.password}
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black font-semibold py-3 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 border-2 border-black border-t-transparent rounded-full mr-2"
                        />
                        Authenticating...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Shield className="w-4 h-4 mr-2" />
                        Access Admin Panel
                      </div>
                    )}
                  </Button>
                </motion.div>
              </form>

              <div className="mt-6 pt-6 border-t border-slate-700">
                <p className="text-xs text-slate-500 text-center">
                  🔒 Secure access to Ambienco administration system
                  <br />
                  <span className="text-amber-400">Only authorized personnel</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}