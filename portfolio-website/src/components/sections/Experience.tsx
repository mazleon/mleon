import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionHeader from "../ui/SectionHeader";
import { Briefcase, Calendar, ChevronRight } from "lucide-react";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
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
      duration: "Aug 2021 - Present",
      description: [
        "Architected an Agent-Based AI Chatbot using advanced NLP and orchestration patterns (LangChain, CrewAI).",
        "Designed the Digital Leaf Grading System for BAT, leveraging custom Computer Vision models for 95%+ accuracy.",
        "Built a real-time Suspicious Anomaly Detection system processing high-throughput data streams.",
        "Led the end-to-end development of a Biometric Verification System with liveness detection.",
        "Managed cloud infrastructure (AWS) and CI/CD pipelines for scalable AI production deployments."
      ],
      technologies: [
        "Python", "TensorFlow", "PyTorch", "Computer Vision", "NLP", "LLM",
        "CrewAI", "LangChain", "FastAPI", "React", "AWS", "Docker"
      ],
    },
    {
      id: 2,
      title: "Jr. Data Science Engineer",
      company: "CMED Health Limited",
      duration: "Sep 2020 - July 2021",
      description: [
        "Developed predictive ML models for early medical diagnostics and health trend analysis.",
        "Implemented robust data processing pipelines for IoT medical sensor data.",
        "Collaborated with medical professionals to fine-tune algorithms for clinical accuracy.",
        "Authored research papers on health data analytics and predictive modeling."
      ],
      technologies: [
        "Python", "Scikit-learn", "Pandas", "SQL", "Visualization", "Statistics"
      ],
    },
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section id="experience" ref={containerRef} className="section bg-deep-space relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-accent-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 z-10 relative">
        <SectionHeader
          title="Work Experience"
          subtitle="My professional journey in software engineering and machine learning"
        />

        <div className="max-w-5xl mx-auto mt-16 relative">
          {/* Central Timeline Line */}
          <motion.div
            style={{ scaleY: scrollYProgress }}
            className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent-primary to-transparent origin-top md:transform md:-translate-x-1/2 z-0 hidden md:block"
          />

          {/* Experience Items */}
          <div className="space-y-16 md:space-y-24">
            {experiences.map((experience, index) => (
              <div key={experience.id} className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} items-center`}>

                {/* Timeline Node (Central Dot) */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-[#18181B] border-2 border-accent-primary z-10 transform md:-translate-x-1/2 mt-6 md:mt-0 shadow-[0_0_10px_rgba(139,92,246,0.5)]">
                  <div className="absolute inset-0 rounded-full bg-accent-primary animate-ping opacity-20" />
                </div>

                {/* Content Side */}
                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pl-16' : 'md:pr-16'} pl-12`}>
                  <MotionWrapper delay={index * 0.2} threshold={0.2}>
                    <Card className="glass-panel border-white/5 hover:border-accent-primary/30 transition-all duration-300 group">
                      <CardContent className="p-6 md:p-8 relative overflow-hidden">
                        {/* Glowing corner effect */}
                        <div className={`absolute top-0 ${index % 2 === 0 ? 'left-0' : 'right-0'} w-20 h-20 bg-accent-primary/10 blur-2xl -translate-y-1/2 ${index % 2 === 0 ? '-translate-x-1/2' : 'translate-x-1/2'}`} />

                        <div className="flex flex-col mb-4 relative z-10">
                          <div className="flex items-center gap-3 mb-2 text-accent-primary">
                            <Briefcase size={20} />
                            <h3 className="text-xl font-heading font-bold text-white tracking-wide">{experience.title}</h3>
                          </div>
                          <div className="flex items-center gap-3 justify-between">
                            <span className="text-lg font-medium text-white/90">{experience.company}</span>
                            <div className="flex items-center text-xs font-mono text-gray-400 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                              <Calendar size={12} className="mr-2" />
                              {experience.duration}
                            </div>
                          </div>
                        </div>

                        <ul className="space-y-3 mb-6 relative z-10">
                          {experience.description.map((point, idx) => (
                            <li key={idx} className="flex items-start text-gray-300 text-sm leading-relaxed">
                              <ChevronRight className="mt-1 mr-2 flex-shrink-0 text-accent-primary" size={16} />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5 relative z-10">
                          {experience.technologies.slice(0, 8).map((tech, idx) => (
                            <Badge key={idx} variant="outline" className="border-white/10 text-gray-400 text-[10px] hover:text-white hover:border-accent-primary/50 transition-colors">
                              {tech}
                            </Badge>
                          ))}
                          {experience.technologies.length > 8 && (
                            <Badge variant="outline" className="border-white/10 text-gray-400 text-[10px]">
                              +{experience.technologies.length - 8} more
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </MotionWrapper>
                </div>

                {/* Empty Side for layout balance (hidden on mobile) */}
                <div className="w-1/2 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
