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
  subtitle?: string;
  span?: "wide" | "normal" | "full" | "half";
  skills: SkillItem[];
}

const skillCategories: SkillCategory[] = [
  {
    id: "tier1",
    title: "Tier 1: Production-Grade",
    icon: <TbCloudComputing className="w-5 h-5" />,
    span: "wide",
    subtitle: "Shipped at scale",
    skills: [
      { name: "YOLO v12" }, { name: "Vision Transformers" }, { name: "TensorRT INT8" },
      { name: "NVIDIA Jetson DeepStream" }, { name: "eKYC / ArcFace Biometrics" }, { name: "LangChain" },
      { name: "LangGraph" }, { name: "Qdrant" }, { name: "Chroma" }, { name: "RAGAS" },
      { name: "MLflow" }, { name: "Docker" }, { name: "AWS SageMaker" }, { name: "PyTorch" }, { name: "Python" }
    ],
  },
  {
    id: "tier2",
    title: "Tier 2: Research-Level",
    icon: <TbBrain className="w-5 h-5" />,
    subtitle: "Published work",
    skills: [
      { name: "Spatiotemporal Deep Learning" }, { name: "Object Detection (YOLO family)" },
      { name: "Face Recognition Systems" }, { name: "OCR (TrOCR)" },
      { name: "Biometric Pipeline Design" }, { name: "Deep Learning for Health/Environment Data" }
    ],
  },
  {
    id: "tier3", 
    title: "Tier 3: Actively Building",
    icon: <TbCode className="w-5 h-5" />,
    subtitle: "Portfolio projects",
    skills: [
      { name: "Google ADK Multi-Agent Systems" }, { name: "QLoRA Fine-tuning" },
      { name: "RAG Evaluation Frameworks" }, { name: "Vision-Language Models (LLaVA / Florence-2)" },
      { name: "Knowledge Distillation" }
    ],
  }
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => (
            <MotionWrapper
              key={category.id}
              delay={index * 0.05}
              className={category.span === "wide" ? "md:col-span-2" : "col-span-1"}
            >
              <div className="editorial-card h-full group hover:border-accent/20 cursor-default">
                {/* Header */}
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-surface-light text-muted group-hover:text-accent group-hover:bg-accent/10 transition-all duration-200">
                    {category.icon}
                  </div>
                  <h3 className="font-heading font-semibold text-cream text-lg tracking-tight">
                    {category.title}
                  </h3>
                </div>
                {category.subtitle && (
                  <p className="text-xs font-mono text-accent uppercase tracking-wider mb-5 ml-12">
                    {category.subtitle}
                  </p>
                )}

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
