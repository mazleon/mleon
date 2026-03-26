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
      id: "ragas-metrics",
      title: "Why RAGAS Metrics Failed Me in Production",
      description:
        "A deep dive into why relying solely on standard evaluation metrics like faithfulness can erode user trust in real-world deployments.",
      longDescription:
        "Standard RAGAS metrics (faithfulness, context precision) measure retrieval quality but fail to capture user trust erosion in production deployments. I observed this pattern first-hand at RedDot — a system scoring 0.91 on RAGAS faithfulness still generated responses users flagged as 'unhelpful' at a 23% rate. This article explores the root causes and how to establish better evaluation frameworks.",
      category: ["nlp", "genai", "frameworks"],
      tags: ["RAG", "LLMs", "Evaluation", "Production AI"],
      image:
        "/images/projects/blogs/international-day-education-futuristic-style.jpg",
      publishDate: "March 15, 2025",
      readTime: "8 min read",
      link: "#",
    },
    {
      id: "nvidia-jetson-inference",
      title: "How I Got <50ms Inference on NVIDIA Jetson Orin",
      description:
        "Step-by-step optimization journey from basic YOLO v12 to TensorRT INT8 on DeepStream, achieving 47ms latency at the edge.",
      longDescription:
        "Deploying high-accuracy object detection on edge devices is a significant challenge. In this post, I detail the journey of optimizing a YOLO v12 model using TensorRT INT8 quantization and DeepStream on NVIDIA Jetson Orin. I cover the calibration dataset approach, the accuracy vs. latency tradeoff decisions, and the exact pipeline architecture used to achieve a consistent 47ms latency.",
      category: ["tutorials", "frameworks"],
      tags: ["Edge AI", "Computer Vision", "TensorRT", "DeepStream"],
      image: "/images/projects/blogs/Ai-1-banner.original.png",
      publishDate: "February 22, 2025",
      readTime: "10 min read",
      link: "#",
    },
    {
      id: "ekyc-20m-users",
      title: "Building eKYC for 20M Users: What Nobody Tells You",
      description:
        "The real challenges of scaling a biometric onboarding platform: compliance constraints, demographic shifts, and shadow-mode deployments.",
      longDescription:
        "Scaling an eKYC platform to 20 million users involves solving problems that are rarely discussed in academic literature. The real challenges included managing demographic distribution shifts across regions, adhering to strict BFIU compliance constraints, balancing the asymmetry between false acceptance and false rejection rates, and running a critical shadow-mode deployment that ultimately saved the launch.",
      category: ["tutorials"],
      tags: ["Biometrics", "eKYC", "System Design", "Production AI"],
      image: "/images/projects/blogs/cartoon-ai-robot-character-scene.jpg",
      publishDate: "January 14, 2025",
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
                <div
                  className="editorial-card group h-full overflow-hidden hover:border-accent/20 cursor-pointer"
                  onClick={() => setSelectedBlog(post)}
                >
                  {/* Image */}
                  <div className="relative h-48 -mx-6 -mt-6 mb-5 overflow-hidden bg-surface-light">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = "/images/blog-placeholder.png";
                      }}
                    />
                  </div>

                  {/* Meta */}
                  <div className="flex items-center gap-3 mb-3 text-xs text-muted">
                    <span className="font-mono">{post.publishDate}</span>
                    <span className="w-1 h-1 rounded-full bg-muted/50" />
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {post.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-heading font-bold text-cream group-hover:text-accent transition-colors mb-3 line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-sm text-cream-dark font-body line-clamp-2 mb-4">
                    {post.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-mono text-muted border border-surface-light rounded-full"
                      >
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
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
                      <p className="text-xs text-muted font-mono mb-2">
                        {selectedBlog.publishDate} · {selectedBlog.readTime}
                      </p>
                      <h3 className="text-2xl font-heading font-bold text-cream">
                        {selectedBlog.title}
                      </h3>
                    </div>
                    <button
                      onClick={() => setSelectedBlog(null)}
                      className="p-2 rounded-full hover:bg-surface-light text-muted hover:text-cream transition-colors cursor-pointer"
                      aria-label="Close"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <div className="h-56 rounded-xl overflow-hidden bg-surface-light mb-6">
                    <img
                      src={selectedBlog.image}
                      alt={selectedBlog.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-4 text-cream-dark font-body leading-relaxed mb-6">
                    {selectedBlog.longDescription
                      ?.split("\n\n")
                      .map((p, i) => <p key={i}>{p}</p>) || (
                      <p>{selectedBlog.description}</p>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedBlog.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-mono text-accent bg-accent/10 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href={selectedBlog.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex items-center gap-2 cursor-pointer"
                  >
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
