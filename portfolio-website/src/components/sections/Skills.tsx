import SectionHeader from "../ui/SectionHeader";
import {
  SiPython, SiTensorflow, SiPytorch, SiReact, SiDocker, SiKubernetes,
  SiFastapi, SiDjango, SiFlask, SiPostgresql, SiMongodb, SiRedis,
  SiGit, SiLinux, SiJupyter, SiOpencv, SiLangchain,
} from "react-icons/si";
import { TbBrain, TbDatabaseSearch, TbCloudComputing, TbCode, TbTools, TbBrandCpp, TbSql } from "react-icons/tb";
import { FaAws } from "react-icons/fa";
import MotionWrapper from "@/components/common/MotionWrapper";

interface SkillItem {
  name: string;
  icon?: React.ReactNode;
}

interface SkillCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  skills: SkillItem[];
  span?: "wide" | "normal";
}

const skillCategories: SkillCategory[] = [
  {
    id: "ml-ai",
    title: "Machine Learning & AI",
    icon: <TbBrain className="w-5 h-5" />,
    span: "wide",
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
    title: "Programming",
    icon: <TbCode className="w-5 h-5" />,
    span: "wide",
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
    icon: <TbCode className="w-5 h-5" />,
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
    icon: <TbDatabaseSearch className="w-5 h-5" />,
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
    icon: <TbCloudComputing className="w-5 h-5" />,
    skills: [
      { name: "AWS", icon: <FaAws /> },
      { name: "Docker", icon: <SiDocker /> },
      { name: "Kubernetes", icon: <SiKubernetes /> },
      { name: "CI/CD" },
      { name: "MLFlow" },
    ],
  },
  {
    id: "tools",
    title: "Tools & Workflow",
    icon: <TbTools className="w-5 h-5" />,
    skills: [
      { name: "Git", icon: <SiGit /> },
      { name: "Jupyter", icon: <SiJupyter /> },
      { name: "Linux", icon: <SiLinux /> },
      { name: "Agile/Scrum" },
      { name: "VS Code" },
    ],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="section bg-primary relative">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <SectionHeader
          label="05 — Skills"
          title="Technical Arsenal"
          subtitle="Tools and technologies I wield to build intelligent systems"
        />

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {skillCategories.map((category, index) => (
            <MotionWrapper
              key={category.id}
              delay={index * 0.05}
              className={category.span === "wide" ? "md:col-span-2" : "col-span-1"}
            >
              <div className="editorial-card h-full group hover:border-accent/20 cursor-default">
                {/* Header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2 rounded-lg bg-surface-light text-muted group-hover:text-accent group-hover:bg-accent/10 transition-all duration-200">
                    {category.icon}
                  </div>
                  <h3 className="font-heading font-semibold text-cream text-lg tracking-tight">
                    {category.title}
                  </h3>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-body text-cream-dark border border-surface-light rounded-full hover:border-accent/30 hover:text-cream transition-all duration-200 cursor-default"
                    >
                      {skill.icon && <span className="text-muted">{skill.icon}</span>}
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </MotionWrapper>
          ))}
        </div>

        {/* Core Competencies */}
        <MotionWrapper delay={0.4} className="mt-12">
          <div className="editorial-divider mb-8" />
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3">
            {["AI/ML Engineering", "Computer Vision", "LLM Orchestration", "Backend Systems", "Cloud Architecture"].map(
              (comp, i) => (
                <div key={comp} className="flex items-center gap-3">
                  {i > 0 && <span className="w-1 h-1 rounded-full bg-accent/50" />}
                  <span className="text-sm font-mono tracking-wider text-muted uppercase">{comp}</span>
                </div>
              )
            )}
          </div>
        </MotionWrapper>
      </div>
    </section>
  );
};

export default Skills;
