import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Clock, ArrowRight } from "lucide-react";
import SectionHeader from "../ui/SectionHeader";
import SEO from "../common/SEO";
import { blogPosts } from "@/data/blogPosts";

type BlogCategory = "all" | "nlp" | "genai" | "frameworks" | "tutorials";

const categories = [
  { id: "all", label: "All" },
  { id: "nlp", label: "NLP" },
  { id: "genai", label: "Gen AI" },
  { id: "frameworks", label: "Frameworks" },
  { id: "tutorials", label: "Tutorials" },
];

const BlogListPage = () => {
  const [activeCategory, setActiveCategory] = useState<BlogCategory>("all");
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const filteredBlogPosts = blogPosts.filter(
    (post) =>
      activeCategory === "all" || post.category.includes(activeCategory)
  );

  return (
    <section className="section bg-surface relative">
      <SEO
        title="Blog | Insights"
        description="Sharing knowledge on AI, machine learning, and software engineering"
        url="https://mazleon.com/blog"
      />
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <SectionHeader
          label="06 — Blog"
          title="Insights"
          subtitle="Sharing knowledge on AI, machine learning, and software engineering"
        />

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

        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <AnimatePresence mode="sync">
            {filteredBlogPosts.map((post, index) => (
              <motion.div
                key={post.slug}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link to={`/blog/${post.slug}`} className="block h-full">
                  <div className="editorial-card group h-full overflow-hidden hover:border-accent/20 cursor-pointer">
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

                    <div className="flex items-center gap-3 mb-3 text-xs text-muted">
                      <span className="font-mono">{post.publishDate}</span>
                      <span className="w-1 h-1 rounded-full bg-muted/50" />
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-lg font-heading font-bold text-cream group-hover:text-accent transition-colors mb-3 line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-sm text-cream-dark font-body line-clamp-2 mb-4">
                      {post.description}
                    </p>

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

                    <span className="inline-flex items-center gap-1 text-sm font-body text-accent hover:underline cursor-pointer">
                      Read article <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogListPage;