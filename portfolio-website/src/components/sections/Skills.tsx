import {
  useRef
} from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionHeader from "../ui/SectionHeader";
import {
  SiPython,
  SiTensorflow,
  SiPytorch,
  SiReact,
  SiDocker,
  SiKubernetes,
  SiFastapi,
  SiDjango,
  SiFlask,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiAmazonwebservices,
  SiGit,
  SiLinux,
  SiJupyter,
  SiOpencv,
  SiLangchain,
} from "react-icons/si";
import { TbBrain, TbDatabaseSearch, TbCloudComputing, TbCode, TbTools, TbBrandCpp, TbSql } from "react-icons/tb";
import { Badge } from "../ui/badge";
import MotionWrapper from "@/components/common/MotionWrapper";

// --- Data Structures ---
interface SkillItem {
  name: string;
  icon?: React.ReactNode;
}

interface SkillCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  skills: SkillItem[];
  featured?: boolean; // For larger Bento tiles
}

// --- Skill Data ---
const skillCategories: SkillCategory[] = [
  {
    id: "ml-ai",
    title: "Machine Learning & AI",
    icon: <TbBrain className="w-6 h-6" />,
    featured: true,
    skills: [
      { name: "Deep Learning", icon: <SiTensorflow /> },
      { name: "Computer Vision", icon: <SiOpencv /> },
      { name: "NLP / LLMs", icon: <SiLangchain /> },
      { name: "TensorFlow", icon: <SiTensorflow /> },
      { name: "PyTorch", icon: <SiPytorch /> },
      { name: "Agentic AI", icon: <SiLangchain /> },
      { name: "CrewAI", icon: <TbBrain /> },
      { name: "LangChain", icon: <SiLangchain /> },
    ],
  },
  {
    id: "programming",
    title: "Programming Languages",
    icon: <TbCode className="w-6 h-6" />,
    featured: true,
    skills: [
      { name: "Python", icon: <SiPython /> },
      { name: "C / C++", icon: <TbBrandCpp /> },
      { name: "SQL", icon: <TbSql /> },
      { name: "Bash", icon: <SiLinux /> },
      { name: "JavaScript", icon: <SiReact /> },
    ],
  },
  {
    id: "backend",
    title: "Backend & APIs",
    icon: <TbCode className="w-6 h-6" />,
    skills: [
      { name: "FastAPI", icon: <SiFastapi /> },
      { name: "Django", icon: <SiDjango /> },
      { name: "Flask", icon: <SiFlask /> },
      { name: "RESTful APIs" },
      { name: "GraphQL" },
    ],
  },
  {
    id: "database",
    title: "Databases",
    icon: <TbDatabaseSearch className="w-6 h-6" />,
    skills: [
      { name: "PostgreSQL", icon: <SiPostgresql /> },
      { name: "MongoDB", icon: <SiMongodb /> },
      { name: "Redis", icon: <SiRedis /> },
      { name: "VectorDB" },
      { name: "Neo4j" },
    ],
  },
  {
    id: "devops",
    title: "DevOps & Cloud",
    icon: <TbCloudComputing className="w-6 h-6" />,
    skills: [
      { name: "AWS", icon: <SiAmazonwebservices /> },
      { name: "Docker", icon: <SiDocker /> },
      { name: "Kubernetes", icon: <SiKubernetes /> },
      { name: "CI/CD" },
      { name: "MLFlow" },
    ],
  },
  {
    id: "tools",
    title: "Tools & Workflow",
    icon: <TbTools className="w-6 h-6" />,
    skills: [
      { name: "Git", icon: <SiGit /> },
      { name: "Jupyter", icon: <SiJupyter /> },
      { name: "Linux", icon: <SiLinux /> },
      { name: "Agile/Scrum" },
      { name: "VS Code" },
    ],
  },
];

