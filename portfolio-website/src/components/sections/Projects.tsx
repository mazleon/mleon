import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SectionHeader from "../ui/SectionHeader";
import { Github, ExternalLink, Eye, X } from "lucide-react";
import { Button } from "../ui/button";
import { Tooltip } from "../ui/tooltip";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Badge } from "../ui/badge";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import MotionWrapper from "@/components/common/MotionWrapper";

// Project types
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

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
      {/* Background Gradients */}
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-accent-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-accent-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader
          title="Featured Projects"
          subtitle="Innovations in AI and Software Engineering"
        />

        {/* Category Tabs */}
        <MotionWrapper delay={0.2} className="flex justify-center mb-16">
          <Tabs
            defaultValue="all"
            value={activeCategory}
            onValueChange={(value) => setActiveCategory(value as ProjectCategory)}
            className="w-full max-w-lg"
          >
            <TabsList className="grid grid-cols-4 w-full bg-[#18181B]/80 backdrop-blur-md border border-white/5 p-1 rounded-xl">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="text-xs sm:text-sm font-medium data-[state=active]:bg-accent-primary data-[state=active]:text-white transition-all rounded-lg py-2"
                >
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </MotionWrapper>

        {/* Projects Grid */}
        <motion.div
          ref={ref}
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
              >
                <Card className="h-full group overflow-hidden glass-panel border border-white/5 hover:border-accent-primary/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]">
                  <CardContent className="p-0 flex flex-col h-full">
                    {/* Image Area */}
                    <div className="relative h-64 overflow-hidden">
                      <div className="absolute inset-0 bg-primary/20 z-10 group-hover:bg-primary/0 transition-colors duration-500" />
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover:rotate-1"
                        loading="lazy"
                        onError={(e) => { e.currentTarget.src = `/images/project-placeholder.png`; }}
                      />

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-[#18181B]/80 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4 z-20">
                        <Button
                          variant="secondary"
                          size="icon"
                          onClick={() => setSelectedProject(project)}
                          className="rounded-full bg-white/10 hover:bg-accent-primary text-white border-none"
                        >
                          <Eye size={20} />
                        </Button>
                        {project.githubLink && (
                          <Button variant="secondary" size="icon" className="rounded-full bg-white/10 hover:bg-accent-primary text-white border-none" asChild>
                            <a href={project.githubLink} target="_blank" rel="noopener noreferrer"><Github size={20} /></a>
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-6 flex flex-col flex-grow">
                      <CardHeader className="p-0 mb-4">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-xl font-heading font-bold text-secondary group-hover:text-accent-primary transition-colors">
                            {project.title}
                          </CardTitle>
                          <Badge variant="outline" className="text-xs border-accent-secondary/30 text-accent-secondary">
                            {project.category[0].toUpperCase()}
                          </Badge>
                        </div>
                      </CardHeader>

                      <CardDescription className="text-gray-400 mb-6 font-body text-sm leading-relaxed flex-grow">
                        {project.description}
                      </CardDescription>

                      <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/5">
                        {project.technologies.slice(0, 4).map((tech, idx) => (
                          <Badge key={idx} className="bg-[#18181B] text-gray-300 border border-white/10 hover:border-accent-primary/50 transition-colors text-xs py-1">
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 4 && (
                          <Badge className="bg-transparent text-gray-500 border border-transparent text-xs py-1">
                            +{project.technologies.length - 4}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
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
                className="absolute inset-0 bg-[#09090B]/90 backdrop-blur-md"
              />
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-4xl bg-[#18181B] border border-white/10 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
              >
                <div className="relative h-64 sm:h-80 w-full shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#18181B] via-transparent to-transparent z-10" />
                  <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-4 right-4 z-20 text-white bg-black/20 hover:bg-black/40 rounded-full"
                    onClick={() => setSelectedProject(null)}
                  >
                    <X size={20} />
                  </Button>
                  <div className="absolute bottom-6 left-6 z-20">
                    <h3 className="text-3xl font-heading font-bold text-white mb-2">{selectedProject.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.category.map(c => (
                        <Badge key={c} className="bg-accent-primary text-white border-none">{c.toUpperCase()}</Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-8 overflow-y-auto custom-scrollbar">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-6">
                      <div className="prose prose-invert max-w-none text-gray-300 font-body leading-relaxed">
                        <p>{selectedProject.longDescription || selectedProject.description}</p>
                      </div>
                    </div>

                    <div className="space-y-8">
                      <div>
                        <h4 className="text-sm font-mono uppercase text-gray-500 mb-4">Tech Stack</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.technologies.map((tech) => (
                            <Badge key={tech} variant="outline" className="border-white/10 text-gray-300">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col gap-3">
                        {selectedProject.githubLink && (
                          <Button className="w-full" asChild>
                            <a href={selectedProject.githubLink} target="_blank" rel="noopener noreferrer">
                              <Github className="mr-2 h-4 w-4" /> View Code
                            </a>
                          </Button>
                        )}
                        {selectedProject.liveLink && (
                          <Button variant="outline" className="w-full" asChild>
                            <a href={selectedProject.liveLink} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                            </a>
                          </Button>
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
