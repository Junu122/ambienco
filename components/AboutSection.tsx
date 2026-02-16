import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import {
  Lightbulb,
  Zap,
  Home,
  Users,
  Globe,
  Award,
  Building,
  Star,
} from "lucide-react";

const values = [
  {
    icon: Lightbulb,
    title: "Illuminate",
    description:
      "We bring light to every corner of Saudi Arabia, creating brighter spaces for families and businesses to thrive.",
  },
  {
    icon: Zap,
    title: "Empower",
    description:
      "Our innovative LED solutions empower communities with energy-efficient lighting that reduces costs and environmental impact.",
  },
  {
    icon: Home,
    title: "Live",
    description:
      "We enhance the way people live by providing lighting solutions that create comfort, safety, and beauty in everyday life.",
  },
];

const stats = [
  { value: "5000+", label: "Projects Completed" },
  { value: "15+", label: "Cities in Saudi Arabia" },
  { value: "98%", label: "Customer Satisfaction" },
  { value: "10", label: "Years of Excellence" },
];

export function AboutSection() {
  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-br from-slate-50 to-amber-50 dark:from-slate-900 dark:to-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            About{" "}
            <span className="text-white drop-shadow-lg">
              Ambi-Enco
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Based in Riyadh, we are passionate about light and
            design, creating integrated solutions that transform
            spaces into inspiring experiences
          </p>
        </motion.div>

        {/* Brand Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group"
            >
              <Card className="h-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-border hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <motion.div
                    className="inline-flex items-center justify-center w-16 h-16 bg-amber-500/10 rounded-full mb-6 group-hover:bg-amber-500/20 transition-colors duration-300"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <value.icon className="w-8 h-8 text-amber-500" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Company Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-3xl font-bold text-foreground mb-6">
              About Ambi-Enco
            </h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                At{" "}
                <span className="text-white font-semibold">
                  Ambi-Enco
                </span>
                , based in Riyadh, we are passionate about light
                and design. Lighting is at the heart of every
                space, and we believe it should do more than
                just illuminate—it should create comfort,
                ambiance, and elegance. Each fixture is
                carefully curated and crafted to ensure
                exceptional quality, aesthetic appeal, and
                functional precision, transforming rooms into
                experiences that inspire and delight.
              </p>
              <p>
                Beyond lighting,{" "}
                <span className="text-white font-semibold">
                  Ambi-Enco
                </span>{" "}
                specializes in electronics and furniture,
                offering complete project solutions. From the
                initial foundation to the finishing touches, we
                ensure that every element is thoughtfully
                integrated, perfectly suited to its purpose, and
                harmoniously connected with the overall design.
                Our holistic approach guarantees spaces that are
                not only visually stunning but also practical,
                functional, and ready for modern living.
              </p>
              <p>
                Our mission is to deliver integrated,
                high-quality solutions that bring visions to
                life. At{" "}
                <span className="text-white font-semibold">
                  Ambi-Enco
                </span>
                , we don't just provide products—we craft
                experiences, designing spaces where every detail
                matters and every element works together
                seamlessly to create a cohesive, inspiring
                environment.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <motion.div
              className="w-full h-96 bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 rounded-2xl shadow-2xl flex items-center justify-center relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  rotate: {
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                  },
                  scale: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
              />
              <div className="grid grid-cols-2 gap-8 relative z-10">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="flex items-center justify-center"
                >
                  <Building className="w-16 h-16 text-white/90" />
                </motion.div>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1.5,
                  }}
                  className="flex items-center justify-center"
                >
                  <Star className="w-16 h-16 text-white/90" />
                </motion.div>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 3,
                  }}
                  className="flex items-center justify-center"
                >
                  <Globe className="w-16 h-16 text-white/90" />
                </motion.div>
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                  className="flex items-center justify-center"
                >
                  <Award className="w-16 h-16 text-white/90" />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}