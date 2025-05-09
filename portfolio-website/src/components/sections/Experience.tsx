import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SectionHeader from "../ui/SectionHeader";
import { Briefcase, Calendar, ChevronRight } from "lucide-react";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";

interface ExperienceItem {
  id: number;
  title: string;
  company: string;
  duration: string;
  description: string[];
  technologies: string[];
}

const Experience = () => {
  const experiences: ExperienceItem[] = [
    {
      id: 1,
      title: "Senior Software Engineer",
      company: "RedDot Digital Limited",
      duration: "Aug 2021 - Present",
      description: [
        "Developed Agent Based AI Chatbot for RedDot with advanced NLP capabilities",
        "Designed and implemented Digital Leaf Grading System for BAT using computer vision",
        "Created Suspicious Anomaly Behavior Detection system using machine learning algorithms",
        "Led the development of Biometric Verification System using Face Recognition",
        "Managed cloud deployment and production environments for AI solutions",
      ],
      technologies: [
        "Python",
        "TensorFlow",
        "PyTorch",
        "Computer Vision",
        "NLP",
        "Machine Learning",
        "LLM",
        "Chatbot",
        "Crewai",
        "LangChain",
        "Google ADK",
        "FastAPI",
        "React",
        "AWS",
      ],
    },
    {
      id: 2,
      title: "Jr. Data Science Engineer",
      company: "CMED Health Limited",
      duration: "Sep 2020 - July 2021",
      description: [
        "Developed machine learning models for health data analysis",
        "Created predictive algorithms for medical diagnostics",
        "Implemented data processing pipelines for medical sensors",
        "Collaborated with healthcare professionals to improve model accuracy",
        "Contributed to research papers on health data analytics",
      ],
      technologies: [
        "Python",
        "Scikit-learn",
        "Pandas",
        "SQL",
        "Data Visualization",
        "Statistical Analysis",
      ],
    },
  ];

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
    <section id="experience" className="py-20 bg-primary-light">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Work Experience"
          subtitle="My professional journey in software engineering and machine learning"
        />

        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-4xl mx-auto mt-12"
        >
          <div className="relative">
            {/* Timeline line */}
            <motion.div 
              className="absolute left-0 md:left-1/2 top-0 w-px bg-accent-primary transform md:translate-x-[-0.5px]"
              style={{ height: inView ? "100%" : "0%" }}
              initial={{ height: "0%" }}
              animate={{ height: inView ? "100%" : "0%" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            ></motion.div>

            {/* Experience items */}
            {experiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                variants={itemVariants}
                className={`mb-12 md:mb-16 relative ${index % 2 === 0 ? "md:pr-12 md:text-right md:ml-auto md:mr-[50%]" : "md:pl-12 md:ml-[50%]"}`}
              >
                {/* Timeline dot */}
                <div
                  className={`absolute top-0 h-4 w-4 rounded-full bg-accent-primary border-4 border-primary-light ${
                    index % 2 === 0
                      ? "left-0 md:left-auto md:right-[-10px]"
                      : "left-0 md:left-[-10px]"
                  }`}
                ></div>

                {/* Experience card */}
                <div className="ml-8 md:ml-0 pt-1 md:pt-0">
                  <Card>
                    <CardContent className="p-6">
                      <motion.div
                        className="w-full"
                        whileHover={{
                          scale: 1.01,
                        }}
                        transition={{ duration: 0.2 }}
                      >
                    <div
                      className={`flex items-center mb-2 text-accent-primary ${index % 2 === 0 ? "md:justify-end" : ""}`}
                    >
                      <Briefcase
                        className={`${index % 2 === 0 ? "md:ml-2 md:order-2" : "mr-2"}`}
                      />
                      <h3 className="text-xl font-bold">{experience.title}</h3>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-secondary text-lg">
                        {experience.company}
                      </h4>
                      <div
                        className={`flex items-center text-secondary-dark mt-1 ${index % 2 === 0 ? "md:justify-end" : ""}`}
                      >
                        <Calendar
                          className={`${index % 2 === 0 ? "md:ml-2 md:order-2" : "mr-2"}`}
                        />
                        <span>{experience.duration}</span>
                      </div>
                    </div>

                    <ul
                      className={`text-secondary-dark space-y-2 mb-4 ${index % 2 === 0 ? "md:text-right" : ""}`}
                    >
                      {experience.description.map((point, idx) => (
                        <li key={idx} className={`flex items-start ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                          <ChevronRight
                            className={`mt-1 flex-shrink-0 text-accent-primary ${index % 2 === 0 ? "md:ml-2" : "mr-2"}`}
                            size={16}
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>

                    <div
                      className={`flex flex-wrap gap-2 mt-4 ${index % 2 === 0 ? "md:justify-end" : ""}`}
                    >
                      {experience.technologies.map((tech, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="px-3 py-1 text-xs transition-all duration-300 hover:bg-accent-secondary hover:text-primary"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                      </motion.div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
