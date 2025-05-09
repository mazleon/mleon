import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "../ui/button";
import SectionHeader from "../ui/SectionHeader";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { AnimatedGradientBorder } from "../ui/animated-gradient-border";

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="about" className="py-20 bg-primary relative">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="About Me"
          subtitle="Get to know more about my background and expertise"
        />

        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-5xl mx-auto mt-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Image column */}
            <motion.div variants={itemVariants} className="relative">
              <AnimatedGradientBorder
                containerClassName="w-full max-w-sm mx-auto aspect-square rounded-2xl overflow-hidden"
                className="w-full h-full"
                borderWidth={4}
              >
                <div className="w-full h-full bg-primary-light rounded-2xl overflow-hidden">
                  {/* Use the actual profile image when available */}
                  <img
                    src="/images/Leon_Profile_Image.JPG"
                    alt="Mazharul Islam Leon"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const fallback = document.getElementById('about-image-fallback');
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  <div 
                    id="about-image-fallback"
                    className="w-full h-full hidden items-center justify-center text-6xl font-bold text-accent-primary"
                  >
                    ML
                  </div>
                </div>
              </AnimatedGradientBorder>

              {/* Background decorative elements */}
              <div className="absolute -z-10 -top-4 -left-4 w-24 h-24 rounded-full opacity-20 bg-gradient-to-r from-accent-primary to-accent-secondary blur-xl"></div>
              <div className="absolute -z-10 -bottom-4 -right-4 w-24 h-24 rounded-full opacity-20 bg-gradient-to-r from-accent-secondary to-accent-primary blur-xl"></div>

              {/* Code decoration */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute -bottom-5 -left-5 bg-primary p-3 rounded-lg shadow-lg border border-primary-light hidden md:block"
              >
                <pre className="text-xs text-accent-secondary font-mono">
                  <code style={{ fontSize: '0.7rem' }}>{`
profile = {
    "name": "Mazharul Leon",
    "role": "Senior Engineer",
    "skills": ["ML", "AI", "CV"],
    "experience": 5
}`}</code>
                </pre>
              </motion.div>
            </motion.div>

            {/* Content column */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-2xl font-bold text-secondary">My Story</h3>
              <Card className="bg-primary-light/50 backdrop-blur-sm hover:translate-y-[-5px] transition-all duration-300">
                <CardContent className="p-6 space-y-4 text-secondary-dark">
                  <p>
                    I am an expert machine learning engineer with over 5 years of
                    experience in the industry and research field. My journey in
                    technology has been focused on developing AI-driven solutions
                    that solve real-world problems.
                  </p>
                  <p>
                    I&apos;ve had the privilege of working on diverse projects
                    including Digital Leaf Grading System for BAT, Suspicious
                    Anomaly Behavior Detection, Agent Based AI Chatbot for RedDot,
                    and Biometric Verification Systems using Face Recognition.
                  </p>
                  <Separator className="my-2" />
                  <p>
                    Currently working as a Senior Software Engineer at RedDot
                    Digital Limited, I specialize in developing products from
                    scratch and deploying them to cloud environments with industry
                    best practices.
                  </p>
                  <p>
                    My approach combines technical expertise with a creative
                    problem-solving mindset, allowing me to tackle complex
                    challenges and deliver innovative solutions. I&apos;m
                    passionate about leveraging cutting-edge AI technologies to
                    create impactful systems that provide business value.
                  </p>
                </CardContent>
              </Card>

              {/* Skills highlight */}
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-secondary mb-3">
                  Key Expertise Areas:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Machine Learning",
                    "AI Solutions",
                    "Software Engineering",
                    "Cloud Deployment",
                    "Computer Vision",
                    "NLP",
                  ].map((skill, index) => (
                    <Badge 
                      key={index}
                      variant="accent"
                      className="px-3 py-1 text-sm transition-all duration-300 hover:scale-105"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-8 flex flex-wrap gap-4">
                <Button
                  onClick={() =>
                    document
                      .getElementById("experience")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  variant="default"
                >
                  My Experience
                </Button>
                <Button
                  onClick={() =>
                    document
                      .getElementById("projects")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  variant="secondary"
                >
                  View Projects
                </Button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
