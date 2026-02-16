import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { 
  MessageCircle, 
  X, 
  Send, 
  Lightbulb, 
  Bot, 
  User, 
  Sparkles,
  Zap,
  Info,
  Phone,
  Star,
  ThumbsUp,
  RefreshCw
} from 'lucide-react';
import { toast } from 'sonner';
import { projectId } from '../utils/supabase/info';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  helpful?: boolean;
}

interface LightingKnowledge {
  keywords: string[];
  response: string;
  category: string;
  followUp?: string[];
}

const lightingKnowledgeBase: LightingKnowledge[] = [
  {
    keywords: ['led', 'benefit', 'advantage', 'why', 'better'],
    response: "LED lighting offers incredible benefits! 💡 They're 80% more energy efficient than traditional bulbs, last 25+ years, produce less heat, and provide instant bright light. Plus, they're eco-friendly and save you significant money on electricity bills. Perfect for Saudi Arabia's climate!",
    category: "LED Benefits",
    followUp: ["Tell me about LED strip lights", "What are the cost savings?", "Show me LED products"]
  },
  {
    keywords: ['strip', 'strips', 'flexible', 'accent', 'under cabinet'],
    response: "LED strip lights are amazing for creating ambient lighting! ✨ They're perfect for under-cabinet lighting, accent walls, cove lighting, and architectural features. Our strips come in various colors, are dimmable, and can be cut to custom lengths. Great for both residential and commercial spaces in Saudi Arabia.",
    category: "LED Strips",
    followUp: ["How to install LED strips?", "What colors are available?", "Indoor vs outdoor strips?"]
  },
  {
    keywords: ['smart', 'automation', 'control', 'app', 'wifi', 'dimming'],
    response: "Smart LED lighting is the future! 🏠 Our smart solutions let you control lights via smartphone apps, set schedules, adjust brightness, change colors, and integrate with voice assistants. Perfect for modern Saudi homes - control your lighting remotely and create the perfect ambiance for any occasion.",
    category: "Smart Lighting",
    followUp: ["Voice control options?", "Energy monitoring features?", "Installation requirements?"]
  },
  {
    keywords: ['commercial', 'office', 'business', 'warehouse', 'industrial'],
    response: "For commercial spaces, we offer high-performance LED solutions! 🏢 Our commercial-grade LEDs provide excellent light quality, reduce maintenance costs, improve productivity, and meet international standards. Perfect for offices, warehouses, retail spaces, and industrial facilities across Saudi Arabia.",
    category: "Commercial Lighting",
    followUp: ["Warranty information?", "Bulk pricing available?", "Installation services?"]
  },
  {
    keywords: ['outdoor', 'street', 'security', 'flood', 'garden', 'landscape'],
    response: "Our outdoor LED lighting is built for Saudi Arabia's climate! 🌟 Weather-resistant, dust-proof (IP65+), and designed to withstand high temperatures. Perfect for street lighting, security lights, garden illumination, and architectural highlighting. Energy-efficient with excellent lifespan.",
    category: "Outdoor Lighting",
    followUp: ["Solar LED options?", "Motion sensor lights?", "Weather resistance details?"]
  },
  {
    keywords: ['cost', 'price', 'savings', 'money', 'budget', 'cheap', 'expensive'],
    response: "LED lighting is a smart investment! 💰 While initial costs are higher, you'll save 60-80% on electricity bills. A typical LED bulb pays for itself in 6-12 months through energy savings. Plus, with 25+ year lifespan, you'll rarely need replacements. We offer competitive pricing and bulk discounts!",
    category: "Cost & Savings",
    followUp: ["Calculate my savings", "Bulk pricing options", "Financing available?"]
  },
  {
    keywords: ['installation', 'install', 'setup', 'wiring', 'electrician'],
    response: "Installation is easier than you think! 🔧 Most LED bulbs are direct replacements for traditional bulbs. For complex installations like strips or smart systems, our certified technicians provide professional installation across Saudi Arabia. We ensure safety, proper setup, and optimal performance.",
    category: "Installation",
    followUp: ["DIY installation guide", "Professional installation cost", "Warranty on installation"]
  },
  {
    keywords: ['color', 'temperature', 'warm', 'cool', 'rgb', 'white'],
    response: "Choose the perfect light color! 🎨 Warm white (2700K-3000K) for cozy spaces, cool white (4000K-5000K) for offices and kitchens, daylight (5500K+) for task lighting. RGB LEDs offer millions of colors for mood lighting. We'll help you select the ideal color temperature for each space.",
    category: "Color Temperature",
    followUp: ["Best colors for bedrooms?", "Office lighting recommendations", "RGB control options"]
  },
  {
    keywords: ['dimming', 'dimmable', 'brightness', 'dim', 'control'],
    response: "Dimmable LEDs offer perfect ambiance control! 🔆 Our dimmable LEDs work with standard dimmer switches and smart controls. Adjust brightness from 1-100%, save energy, and create the perfect mood for any occasion. Great for living rooms, bedrooms, and dining areas.",
    category: "Dimming",
    followUp: ["Compatible dimmer switches", "Smart dimming options", "Smooth dimming technology"]
  },
  {
    keywords: ['warranty', 'guarantee', 'quality', 'lifespan', 'durability'],
    response: "Quality guaranteed! ⭐ Our LED products come with 3-5 year warranties, with lifespans of 25,000-50,000 hours. Built with premium components, rigorous testing, and designed for Saudi Arabia's climate. If any issues arise, we provide fast replacement and excellent customer support.",
    category: "Quality & Warranty",
    followUp: ["Warranty claim process", "Product certifications", "Quality testing standards"]
  },
  {
    keywords: ['saudi', 'arabia', 'riyadh', 'jeddah', 'climate', 'hot', 'desert'],
    response: "Designed for Saudi Arabia! 🇸🇦 Our LEDs are specifically tested for desert climates - handling extreme heat, dust storms, and temperature fluctuations. With IP-rated protection and heat-resistant materials, they perform reliably in Riyadh, Jeddah, and across the Kingdom.",
    category: "Saudi Climate",
    followUp: ["Temperature range specifications", "Dust protection levels", "Local installation services"]
  },
  {
    keywords: ['energy', 'efficiency', 'consumption', 'power', 'electricity'],
    response: "Incredible energy efficiency! ⚡ LEDs use 75-80% less energy than incandescent bulbs and 50% less than CFLs. A 10W LED produces the same light as a 60W incandescent! This means lower electricity bills and reduced environmental impact - perfect for Saudi Arabia's sustainability goals.",
    category: "Energy Efficiency",
    followUp: ["Energy calculator tool", "Environmental benefits", "Government incentives"]
  }
];

