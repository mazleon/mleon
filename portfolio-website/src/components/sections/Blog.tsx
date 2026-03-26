import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SectionHeader from "../ui/SectionHeader";
import { ExternalLink, Eye, X, Clock, ArrowRight } from "lucide-react";
import MotionWrapper from "@/components/common/MotionWrapper";

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
  const [activeCategory, setActiveCategory] = useState<BlogCategory>("all");
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const blogPosts: BlogPost[] = [
    {
      id: "nlp-data-preprocessing",
      title: "From Raw Data to Refined Insights: The Journey of NLP Data Preprocessing",
      description: "A comprehensive guide to the essential steps and techniques in preprocessing data for Natural Language Processing applications.",
      longDescription: "Natural Language Processing (NLP) has revolutionized how machines understand and interact with human language. However, the journey from raw text data to meaningful insights requires meticulous preprocessing. This article explores the critical steps in NLP data preprocessing, from text cleaning and normalization to tokenization and vectorization.\n\nI discuss the challenges of handling text data, including dealing with different languages, slang, abbreviations, and domain-specific terminology. The article also covers advanced preprocessing techniques like stemming, lemmatization, and handling of stop words, with practical code examples using popular Python libraries.\n\nFinally, I examine how proper preprocessing directly impacts model performance and explore best practices for creating robust NLP pipelines that can handle real-world text data effectively.",
      category: ["nlp", "tutorials"],
      tags: ["NLP", "Data Preprocessing", "Python", "Machine Learning", "Text Analysis"],
      image: "/images/projects/blogs/international-day-education-futuristic-style.jpg",
      publishDate: "March 15, 2025",
      readTime: "8 min read",
      link: "https://medium.com/@mzleon.cse/from-raw-data-to-refined-insights-the-journey-of-nlp-data-preprocessing-776ca165eeaa",
    },
    {
      id: "intro-to-genai",
      title: "Introduction to Generative AI: Understanding the Revolution",
      description: "An accessible introduction to generative AI technologies, explaining core concepts, applications, and ethical considerations.",
      longDescription: "Generative AI represents one of the most significant technological breakthroughs of our time, enabling machines to create content that previously required human creativity. This article provides a comprehensive introduction to generative AI for both technical and non-technical readers.\n\nI explore the fundamental concepts behind generative models, including GANs, VAEs, and transformer-based architectures like GPT and DALL-E. The article explains how these models work at a conceptual level and examines their capabilities across different domains such as text, image, audio, and code generation.\n\nThe piece also addresses the practical applications of generative AI in various industries, from content creation and product design to healthcare and scientific research. Finally, I discuss the ethical implications and challenges associated with generative AI, including issues of bias, misinformation, and the impact on creative professions.",
      category: ["genai", "tutorials"],
      tags: ["Generative AI", "Machine Learning", "GPT", "DALL-E", "AI Ethics"],
      image: "/images/projects/blogs/Ai-1-banner.original.png",
      publishDate: "January 10, 2025",
      readTime: "10 min read",
      link: "#",
    },
    {
      id: "google-adk-guide",
      title: "A Comprehensive Guide to Google Agent Development Kit",
      description: "A detailed walkthrough of Google's Agent Development Kit (ADK) for building sophisticated AI agents and assistants.",
      longDescription: "Google's Agent Development Kit (ADK) provides developers with powerful tools to create intelligent, context-aware AI agents. This comprehensive guide walks through the process of building effective agents using this cutting-edge framework.\n\nThe article begins with an overview of the ADK architecture and its core components, explaining how they work together to enable sophisticated agent behaviors. I provide step-by-step instructions for setting up the development environment and creating your first agent project.\n\nThe guide covers key ADK features including natural language understanding, multi-turn conversations, tool use, and integration with Google's AI models. I include practical code examples and best practices for designing effective agent experiences, along with troubleshooting tips for common issues.\n\nFinally, the article explores advanced topics such as agent personalization, memory management, and deployment strategies for production environments.",
      category: ["genai", "frameworks", "tutorials"],
      tags: ["Google ADK", "AI Agents", "LLM", "Development", "Google Cloud"],
      image: "/images/projects/blogs/cartoon-ai-robot-character-scene.jpg",
      publishDate: "February 28, 2025",
      readTime: "15 min read",
      link: "#",
    },
    {
      id: "crewai-framework",
      title: "Introduction to CrewAI Framework for Generative AI",
      description: "An exploration of the CrewAI framework for orchestrating multiple AI agents to collaborate on complex tasks.",
      longDescription: "CrewAI represents a paradigm shift in how we build AI systems, moving from single-agent architectures to collaborative multi-agent frameworks. This article introduces the CrewAI framework and explains how it enables developers to create sophisticated AI systems where multiple specialized agents work together to solve complex problems.\n\nI begin by explaining the core concepts of CrewAI, including agent roles, task delegation, and inter-agent communication. The article compares CrewAI to traditional approaches, highlighting the advantages of multi-agent systems for handling complex, multi-step tasks that require diverse capabilities.\n\nThe guide includes practical examples of implementing CrewAI for different use cases, from research and content creation to data analysis and decision support.",
      category: ["genai", "frameworks"],
      tags: ["CrewAI", "Multi-agent Systems", "LLM", "Python", "AI Orchestration"],
      image: "/images/projects/blogs/international-day-education-futuristic-style (1).jpg",
      publishDate: "April 5, 2025",
      readTime: "12 min read",
      link: "#",
    },
  ];

  const filteredBlogPosts = blogPosts.filter(
    (post) => activeCategory === "all" || post.category.includes(activeCategory)
  );

  const categories = [
    { id: "all", label: "All" },
    { id: "nlp", label: "NLP" },
    { id: "genai", label: "Gen AI" },
    { id: "frameworks", label: "Frameworks" },
    { id: "tutorials", label: "Tutorials" },
  ];

  return (
    <section id="blog" className="section bg-surface relative">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <SectionHeader
          label="06 — Blog"
          title="Insights"
          subtitle="Sharing knowledge on AI, machine learning, and software engineering"
        />

        {/* Category Filter */}
        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap gap-2 p-1 bg-primary rounded-full border border-surface-light">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as BlogCategory)}
                className={`px-4 py-1.5 text-sm font-body rounded-full transition-all duration-200 cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-accent text-white"
                    : "text-muted hover:text-cream"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Grid */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <AnimatePresence mode="sync">
            {filteredBlogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="editorial-card group h-full overflow-hidden hover:border-accent/20 cursor-pointer" onClick={() => setSelectedBlog(post)}>
                  {/* Image */}
                  <div className="relative h-48 -mx-6 -mt-6 mb-5 overflow-hidden bg-surface-light">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      onError={(e) => { e.currentTarget.src = "/images/blog-placeholder.png"; }}
                    />
                  </div>

                  {/* Meta */}
                  <div className="flex items-center gap-3 mb-3 text-xs text-muted">
                    <span className="font-mono">{post.publishDate}</span>
                    <span className="w-1 h-1 rounded-full bg-muted/50" />
                    <span className="flex items-center gap-1"><Clock size={12} />{post.readTime}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-heading font-bold text-cream group-hover:text-accent transition-colors mb-3 line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-sm text-cream-dark font-body line-clamp-2 mb-4">{post.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-3 py-1 text-xs font-mono text-muted border border-surface-light rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Read more */}
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 text-sm font-body text-accent hover:underline cursor-pointer"
                  >
                    Read article <ArrowRight size={14} />
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Blog Modal */}
        <AnimatePresence>
          {selectedBlog && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/95 backdrop-blur-sm"
              onClick={() => setSelectedBlog(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-surface border border-surface-light rounded-2xl max-w-3xl w-full max-h-[80vh] overflow-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-xs text-muted font-mono mb-2">{selectedBlog.publishDate} · {selectedBlog.readTime}</p>
                      <h3 className="text-2xl font-heading font-bold text-cream">{selectedBlog.title}</h3>
                    </div>
                    <button onClick={() => setSelectedBlog(null)} className="p-2 rounded-full hover:bg-surface-light text-muted hover:text-cream transition-colors cursor-pointer" aria-label="Close">
                      <X size={18} />
                    </button>
                  </div>

                  <div className="h-56 rounded-xl overflow-hidden bg-surface-light mb-6">
                    <img src={selectedBlog.image} alt={selectedBlog.title} className="w-full h-full object-cover" />
                  </div>

                  <div className="space-y-4 text-cream-dark font-body leading-relaxed mb-6">
                    {selectedBlog.longDescription?.split("\n\n").map((p, i) => <p key={i}>{p}</p>) || <p>{selectedBlog.description}</p>}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedBlog.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 text-xs font-mono text-accent bg-accent/10 rounded-full">{tag}</span>
                    ))}
                  </div>

                  <a href={selectedBlog.link} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2 cursor-pointer">
                    <ExternalLink size={16} /> Read Full Article
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Blog;
