import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeader from "../ui/SectionHeader";
import { Mail, Linkedin, Github, Twitter, Send } from "lucide-react";
import { SiGooglescholar } from "react-icons/si";
import { Button } from "../ui/button";
import { Tooltip } from "../ui/tooltip";
import { Card, CardContent } from "../ui/card";
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      .catch((error) => {
        console.error("Form submission error:", error);
        setIsSubmitting(false);
        setSubmitStatus("error");
        setTimeout(() => setSubmitStatus(null), 5000);
      });
  };

  const socialLinks = [
    { name: "Email", icon: <Mail size={24} />, url: "mailto:mzleon.cse@gmail.com", label: "Email me" },
    { name: "LinkedIn", icon: <Linkedin size={24} />, url: "https://www.linkedin.com/in/mazharul-islam-leon-2b998b98/", label: "Connect on LinkedIn" },
    { name: "GitHub", icon: <Github size={24} />, url: "https://github.com/mazleon", label: "Follow on GitHub" },
    { name: "Twitter", icon: <Twitter size={24} />, url: "https://x.com/LeonMazharul?lang=en", label: "Follow on Twitter" },
    { name: "Scholar", icon: <SiGooglescholar size={24} />, url: "https://scholar.google.com/citations?user=UsoRY-QAAAAJ&hl=en", label: "View publications" },
  ];

  return (
    <section id="contact" className="section bg-primary relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-accent-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader
          title="Contact Me"
          subtitle="Feel free to reach out for collaborations, opportunities, or just to say hello"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mt-16 max-w-6xl mx-auto items-start">

          {/* Contact Info */}
          <div className="space-y-8">
            <MotionWrapper delay={0.2}>
              <h3 className="text-3xl font-heading font-bold text-secondary">Let's Connect</h3>
              <p className="text-secondary-dark mt-4 text-lg leading-relaxed">
                I'm currently available for freelance work, full-time positions, and interesting collaborations.
                Whether you have a project in mind or just want to chat about technology, I'd love to hear from you.
              </p>
            </MotionWrapper>

            <MotionWrapper delay={0.3}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {socialLinks.map((link, index) => (
                  <Tooltip key={index} content={link.label}>
                    <motion.a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-4 rounded-xl bg-[#18181B] border border-white/5 hover:border-accent-primary/30 transition-all duration-300 group shadow-sm hover:shadow-md"
                      whileHover={{ y: -5 }}
                    >
                      <div className="mr-4 text-accent-primary group-hover:text-white transition-colors p-2 bg-white/5 rounded-full">
                        {link.icon}
                      </div>
                      <div>
                        <h4 className="text-secondary font-medium group-hover:text-accent-primary transition-colors">{link.name}</h4>
                        <p className="text-xs text-gray-500">{link.label}</p>
                      </div>
                    </motion.a>
                  </Tooltip>
                ))}
              </div>
            </MotionWrapper>

            {/* Email Card */}
            <MotionWrapper delay={0.4}>
              <div className="p-6 rounded-2xl bg-gradient-to-r from-accent-primary/10 to-accent-secondary/10 border border-white/5 mt-8">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-accent-primary rounded-full text-white shadow-lg shadow-accent-primary/20">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Direct Email</p>
                    <a href="mailto:mzleon.cse@gmail.com" className="text-lg font-mono text-white hover:text-accent-primary transition-colors">
                      mzleon.cse@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </MotionWrapper>
          </div>

          {/* Contact Form */}
          <MotionWrapper delay={0.4} className="relative">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-2xl blur opacity-20 pointer-events-none" />

            <Card className="glass-panel border-white/10 relative">
              <CardContent className="p-8">
                <form name="contact" method="POST" onSubmit={handleSubmit} className="space-y-6">
                  <input type="hidden" name="form-name" value="contact" />

                  <div>
                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                      <Send className="text-accent-primary" size={24} />
                      Send a Message
                    </h3>
                  </div>

                  {submitStatus === "success" && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-sm font-medium">
                      Message sent successfully! I'll get back to you soon.
                    </motion.div>
                  )}
                  {submitStatus === "error" && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm font-medium">
                      Something went wrong. Please try again.
                    </motion.div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-gray-300">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-[#09090B] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-primary/50 focus:ring-1 focus:ring-accent-primary/50 transition-all placeholder:text-gray-600"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-gray-300">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-[#09090B] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-primary/50 focus:ring-1 focus:ring-accent-primary/50 transition-all placeholder:text-gray-600"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-gray-300">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#09090B] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-primary/50 focus:ring-1 focus:ring-accent-primary/50 transition-all placeholder:text-gray-600"
                      placeholder="Project inquiry"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-gray-300">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full bg-[#09090B] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-primary/50 focus:ring-1 focus:ring-accent-primary/50 transition-all placeholder:text-gray-600 resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  <Button type="submit" disabled={isSubmitting} className="w-full h-12 text-lg font-medium shadow-lg shadow-accent-primary/20 hover:shadow-accent-primary/40 transition-shadow">
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send size={18} /> Send Message
                      </span>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </MotionWrapper>
        </div>
      </div>
    </section>
  );
};

export default Contact;