// --- Component ---
const Skills = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section id="skills" ref={containerRef} className="section bg-deep-space relative overflow-hidden">
      {/* Background Ambience */}
      <motion.div style={{ y }} className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-accent-secondary/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-[-10%] w-[400px] h-[400px] bg-accent-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader
          title="Technical Arsenal"
          subtitle="The tools and technologies I wield to build intelligent systems"
        />

        {/* Bento Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-fr">
          {skillCategories.map((category, index) => {
            // Determine Bento Span Classes
            // On large screens: First two items span 2 cols (filling top row), others span 1.
            // On medium screens: First two span 2 cols (full width), others span 1.
            let spanClasses = "col-span-1";

            if (category.id === "ml-ai" || category.id === "programming") {
              spanClasses = "md:col-span-2 lg:col-span-2";
            }

            return (
              <MotionWrapper
                key={category.id}
                delay={index * 0.05}
                className={`${spanClasses}`}
              >
                <div
                  className={`
                    relative h-full flex flex-col p-6 rounded-3xl overflow-hidden group
                    bg-[#18181B]/40 border border-white/5 backdrop-blur-sm
                    hover:border-accent-primary/40 hover:bg-[#18181B]/60 transition-all duration-500
                    hover:shadow-[0_0_30px_rgba(139,92,246,0.1)]
                  `}
                >
                  {/* Decorator Gradient for Large Tiles */}
                  {category.featured && (
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent-primary/10 rounded-full blur-3xl group-hover:bg-accent-primary/20 transition-all duration-700" />
                  )}

                  {/* Icon & Title */}
                  <div className="flex items-center gap-3 mb-4 z-10">
                    <div className={`
                      p-2.5 rounded-xl transition-all duration-300
                      ${category.featured
                        ? 'bg-accent-primary/20 text-accent-primary group-hover:bg-accent-primary group-hover:text-white'
                        : 'bg-white/5 text-gray-400 group-hover:text-accent-secondary group-hover:bg-accent-secondary/10'
                      }
                    `}>
                      {category.icon}
                    </div>
                    <h3 className={`font-heading font-semibold text-white tracking-wide ${category.featured ? 'text-xl' : 'text-lg'}`}>
                      {category.title}
                    </h3>
                  </div>

                  {/* Skills List */}
                  <div className="flex flex-wrap content-start gap-2 z-10 flex-grow">
                    {category.skills.map((skill) => (
                      <Badge
                        key={skill.name}
                        variant="outline"
                        className={`
                          border-white/5 text-gray-300 transition-all duration-300 flex items-center gap-1.5
                          hover:scale-105 cursor-default
                          ${category.featured
                            ? 'bg-black/40 hover:bg-accent-primary/20 hover:border-accent-primary/40 hover:text-white py-1.5 px-3 text-sm'
                            : 'bg-transparent hover:bg-white/5 hover:text-white text-xs py-1 px-2.5'
                          }
                        `}
                      >
                        {skill.icon && <span className="opacity-70 group-hover:opacity-100 transition-opacity">{skill.icon}</span>}
                        {skill.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </MotionWrapper>
            );
          })}
        </div>

        {/* Core Competencies Highlight - Refined */}
        <MotionWrapper delay={0.4} className="mt-8">
          <div className="w-full bg-gradient-to-r from-transparent via-white/5 to-transparent h-px mb-8" />
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 opacity-70 hover:opacity-100 transition-opacity duration-500">
            {["AI/ML Engineering", "Computer Vision", "LLM Orchestration", "Backend Systems", "Cloud Architecture"].map((comp, i) => (
              <div key={comp} className="flex items-center gap-2">
                {i > 0 && <span className="w-1.5 h-1.5 rounded-full bg-accent-primary/50" />}
                <span className="text-sm md:text-base font-mono tracking-wider text-gray-300 uppercase">
                  {comp}
                </span>
              </div>
            ))}
          </div>
        </MotionWrapper>
      </div>
    </section>
  );
};

export default Skills;
