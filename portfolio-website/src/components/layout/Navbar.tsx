import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiMenu, FiX, FiMoon, FiSun } from "react-icons/fi";
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
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Blog", href: "#blog" },
    { name: "Contact", href: "#contact" },
  ];

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-primary bg-opacity-90 backdrop-blur-md shadow-md"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.a
            href="#home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-xl font-bold text-secondary"
          >
            <span className="text-accent-primary">ML</span> Leon
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="text-secondary hover:text-accent-secondary relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-secondary transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            {/* Dark/Light Mode Toggle */}
            <Tooltip
              content={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
            >
              <motion.button
                onClick={toggleTheme}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.6 }}
                className="p-2 rounded-full text-secondary hover:bg-primary-light transition-colors"
                aria-label={
                  theme === "dark"
                    ? "Switch to light mode"
                    : "Switch to dark mode"
                }
              >
                {theme === "dark" ? <FiSun size={20} /> : <FiMoon size={20} />}
              </motion.button>
            </Tooltip>

            {/* Contact Button (Desktop) */}
            <div className="hidden md:block">
              <Button
                variant="default"
                size="sm"
                className="ml-4"
                onClick={() => {
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Contact
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-full text-secondary hover:bg-primary-light transition-colors"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
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
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-primary-light"
      >
        <div className="container mx-auto px-4 py-4">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-secondary py-2 hover:text-accent-primary"
              >
                {link.name}
              </a>
            ))}
            <Button
              variant="default"
              size="sm"
              className="mt-4 w-full"
              onClick={() => {
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" });
                setMobileMenuOpen(false);
              }}
            >
              Contact
            </Button>
          </nav>
        </div>
      </motion.div>
    </header>
  );
};

export default Navbar;
