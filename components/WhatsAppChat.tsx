import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  MessageCircle,
  X,
  Send,
  Phone,
  Mail,
  User,
  Clock,
  CheckCircle,
  ExternalLink,
} from "lucide-react";

export function WhatsAppChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [quickMessage, setQuickMessage] = useState("");

  const quickMessages = [
    "Hi! I'm interested in LED lighting solutions",
    "Can you provide a quote for commercial lighting?",
    "I need consultation for residential lighting",
    "What furniture options do you have available?",
    "I'd like to discuss electrical installation services",
    "Can you help with a custom lighting project?",
  ];

  const handleWhatsAppSend = (msg: string) => {
    const phoneNumber = "966570514881";
    const encodedMessage = encodeURIComponent(msg || message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
    setMessage("");
    setIsOpen(false);
  };

  const handleDirectCall = () => {
    window.open("tel:+966570514881", "_self");
  };

  const handleEmailContact = () => {
    const subject = encodeURIComponent(
      "Inquiry about Ambi-Enco Services",
    );
    const body = encodeURIComponent(
      "Hello,\n\nI am interested in your lighting solutions and would like to get more information.\n\nBest regards",
    );
    window.open(
      `mailto:unaise@ambi-enco.it.com?subject=${subject}&body=${body}`,
      "_self",
    );
  };

  return (
    <>
      {/* WhatsApp Chat Button */}
      <motion.div
        className="fixed bottom-24 right-4 z-50"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 1,
        }}
      >
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-full shadow-2xl flex items-center justify-center group transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: [
              "0 0 20px rgba(34, 197, 94, 0.4)",
              "0 0 40px rgba(34, 197, 94, 0.7)",
              "0 0 20px rgba(34, 197, 94, 0.4)",
            ],
          }}
          transition={{
            boxShadow: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          {/* WhatsApp Icon */}
          <svg
            className="w-8 h-8 text-white"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488" />
          </svg>

          {/* Notification Badge */}
          <motion.div
            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            !
          </motion.div>

          {/* Pulse Ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-green-400"
            animate={{
              scale: [1, 1.8, 1],
              opacity: [0.8, 0, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        </motion.button>

        {/* Quick Access Tooltip */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.8 }}
              className="absolute right-20 top-1/2 -translate-y-1/2 bg-slate-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap border border-slate-600 shadow-lg"
            >
              💬 Chat with us on WhatsApp!
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 bg-slate-800 border-r border-b border-slate-600 rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* WhatsApp Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-44 right-4 z-50 w-96 max-w-[calc(100vw-2rem)]"
          >
            <Card className="bg-gradient-to-br from-slate-800/95 to-slate-900/95 border-slate-600 shadow-2xl backdrop-blur-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-white"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488" />
                      </svg>
                    </div>
                    <div>
                      <CardTitle className="text-lg text-green-400">
                        WhatsApp Chat
                      </CardTitle>
                      <div className="flex items-center text-sm text-slate-400">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                        Online - Quick Response
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-slate-400 hover:text-white p-1 hover:bg-slate-700 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Contact Information */}
                <div className="bg-slate-700/50 rounded-lg p-4 space-y-3">
                  <h4 className="font-semibold text-white flex items-center">
                    <User className="w-4 h-4 mr-2 text-green-400" />
                    Contact Ambi-Enco
                  </h4>

                  {/* Phone */}
                  <motion.button
                    onClick={handleDirectCall}
                    className="w-full flex items-center text-left p-3 bg-slate-600/50 hover:bg-slate-600 rounded-lg transition-colors group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Phone className="w-4 h-4 mr-3 text-blue-400" />
                    <div>
                      <div className="text-white font-medium">
                        +966 570514881
                      </div>
                      <div className="text-xs text-slate-400">
                        Tap to call directly
                      </div>
                    </div>
                  </motion.button>

                  {/* Email */}
                  <motion.button
                    onClick={handleEmailContact}
                    className="w-full flex items-center text-left p-3 bg-slate-600/50 hover:bg-slate-600 rounded-lg transition-colors group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Mail className="w-4 h-4 mr-3 text-purple-400" />
                    <div>
                      <div className="text-white font-medium">
                        unaise@ambi-enco.it.com
                      </div>
                      <div className="text-xs text-slate-400">
                        Company email contact
                      </div>
                    </div>
                  </motion.button>
                </div>

                {/* Quick Messages */}
                <div>
                  <h4 className="font-semibold text-white mb-3 flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-amber-400" />
                    Quick Messages
                  </h4>
                  <div className="relative space-y-2 max-h-32 overflow-y-auto">
                    {quickMessages.map((msg, index) => (
                      <motion.button
                        key={index}
                        onClick={() => handleWhatsAppSend(msg)}
                        className="w-full text-left p-2 bg-slate-600/30 hover:bg-green-600/20 rounded text-sm text-slate-300 hover:text-white transition-colors border border-transparent hover:border-green-500/30"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {msg}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Custom Message */}
                <div>
                  <h4 className="font-semibold text-white mb-3 flex items-center">
                    <MessageCircle className="w-4 h-4 mr-2 text-green-400" />
                    Custom Message
                  </h4>
                  <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message here..."
                    className="bg-slate-700/50 border-slate-600 focus:border-green-500 text-white placeholder-slate-400 min-h-[80px]"
                  />
                  <Button
                    onClick={() => handleWhatsAppSend(message)}
                    disabled={!message.trim()}
                    className="w-full mt-3 bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send to WhatsApp
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </div>

                {/* Response Time Info */}
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                  <div className="text-sm">
                    <div className="text-green-400 font-medium">
                      Instant Response Available
                    </div>
                    <div className="text-green-300/80">
                      Usually replies within minutes during
                      business hours
                    </div>
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