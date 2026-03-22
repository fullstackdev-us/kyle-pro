import { motion } from "framer-motion";

export const EducationSection = () => (
  <section className="py-16 border-t border-border">
    <motion.h2
      className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      Education & Projects
    </motion.h2>
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div>
        <h3 className="text-lg font-semibold">B.S., Software Development</h3>
        <p className="text-sm text-muted-foreground">Western Governors University · Graduated July 2019</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold">Dunbuild.com</h3>
        <p className="text-sm text-muted-foreground">
          Full-stack automotive enthusiast application. React with a serverless backend via Azure Static Web Apps.
        </p>
      </div>
    </motion.div>
  </section>
);
