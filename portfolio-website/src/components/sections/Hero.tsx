import { motion } from "framer-motion";
import { Github, Linkedin, Twitter } from "lucide-react";
import { SiGooglescholar } from "react-icons/si";
import ImpactBar from "../ui/ImpactBar";
import HeroCanvas from "../three/HeroCanvas";
import SplitTextReveal from "../ui/SplitTextReveal";
import MagneticButton from "../ui/MagneticButton";

const Hero: React.FC = () => {
  const socialLinks = [
    {
      icon: <Github size={18} />,
      url: "https://github.com/mazleon",
      label: "GitHub",
    },
    {
      icon: <Linkedin size={18} />,
      url: "https://www.linkedin.com/in/mazharul-islam-leon-2b998b98/",
      label: "LinkedIn",
    },
    {
      icon: <Twitter size={18} />,
      url: "https://x.com/LeonMazharul?lang=en",
      label: "Twitter",
    },
    {
      icon: <SiGooglescholar size={18} />,
      url: "https://scholar.google.com/citations?user=UsoRY-QAAAAJ&hl=en",
      label: "Scholar",
    },
  ];

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-primary pt-24 pb-12 lg:pt-28 lg:pb-16"
    >
      <HeroCanvas />
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center min-h-screen">
          {/* Text — takes 8 cols on large screens, ensuring no overlap */}
          <div className="lg:col-span-8 order-2 lg:order-1 max-w-4xl">
            {/* Label */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-sm font-mono uppercase tracking-[0.25em] text-accent mb-6"
            >
              Senior AI/ML Engineer & Researcher
            </motion.p>

            {/* Name — Editorial oversized, word-masked reveal */}
            <h1
              className="font-heading font-extrabold text-cream leading-[0.95] tracking-tighter mb-8"
              style={{ fontSize: "clamp(2.75rem, 9vw, 7rem)" }}
            >
              <SplitTextReveal text="Mazharul" delay={0.4} />
              <br />
              <SplitTextReveal
                text="Islam Leon"
                accentWords={["Leon"]}
                delay={0.55}
              />
            </h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-lg md:text-xl text-cream-dark font-body leading-relaxed max-w-xl mb-8"
            >
              Bridging cutting-edge AI research with production-grade
              engineering. From computer vision systems to agentic AI — building
              intelligent solutions that matter.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <ImpactBar />
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <MagneticButton>
                <button
                  onClick={() =>
                    document
                      .getElementById("publications")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="btn-primary"
                >
                  View Research
                </button>
              </MagneticButton>
              <MagneticButton>
                <a
                  href="/AI_Resume_Mazharul_Islam_.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline inline-flex items-center justify-center"
                >
                  Download Resume
                </a>
              </MagneticButton>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex items-center gap-5"
            >
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-accent transition-colors duration-200 cursor-pointer"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
              <span className="w-12 h-px bg-surface-light" />
              <span className="text-xs font-mono text-muted tracking-wider uppercase">
                Available for partnerships
              </span>
            </motion.div>
          </div>

          {/* Image — takes 4 cols, editorial treatment */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative w-[280px] h-[340px] sm:w-[320px] sm:h-[400px] md:w-[360px] md:h-[460px] lg:w-full lg:aspect-[4/5] xl:aspect-[3/4]">
              {/* Background accent block */}
              <div className="absolute -bottom-4 -right-4 w-full h-full bg-accent/5 rounded-3xl border border-accent/10" />

              {/* Image Container */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-surface shadow-2xl">
                <img
                  src="/images/IMG_3594.JPG"
                  alt="Mazharul Islam Leon"
                  className="w-full h-full object-cover object-top filter grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-60" />
              </div>

              {/* Floating detail badge */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="absolute -bottom-6 -right-6 lg:-left-12 lg:right-auto bg-surface border border-surface-light px-5 py-4 rounded-xl shadow-2xl backdrop-blur-md"
              >
                <p className="text-[10px] font-mono text-accent uppercase tracking-widest mb-1">
                  Impact
                </p>
                <p className="text-sm font-heading font-black text-cream">
                  5+ Years in ML
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-3"
        aria-hidden="true"
      >
        <span className="text-[10px] font-mono text-muted uppercase tracking-[0.3em]">
          Scroll
        </span>
        <span className="relative block w-px h-12 bg-surface-light overflow-hidden">
          <motion.span
            className="absolute left-0 top-0 w-px h-4 bg-accent"
            animate={{ y: [-16, 48] }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </span>
      </motion.div>
    </section>
  );
};

export default Hero;
