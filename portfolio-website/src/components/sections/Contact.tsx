import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeader from "../ui/SectionHeader";
import { Mail, Linkedin, Github, Twitter, Send } from "lucide-react";
import { SiGooglescholar } from "react-icons/si";
import MotionWrapper from "@/components/common/MotionWrapper";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(data as any).toString(),
    })
      .then(() => {
        setIsSubmitting(false);
        setSubmitStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setSubmitStatus(null), 5000);
      })
      .catch(() => {
        setIsSubmitting(false);
        setSubmitStatus("error");
        setTimeout(() => setSubmitStatus(null), 5000);
      });
  };

  const socialLinks = [
    {
      name: "Email",
      icon: <Mail size={18} />,
      url: "mailto:mzleon.cse@gmail.com",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin size={18} />,
      url: "https://www.linkedin.com/in/mazharul-islam-leon-2b998b98/",
    },
    {
      name: "GitHub",
      icon: <Github size={18} />,
      url: "https://github.com/mazleon",
    },
    {
      name: "Twitter",
      icon: <Twitter size={18} />,
      url: "https://x.com/LeonMazharul?lang=en",
    },
    {
      name: "Scholar",
      icon: <SiGooglescholar size={18} />,
      url: "https://scholar.google.com/citations?user=UsoRY-QAAAAJ&hl=en",
    },
  ];

  return (
    <section id="contact" className="section bg-primary relative">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <SectionHeader
          label="08 — Contact"
          title="Let's Connect"
          subtitle="Whether you have a project in mind or just want to chat about technology, I'd love to hear from you."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 max-w-6xl mx-auto items-start">
          {/* Contact Info */}
          <div className="space-y-8">
            <MotionWrapper delay={0.2}>
              <p className="text-cream-dark text-lg leading-relaxed font-body">
                I'm currently available for freelance work, full-time positions,
                and interesting collaborations.
              </p>
            </MotionWrapper>

            {/* Social links */}
            <MotionWrapper delay={0.3}>
              <div className="space-y-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl border border-surface-light hover:border-accent/30 transition-all duration-200 group cursor-pointer"
                  >
                    <span className="text-muted group-hover:text-accent transition-colors">
                      {link.icon}
                    </span>
                    <span className="text-cream font-body group-hover:text-accent transition-colors">
                      {link.name}
                    </span>
                  </a>
                ))}
              </div>
            </MotionWrapper>

            {/* Email highlight */}
            <MotionWrapper delay={0.4}>
              <div className="p-6 rounded-2xl bg-accent/5 border border-accent/20">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-accent rounded-full text-white">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-muted font-mono">Direct Email</p>
                    <a
                      href="mailto:mzleon.cse@gmail.com"
                      className="text-lg font-mono text-cream hover:text-accent transition-colors cursor-pointer"
                    >
                      mzleon.cse@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </MotionWrapper>
          </div>

          {/* Contact Form */}
          <MotionWrapper delay={0.3}>
            <div className="editorial-card">
              <form
                name="contact"
                method="POST"
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <input type="hidden" name="form-name" value="contact" />

                <h3 className="text-xl font-heading font-bold text-cream mb-4 flex items-center gap-2">
                  <Send className="text-accent" size={20} />
                  Send a Message
                </h3>

                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-success/10 border border-success/20 rounded-xl text-success text-sm"
                  >
                    Message sent! I'll get back to you soon.
                  </motion.div>
                )}
                {submitStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-error/10 border border-error/20 rounded-xl text-error text-sm"
                  >
                    Something went wrong. Please try again.
                  </motion.div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="name"
                      className="text-xs font-mono text-muted uppercase tracking-wider"
                    >
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
                  <div className="space-y-1.5">
                    <label
                      htmlFor="email"
                      className="text-xs font-mono text-muted uppercase tracking-wider"
                    >
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
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="subject"
                    className="text-xs font-mono text-muted uppercase tracking-wider"
                  >
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
                    placeholder="Project inquiry"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="message"
                    className="text-xs font-mono text-muted uppercase tracking-wider"
                  >
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
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Send size={16} /> Send Message
                    </span>
                  )}
                </button>
              </form>
            </div>
          </MotionWrapper>
        </div>
      </div>
    </section>
  );
};

export default Contact;
