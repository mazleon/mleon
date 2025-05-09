import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SectionHeader from "../ui/SectionHeader";
import { Mail, Linkedin, Github, Twitter, Send } from "lucide-react";
import { SiGooglescholar } from "react-icons/si";
import { Button } from "../ui/button";
import { Tooltip } from "../ui/tooltip";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact = () => {
  // Form state
  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);
  const [_submitError, _setSubmitError] = useState<string | null>(null);

  // Intersection observer for animations
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // This would typically be an actual API call
    // For now we'll just simulate a submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }, 1500);
  };

  // Social links
  const socialLinks = [
    {
      name: "Email",
      icon: <Mail size={24} />,
      url: "mailto:contact@mazharulleon.com", // Placeholder email
      label: "Email me",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin size={24} />,
      url: "https://www.linkedin.com/in/mazharul-islam-leon-2b998b98/",
      label: "Connect on LinkedIn",
    },
    {
      name: "GitHub",
      icon: <Github size={24} />,
      url: "https://github.com/mazleon",
      label: "Follow on GitHub",
    },
    {
      name: "Twitter",
      icon: <Twitter size={24} />,
      url: "https://x.com/LeonMazharul?lang=en",
      label: "Follow on Twitter",
    },
    {
      name: "Google Scholar",
      icon: <SiGooglescholar size={24} />,
      url: "https://scholar.google.com/citations?user=UsoRY-QAAAAJ&hl=en",
      label: "View publications",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="contact" className="py-20 bg-primary">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Contact Me"
          subtitle="Feel free to reach out for collaborations, opportunities, or just to say hello"
        />

        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12 max-w-6xl mx-auto"
        >
          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold text-secondary mb-6">
              Let&apos;s Connect
            </h3>
            <p className="text-secondary-dark mb-8">
              I&apos;m currently available for freelance work, full-time
              positions, and interesting collaborations. Whether you have a
              project in mind or just want to chat about technology, feel free
              to reach out!
            </p>

            <div className="space-y-4">
              {socialLinks.map((link, index) => (
                <Tooltip key={index} content={link.label}>
                  <motion.a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={itemVariants}
                    className="flex items-center group p-3 rounded-lg hover:bg-primary-light transition-colors"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="mr-4 text-accent-primary group-hover:text-accent-secondary transition-colors">
                      {link.icon}
                    </div>
                    <div>
                      <h4 className="text-secondary font-medium">
                        {link.name}
                      </h4>
                      <p className="text-sm text-secondary-dark">
                        {link.label}
                      </p>
                    </div>
                  </motion.a>
                </Tooltip>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <form
              onSubmit={handleSubmit}
              className="bg-primary-light rounded-xl p-6 shadow-md"
            >
              <h3 className="text-2xl font-bold text-secondary mb-6">
                Send a Message
              </h3>

              {/* Success message */}
              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-[#10B981] bg-opacity-20 rounded-lg"
                >
                  <p className="text-[#10B981] font-medium">
                    Message sent successfully! I&apos;ll get back to you soon.
                  </p>
                </motion.div>
              )}

              <div className="mb-4">
                <label htmlFor="name" className="block text-secondary mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="Your name"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-secondary mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="subject" className="block text-secondary mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="What is this regarding?"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-secondary mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="form-input resize-none"
                  placeholder="Your message here..."
                />
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-secondary"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <Send className="mr-2" />
                    Send Message
                  </span>
                )}
              </Button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
