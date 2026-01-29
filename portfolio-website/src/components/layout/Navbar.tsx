import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AiOutlineMenu, AiOutlineClose, AiOutlineBulb, AiFillBulb } from "react-icons/ai";
import { useTheme } from "../theme/ThemeProvider";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Tooltip } from "../ui/tooltip";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Track scrolling for navbar background change
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Publications", href: "#publications" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Blog", href: "#blog" },
    { name: "ML Demo", href: "#ml-demo" },
    { name: "Contact", href: "#contact" },
  ];
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);

    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled || mobileMenuOpen
          ? "bg-primary/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-xl font-bold text-secondary cursor-pointer"
          >
            <span className="text-accent-primary">ML</span> Leon
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="text-secondary hover:text-accent-secondary relative group text-sm font-medium cursor-pointer"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-secondary transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            {/* Status Badge */}
            <div className="hidden lg:flex items-center space-x-2 mr-2 bg-[#18181B]/50 border border-white/10 px-3 py-1.5 rounded-full hover:border-accent-primary/50 transition-colors cursor-default backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs font-mono text-gray-300">Available for Projects</span>
            </div>

            {/* Dark/Light Mode Toggle */}
            <Tooltip
              content={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
            >
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.6 }}
                className="p-2 rounded-full text-secondary hover:bg-primary-light transition-colors"
                onClick={toggleTheme}
                aria-label={
                  theme === "dark"
                    ? "Switch to light mode"
                    : "Switch to dark mode"
                }
              >
                {theme === "dark" ? <AiFillBulb size={20} /> : <AiOutlineBulb size={20} />}
              </motion.button>
            </Tooltip>

            {/* Contact Button (Desktop) */}
            <div className="hidden lg:block">
              <Button
                variant="default"
                size="sm"
                className="ml-4"
                onClick={(e: any) => handleNavClick(e, "#contact")}
              >
                Contact
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-full text-secondary hover:bg-primary-light transition-colors z-50"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <AiOutlineClose size={26} /> : <AiOutlineMenu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: mobileMenuOpen ? 1 : 0,
          height: mobileMenuOpen ? "auto" : 0,
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="lg:hidden overflow-hidden bg-primary shadow-2xl border-t border-white/5"
      >
        <div className="container mx-auto px-4 py-8">
          <nav className="flex flex-col space-y-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-secondary text-lg font-body hover:text-accent-primary transition-colors py-2 border-b border-white/5 last:border-0 block w-full cursor-pointer"
              >
                {link.name}
              </a>
            ))}
            <Button
              variant="default"
              size="lg"
              className="mt-4 w-full text-lg h-14"
              onClick={(e: any) => handleNavClick(e, "#contact")}
            >
              Get in Touch
            </Button>
          </nav>
        </div>
      </motion.div>
    </header>
  );
};

export default Navbar;
