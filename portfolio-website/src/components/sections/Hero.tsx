import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Github, Linkedin, Twitter } from "lucide-react";
import { SiGooglescholar } from "react-icons/si";
import ImpactBar from "../ui/ImpactBar";
import HeroCanvas from "../three/HeroCanvas";
import SplitTextReveal from "../ui/SplitTextReveal";
import MagneticButton from "../ui/MagneticButton";
import { heroBeat, heroContainer, heroImage, heroItem } from "../../lib/motion";

/**
 * Holds the entrance until webfonts are ready. Syne and Manrope arrive over
 * the network, so animating on mount means the headline reveals against
 * fallback metrics and then reflows mid-transform — visible as jitter.
 */
function useFontsReady(): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const go = () => !cancelled && setReady(true);

    if (document.fonts?.ready) {
      document.fonts.ready.then(go);
    } else {
      go();
    }
    // ponytail: safety net — a font request that never settles must not
    // leave the hero invisible.
    const timer = setTimeout(go, 1500);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  return ready;
}

const Hero: React.FC = () => {
  const ready = useFontsReady();
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  // Scroll-linked exit. Progress runs 0 → 1 across the single viewport of
  // scrolling that carries the hero off the top of the screen. The three
  // layers move at different rates, which is what reads as depth: copy
  // leaves fastest, the portrait trails it, the field barely drifts.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  // Opacity ramps start at 0.1, not 0: without the dead zone the hero begins
  // dissolving on the first pixel of scroll, which reads as fragile.
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const copyOpacity = useTransform(scrollYProgress, [0.1, 0.75], [1, 0]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const imageOpacity = useTransform(scrollYProgress, [0.1, 0.9], [1, 0]);
  const fieldY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const fieldOpacity = useTransform(scrollYProgress, [0.1, 0.85], [1, 0.1]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  // Hooks must run unconditionally, so the transforms are always built and
  // simply not applied when the visitor has asked for less motion.
  const parallax = (
    y: typeof copyY,
    opacity: typeof copyOpacity
  ): { y?: typeof copyY; opacity?: typeof copyOpacity } =>
    reduced ? {} : { y, opacity };

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
      ref={sectionRef}
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-primary pt-24 pb-12 lg:pt-28 lg:pb-16"
    >
      <motion.div
        style={parallax(fieldY, fieldOpacity)}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <HeroCanvas />
      </motion.div>
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Text — takes 8 cols on large screens, ensuring no overlap.
              Outer node owns the scroll parallax, inner owns the entrance;
              splitting them keeps the two from writing the same transform.
              Slot numbers below are beats on the shared scale in lib/motion. */}
          <motion.div
            style={parallax(copyY, copyOpacity)}
            className="lg:col-span-8 order-2 lg:order-1"
          >
            <motion.div
              variants={heroContainer}
              initial="hidden"
              animate={ready ? "show" : "hidden"}
              className="max-w-4xl"
            >
              {/* Label */}
              <motion.p
                variants={heroItem}
                custom={0}
                className="text-sm font-mono uppercase tracking-[0.25em] text-accent mb-6"
              >
                Senior AI/ML Engineer & Researcher
              </motion.p>

              {/* Name — Editorial oversized, word-masked reveal */}
              <h1
                className="font-heading font-extrabold text-cream leading-[0.95] tracking-tighter mb-8"
                style={{ fontSize: "clamp(2.75rem, 9vw, 7rem)" }}
              >
                <SplitTextReveal
                  text="Mazharul"
                  delay={heroBeat(1)}
                  start={ready}
                />
                <br />
                <SplitTextReveal
                  text="Islam Leon"
                  accentWords={["Leon"]}
                  delay={heroBeat(1.5)}
                  start={ready}
                />
              </h1>

              {/* Tagline */}
              <motion.p
                variants={heroItem}
                custom={2}
                className="text-lg md:text-xl text-cream-dark font-body leading-relaxed max-w-xl mb-8"
              >
                Bridging cutting-edge AI research with production-grade
                engineering. From computer vision systems to agentic AI —
                building intelligent solutions that matter.
              </motion.p>

              <motion.div variants={heroItem} custom={3}>
                <ImpactBar />
              </motion.div>

              {/* CTAs */}
              <motion.div
                variants={heroItem}
                custom={4}
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
                variants={heroItem}
                custom={5}
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
            </motion.div>
          </motion.div>

          {/* Image — takes 4 cols, editorial treatment. Lands early because on
              mobile it is order-1, i.e. the first thing on screen. Trails the
              copy on scroll-out rather than matching it. */}
          <motion.div
            style={parallax(imageY, imageOpacity)}
            className="lg:col-span-4 order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <motion.div
              variants={heroImage}
              custom={0.5}
              initial="hidden"
              animate={ready ? "show" : "hidden"}
              className="relative w-[280px] h-[340px] sm:w-[320px] sm:h-[400px] md:w-[360px] md:h-[460px] lg:w-full lg:aspect-[4/5] xl:aspect-[3/4]"
            >
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
                variants={heroItem}
                custom={6}
                className="absolute -bottom-6 -right-6 lg:-left-12 lg:right-auto bg-surface border border-surface-light px-5 py-4 rounded-xl shadow-2xl backdrop-blur-md"
              >
                <p className="text-[10px] font-mono text-accent uppercase tracking-widest mb-1">
                  Impact
                </p>
                <p className="text-sm font-heading font-black text-cream">
                  5+ Years in ML
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue — fades out as soon as the visitor takes the hint */}
      <motion.div
        style={reduced ? undefined : { opacity: cueOpacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-3"
        aria-hidden="true"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: ready ? 1 : 0 }}
          transition={{ delay: heroBeat(7), duration: 0.8 }}
          className="flex flex-col items-center gap-3"
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
      </motion.div>
    </section>
  );
};

export default Hero;