const quickQuestions = [
  "What are the benefits of LED lighting?",
  "Best LED solutions for Saudi climate?",
  "Smart lighting options available?",
  "How much can I save with LEDs?",
  "Installation services offered?",
  "Commercial lighting solutions?"
];

export function AILightingAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "👋 Hi! I'm your Ambienco Lighting Assistant! I'm here to help you with all your LED lighting questions. Whether you need advice on the best lighting for your space, want to know about smart lighting options, or have questions about installation - I'm here to help! What can I assist you with today?",
      timestamp: new Date()
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const apiBase = `https://${projectId}.supabase.co/functions/v1/make-server-52299eb6`;
  // Generate a persistent session ID for this page load
  const sessionId = useRef(`session-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`).current;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    // Save conversation whenever messages change (debounce could be added for optimization)
    if (messages.length > 1) { // Don't save initial greeting only
      saveConversation(messages);
    }
  }, [messages]);

  const saveConversation = async (currentMessages: Message[]) => {
    try {
      await fetch(`${apiBase}/chat/conversation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: sessionId,
          messages: currentMessages,
          userInfo: { 
            userAgent: navigator.userAgent,
            language: navigator.language,
            timestamp: new Date().toISOString()
          }
        })
      });
    } catch (e) {
      // Silent fail for chat analytics
      console.warn('Failed to save chat analytics', e);
    }
  };

  const findBestResponse = (userMessage: string): LightingKnowledge | null => {
    const lowerMessage = userMessage.toLowerCase();
    let bestMatch: LightingKnowledge | null = null;
    let highestScore = 0;

    for (const knowledge of lightingKnowledgeBase) {
      let score = 0;
      for (const keyword of knowledge.keywords) {
        if (lowerMessage.includes(keyword.toLowerCase())) {
          score += 1;
        }
      }
      
      if (score > highestScore) {
        highestScore = score;
        bestMatch = knowledge;
      }
    }

    return highestScore > 0 ? bestMatch : null;
  };

  const getDefaultResponse = (): string => {
    return "Thanks for your question! 💡 While I'd love to help with that specific inquiry, I recommend contacting our lighting experts directly for personalized assistance. You can call us at 0570514881 or visit our contact section for detailed consultation. Our team can provide tailored LED lighting solutions for your specific needs in Saudi Arabia!";
  };

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: currentMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const bestResponse = findBestResponse(currentMessage);
      const responseContent = bestResponse ? bestResponse.response : getDefaultResponse();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: responseContent,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);

      // Add follow-up suggestions if available
      if (bestResponse?.followUp) {
        setTimeout(() => {
          const followUpMessage: Message = {
            id: (Date.now() + 2).toString(),
            type: 'assistant',
            content: `💡 You might also be interested in:\n${bestResponse.followUp?.map(q => `• ${q}`).join('\n')}`,
            timestamp: new Date()
          };
          setMessages(prev => [...prev, followUpMessage]);
        }, 1000);
      }
    }, 1000 + Math.random() * 1000);
  };

  const handleQuickQuestion = (question: string) => {
    setCurrentMessage(question);
    setTimeout(() => handleSendMessage(), 100);
  };

  const handleMarkHelpful = (messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, helpful: true } : msg
    ));
    toast.success("Thanks for your feedback! 😊");
  };

  const handleContactExpert = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <motion.button
              onClick={() => setIsOpen(true)}
              className="relative bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white p-4 rounded-full shadow-2xl border-2 border-amber-400/30"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              animate={{
                boxShadow: [
                  '0 0 20px rgba(245, 158, 11, 0.5)',
                  '0 0 40px rgba(245, 158, 11, 0.8)',
                  '0 0 20px rgba(245, 158, 11, 0.5)'
                ]
              }}
              transition={{
                boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <MessageCircle className="w-8 h-8" />
              
              {/* Notification Dot */}
              <motion.div
                className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              
              {/* AI Sparkle Effect */}
              <motion.div
                className="absolute -top-2 -left-2 text-amber-300"
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Sparkles className="w-5 h-5" />
              </motion.div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-96 h-[32rem]"
          >
            <Card className="w-full h-full bg-slate-900/95 border-amber-400/30 backdrop-blur-xl shadow-2xl">
              <CardHeader className="pb-3 border-b border-slate-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <motion.div
                      className="relative bg-gradient-to-r from-amber-500 to-orange-500 p-2 rounded-full"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <Bot className="w-6 h-6 text-white" />
                      <motion.div
                        className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border border-white"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    </motion.div>
                    <div>
                      <CardTitle className="text-white text-lg flex items-center">
                        AI Lighting Assistant
                        <Lightbulb className="w-4 h-4 ml-2 text-amber-400" />
                      </CardTitle>
                      <p className="text-xs text-slate-400">Powered by Ambienco Intelligence</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="text-slate-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="p-0 h-full flex flex-col">
                {/* Quick Questions */}
                <div className="p-4 border-b border-slate-700 bg-slate-800/50">
                  <p className="text-xs text-slate-400 mb-2">Quick questions:</p>
                  <div className="flex flex-wrap gap-1">
                    {quickQuestions.slice(0, 3).map((question, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="text-xs cursor-pointer border-amber-400/30 text-amber-400 hover:bg-amber-400/10"
                        onClick={() => handleQuickQuestion(question)}
                      >
                        {question}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Messages */}
                <div className="relative flex-1 p-4 overflow-y-auto space-y-4 min-h-0">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-start space-x-2 max-w-[85%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          message.type === 'user' 
                            ? 'bg-blue-600' 
                            : 'bg-gradient-to-r from-amber-500 to-orange-500'
                        }`}>
                          {message.type === 'user' ? (
                            <User className="w-4 h-4 text-white" />
                          ) : (
                            <Bot className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <div className={`rounded-lg p-3 ${
                          message.type === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-800 text-slate-200 border border-slate-700'
                        }`}>
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                          {message.type === 'assistant' && !message.helpful && message.id !== '1' && (
                            <div className="flex items-center space-x-2 mt-2 pt-2 border-t border-slate-600">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleMarkHelpful(message.id)}
                                className="text-xs text-slate-400 hover:text-green-400 p-1"
                              >
                                <ThumbsUp className="w-3 h-3 mr-1" />
                                Helpful
                              </Button>
                            </div>
                          )}
                          {message.helpful && (
                            <div className="mt-2 text-xs text-green-400 flex items-center">
                              <Star className="w-3 h-3 mr-1" />
                              Thanks for the feedback!
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                        <div className="bg-slate-800 text-slate-200 border border-slate-700 rounded-lg p-3">
                          <div className="flex space-x-1">
                            <motion.div
                              className="w-2 h-2 bg-amber-400 rounded-full"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                            />
                            <motion.div
                              className="w-2 h-2 bg-amber-400 rounded-full"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                            />
                            <motion.div
                              className="w-2 h-2 bg-amber-400 rounded-full"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-slate-700 bg-slate-800/30">
                  <div className="flex space-x-2 mb-2">
                    <Input
                      value={currentMessage}
                      onChange={(e) => setCurrentMessage(e.target.value)}
                      placeholder="Ask about LED lighting..."
                      className="flex-1 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-amber-400"
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      disabled={isTyping}
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!currentMessage.trim() || isTyping}
                      className="bg-amber-500 hover:bg-amber-600 text-white"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleContactExpert}
                      className="text-xs text-slate-400 hover:text-amber-400"
                    >
                      <Phone className="w-3 h-3 mr-1" />
                      Talk to Expert
                    </Button>
                    <p className="text-xs text-slate-500">AI-powered assistance</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}