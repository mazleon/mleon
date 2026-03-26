import SectionHeader from "../ui/SectionHeader";
import { Calendar, ChevronRight } from "lucide-react";
import MotionWrapper from "@/components/common/MotionWrapper";

interface ExperienceItem {
  id: number;
  title: string;
  company: string;
  duration: string;
  description: string[];
  technologies: string[];
}

const Experience = () => {
  const experiences: ExperienceItem[] = [
    {
      id: 1,
      title: "Senior Software Engineer",
      company: "RedDot Digital Limited",
      duration: "Aug 2021 — Present",
      description: [
        "Architected an Agent-Based AI Chatbot using advanced NLP and orchestration patterns (LangChain, CrewAI).",
        "Designed the Digital Leaf Grading System for BAT, leveraging custom Computer Vision models for 95%+ accuracy.",
        "Built a real-time Suspicious Anomaly Detection system processing high-throughput data streams.",
        "Led end-to-end development of a Biometric Verification System with liveness detection.",
        "Managed cloud infrastructure (AWS) and CI/CD pipelines for scalable AI production deployments.",
      ],
      technologies: ["Python", "TensorFlow", "PyTorch", "Computer Vision", "NLP", "LLM", "CrewAI", "LangChain", "FastAPI", "React", "AWS", "Docker"],
    },
    {
      id: 2,
      title: "Jr. Data Science Engineer",
      company: "CMED Health Limited",
      duration: "Sep 2020 — July 2021",
      description: [
        "Developed predictive ML models for early medical diagnostics and health trend analysis.",
        "Implemented robust data processing pipelines for IoT medical sensor data.",
        "Collaborated with medical professionals to fine-tune algorithms for clinical accuracy.",
        "Authored research papers on health data analytics and predictive modeling.",
      ],
      technologies: ["Python", "Scikit-learn", "Pandas", "SQL", "Visualization", "Statistics"],
    },
  ];

  return (
    <section id="experience" className="section bg-surface relative">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <SectionHeader
          label="02 — Experience"
          title="Where I've Worked"
          subtitle="My professional journey in software engineering and machine learning"
        />

        <div className="max-w-4xl mx-auto space-y-0">
          {experiences.map((exp, index) => (
            <MotionWrapper key={exp.id} delay={index * 0.15}>
              <div className={`relative pl-8 pb-16 ${index < experiences.length - 1 ? "border-l border-surface-light" : "border-l border-transparent"}`}>
                {/* Timeline dot */}
                <div className="absolute left-0 top-1 w-2 h-2 rounded-full bg-accent -translate-x-[4.5px]" />

                {/* Header */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar size={14} className="text-muted" />
                    <span className="text-xs font-mono text-muted tracking-wider uppercase">{exp.duration}</span>
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-cream">{exp.title}</h3>
                  <p className="text-lg text-accent font-body">{exp.company}</p>
                </div>

                {/* Description */}
                <ul className="space-y-3 mb-6">
                  {exp.description.map((point, idx) => (
                    <li key={idx} className="flex items-start text-cream-dark text-sm leading-relaxed font-body">
                      <ChevronRight className="mt-0.5 mr-2 flex-shrink-0 text-accent/60" size={14} />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-mono text-muted border border-surface-light rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </MotionWrapper>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
