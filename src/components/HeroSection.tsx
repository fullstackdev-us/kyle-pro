import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";

export const HeroSection = () => (
  <section className="py-20 md:py-32">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
        Kyle Dunbar
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-2">
        Full Stack Software Engineer
      </p>
      <p className="text-muted-foreground max-w-xl mb-6">
        Seattle, WA · 7 years building robust React, Vue.js, .NET, Azure & AWS applications.
        Proactive leader with Product Owner and Scrum Master experience.
      </p>
      <a
        href="https://linkedin.com/in/dunbark"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline underline-offset-4"
      >
        <Linkedin className="w-4 h-4" />
        linkedin.com/in/dunbark
      </a>
    </motion.div>
  </section>
);
