import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SectionHeader from "../ui/SectionHeader";
import { Progress } from "../ui/Progress";
import {
  AiOutlineCode,
  AiOutlineDatabase,
  AiOutlineCloud,
  AiOutlineTool,
  AiOutlineTeam,
  AiOutlineAppstore
} from "react-icons/ai";
import {
  SiTensorflow,
  SiPytorch,
  SiReact,
  SiNodedotjs,
  SiAmazon,
  SiDocker,
} from "react-icons/si";
import { Tooltip } from "../ui/tooltip";

// Skill types and interfaces
interface SkillCategory {
  id: string;
  title: string;
  icon: JSX.Element;
  skills: Skill[];
}

interface Skill {
  name: string;
  level: number; // 1-5 scale
  icon?: JSX.Element;
}

const Skills = () => {
  // Intersection observer for animations
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Skill categories with their skills
  const skillCategories: SkillCategory[] = [
    {
      id: "machine-learning",
      title: "Machine Learning & AI",
      icon: <AiOutlineAppstore className="text-accent-primary text-2xl" />,
      skills: [
        { name: "Deep Learning", level: 5, icon: <SiTensorflow /> },
        { name: "Computer Vision", level: 5 },
        { name: "Natural Language Processing", level: 4 },
        { name: "TensorFlow", level: 5, icon: <SiTensorflow /> },
        { name: "PyTorch", level: 4, icon: <SiPytorch /> },
        { name: "Anomaly Detection", level: 5 },
      ],
    },
    {
      id: "programming",
      title: "Programming",
      icon: <AiOutlineCode className="text-accent-primary text-2xl" />,
      skills: [
        { name: "Python", level: 5 },
        { name: "Java", level: 4 },
        { name: "C", level: 4 },
        { name: "C++", level: 4 },
        { name: "Bash", level: 4 },
        { name: "R", level: 3 },
      ],
    },
    {
      id: "database",
      title: "Database",
      icon: <AiOutlineDatabase className="text-accent-primary text-2xl" />,
      skills: [
        { name: "SQL", level: 5 },
        { name: "MongoDB", level: 4 },
        { name: "Redis", level: 3 },
        { name: "VectorDB", level: 4 },
        { name: "PostgreSQL", level: 4 },
        { name: "Neo4j", level: 3 },
      ],
    },
    {
      id: "web",
      title: "Web Development",
      icon: <AiOutlineCode className="text-accent-primary text-2xl" />,
      skills: [
        { name: "FastAPI", level: 4, icon: <SiReact /> },
        { name: "Django", level: 4, icon: <SiNodedotjs /> },
        { name: "Flask", level: 4 },
        { name: "HTML/CSS", level: 4 },
        { name: "RESTful APIs", level: 5 },
        { name: "GraphQL", level: 3 },
      ],
    },
    {
      id: "devops",
      title: "DevOps & Cloud",
      icon: <AiOutlineCloud className="text-accent-primary text-2xl" />,
      skills: [
        { name: "AWS", level: 4, icon: <SiAmazon /> },
        { name: "Docker", level: 4, icon: <SiDocker /> },
        { name: "Kubernetes", level: 3 },
        { name: "CI/CD", level: 4 },
        { name: "MLFlow", level: 4 },
        { name: "Linux", level: 4 },
      ],
    },
    {
      id: "tools",
      title: "Tools & Methodologies",
      icon: <AiOutlineTool className="text-accent-primary text-2xl" />,
      skills: [
        { name: "Git", level: 5 },
        { name: "Jupyter", level: 5 },
        { name: "VS Code", level: 5 },
        { name: "Agile/Scrum", level: 4 },
        { name: "Jira", level: 4 },
        { name: "TDD", level: 4 },
      ],
    },
    {
      id: "soft-skills",
      title: "Soft Skills",
      icon: <AiOutlineTeam className="text-accent-primary text-2xl" />,
      skills: [
        { name: "Team Leadership", level: 4 },
        { name: "Project Management", level: 4 },
        { name: "Communication", level: 5 },
        { name: "Problem Solving", level: 5 },
        { name: "Critical Thinking", level: 5 },
        { name: "Adaptability", level: 5 },
      ],
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

  // Function to get skill level text
  const getSkillLevelText = (level: number) => {
    switch (level) {
      case 5:
        return "Expert";
      case 4:
        return "Advanced";
      case 3:
        return "Intermediate";
      case 2:
        return "Basic";
      case 1:
        return "Beginner";
      default:
        return "";
    }
  };

  return (
    <section id="skills" className="py-20 bg-primary-light">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Skills"
          subtitle="My technical expertise and professional capabilities"
        />

        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
        >
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              className="bg-primary rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-6">
                {category.icon}
                <h3 className="text-xl font-bold text-secondary ml-3">
                  {category.title}
                </h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center text-secondary">
                        {skill.icon && (
                          <span className="mr-2 text-accent-secondary">
                            {skill.icon}
                          </span>
                        )}
                        <span>{skill.name}</span>
                      </div>
                      <Tooltip content={`${getSkillLevelText(skill.level)}`}>
                        <span className="text-xs text-secondary-dark">
                          {skill.level * 20}%
                        </span>
                      </Tooltip>
                    </div>
                    <Progress
                      value={skill.level * 20}
                      animate={inView}
                      delay={0.2 + catIndex * 0.05 + index * 0.1}
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
