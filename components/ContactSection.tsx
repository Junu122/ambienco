import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Clock, 
  Users, 
  Zap, 
  CheckCircle,
  Lightbulb,
  Building,
  Globe,
  Star
} from 'lucide-react';

export function ContactSection() {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      return;
    }

    setIsSubmitting(true);
    
    // Construct email body
    const body = `
Name: ${contactForm.name}
Email: ${contactForm.email}
Phone: ${contactForm.phone}
Company: ${contactForm.company}
Subject: ${contactForm.subject}

Message:
${contactForm.message}
    `.trim();

    // Create mailto link
    const mailtoLink = `mailto:unaise@ambi-enco.it.com?subject=${encodeURIComponent(contactForm.subject)}&body=${encodeURIComponent(body)}`;

    // Open email client
    window.location.href = mailtoLink;

    // Show success state
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setContactForm({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: 'General Inquiry',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    }, 1000);
  };

  const subjects = [
    'General Inquiry',
    'Product Quote Request',
    'Installation Services',
    'Technical Support',
    'Partnership Opportunities',
    'Custom Solutions',
    'Bulk Orders'
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {Array.from({ length: 15 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-amber-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1.5, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-amber-500/20 to-blue-500/20 rounded-full mb-6 backdrop-blur-sm"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <Mail className="w-10 h-10 text-amber-400" />
          </motion.div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-amber-200 to-white bg-clip-text text-transparent mb-4">
            Get In Touch
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Ready to illuminate your space? Contact our expert team for personalized lighting solutions and professional consultation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="xl:col-span-1 space-y-6"
          >
            {/* Contact Info Cards */}
            <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center mr-4">
                    <Phone className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Call Us</h3>
                    <p className="text-sm text-muted-foreground">Available 24/7</p>
                  </div>
                </div>
                <p className="text-lg font-mono text-amber-400">+966 570514881</p>
                <p className="text-sm text-muted-foreground mt-1">Direct line to our consultation team</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mr-4">
                    <Mail className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Email Us</h3>
                    <p className="text-sm text-muted-foreground">Response within 4 hours</p>
                  </div>
                </div>
                <p className="text-lg text-blue-400">unaise@ambi-enco.it.com</p>
                <p className="text-sm text-muted-foreground mt-1">For quotes and inquiries</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mr-4">
                    <MapPin className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Visit Us</h3>
                    <p className="text-sm text-muted-foreground">Showroom & Office</p>
                  </div>
                </div>
                <p className="text-sm text-green-400">King Fahd Road</p>
                <p className="text-sm text-green-400">Riyadh, Saudi Arabia</p>
                <p className="text-xs text-muted-foreground mt-1">Open Sun-Thu: 8AM-6PM</p>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-slate-700">
              
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="xl:col-span-2"
          >
            <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-700">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground flex items-center">
                  <Lightbulb className="w-6 h-6 text-amber-400 mr-3" />
                  Request Consultation
                </CardTitle>
                <p className="text-muted-foreground">
                  Tell us about your lighting project and we'll provide a customized solution with detailed quotation.
                </p>
              </CardHeader>
              <CardContent>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg"
                  >
                    <div className="flex items-center text-green-400">
                      <CheckCircle className="w-5 h-5 mr-3" />
                      <div>
                        <h4 className="font-semibold">Message Sent Successfully!</h4>
                        <p className="text-sm text-green-300 mt-1">
                          Thank you for your inquiry. Our team will contact you within 4 hours during business hours.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Full Name *
                      </label>
                      <Input
                        required
                        placeholder="Enter your full name"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                        className="bg-slate-800/50 border-slate-600 focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        required
                        placeholder="your.email@example.com"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                        className="bg-slate-800/50 border-slate-600 focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Phone Number
                      </label>
                      <Input
                        placeholder="+966 5X XXX XXXX"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                        className="bg-slate-800/50 border-slate-600 focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Company/Organization
                      </label>
                      <Input
                        placeholder="Your company name (optional)"
                        value={contactForm.company}
                        onChange={(e) => setContactForm({...contactForm, company: e.target.value})}
                        className="bg-slate-800/50 border-slate-600 focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Subject
                    </label>
                    <select
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                      className="w-full bg-slate-800/50 border border-slate-600 rounded-md px-3 py-2 text-sm focus:border-amber-500 focus:outline-none"
                    >
                      {subjects.map(subject => (
                        <option key={subject} value={subject}>{subject}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Project Details *
                    </label>
                    <Textarea
                      required
                      placeholder="Please describe your lighting project, space dimensions, specific requirements, and any questions you may have..."
                      value={contactForm.message}
                      onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                      className="bg-slate-800/50 border-slate-600 focus:border-amber-500 min-h-[120px]"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-3"
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="border-slate-600 text-foreground hover:bg-slate-800"
                      onClick={() => window.open('tel:+966570514881')}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call Now
                    </Button>
                  </div>

                  <div className="text-xs text-muted-foreground">
                    * Required fields. We respect your privacy and will never share your information.
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Service Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-center text-foreground mb-8">Our Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Lightbulb className="w-8 h-8 text-amber-400" />,
                title: 'Custom Design',
                description: 'Personalized lighting solutions tailored to your space and needs.'
              },
              {
                icon: <Zap className="w-8 h-8 text-blue-400" />,
                title: 'Professional Installation',
                description: 'Expert installation services with quality assurance and warranty.'
              },
              {
                icon: <Users className="w-8 h-8 text-green-400" />,
                title: '24/7 Support',
                description: 'Ongoing technical support and maintenance services for your lighting systems.'
              }
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-lg bg-slate-800/30 border border-slate-700"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-700/50 rounded-full mb-4">
                  {service.icon}
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">{service.title}</h4>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}