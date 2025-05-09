import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SectionHeader from "../ui/SectionHeader";
import { ExternalLink, Eye, X } from "lucide-react";
import { Button } from "../ui/button";
import { Tooltip } from "../ui/tooltip";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Badge } from "../ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";

// Blog types
type BlogCategory = "all" | "nlp" | "genai" | "frameworks" | "tutorials";

interface BlogPost {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  category: BlogCategory[];
  tags: string[];
  image: string;
  publishDate: string;
  readTime: string;
  link: string;
}

const Blog = () => {
  // State for category filtering
  const [activeCategory, setActiveCategory] = useState<BlogCategory>("all");
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);

  // Intersection observer for animations
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Blog posts data
  const blogPosts: BlogPost[] = [
    {
      id: "nlp-data-preprocessing",
      title: "From Raw Data to Refined Insights: The Journey of NLP Data Preprocessing",
      description:
        "A comprehensive guide to the essential steps and techniques in preprocessing data for Natural Language Processing applications.",
      longDescription:
        "Natural Language Processing (NLP) has revolutionized how machines understand and interact with human language. However, the journey from raw text data to meaningful insights requires meticulous preprocessing. This article explores the critical steps in NLP data preprocessing, from text cleaning and normalization to tokenization and vectorization.\n\nI discuss the challenges of handling text data, including dealing with different languages, slang, abbreviations, and domain-specific terminology. The article also covers advanced preprocessing techniques like stemming, lemmatization, and handling of stop words, with practical code examples using popular Python libraries.\n\nFinally, I examine how proper preprocessing directly impacts model performance and explore best practices for creating robust NLP pipelines that can handle real-world text data effectively.",
      category: ["nlp", "tutorials"],
      tags: [
        "NLP",
        "Data Preprocessing",
        "Python",
        "Machine Learning",
        "Text Analysis"
      ],
      image: "/images/projects/blogs/international-day-education-futuristic-style.jpg",
      publishDate: "March 15, 2025",
      readTime: "8 min read",
      link: "https://medium.com/@mzleon.cse/from-raw-data-to-refined-insights-the-journey-of-nlp-data-preprocessing-776ca165eeaa"
    },
    {
      id: "intro-to-genai",
      title: "Introduction to Generative AI: Understanding the Revolution",
      description:
        "An accessible introduction to generative AI technologies, explaining core concepts, applications, and ethical considerations.",
      longDescription:
        "Generative AI represents one of the most significant technological breakthroughs of our time, enabling machines to create content that previously required human creativity. This article provides a comprehensive introduction to generative AI for both technical and non-technical readers.\n\nI explore the fundamental concepts behind generative models, including GANs, VAEs, and transformer-based architectures like GPT and DALL-E. The article explains how these models work at a conceptual level and examines their capabilities across different domains such as text, image, audio, and code generation.\n\nThe piece also addresses the practical applications of generative AI in various industries, from content creation and product design to healthcare and scientific research. Finally, I discuss the ethical implications and challenges associated with generative AI, including issues of bias, misinformation, and the impact on creative professions.",
      category: ["genai", "tutorials"],
      tags: [
        "Generative AI",
        "Machine Learning",
        "GPT",
        "DALL-E",
        "AI Ethics"
      ],
      image: "/images/projects/blogs/Ai-1-banner.original.png",
      publishDate: "January 10, 2025",
      readTime: "10 min read",
      link: "#"
    },
    {
      id: "google-adk-guide",
      title: "A Comprehensive Guide to Google Agent Development Kit",
      description:
        "A detailed walkthrough of Google's Agent Development Kit (ADK) for building sophisticated AI agents and assistants.",
      longDescription:
        "Google's Agent Development Kit (ADK) provides developers with powerful tools to create intelligent, context-aware AI agents. This comprehensive guide walks through the process of building effective agents using this cutting-edge framework.\n\nThe article begins with an overview of the ADK architecture and its core components, explaining how they work together to enable sophisticated agent behaviors. I provide step-by-step instructions for setting up the development environment and creating your first agent project.\n\nThe guide covers key ADK features including natural language understanding, multi-turn conversations, tool use, and integration with Google's AI models. I include practical code examples and best practices for designing effective agent experiences, along with troubleshooting tips for common issues.\n\nFinally, the article explores advanced topics such as agent personalization, memory management, and deployment strategies for production environments. Whether you're building a customer service bot, a productivity assistant, or a domain-specific expert system, this guide provides the knowledge needed to leverage the full potential of Google's ADK.",
      category: ["genai", "frameworks", "tutorials"],
      tags: [
        "Google ADK",
        "AI Agents",
        "LLM",
        "Development",
        "Google Cloud"
      ],
      image: "/images/projects/blogs/cartoon-ai-robot-character-scene.jpg",
      publishDate: "February 28, 2025",
      readTime: "15 min read",
      link: "#"
    },
    {
      id: "crewai-framework",
      title: "Introduction to CrewAI Framework for Generative AI",
      description:
        "An exploration of the CrewAI framework for orchestrating multiple AI agents to collaborate on complex tasks.",
      longDescription:
        "CrewAI represents a paradigm shift in how we build AI systems, moving from single-agent architectures to collaborative multi-agent frameworks. This article introduces the CrewAI framework and explains how it enables developers to create sophisticated AI systems where multiple specialized agents work together to solve complex problems.\n\nI begin by explaining the core concepts of CrewAI, including agent roles, task delegation, and inter-agent communication. The article compares CrewAI to traditional approaches, highlighting the advantages of multi-agent systems for handling complex, multi-step tasks that require diverse capabilities.\n\nThe guide includes practical examples of implementing CrewAI for different use cases, from research and content creation to data analysis and decision support. I provide code samples showing how to define agent roles, establish workflows, and manage the collaboration process.\n\nFinally, I discuss best practices for designing effective agent crews, including strategies for role definition, task decomposition, and handling agent conflicts. The article also explores the future potential of multi-agent systems and how they might evolve as generative AI continues to advance.",
      category: ["genai", "frameworks"],
      tags: [
        "CrewAI",
        "Multi-agent Systems",
        "LLM",
        "Python",
        "AI Orchestration"
      ],
      image: "/images/projects/blogs/international-day-education-futuristic-style (1).jpg",
      publishDate: "April 5, 2025",
      readTime: "12 min read",
      link: "#"
    },
  ];

  // Filter blog posts based on active category
  const filteredBlogPosts = blogPosts.filter(
    (post) =>
      activeCategory === "all" || post.category.includes(activeCategory)
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
    { id: "all", label: "All Posts" },
    { id: "nlp", label: "NLP" },
    { id: "genai", label: "Gen AI" },
    { id: "frameworks", label: "Frameworks" },
    { id: "tutorials", label: "Tutorials" },
  ];

  // View blog post details
  const handleViewBlog = (blog: BlogPost) => {
    setSelectedBlog(blog);
  };

  // Close blog modal
  const handleCloseModal = () => {
    setSelectedBlog(null);
  };

  return (
    <section id="blog" className="py-20 bg-primary-light">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Blog"
          subtitle="Sharing knowledge and insights on AI, machine learning, and software engineering"
        />

        {/* Category filter - Tabs */}
        <div className="flex justify-center mb-12">
          <Tabs 
            defaultValue="all" 
            value={activeCategory}
            onValueChange={(value) => setActiveCategory(value as BlogCategory)}
            className="w-full max-w-xl"
          >
            <TabsList className="grid grid-cols-5 w-full">
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

        {/* Blog posts grid */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="sync">
            {filteredBlogPosts.map((post) => (
              <motion.div
                key={post.id}
                layout
                variants={itemVariants}
                exit="exit"
                className="group"
                whileHover={{
                  y: -8,
                  transition: { duration: 0.2 },
                }}
              >
                <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 border-primary/20 hover:border-accent-primary/50">
                  <CardContent className="p-0">
                    {/* Blog post image */}
                    <div className="relative h-48 overflow-hidden bg-primary">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src = `/images/blog-placeholder.png`;
                        }}
                      />

                      {/* Overlay with links */}
                      <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent opacity-0 group-hover:opacity-100 flex items-center justify-center gap-4 transition-all duration-300">
                        <Tooltip content="View Details">
                          <button
                            onClick={() => handleViewBlog(post)}
                            className="p-3 rounded-full bg-primary-light text-accent-primary hover:text-accent-secondary transition-colors hover:scale-110 transform duration-200"
                            aria-label={`View details for ${post.title}`}
                          >
                            <Eye size={20} />
                          </button>
                        </Tooltip>

                        <Tooltip content="Read Article">
                          <a
                            href={post.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-full bg-primary-light text-accent-primary hover:text-accent-secondary transition-colors hover:scale-110 transform duration-200"
                            aria-label={`Read ${post.title}`}
                          >
                            <ExternalLink size={20} />
                          </a>
                        </Tooltip>
                      </div>
                    </div>

                    {/* Blog post content */}
                    <div className="p-5">
                      <CardHeader className="p-0 pb-3">
                        <div className="flex justify-between items-center mb-2">
                          <div className="text-xs text-secondary-dark">
                            {post.publishDate} · {post.readTime}
                          </div>
                        </div>
                        <CardTitle className="text-xl font-bold text-secondary">
                          {post.title}
                        </CardTitle>
                      </CardHeader>
                      <CardDescription className="text-secondary-dark line-clamp-3 mb-4">
                        {post.description}
                      </CardDescription>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mt-4">
                        {post.tags.slice(0, 3).map((tag, idx) => (
                          <Badge
                            key={idx}
                            variant="secondary"
                            className="px-2 py-1 text-xs transition-all duration-300 hover:bg-accent-secondary hover:text-primary"
                          >
                            {tag}
                          </Badge>
                        ))}
                        {post.tags.length > 3 && (
                          <span className="text-xs text-secondary-dark">+{post.tags.length - 3} more</span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Blog Post Modal */}
        <AnimatePresence>
          {selectedBlog && (
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
                      <div>
                        <div className="text-sm text-secondary-dark mb-2">
                          {selectedBlog.publishDate} · {selectedBlog.readTime}
                        </div>
                        <h3 className="text-2xl font-bold text-secondary">
                          {selectedBlog.title}
                        </h3>
                      </div>
                      <button
                        onClick={handleCloseModal}
                        className="p-2 rounded-full hover:bg-primary text-secondary-dark hover:text-secondary transition-colors"
                        aria-label="Close modal"
                      >
                        <X size={20} />
                      </button>
                    </div>

                    <div className="h-64 bg-primary rounded-lg mb-6 overflow-hidden">
                      <img
                        src={selectedBlog.image}
                        alt={selectedBlog.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="space-y-4 text-secondary-dark mb-6">
                      {selectedBlog.longDescription
                        ?.split("\n\n")
                        .map((paragraph, idx) => <p key={idx}>{paragraph}</p>) || (
                        <p>{selectedBlog.description}</p>
                      )}
                    </div>

                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-secondary mb-2">
                        Topics Covered
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedBlog.tags.map((tag, idx) => (
                          <Badge
                            key={idx}
                            variant="accent"
                            className="px-3 py-1 text-sm"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button asChild>
                        <a
                          href={selectedBlog.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <ExternalLink size={16} />
                          Read Full Article
                        </a>
                      </Button>
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

export default Blog;
