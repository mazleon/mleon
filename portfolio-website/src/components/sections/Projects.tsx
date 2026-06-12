import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SectionHeader from "../ui/SectionHeader";
import { Github, ExternalLink, Eye, X } from "lucide-react";
import MotionWrapper from "@/components/common/MotionWrapper";
import TiltCard from "../ui/TiltCard";

type ProjectCategory = "all" | "ml" | "software" | "research";

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  category: ProjectCategory[];
  technologies: string[];
  image: string;
  githubLink?: string;
  liveLink?: string;
}

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const projects: Project[] = [
    {
      id: "ekyc-platform",
      title: "eKYC Biometric Onboarding Platform",
      description:
        "Scale: 20M+ fintech users · Banks: Southeast Bank, Telecash · Regulatory: BFIU compliant",
      longDescription: `**Problem:** Manual KYC onboarding took 48 hours and required physical branch visits, creating 67% drop-off in digital banking sign-ups.\n\n**Approach:** Built a 5-stage AI pipeline: liveness detection → face extraction → NID/passport OCR (fine-tuned TrOCR) → ArcFace face matching → ML risk scoring ensemble. Async architecture on SQS handles ~385 submissions/hour peak.\n\n**Result:** Onboarding reduced from 48 hours to under 5 minutes. Auto-approval rate of 85%+ while maintaining BFIU regulatory compliance. System has served 20M+ users since deployment.`,
      category: ["ml", "software"],
      technologies: [
        "PyTorch",
        "TrOCR",
        "InsightFace",
        "AWS SageMaker",
        "Docker",
        "MLflow",
      ],
      image: "/images/projects/face-recognition.png",
    },
    {
      id: "leaf-grading",
      title: "Digital Leaf Grading System",
      description:
        "Scale: BAT Supply Chain · Accuracy: 95%+ · Impact: 3x Processing Speed",
      longDescription: `**Problem:** Traditional manual inspection methods for tobacco leaves were time-consuming and subject to subjective human error, creating bottlenecks in the supply chain.\n\n**Approach:** Developed and deployed sophisticated computer vision algorithms and custom-trained CNN models to analyze images of tobacco leaves, classifying them into different quality grades based on color, texture, size, and defects. Integrated with MLflow for tracking.\n\n**Result:** Achieved a 95% accuracy rate while processing leaves 10x faster than human inspectors. Boosted overall grading consistency by 25%.`,
      category: ["ml", "research"],
      technologies: ["Python", "TensorFlow", "OpenCV", "AWS", "Docker"],
      image: "/images/projects/leaf-grading-system.png",
    },
    {
      id: "anomaly-detection",
      title: "Real-time Video Anomaly Detection",
      description:
        "Scale: Production Edge Devices · Latency: <50ms · Hardware: NVIDIA Jetson",
      longDescription: `**Problem:** Security systems generated too many false positives and lacked the latency required for real-time intervention at the edge.\n\n**Approach:** Designed and implemented a hybrid YOLO + ML model specifically optimized for NVIDIA Jetson edge devices using TensorRT and DeepStream.\n\n**Result:** Achieved <50ms inference latency at 30 FPS in production environments, significantly reducing false alarms while maintaining high detection rates.`,
      category: ["ml", "software"],
      technologies: [
        "Python",
        "PyTorch",
        "TensorRT",
        "DeepStream",
        "Docker",
        "Edge AI",
      ],
      image: "/images/projects/anomaly-detection.png",
    },
    {
      id: "ai-chatbot",
      title: "Agent-Based AI Chatbot",
      description: "Scale: 10K+ Daily Queries · Response Time: -60%",
      longDescription: `**Problem:** Customer support centers were overwhelmed with routine queries, leading to long wait times and poor user experience.\n\n**Approach:** Built and optimized multiple LLM-powered chatbot systems using LangChain, Google ADK, and vector databases (Chroma, Qdrant) for scalable RAG implementation.\n\n**Result:** Autonomously handled 10K+ daily queries and reduced customer support average response time by 60%.`,
      category: ["ml", "software"],
      technologies: [
        "LangChain",
        "LLMs",
        "Qdrant",
        "Chroma",
        "Python",
        "Docker",
      ],
      image: "/images/projects/ai-chatbot.png",
    },
  ];

  const filteredProjects = projects.filter(
    (project) =>
      activeCategory === "all" || project.category.includes(activeCategory)
  );

  const categories = [
    { id: "all", label: "All Work" },
    { id: "ml", label: "Machine Learning" },
    { id: "software", label: "Software Eng" },
    { id: "research", label: "R&D" },
  ];

  return (
    <section id="projects" className="section bg-primary relative">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <SectionHeader
          label="04 — Production Deployments"
          title="Featured Work"
          subtitle="Real-world systems shipped at scale"
        />

        {/* Category Filter */}
        <MotionWrapper delay={0.2} className="flex justify-center mb-16">
          <div className="flex flex-wrap gap-2 p-1 bg-surface rounded-full border border-surface-light">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as ProjectCategory)}
                className={`px-5 py-2 text-sm font-body rounded-full transition-all duration-200 cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-accent text-white"
                    : "text-muted hover:text-cream"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </MotionWrapper>

        {/* Projects Grid */}
        <motion.div
          ref={ref}
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
              >
                <TiltCard>
                <div
                  className="editorial-card group overflow-hidden h-full cursor-pointer hover:border-accent/30"
                  onClick={() => setSelectedProject(project)}
                >
                  {/* Image */}
                  <div className="relative h-56 -mx-6 -mt-6 mb-6 overflow-hidden bg-surface-light">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = "/images/project-placeholder.png";
                      }}
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProject(project);
                        }}
                        className="p-3 rounded-full bg-cream/10 text-cream hover:bg-accent hover:text-white transition-all cursor-pointer"
                        aria-label="View project details"
                      >
                        <Eye size={20} />
                      </button>
                      {project.githubLink && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-3 rounded-full bg-cream/10 text-cream hover:bg-accent hover:text-white transition-all cursor-pointer"
                          aria-label="View source code"
                        >
                          <Github size={20} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-heading font-bold text-cream group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-xs font-mono text-accent uppercase tracking-wider ml-3 flex-shrink-0">
                      {project.category[0]}
                    </span>
                  </div>

                  <p className="text-cream-dark text-sm font-body leading-relaxed mb-6">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-4 border-t border-surface-light">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-mono text-muted border border-surface-light rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="text-xs text-muted/50">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-primary/95 backdrop-blur-sm"
              />
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-3xl bg-surface border border-surface-light rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
              >
                {/* Modal Image */}
                <div className="relative h-64 sm:h-72 w-full shrink-0 bg-surface-light">
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent z-10" />
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                  <button
                    className="absolute top-4 right-4 z-20 p-2 rounded-full bg-primary/60 text-cream hover:bg-primary transition-colors cursor-pointer"
                    onClick={() => setSelectedProject(null)}
                    aria-label="Close"
                  >
                    <X size={18} />
                  </button>
                  <div className="absolute bottom-6 left-6 z-20">
                    <h3 className="text-3xl font-heading font-bold text-cream mb-2">
                      {selectedProject.title}
                    </h3>
                    <div className="flex gap-2">
                      {selectedProject.category.map((c) => (
                        <span
                          key={c}
                          className="px-3 py-1 text-xs font-mono bg-accent text-white rounded-full uppercase"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-8 overflow-y-auto">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                      {selectedProject.longDescription ? (
                        selectedProject.longDescription
                          .split("\n\n")
                          .map((paragraph, i) => (
                            <p
                              key={i}
                              className="text-cream-dark font-body leading-relaxed mb-4"
                              dangerouslySetInnerHTML={{
                                __html: paragraph.replace(
                                  /\*\*(.*?)\*\*/g,
                                  '<strong class="text-cream font-bold">$1</strong>'
                                ),
                              }}
                            />
                          ))
                      ) : (
                        <p className="text-cream-dark font-body leading-relaxed">
                          {selectedProject.description}
                        </p>
                      )}
                    </div>
                    <div className="space-y-6">
                      <div>
                        <p className="editorial-label">Tech Stack</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 text-xs font-mono text-muted border border-surface-light rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col gap-3">
                        {selectedProject.githubLink && (
                          <a
                            href={selectedProject.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary text-center text-sm cursor-pointer"
                          >
                            <Github className="inline mr-2 h-4 w-4" /> View Code
                          </a>
                        )}
                        {selectedProject.liveLink && (
                          <a
                            href={selectedProject.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-outline text-center text-sm cursor-pointer"
                          >
                            <ExternalLink className="inline mr-2 h-4 w-4" />{" "}
                            Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;
