import { Github, Linkedin, Twitter } from "lucide-react";
import { SiGooglescholar } from "react-icons/si";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/mazleon",
      icon: <Github size={16} />,
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/mazharul-islam-leon-2b998b98/",
      icon: <Linkedin size={16} />,
    },
    {
      name: "Twitter",
      url: "https://x.com/LeonMazharul?lang=en",
      icon: <Twitter size={16} />,
    },
    {
      name: "Scholar",
      url: "https://scholar.google.com/citations?user=UsoRY-QAAAAJ&hl=en",
      icon: <SiGooglescholar size={16} />,
    },
  ];

  return (
    <footer className="bg-primary border-t border-surface-light py-12">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Left */}
          <div className="text-center md:text-left">
            <p className="text-sm text-muted font-body">
              &copy; {currentYear} Mazharul Islam Leon
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-cream transition-colors duration-200 cursor-pointer"
                aria-label={link.name}
              >
                {link.icon}
              </a>
            ))}
          </div>

          {/* Right */}
          <p className="text-xs text-muted/50 font-mono">
            Built with precision
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
