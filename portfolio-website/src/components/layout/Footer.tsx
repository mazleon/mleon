import { FiGithub, FiLinkedin, FiTwitter, FiHeart } from "react-icons/fi";
import { SiGooglescholar } from "react-icons/si";
import { motion } from "framer-motion";
import { Tooltip } from "../ui/tooltip";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: <FiLinkedin size={20} />,
      url: "https://www.linkedin.com/in/mazharul-islam-leon-2b998b98/",
    },
    {
      name: "GitHub",
      icon: <FiGithub size={20} />,
      url: "https://github.com/mazleon",
    },
    {
      name: "Twitter",
      icon: <FiTwitter size={20} />,
      url: "https://x.com/LeonMazharul?lang=en",
    },
    {
      name: "Google Scholar",
      icon: <SiGooglescholar size={20} />,
      url: "https://scholar.google.com/citations?user=UsoRY-QAAAAJ&hl=en",
    },
  ];

  return (
    <footer className="bg-primary-light py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <motion.p
              className="text-secondary-dark text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              &copy; {currentYear} Mazharul Islam Leon. All rights reserved.
            </motion.p>
          </div>

          <div className="flex space-x-4">
            {socialLinks.map((link, index) => (
              <Tooltip key={link.name} content={link.name}>
                <motion.a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="text-secondary-dark hover:text-accent-primary transition-colors"
                  aria-label={link.name}
                  whileHover={{ y: -3 }}
                >
                  {link.icon}
                </motion.a>
              </Tooltip>
            ))}
          </div>
        </div>

        <div className="mt-6 text-center">
          <motion.p
            className="text-xs text-secondary-dark flex items-center justify-center gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Built with <FiHeart className="text-accent-primary" /> using React,
            TypeScript, Tailwind CSS and Framer Motion
          </motion.p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
