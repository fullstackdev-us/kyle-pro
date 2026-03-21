import { motion } from "framer-motion";

const jobs = [
  {
    title: "Software Engineer II",
    company: "Eventpoint",
    location: "Seattle, WA",
    period: "Apr 2024 – Dec 2025",
    bullets: [
      "Delivered event management products (registration, email, surveys, sessions) using React, .NET 8, and Cosmos DB for 6+ corporate events.",
      "Acted as interim Product Owner, defining requirements, building roadmaps, and validating deliverables with stakeholders.",
      "Led Agile ceremonies as Scrum Master, refined backlogs, and assessed team capacity.",
      "Orchestrated agent workflows to improve development velocity and reliability.",
    ],
  },
  {
    title: "Software Engineer, Team Lead",
    company: "Stova",
    location: "Seattle, WA",
    period: "Apr 2023 – Apr 2024",
    bullets: [
      "Architected and led development of a Vue.js badge designer and desktop agent-based printing solution.",
      "Integrated printer SDKs for on-demand badge printing and encoding.",
      "Implemented E2E testing with Playwright, increasing test coverage and reliability.",
      "Mentored junior developers and managed critical Azure/AWS infrastructure.",
    ],
  },
  {
    title: "Consultant",
    company: "Slalom Consulting",
    location: "Seattle, WA",
    period: "Jul 2022 – Apr 2023",
    bullets: [
      "Developed and launched a React sales management application.",
      "Managed a code-first MS SQL database with Entity Framework.",
    ],
  },
  {
    title: "Product Engineer",
    company: "Stova (Formerly Eventcore)",
    location: "Seattle, WA",
    period: "Apr 2019 – Jul 2022",
    bullets: [
      "Developed key features for a high-availability SaaS event platform using Vue.js.",
      "Designed .NET Core REST APIs for microservice communication.",
      "Used Akka.NET actor systems for scalability and concurrency.",
      "Designed and maintained Cosmos DB and Elasticsearch databases.",
      "Managed microservices in a Kubernetes cluster.",
    ],
  },
];

export const ExperienceSection = () => (
  <section className="py-16 border-t border-border">
    <motion.h2
      className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      Experience
    </motion.h2>
    <div className="space-y-12">
      {jobs.map((job, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
        >
          <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2">
            <h3 className="text-lg font-semibold">{job.title}</h3>
            <span className="text-sm text-muted-foreground font-mono">{job.period}</span>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            {job.company} · {job.location}
          </p>
          <ul className="space-y-1.5">
            {job.bullets.map((b, j) => (
              <li key={j} className="text-sm text-secondary-foreground pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-accent">
                {b}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  </section>
);
