import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getBlogPost } from "@/data/blogPosts";
import SEO from "../common/SEO";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPost(slug) : undefined;

  if (!post) {
    return (
      <section className="section bg-surface relative">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-3xl">
          <div className="py-24 text-center">
            <h1 className="text-3xl font-heading font-bold text-cream mb-4">
              Post not found
            </h1>
            <Link
              to="/#blog"
              className="text-accent hover:underline font-body"
            >
              ← Back to blog
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section bg-surface relative">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/#blog"
            className="inline-flex items-center text-sm font-body text-accent hover:underline mb-8"
          >
            ← Back to blog
          </Link>

          <div className="flex items-center gap-3 mb-3 text-xs text-muted font-mono uppercase tracking-[0.2em]">
            <span>{post.publishDate}</span>
            <span className="w-1 h-1 rounded-full bg-muted/50" />
            <span>{post.readTime}</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-heading font-bold text-cream mb-6">
            {post.title}
          </h2>

          <div className="rounded-xl overflow-hidden bg-surface-light mb-6">
            <img
              src={post.image}
              alt={post.title}
              className="w-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "/images/blog-placeholder.png";
              }}
            />
          </div>

          <div className="flex flex-wrap gap-2 mb-10">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-mono text-accent bg-accent/10 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <article>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({ node, ...props }) => (
                  <h2
                    className="text-2xl font-heading font-bold text-cream mt-8 mb-4"
                    {...props}
                  />
                ),
                h3: ({ node, ...props }) => (
                  <h3
                    className="text-xl font-heading font-semibold text-cream mt-6 mb-3"
                    {...props}
                  />
                ),
                p: ({ node, ...props }) => (
                  <p
                    className="text-cream-dark font-body leading-relaxed mb-4 text-base"
                    {...props}
                  />
                ),
                ul: ({ node, ...props }) => (
                  <ul
                    className="list-disc pl-6 mb-4 space-y-2 text-cream-dark"
                    {...props}
                  />
                ),
                ol: ({ node, ...props }) => (
                  <ol
                    className="list-decimal pl-6 mb-4 space-y-2 text-cream-dark"
                    {...props}
                  />
                ),
                li: ({ node, ...props }) => (
                  <li className="text-cream-dark font-body" {...props} />
                ),
                strong: ({ node, ...props }) => (
                  <strong className="text-cream font-semibold" {...props} />
                ),
                a: ({ node, children, ...props }) => (
                  <a className="text-accent hover:underline" {...props}>
                    {children}
                  </a>
                ),
                code: ({ node, className, children, ...props }: any) => {
                  const isInline = !className?.includes("language-");
                  if (isInline) {
                    return (
                      <code
                        className="font-mono text-xs bg-surface-light px-1.5 py-0.5 rounded text-accent"
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  }
                  return (
                    <code className="font-mono text-xs text-cream-dark" {...props}>
                      {children}
                    </code>
                  );
                },
                pre: ({ node, ...props }) => (
                  <pre
                    className="bg-surface-light rounded-xl p-4 overflow-x-auto mb-4"
                    {...props}
                  />
                ),
                blockquote: ({ node, ...props }) => (
                  <blockquote
                    className="border-l-2 border-accent pl-4 italic text-cream-dark my-4"
                    {...props}
                  />
                ),
                img: ({ node, alt, ...props }) => (
                  <img
                    className="rounded-xl my-6 w-full"
                    alt={alt || ""}
                    {...props}
                  />
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </article>
        </div>
      </div>
      <SEO
        title={post.title}
        description={post.description}
        image={post.image}
        url={`https://mazleon.com/blog/${post.slug}`}
      />
    </section>
  );
};

export default BlogPostPage;