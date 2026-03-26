import { motion } from "framer-motion";
import SectionHeader from "../ui/SectionHeader";
import MotionWrapper from "@/components/common/MotionWrapper";

const About = () => {
  return (
    <section id="about" className="section bg-primary relative">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <SectionHeader
          label="01 — About"
          title="Who I Am"
          subtitle="More than code — a philosophy of building intelligent systems that create real impact."
        />

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Image — editorial side element */}
            <MotionWrapper delay={0.2} className="lg:col-span-5">
              <div className="relative">
                <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-surface">
                  <img
                    src="/images/Leon_Profile_Image.JPG"
                    alt="Mazharul Islam Leon"
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent" />
                </div>
                {/* Accent line */}
                <div className="absolute -bottom-3 -right-3 w-full h-full border border-accent/20 rounded-2xl -z-10" />
              </div>
            </MotionWrapper>

            {/* Content */}
            <div className="lg:col-span-7 space-y-8">
              <MotionWrapper delay={0.3}>
                <h3 className="text-3xl md:text-4xl font-heading font-bold text-cream leading-tight">
                  Crafting Intelligence
                  <br />
                  <span className="text-accent">via Code</span>
                </h3>
              </MotionWrapper>

              <MotionWrapper delay={0.4}>
                <div className="space-y-5 text-cream-dark text-lg leading-relaxed font-body">
                  <p>
                    I'm a machine learning engineer with over{" "}
                    <span className="text-cream font-semibold">5+ years</span> of experience
                    building scalable AI-driven solutions that solve tangible real-world problems.
                  </p>
                  <p>
                    From <span className="text-accent">Computer Vision systems</span> for BAT to
                    Agent-Based Chatbots for RedDot, I specialize in bridging the gap between
                    cutting-edge research and production-grade software.
                  </p>
                </div>
              </MotionWrapper>

              {/* Pull quote */}
              <MotionWrapper delay={0.5}>
                <blockquote className="border-l-2 border-accent pl-6 py-2">
                  <p className="text-xl font-heading font-medium text-cream italic">
                    "The best engineering happens at the intersection of research and production."
                  </p>
                </blockquote>
              </MotionWrapper>

              {/* Core tech tags */}
              <MotionWrapper delay={0.6}>
                <div>
                  <p className="editorial-label">Core Technologies</p>
                  <div className="flex flex-wrap gap-2">
                    {["Machine Learning", "System Design", "Cloud Native", "Computer Vision", "NLP", "React"].map(
                      (skill) => (
                        <span
                          key={skill}
                          className="px-4 py-2 text-sm font-body text-cream border border-surface-light rounded-full hover:border-accent/40 hover:text-accent transition-all duration-200 cursor-default"
                        >
                          {skill}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </MotionWrapper>

              {/* CTAs */}
              <MotionWrapper delay={0.7}>
                <div className="flex flex-wrap gap-4 pt-4">
                  <button
                    onClick={() => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })}
                    className="btn-primary cursor-pointer"
                  >
                    My Experience
                  </button>
                  <button
                    onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                    className="btn-outline cursor-pointer"
                  >
                    View Projects
                  </button>
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
