import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "../ui/button";
import SectionHeader from "../ui/SectionHeader";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { AnimatedGradientBorder } from "../ui/animated-gradient-border";
import MotionWrapper from "@/components/common/MotionWrapper";

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="about" ref={containerRef} className="section bg-primary relative overflow-hidden">
      {/* Parallax Background Elements */}
      <motion.div style={{ y }} className="absolute top-20 left-10 w-64 h-64 bg-accent-primary/5 rounded-full blur-3xl pointer-events-none" />
      <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }} className="absolute bottom-20 right-10 w-96 h-96 bg-accent-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 z-10 relative">
        <SectionHeader
          title="About Me"
          subtitle="Get to know more about my background and expertise"
        />

        <div className="max-w-6xl mx-auto mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image column */}
            <MotionWrapper delay={0.2} className="relative group">
              <AnimatedGradientBorder
                containerClassName="w-full max-w-sm mx-auto aspect-square rounded-2xl overflow-hidden shadow-2xl"
                className="w-full h-full"
                borderWidth={2}
              >
                <div className="w-full h-full bg-primary-light rounded-2xl overflow-hidden relative">
                  <div className="absolute inset-0 bg-accent-primary/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <img
                    src="/images/Leon_Profile_Image.JPG"
                    alt="Mazharul Islam Leon"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const fallback = document.getElementById('about-image-fallback');
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  <div
                    id="about-image-fallback"
                    className="w-full h-full hidden items-center justify-center text-6xl font-heading font-bold text-accent-primary"
                  >
                    ML
                  </div>
                </div>
              </AnimatedGradientBorder>

              {/* Pseudo-code decoration */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute -bottom-6 -left-6 bg-[#18181B]/90 backdrop-blur-xl p-4 rounded-xl border border-white/10 shadow-2xl hidden md:block z-20 hover:scale-105 transition-transform duration-300"
              >
                <pre className="text-xs text-accent-secondary font-mono leading-relaxed">
                  <code style={{ fontSize: '0.75rem' }}>{`
const profile = {
  name: "Mazharul Leon",
  role: "Senior Engineer",
  focus: ["AI", "Architecture"],
  level: "Pro Max"
};`}</code>
                </pre>
              </motion.div>
            </MotionWrapper>

            {/* Content column */}
            <div className="space-y-8">
              <MotionWrapper delay={0.3}>
                <h3 className="text-3xl font-heading font-bold text-secondary mb-6">
                  Crafting Intelligence via Code
                </h3>
              </MotionWrapper>

              <MotionWrapper delay={0.4}>
                <Card className="glass-panel border-l-4 border-l-accent-primary">
                  <CardContent className="p-6 space-y-4 text-secondary-dark/90 leading-relaxed font-body text-lg">
                    <p>
                      I am an expert machine learning engineer with over <span className="text-accent-primary font-semibold">5+ years</span> of
                      experience. My journey is defined by a relentless pursuit of building
                      <span className="text-white font-medium"> scalable AI-driven solutions</span> that solve tangible real-world problems.
                    </p>
                    <p>
                      From <span className="text-accent-secondary">Computer Vision systems</span> for BAT to Agent-Based Chatbots for RedDot,
                      I specialize in bridging the gap between cutting-edge research and production-grade software.
                    </p>
                  </CardContent>
                </Card>
              </MotionWrapper>

              {/* Skills highlight */}
              <MotionWrapper delay={0.5}>
                <div>
                  <h4 className="text-sm font-mono uppercase tracking-widest text-secondary-dark mb-4">
                    Core Technologies
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {[
                      "Machine Learning",
                      "System Design",
                      "Cloud Native",
                      "Computer Vision",
                      "NLP",
                      "React Ecosystem"
                    ].map((skill, index) => (
                      <Badge
                        key={index}
                        className="bg-accent-primary/10 text-accent-primary hover:bg-accent-primary hover:text-white border-accent-primary/20 px-4 py-2 text-sm transition-all duration-300"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </MotionWrapper>

              {/* CTA */}
              <MotionWrapper delay={0.6}>
                <div className="flex flex-wrap gap-4 pt-4">
                  <Button
                    onClick={() => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })}
                    variant="default" // btn-primary
                    className="shadow-lg shadow-accent-primary/20"
                  >
                    My Experience
                  </Button>
                  <Button
                    onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                    variant="outline" // btn-secondary
                  >
                    View Projects
                  </Button>
                </div>
              </MotionWrapper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
