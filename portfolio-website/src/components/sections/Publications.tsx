import SectionHeader from "../ui/SectionHeader";
import MotionWrapper from "@/components/common/MotionWrapper";
import { ExternalLink } from "lucide-react";
import { scholarMetrics, publications } from "@/data/publicationsData";

const Publications = () => {
  return (
    <section id="publications" className="section bg-surface relative">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <SectionHeader
          label="03 — Research"
          title="Publications"
          subtitle="Academic contributions and research impact"
        />

        <div className="max-w-6xl mx-auto space-y-12">
          {/* Compact Metrics Row */}
          <MotionWrapper delay={0.2}>
            <div className="grid grid-cols-3 gap-px bg-surface-light rounded-2xl overflow-hidden">
              <div className="bg-primary p-8 text-center">
                <p className="text-4xl font-heading font-bold text-cream mb-1">{scholarMetrics.citations}</p>
                <p className="text-xs font-mono text-muted uppercase tracking-wider">Citations</p>
              </div>
              <div className="bg-primary p-8 text-center">
                <p className="text-4xl font-heading font-bold text-cream mb-1">{scholarMetrics.hIndex}</p>
                <p className="text-xs font-mono text-muted uppercase tracking-wider">h-index</p>
              </div>
              <div className="bg-primary p-8 text-center">
                <p className="text-4xl font-heading font-bold text-cream mb-1">{scholarMetrics.i10Index}</p>
                <p className="text-xs font-mono text-muted uppercase tracking-wider">i10-index</p>
              </div>
            </div>
          </MotionWrapper>

          {/* Publications List */}
          <div>
            <MotionWrapper delay={0.3}>
              <h3 className="text-xl font-heading font-bold text-cream mb-6">Selected Publications</h3>
            </MotionWrapper>

            <div className="space-y-4">
              {publications.map((pub, index) => (
                <MotionWrapper key={pub.id} delay={0.3 + index * 0.08}>
                  <div className="editorial-card group hover:border-accent/20 cursor-default">
                    {/* Title */}
                    <h4 className="text-base font-heading font-semibold text-cream group-hover:text-accent transition-colors leading-snug mb-2">
                      {pub.title}
                    </h4>

                    {/* Authors */}
                    <p className="text-sm text-muted font-body mb-3 line-clamp-1">
                      {pub.authors.map((author, idx) => (
                        <span key={idx}>
                          {author === "Mazharul Islam Leon" ? (
                            <span className="text-accent font-medium">{author}</span>
                          ) : (
                            author
                          )}
                          {idx < pub.authors.length - 1 && ", "}
                        </span>
                      ))}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between pt-3 border-t border-surface-light">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-muted">{pub.venue}</span>
                        <span className="text-xs text-muted/50">·</span>
                        <span className="text-xs text-muted">{pub.year}</span>
                      </div>
                      <span className="px-3 py-1 text-xs font-mono text-accent bg-accent/10 rounded-full">
                        {pub.citations} cited
                      </span>
                    </div>
                  </div>
                </MotionWrapper>
              ))}
            </div>
          </div>

          {/* CTA */}
          <MotionWrapper delay={0.6}>
            <div className="flex justify-center pt-4">
              <a
                href={scholarMetrics.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline inline-flex items-center gap-2 cursor-pointer"
              >
                View Google Scholar Profile
                <ExternalLink size={16} />
              </a>
            </div>
          </MotionWrapper>
        </div>
      </div>
    </section>
  );
};

export default Publications;
