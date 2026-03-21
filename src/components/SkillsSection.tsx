import { motion } from "framer-motion";

const skills = [
  { category: "Languages", items: "C#, TypeScript, JavaScript, HTML5, SASS/CSS, TSQL, Python" },
  { category: "Frameworks", items: "React, .NET 8/Core, Vue.js, Nuxt, GraphQL, Akka.NET, Entity Framework" },
  { category: "Data", items: "Azure Cosmos DB, MS SQL Server, Elasticsearch" },
  { category: "Cloud & DevOps", items: "Azure, AWS, Kubernetes, Azure Pipelines, GitHub Actions, Jenkins" },
  { category: "AI", items: "GitHub Copilot, Claude, Cursor" },
];

export const SkillsSection = () => (
  <section className="py-16 border-t border-border">
    <motion.h2
      className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      Technical Skills
    </motion.h2>
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {skills.map((s, i) => (
        <motion.div
          key={s.category}
          className="p-4 rounded-lg bg-card"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
        >
          <h3 className="text-sm font-semibold mb-1">{s.category}</h3>
          <p className="text-sm text-muted-foreground">{s.items}</p>
        </motion.div>
      ))}
    </div>
  </section>
);
