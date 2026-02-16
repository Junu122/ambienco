import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Download, 
  FileText, 
  Image, 
  BookOpen, 
  Zap, 
  Home, 
  Lightbulb,
  ExternalLink,
  Calendar
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function DownloadSection() {
  const downloadCategories = [
    {
      title: 'Product Catalogs',
      description: 'Complete product catalogs with specifications and pricing',
      icon: <BookOpen className="w-6 h-6 text-amber-400" />,
      items: [
        {
          name: 'LED Lighting Catalog 2024',
          type: 'PDF',
          size: '15.2 MB',
          description: 'Complete LED lighting solutions catalog with technical specifications',
          updated: '2024-01-15',
          downloads: 1247,
          featured: true
        },
        {
          name: 'Smart Furniture Collection',
          type: 'PDF',
          size: '22.8 MB',
          description: 'Innovative furniture designs with built-in lighting features',
          updated: '2024-01-10',
          downloads: 856,
          featured: false
        },
        {
          name: 'Electrical Components Guide',
          type: 'PDF',
          size: '8.7 MB',
          description: 'Technical guide for electrical components and accessories',
          updated: '2024-01-05',
          downloads: 642,
          featured: false
        }
      ]
    },
    {
      title: 'Technical Resources',
      description: 'Installation guides, specifications, and technical documentation',
      icon: <Zap className="w-6 h-6 text-blue-400" />,
      items: [
        {
          name: 'Installation Guide V3.2',
          type: 'PDF',
          size: '5.4 MB',
          description: 'Step-by-step installation guide for LED lighting systems',
          updated: '2024-01-20',
          downloads: 2341,
          featured: true
        },
        {
          name: 'Wiring Diagrams Collection',
          type: 'PDF',
          size: '12.1 MB',
          description: 'Comprehensive wiring diagrams for all product categories',
          updated: '2024-01-18',
          downloads: 1876,
          featured: false
        },
        {
          name: 'Maintenance Manual',
          type: 'PDF',
          size: '7.3 MB',
          description: 'Maintenance procedures and troubleshooting guide',
          updated: '2024-01-12',
          downloads: 934,
          featured: false
        }
      ]
    },
    {
      title: 'Design Templates',
      description: 'CAD files, 3D models, and design templates for professionals',
      icon: <Image className="w-6 h-6 text-green-400" />,
      items: [
        {
          name: 'CAD Files Package',
          type: 'ZIP',
          size: '45.6 MB',
          description: 'AutoCAD files for all LED fixtures and electrical components',
          updated: '2024-01-22',
          downloads: 756,
          featured: true
        },
        {
          name: '3D Models Collection',
          type: 'ZIP',
          size: '67.2 MB',
          description: '3D models compatible with major design software',
          updated: '2024-01-15',
          downloads: 543,
          featured: false
        },
        {
          name: 'Lighting Design Templates',
          type: 'ZIP',
          size: '18.9 MB',
          description: 'Pre-designed lighting layouts for common applications',
          updated: '2024-01-08',
          downloads: 421,
          featured: false
        }
      ]
    }
  ];

  const handleDownload = (filename: string) => {
    // In a real application, this would trigger actual file download
    console.log(`Downloading ${filename}...`);
    // For demo purposes, we'll just show an alert
    alert(`Download started: ${filename}\n\nNote: This is a demo. In production, the actual file would be downloaded.`);
  };

  return (
    <section id="download" className="py-20 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {Array.from({ length: 12 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-amber-400/15 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1.2, 0],
              opacity: [0, 0.6, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: i * 0.6,
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
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <Download className="w-10 h-10 text-amber-400" />
          </motion.div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-amber-200 to-white bg-clip-text text-transparent mb-4">
            Download Center
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Access comprehensive product documentation, technical resources, and design tools for your lighting projects.
          </p>
        </motion.div>

        {/* Download Categories */}
        <div className="space-y-12">
          {downloadCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
            >
              {/* Category Header */}
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-slate-700/50 rounded-lg flex items-center justify-center mr-4">
                  {category.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">{category.title}</h3>
                  <p className="text-muted-foreground">{category.description}</p>
                </div>
              </div>

              {/* Download Items Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {category.items.map((item, itemIndex) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: itemIndex * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Card className={`bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700 h-full relative overflow-hidden ${
                      item.featured ? 'border-amber-500/50 shadow-lg shadow-amber-500/10' : ''
                    }`}>
                      {item.featured && (
                        <Badge className="absolute top-4 right-4 bg-amber-500/20 text-amber-400 border-amber-500/30">
                          Featured
                        </Badge>
                      )}
                      
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg text-foreground mb-2 pr-4">
                              {item.name}
                            </CardTitle>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <span className="flex items-center">
                                <FileText className="w-3 h-3 mr-1" />
                                {item.type}
                              </span>
                              <span>{item.size}</span>
                            </div>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <p className="text-sm text-slate-300">{item.description}</p>
                        
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            Updated {new Date(item.updated).toLocaleDateString()}
                          </span>
                          <span>{item.downloads.toLocaleString()} downloads</span>
                        </div>

                        <Button
                          onClick={() => handleDownload(item.name)}
                          className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Resources */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 text-center"
        >
          <Card className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-slate-700">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center justify-center">
                <ExternalLink className="w-6 h-6 text-amber-400 mr-3" />
                Need Custom Documentation?
              </h3>
              <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                Looking for specific technical documentation or custom design files? Our team can prepare tailored resources for your project requirements.
              </p>
              <Button
                onClick={() => {
                  const contactElement = document.getElementById('contact');
                  if (contactElement) {
                    contactElement.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                variant="outline"
                className="border-amber-500 text-amber-400 hover:bg-amber-500/10"
              >
                Request Custom Documentation
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}