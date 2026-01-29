import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import { AnimatedGradientBorder } from "@/components/ui/animated-gradient-border";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useTypewriter } from "@/hooks/useTypewriter";
import { HERO_PHRASES, SOCIAL_LINKS } from "@/constants/index";
import MotionWrapper from "@/components/common/MotionWrapper";

const Hero: React.FC = () => {
  const currentPhrase = useTypewriter(HERO_PHRASES);
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <section
      id="home"
      ref={targetRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-deep-space text-secondary py-20 md:py-32"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-accent-primary/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-accent-secondary/20 rounded-full blur-[100px] animate-pulse delay-700" />
      </div>

      <motion.div
        style={{ opacity, scale }}
        className="container mx-auto px-4 z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <MotionWrapper delay={0.1}>
              <p className="text-accent-secondary font-mono text-lg md:text-xl mb-4 tracking-wide">
                Hi, I'm
              </p>
            </MotionWrapper>

            <MotionWrapper delay={0.2}>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-heading font-bold text-secondary mb-6 leading-tight tracking-tight">
                Mazharul Islam <br />
                <span className="text-gradient">Leon</span>
              </h1>
            </MotionWrapper>

            <MotionWrapper delay={0.3}>
              <h2 className="text-2xl md:text-3xl font-body font-medium text-secondary-dark mb-6">
                Senior Software Engineer
              </h2>
            </MotionWrapper>

            <MotionWrapper delay={0.4}>
              <div className="h-16 mb-8 flex items-center justify-center lg:justify-start">
                <p className="text-xl md:text-2xl font-mono text-gray-400">
                  <span className="text-accent-primary mr-2">{'>'}</span>
                  {currentPhrase}
                  <span className="animate-blink">_</span>
                </p>
              </div>
            </MotionWrapper>

            <MotionWrapper delay={0.5}>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 justify-center lg:justify-start">
                <Button
                  variant="default" // Uses btn-primary from globals.css
                  size="lg"
                  className="text-lg w-full sm:w-auto"
                  onClick={() =>
                    document
                      .getElementById("projects")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  View Work
                </Button>
                <Button
                  variant="outline" // Uses btn-secondary from globals.css
                  size="lg"
                  className="text-lg w-full sm:w-auto"
                  onClick={() =>
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Contact Me
                </Button>
              </div>
            </MotionWrapper>

            <MotionWrapper delay={0.6}>
              <div className="mt-12 flex space-x-6 justify-center lg:justify-start">
                <div className="flex gap-4 p-3 rounded-2xl bg-[#18181B]/50 backdrop-blur-md border border-white/5 hover:border-accent-primary/20 transition-all duration-300">
                  {SOCIAL_LINKS.map((link) => (
                    <Tooltip key={link.label} content={link.label}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 p-2 rounded-xl hover:bg-white/10"
                      >
                        {link.icon}
                      </a>
                    </Tooltip>
                  ))}
                </div>
              </div>
            </MotionWrapper>
          </div>

          {/* Image content */}
          <MotionWrapper delay={0.3} className="order-1 lg:order-2 flex justify-center items-center relative">
            <div className="relative z-10">
              <AnimatedGradientBorder
                containerClassName="w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[380px] md:h-[380px] lg:w-[420px] lg:h-[420px] rounded-full"
                borderWidth={2}
              >
                <Avatar className="w-full h-full bg-primary-light">
                  <img
                    src="/images/Leon_Profile_Image.JPG"
                    alt="Mazharul Islam Leon"
                    className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-700 ease-in-out"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const fallback = document.getElementById('hero-avatar-fallback');
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  <AvatarFallback
                    id="hero-avatar-fallback"
                    className="w-full h-full bg-primary-light text-6xl font-heading font-bold text-accent-primary flex items-center justify-center hidden"
                  >
                    ML
                  </AvatarFallback>
                </Avatar>

                {/* Tech logo overlay */}
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                  className="absolute bottom-4 right-4 w-20 h-20 md:w-24 md:h-24 bg-[#18181B] rounded-full p-1 border border-white/10 shadow-xl flex items-center justify-center glass-panel"
                >
                  <img
                    src="/images/tech-logo.svg"
                    alt="Tech Logo"
                    className="w-full h-full object-contain p-2"
                  />
                </motion.div>
              </AnimatedGradientBorder>
            </div>
          </MotionWrapper>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
