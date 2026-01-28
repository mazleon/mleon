import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "../ui/button";
import SectionHeader from "../ui/SectionHeader";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import MotionWrapper from "@/components/common/MotionWrapper";
import { BookOpen, GraduationCap, Quote, ExternalLink } from "lucide-react";
import { scholarMetrics, publications } from "@/data/publicationsData";

const Publications = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

    return (
        <section id="publications" ref={containerRef} className="section bg-primary relative overflow-hidden">
            {/* Parallax Background Elements */}
            <motion.div style={{ y }} className="absolute top-20 right-10 w-96 h-96 bg-accent-primary/5 rounded-full blur-3xl pointer-events-none" />
            <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }} className="absolute bottom-20 left-10 w-64 h-64 bg-accent-secondary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-4 z-10 relative">
                <SectionHeader
                    title="Publications & Research"
                    subtitle="Academic contributions and research impact"
                />

                <div className="max-w-6xl mx-auto mt-16 space-y-12">
                    {/* Metrics Cards - Improved Clean Design */}
                    <MotionWrapper delay={0.2}>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            {/* Citations Card */}
                            <Card className="glass-panel border border-accent-primary/30 hover:border-accent-primary transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] group">
                                <CardContent className="p-8 text-center space-y-4">
                                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-accent-primary/20 to-accent-primary/5 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <Quote className="w-10 h-10 text-accent-primary" />
                                    </div>
                                    <div>
                                        <div className="text-5xl font-heading font-bold text-white mb-2">
                                            {scholarMetrics.citations}
                                        </div>
                                        <div className="text-sm font-body uppercase tracking-wider text-gray-300">
                                            Citations
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1">
                                            Total Citations
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* h-index Card */}
                            <Card className="glass-panel border border-accent-secondary/30 hover:border-accent-secondary transition-all duration-500 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] group">
                                <CardContent className="p-8 text-center space-y-4">
                                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-accent-secondary/20 to-accent-secondary/5 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <GraduationCap className="w-10 h-10 text-accent-secondary" />
                                    </div>
                                    <div>
                                        <div className="text-5xl font-heading font-bold text-white mb-2">
                                            {scholarMetrics.hIndex}
                                        </div>
                                        <div className="text-sm font-body uppercase tracking-wider text-gray-300">
                                            h-index
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1">
                                            Academic Impact
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* i10-index Card */}
                            <Card className="glass-panel border border-accent-primary/30 hover:border-accent-primary transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] group">
                                <CardContent className="p-8 text-center space-y-4">
                                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-accent-primary/20 to-accent-primary/5 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <BookOpen className="w-10 h-10 text-accent-primary" />
                                    </div>
                                    <div>
                                        <div className="text-5xl font-heading font-bold text-white mb-2">
                                            {scholarMetrics.i10Index}
                                        </div>
                                        <div className="text-sm font-body uppercase tracking-wider text-gray-300">
                                            i10-index
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1">
                                            Publications with 10+ citations
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </MotionWrapper>

                    {/* Publications Grid - Cleaner Design */}
                    <div>
                        <MotionWrapper delay={0.3}>
                            <h3 className="text-2xl font-heading font-bold text-white mb-8">
                                Selected Publications
                            </h3>
                        </MotionWrapper>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {publications.map((pub, index) => (
                                <MotionWrapper key={pub.id} delay={0.4 + index * 0.1}>
                                    <Card className="glass-panel border border-white/10 hover:border-accent-primary/50 transition-all duration-300 hover:shadow-[0_0_25px_rgba(139,92,246,0.2)] h-full group">
                                        <CardContent className="p-6 space-y-4 flex flex-col h-full">
                                            {/* Title */}
                                            <h4 className="text-lg font-heading font-semibold text-white group-hover:text-accent-primary transition-colors leading-snug line-clamp-3">
                                                {pub.title}
                                            </h4>

                                            {/* Authors */}
                                            <p className="text-sm text-gray-400 font-body flex-grow line-clamp-2">
                                                {pub.authors.map((author, idx) => (
                                                    <span key={idx}>
                                                        {author === "Mazharul Islam Leon" ? (
                                                            <span className="text-accent-secondary font-medium">{author}</span>
                                                        ) : (
                                                            author
                                                        )}
                                                        {idx < pub.authors.length - 1 && ", "}
                                                    </span>
                                                ))}
                                            </p>

                                            {/* Venue, Year, and Citations */}
                                            <div className="space-y-3 pt-3 border-t border-white/10">
                                                <p className="text-xs text-gray-400 font-mono line-clamp-1">
                                                    {pub.venue}
                                                </p>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs text-gray-500">{pub.year}</span>
                                                    <Badge className="bg-accent-primary/10 text-accent-primary border-accent-primary/30 hover:bg-accent-primary hover:text-white transition-all text-xs px-2 py-1">
                                                        <Quote className="w-3 h-3 mr-1" />
                                                        {pub.citations}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </MotionWrapper>
                            ))}
                        </div>
                    </div>

                    {/* CTA to Google Scholar */}
                    <MotionWrapper delay={0.8}>
                        <div className="flex justify-center pt-8">
                            <Button
                                asChild
                                variant="default"
                                className="shadow-lg shadow-accent-primary/20 group"
                            >
                                <a
                                    href={scholarMetrics.profileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2"
                                >
                                    <GraduationCap className="w-5 h-5" />
                                    View Full Google Scholar Profile
                                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </Button>
                        </div>
                    </MotionWrapper>
                </div>
            </div>
        </section>
    );
};

export default Publications;
