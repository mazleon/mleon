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

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader
          title="Technical Arsenal"
          subtitle="The tools and technologies I wield to build intelligent systems"
        />

        {/* Bento Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <MotionWrapper key={category.id} delay={index * 0.1} threshold={0.1}>
              <div
                className={`glass-panel rounded-2xl p-6 border-white/5 hover:border-accent-primary/30 transition-all duration-500 group h-full ${category.featured ? "lg:col-span-1 lg:row-span-1" : ""
                  }`}
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-accent-primary/10 text-accent-primary group-hover:bg-accent-primary group-hover:text-white transition-all duration-300">
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-white">
                    {category.title}
                  </h3>
                </div>

                {/* Skill Chips */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge
                      key={skill.name}
                      variant="outline"
                      className="bg-[#09090B]/50 border-white/10 text-gray-300 hover:bg-accent-primary/20 hover:border-accent-primary/50 hover:text-white transition-all duration-300 py-1.5 px-3 text-sm flex items-center gap-2"
                    >
                      {skill.icon && (
                        <span className="text-accent-primary group-hover:text-white">
                          {skill.icon}
                        </span>
                      )}
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </MotionWrapper>
          ))}
        </div>

        {/* Core Competencies Highlight */}
        <MotionWrapper delay={0.5} className="mt-12">
          <div className="glass-panel rounded-2xl p-8 border-white/5 text-center">
            <h4 className="text-sm uppercase tracking-widest text-gray-500 mb-4">Core Competencies</h4>
            <div className="flex flex-wrap justify-center gap-4">
              {["AI/ML Engineering", "Computer Vision", "LLM Orchestration", "Backend Systems", "Cloud Architecture"].map((comp) => (
                <span key={comp} className="text-xl md:text-2xl font-heading font-bold text-white/80 hover:text-accent-primary transition-colors cursor-default">
                  {comp}
                </span>
              ))}
            </div>
          </div>
        </MotionWrapper>
      </div>
    </section>
  );
};

export default Skills;
