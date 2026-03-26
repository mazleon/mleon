import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SectionHeader from "../ui/SectionHeader";
import { Github, ExternalLink, Eye, X } from "lucide-react";
import MotionWrapper from "@/components/common/MotionWrapper";

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
      id: "leaf-grading",
      title: "Digital Leaf Grading System",
      description: "AI-powered system transforming tobacco leaf grading with 95% accuracy using custom CNN architectures.",
      longDescription: "The Digital Leaf Grading System for BAT (British American Tobacco) represents a significant advancement in agricultural quality control. This system uses sophisticated computer vision algorithms and deep learning models to analyze images of tobacco leaves and classify them into different quality grades based on color, texture, size, and defects.\n\nThe system was designed to replace traditional manual inspection methods, which were time-consuming and subject to human error. By automating the grading process, we achieved a 95% accuracy rate while processing leaves 10x faster than human inspectors.\n\nThe solution incorporates a custom-trained convolutional neural network that can identify subtle leaf characteristics and categorize them according to BAT's specific quality criteria.",
      category: ["ml", "research"],
      technologies: ["Python", "TensorFlow", "OpenCV", "Flask", "React", "Docker"],
      image: "/images/projects/leaf-grading-system.png",
    },
    {
      id: "anomaly-detection",
      title: "Suspicious Anomaly Detection",
      description: "Real-time security intelligence platform using unsupervised learning to detect behavioral anomalies.",
      category: ["ml", "software"],
      technologies: ["Python", "PyTorch", "Kafka", "ElasticSearch", "Docker", "AWS"],
      image: "/images/projects/anomaly-detection.png",
    },
    {
      id: "ai-chatbot",
      title: "Agent Based AI Chatbot",
      description: "Context-aware conversational agent using orchestrated NLP modules for superior customer engagement.",
      category: ["ml", "software"],
      technologies: ["Python", "NLTK", "TensorFlow", "Node.js", "MongoDB", "Docker"],
      image: "/images/projects/ai-chatbot.png",
    },
    {
      id: "face-recognition",
      title: "Biometric Verification System",
      description: "High-security identity verification platform with anti-spoofing liveness detection capabilities.",
      category: ["ml", "software"],
      technologies: ["Python", "Dlib", "OpenCV", "FastAPI", "React", "TensorFlow"],
      image: "/images/projects/face-recognition.png",
    },
  ];

  const filteredProjects = projects.filter(
    (project) => activeCategory === "all" || project.category.includes(activeCategory)
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
          label="04 — Projects"
          title="Featured Work"
          subtitle="Innovations in AI and Software Engineering"
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
        <motion.div ref={ref} layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <div className="editorial-card group overflow-hidden h-full cursor-pointer hover:border-accent/30" onClick={() => setSelectedProject(project)}>
                  {/* Image */}
                  <div className="relative h-56 -mx-6 -mt-6 mb-6 overflow-hidden bg-surface-light">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      onError={(e) => { e.currentTarget.src = "/images/project-placeholder.png"; }}
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4">
                      <button
                        onClick={(e) => { e.stopPropagation(); setSelectedProject(project); }}
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
                      <span key={tech} className="px-3 py-1 text-xs font-mono text-muted border border-surface-light rounded-full">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="text-xs text-muted/50">+{project.technologies.length - 4}</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setSelectedProject(null)}>
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
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
                  <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                  <button
                    className="absolute top-4 right-4 z-20 p-2 rounded-full bg-primary/60 text-cream hover:bg-primary transition-colors cursor-pointer"
                    onClick={() => setSelectedProject(null)}
                    aria-label="Close"
                  >
                    <X size={18} />
                  </button>
                  <div className="absolute bottom-6 left-6 z-20">
                    <h3 className="text-3xl font-heading font-bold text-cream mb-2">{selectedProject.title}</h3>
                    <div className="flex gap-2">
                      {selectedProject.category.map((c) => (
                        <span key={c} className="px-3 py-1 text-xs font-mono bg-accent text-white rounded-full uppercase">
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
                      <p className="text-cream-dark font-body leading-relaxed">{selectedProject.longDescription || selectedProject.description}</p>
                    </div>
                    <div className="space-y-6">
                      <div>
                        <p className="editorial-label">Tech Stack</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.technologies.map((tech) => (
                            <span key={tech} className="px-3 py-1 text-xs font-mono text-muted border border-surface-light rounded-full">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col gap-3">
                        {selectedProject.githubLink && (
                          <a href={selectedProject.githubLink} target="_blank" rel="noopener noreferrer" className="btn-primary text-center text-sm cursor-pointer">
                            <Github className="inline mr-2 h-4 w-4" /> View Code
                          </a>
                        )}
                        {selectedProject.liveLink && (
                          <a href={selectedProject.liveLink} target="_blank" rel="noopener noreferrer" className="btn-outline text-center text-sm cursor-pointer">
                            <ExternalLink className="inline mr-2 h-4 w-4" /> Live Demo
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
