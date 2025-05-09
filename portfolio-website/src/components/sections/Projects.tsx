import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SectionHeader from "../ui/SectionHeader";
import { Github, ExternalLink, Eye, X } from "lucide-react";
import { Button } from "../ui/button";
import { Tooltip } from "../ui/tooltip";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Badge } from "../ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";

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
  // State for category filtering
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Intersection observer for animations
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Projects data
  const projects: Project[] = [
    {
      id: "leaf-grading",
      title: "Digital Leaf Grading System",
      description:
        "An AI-powered system for BAT that automatically grades tobacco leaves using computer vision and deep learning techniques.",
      longDescription:
        "The Digital Leaf Grading System for BAT (British American Tobacco) represents a significant advancement in agricultural quality control. This system uses sophisticated computer vision algorithms and deep learning models to analyze images of tobacco leaves and classify them into different quality grades based on color, texture, size, and defects.\n\nThe system was designed to replace traditional manual inspection methods, which were time-consuming and subject to human error. By automating the grading process, we achieved a 95% accuracy rate while processing leaves 10x faster than human inspectors.\n\nThe solution incorporates a custom-trained convolutional neural network that can identify subtle leaf characteristics and categorize them according to BAT's specific quality criteria. The system includes a user-friendly interface for operators and generates comprehensive reports for quality control management.",
      category: ["ml", "research"],
      technologies: [
        "Python",
        "TensorFlow",
        "OpenCV",
        "Flask",
        "React",
        "Docker",
      ],
      image: "/images/projects/leaf-grading-system.png",
    },
    {
      id: "anomaly-detection",
      title: "Suspicious Anomaly Behavior Detection",
      description:
        "A real-time anomaly detection system for BAT that identifies suspicious patterns and behaviors in data streams using advanced machine learning algorithms.",
      longDescription:
        "The Suspicious Anomaly Behavior Detection system was developed for BAT to enhance security and operational integrity. This sophisticated system continuously monitors multiple data streams for unusual patterns that may indicate security breaches, fraud, or operational anomalies.\n\nLeveraging unsupervised learning techniques, the system establishes baseline behavior patterns and identifies deviations that warrant investigation. It employs a combination of statistical methods, time-series analysis, and deep learning models to detect anomalies with high precision and minimal false positives.\n\nKey features include real-time monitoring dashboards, configurable alert thresholds, historical pattern analysis, and an investigation workflow system. The solution successfully reduced security incidents by 63% and improved response time to potential threats by 78%, providing significant operational and financial benefits.",
      category: ["ml", "software"],
      technologies: [
        "Python",
        "PyTorch",
        "Kafka",
        "ElasticSearch",
        "Docker",
        "AWS",
      ],
      image: "/images/projects/anomaly-detection.png",
    },
    {
      id: "ai-chatbot",
      title: "Agent Based AI Chatbot",
      description:
        "An intelligent chatbot developed for RedDot that uses natural language processing to understand and respond to user queries with contextual understanding.",
      longDescription:
        "The Agent Based AI Chatbot for RedDot represents a new generation of conversational AI systems. Unlike traditional chatbots that follow rigid dialog flows, this agent-based architecture employs multiple specialized AI modules that work together to deliver sophisticated, context-aware conversations.\n\nThe system features specialized agents for different functions: dialog management, intent recognition, entity extraction, knowledge retrieval, personalization, and response generation. These agents collaborate through a central orchestration system that determines which agents should be activated based on the conversation context.\n\nBuilt using state-of-the-art NLP models and reinforcement learning techniques, the chatbot continually improves through user interactions. It maintains conversation history to provide coherent, contextual responses and can seamlessly hand off to human agents when necessary. The system achieved a 40% reduction in customer service costs while improving user satisfaction metrics by 28%.",
      category: ["ml", "software"],
      technologies: [
        "Python",
        "NLTK",
        "TensorFlow",
        "Node.js",
        "MongoDB",
        "Docker",
      ],
      image: "/images/projects/ai-chatbot.png",
    },
    {
      id: "face-recognition",
      title: "Biometric Verification System",
      description:
        "A secure face recognition system for identity verification that uses deep learning to compare facial features with liveness detection to prevent spoofing.",
      longDescription:
        "The Biometric Verification System is a cutting-edge facial recognition platform designed for secure identity verification. The system combines advanced deep learning face recognition algorithms with sophisticated anti-spoofing measures to ensure extremely reliable authentication.\n\nThe core of the system is a deep neural network trained on diverse datasets to achieve high accuracy across various demographics, lighting conditions, and camera angles. The facial recognition engine extracts and compares facial embeddings against stored templates, achieving a false acceptance rate of less than 0.01%.\n\nA key innovation is the multi-factor liveness detection subsystem that prevents spoofing attempts using photos, videos, or masks. It incorporates techniques such as depth analysis, texture analysis, eye movement tracking, and challenge-response tests.\n\nThe solution includes a secure API for integration with existing systems, comprehensive audit logging, privacy controls, and an administrative dashboard for managing users and monitoring system performance. It's currently deployed in high-security environments where reliable identity verification is critical.",
      category: ["ml", "software"],
      technologies: [
        "Python",
        "Dlib",
        "OpenCV",
        "FastAPI",
        "React",
        "TensorFlow",
      ],
      image: "/images/projects/face-recognition.png",
    },
  ];

  // Filter projects based on active category
  const filteredProjects = projects.filter(
    (project) =>
      activeCategory === "all" || project.category.includes(activeCategory)
  );

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: { duration: 0.3 },
    },
  };

  // Category buttons
  const categories = [
    { id: "all", label: "All Projects" },
    { id: "ml", label: "Machine Learning" },
    { id: "software", label: "Software" },
    { id: "research", label: "Research" },
  ];

  // View project details
  const handleViewProject = (project: Project) => {
    setSelectedProject(project);
  };

  // Close project modal
  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="py-20 bg-primary">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Projects"
          subtitle="A selection of my most notable projects in machine learning and software engineering"
        />

        {/* Category filter - Tabs */}
        <div className="flex justify-center mb-12">
          <Tabs 
            defaultValue="all" 
            value={activeCategory}
            onValueChange={(value) => setActiveCategory(value as ProjectCategory)}
            className="w-full max-w-xl"
          >
            <TabsList className="grid grid-cols-4 w-full">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className="text-sm"
                >
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Projects grid */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="sync">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                variants={itemVariants}
                exit="exit"
                className="group"
                whileHover={{
                  y: -8,
                  transition: { duration: 0.2 },
                }}
              >
                <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 border-primary-light/20 hover:border-accent-primary/50">
                  <CardContent className="p-0">
                {/* Project image */}
                    <div className="relative h-48 overflow-hidden bg-primary-light">
                      {/* Project image */}
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src = `/images/project-placeholder.png`;
                        }}
                      />

                      {/* Overlay with links */}
                      <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent opacity-0 group-hover:opacity-100 flex items-center justify-center gap-4 transition-all duration-300">
                        <Tooltip content="View Details">
                          <button
                            onClick={() => handleViewProject(project)}
                            className="p-3 rounded-full bg-primary-light text-accent-primary hover:text-accent-secondary transition-colors hover:scale-110 transform duration-200"
                            aria-label={`View details for ${project.title}`}
                          >
                            <Eye size={20} />
                          </button>
                        </Tooltip>

                        {project.githubLink && (
                          <Tooltip content="View Code">
                            <a
                              href={project.githubLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-3 rounded-full bg-primary-light text-accent-primary hover:text-accent-secondary transition-colors hover:scale-110 transform duration-200"
                              aria-label={`GitHub repository for ${project.title}`}
                            >
                              <Github size={20} />
                            </a>
                          </Tooltip>
                        )}

                        {project.liveLink && (
                          <Tooltip content="Live Demo">
                            <a
                              href={project.liveLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-3 rounded-full bg-primary-light text-accent-primary hover:text-accent-secondary transition-colors hover:scale-110 transform duration-200"
                              aria-label={`Live demo for ${project.title}`}
                            >
                              <ExternalLink size={20} />
                            </a>
                          </Tooltip>
                        )}
                      </div>
                    </div>

                    {/* Project content */}
                    <div className="p-5">
                      <CardHeader className="p-0 pb-3">
                        <CardTitle className="text-xl font-bold text-secondary">
                          {project.title}
                        </CardTitle>
                      </CardHeader>
                      <CardDescription className="text-secondary-dark line-clamp-3 mb-4">
                        {project.description}
                      </CardDescription>
                      
                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mt-4">
                        {project.technologies.map((tech, idx) => (
                          <Badge
                            key={idx}
                            variant="secondary"
                            className="px-2 py-1 text-xs transition-all duration-300 hover:bg-accent-secondary hover:text-primary"
                          >
                            {tech}
                          </Badge>
                        ))}
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary bg-opacity-90 backdrop-blur-sm"
              onClick={handleCloseModal}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 20 }}
                className="bg-primary-light rounded-lg max-w-3xl max-h-[80vh] overflow-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <Card className="border-0 shadow-none">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-bold text-secondary">
                        {selectedProject.title}
                      </h3>
                      <button
                        onClick={handleCloseModal}
                        className="p-2 rounded-full hover:bg-primary text-secondary-dark hover:text-secondary transition-colors"
                        aria-label="Close modal"
                      >
                        <X size={20} />
                      </button>
                    </div>

                    <div className="h-64 bg-primary-light rounded-lg mb-6 overflow-hidden">
                      <img
                        src={selectedProject.image}
                        alt={selectedProject.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="space-y-4 text-secondary-dark mb-6">
                      {selectedProject.longDescription
                        ?.split("\n\n")
                        .map((paragraph, idx) => <p key={idx}>{paragraph}</p>) || (
                        <p>{selectedProject.description}</p>
                      )}
                    </div>

                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-secondary mb-2">
                        Technologies Used
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech, idx) => (
                          <Badge
                            key={idx}
                            variant="accent"
                            className="px-3 py-1 text-sm"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-4">
                      {selectedProject.githubLink && (
                        <Button asChild variant="secondary">
                          <a
                            href={selectedProject.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                          >
                            <Github size={16} />
                            View Code
                          </a>
                        </Button>
                      )}

                      {selectedProject.liveLink && (
                        <Button asChild>
                          <a
                            href={selectedProject.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                          >
                            <ExternalLink size={16} />
                            Live Demo
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;
