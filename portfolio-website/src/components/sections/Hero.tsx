import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter } from "lucide-react";
import { SiGooglescholar } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import { AnimatedGradientBorder } from "@/components/ui/animated-gradient-border";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Hero: React.FC = () => {
  const [currentPhrase, setCurrentPhrase] = useState("");
  const fallbackPhrase = "Loading..."; // Simplified for diagnostics
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const phrases = [
      "Crafting intelligent solutions.",
      "Innovating with data.",
      "Building the future of AI.",
      "Solving complex problems.",
    ];

    // Constants for animation timing (in milliseconds)
    const TYPING_SPEED = 80; // Consistent speed for typing
    const DELETING_SPEED = 50; // Consistent speed for deleting
    const PAUSE_AFTER_TYPING = 1800; // Pause after phrase is fully typed
    const PAUSE_BETWEEN_PHRASES = 500; // Pause before starting a new phrase
    
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = TYPING_SPEED;

    const type = () => {
      const currentFullPhraseFromArray = phrases[currentIndex % phrases.length];
      let textForDisplay;

      if (isDeleting) {
        textForDisplay = currentFullPhraseFromArray.substring(0, charIndex - 1);
        charIndex--;
      } else {
        textForDisplay = currentFullPhraseFromArray.substring(0, charIndex + 1);
        charIndex++;
      }

      const escapedTextForState = textForDisplay.replace(/'/g, "&apos;");
      setCurrentPhrase(escapedTextForState);

      // Determine the next typing speed based on the current state
      if (!isDeleting && charIndex === currentFullPhraseFromArray.length) {
        // Finished typing the phrase, pause before deleting
        isDeleting = true;
        typingSpeed = PAUSE_AFTER_TYPING;
      } else if (isDeleting && charIndex === 0) {
        // Finished deleting the phrase, move to the next one
        isDeleting = false;
        setCurrentIndex((prevIndex) => (prevIndex + 1) % phrases.length);
        typingSpeed = PAUSE_BETWEEN_PHRASES;
      } else {
        // Normal typing or deleting
        typingSpeed = isDeleting ? DELETING_SPEED : TYPING_SPEED;
      }

      if (
        !(
          isDeleting &&
          charIndex === 0 &&
          currentFullPhraseFromArray.length > 0
        )
      ) {
        const timeoutId = setTimeout(type, typingSpeed);
        return () => clearTimeout(timeoutId);
      }
    };

    if (phrases.length > 0) {
      const timeoutId = setTimeout(type, typingSpeed);
      return () => clearTimeout(timeoutId);
    }
  }, [currentIndex]);

  const socialLinks = [
    {
      icon: <Github size={24} />,
      url: "https://github.com/mazleon",
      label: "GitHub",
    },
    {
      icon: <Linkedin size={24} />,
      url: "https://www.linkedin.com/in/mazharul-islam-leon-2b998b98/",
      label: "LinkedIn",
    },
    {
      icon: <Twitter size={24} />,
      url: "https://x.com/LeonMazharul?lang=en",
      label: "Twitter",
    },
    {
      icon: <SiGooglescholar size={24} />,
      url: "https://scholar.google.com/citations?user=UsoRY-QAAAAJ&hl=en",
      label: "Google Scholar",
    },
  ];

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-primary text-secondary py-20 md:py-32"
    >
      <div className="container mx-auto px-4 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="order-2 lg:order-1 text-center lg:text-left"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-accent-primary font-medium mb-2 text-lg md:text-xl"
            >
              Hello, I'm
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-[2.8rem] sm:text-[3.2rem] md:text-[3.5rem] lg:text-[4rem] font-bold text-secondary mb-3 lg:mb-4 leading-[1.1]"
            >
              Mazharul Islam Leon
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-[1.7rem] md:text-[2rem] text-secondary font-semibold mb-4 lg:mb-6 leading-[1.2]"
            >
              Senior Software Engineer
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-xl md:text-2xl font-medium text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0"
              style={{ minHeight: "56px" }} // Ensure space for two lines of text
            >
              {currentPhrase ? (
                <span dangerouslySetInnerHTML={{ __html: currentPhrase }} />
              ) : (
                <span dangerouslySetInnerHTML={{ __html: fallbackPhrase }} />
              )}
              <span className="animate-pulse opacity-75">|</span>
              {/* Blinking cursor */}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center lg:justify-start"
            >
              <Button
                variant="default"
                size="lg"
                className="w-full sm:w-auto text-lg px-8 py-3 bg-accent-primary hover:bg-purple-500 text-secondary rounded-md shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105"
                onClick={() =>
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                View Projects
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto text-lg px-8 py-3 border-2 border-accent-primary text-accent-primary hover:bg-accent-primary hover:text-secondary rounded-md shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105"
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Contact Me
              </Button>
            </motion.div>

            <motion.div
              className="mt-10 lg:mt-12 flex space-x-6 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              {socialLinks.map((link) => (
                <Tooltip key={link.label} content={link.label}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary-dark hover:text-accent-secondary transform transition-transform duration-200 hover:scale-110"
                  >
                    {link.icon}
                  </a>
                </Tooltip>
              ))}
            </motion.div>
          </motion.div>

          {/* Image content */}
          <motion.div
            className="order-1 lg:order-2 flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <AnimatedGradientBorder
              containerClassName="w-[220px] h-[220px] sm:w-[250px] sm:h-[250px] md:w-[300px] md:h-[300px] lg:w-[320px] lg:h-[320px] xl:w-[350px] xl:h-[350px]"
              borderWidth={4}
            >
              <Avatar className="w-full h-full bg-primary-light">
                <img 
                  src="/images/Leon_Profile_Image.JPG" 
                  alt="Mazharul Islam Leon" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const fallback = document.getElementById('hero-avatar-fallback');
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <AvatarFallback 
                  id="hero-avatar-fallback"
                  className="w-full h-full bg-primary-light text-6xl font-bold text-accent-primary flex items-center justify-center hidden"
                >
                  ML
                </AvatarFallback>
              </Avatar>
              
              {/* Tech logo overlay */}
              <div className="absolute -bottom-6 -right-6 w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full overflow-hidden border-2 border-accent-primary shadow-lg">
                <img 
                  src="/images/tech-logo.svg" 
                  alt="Tech Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
            </AnimatedGradientBorder>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
