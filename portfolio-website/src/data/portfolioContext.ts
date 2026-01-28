// Portfolio Context Data for Chatbot
// This file contains all the information the chatbot can reference

export const PORTFOLIO_CONTEXT = {
    personal: {
        name: "Mazharul Islam Leon",
        title: "Senior Software Engineer",
        company: "RedDot Digital Limited",
        location: "Bangladesh",
        yearsExperience: "5+",
        specialization: "Machine Learning & AI",
        email: "mzleon.cse@gmail.com",
        social: {
            github: "https://github.com/mazleon",
            linkedin: "https://www.linkedin.com/in/mazharul-islam-leon-2b998b98/",
            twitter: "https://x.com/LeonMazharul",
            googleScholar: "https://scholar.google.com/citations?user=UsoRY-QAAAAJ&hl=en",
        },
    },

    bio: `Mazharul Islam Leon is an expert machine learning engineer with over 5+ years of experience. 
His journey is defined by a relentless pursuit of building scalable AI-driven solutions that solve tangible real-world problems.
From Computer Vision systems for BAT to Agent-Based Chatbots for RedDot, 
he specializes in bridging the gap between cutting-edge research and production-grade software.`,

    experience: [
        {
            title: "Senior Software Engineer",
            company: "RedDot Digital Limited",
            duration: "Aug 2021 - Present",
            responsibilities: [
                "Architected an Agent-Based AI Chatbot using advanced NLP and orchestration patterns (LangChain, CrewAI)",
                "Designed the Digital Leaf Grading System for BAT, leveraging custom Computer Vision models for 95%+ accuracy",
                "Built a real-time Suspicious Anomaly Detection system processing high-throughput data streams",
                "Led the end-to-end development of a Biometric Verification System with liveness detection",
                "Managed cloud infrastructure (AWS) and CI/CD pipelines for scalable AI production deployments",
            ],
        },
        {
            title: "Jr. Data Science Engineer",
            company: "CMED Health Limited",
            duration: "Sep 2020 - July 2021",
            responsibilities: [
                "Developed predictive ML models for early medical diagnostics and health trend analysis",
                "Implemented robust data processing pipelines for IoT medical sensor data",
                "Collaborated with medical professionals to fine-tune algorithms for clinical accuracy",
                "Authored research papers on health data analytics and predictive modeling",
            ],
        },
    ],

    projects: [
        {
            name: "Digital Leaf Grading System",
            description: "AI-powered system transforming tobacco leaf grading with 95% accuracy using custom CNN architectures for BAT (British American Tobacco).",
            technologies: ["Python", "TensorFlow", "OpenCV", "Flask", "React", "Docker"],
        },
        {
            name: "Suspicious Anomaly Detection",
            description: "Real-time security intelligence platform using unsupervised learning to detect behavioral anomalies.",
            technologies: ["Python", "PyTorch", "Kafka", "ElasticSearch", "Docker", "AWS"],
        },
        {
            name: "Agent Based AI Chatbot",
            description: "Context-aware conversational agent using orchestrated NLP modules for superior customer engagement.",
            technologies: ["Python", "NLTK", "TensorFlow", "Node.js", "MongoDB", "Docker"],
        },
        {
            name: "Biometric Verification System",
            description: "High-security identity verification platform with anti-spoofing liveness detection capabilities.",
            technologies: ["Python", "Dlib", "OpenCV", "FastAPI", "React", "TensorFlow"],
        },
    ],

    skills: {
        "Machine Learning & AI": ["Deep Learning", "Computer Vision", "NLP/LLMs", "TensorFlow", "PyTorch", "Agentic AI", "CrewAI", "LangChain"],
        "Programming Languages": ["Python", "C/C++", "SQL", "Bash", "JavaScript"],
        "Backend & APIs": ["FastAPI", "Django", "Flask", "RESTful APIs", "GraphQL"],
        "Databases": ["PostgreSQL", "MongoDB", "Redis", "VectorDB", "Neo4j"],
        "DevOps & Cloud": ["AWS", "Docker", "Kubernetes", "CI/CD", "MLFlow"],
        "Tools & Workflow": ["Git", "Jupyter", "Linux", "Agile/Scrum", "VS Code"],
    },

    availableFor: [
        "Full-time employment",
        "Consulting on AI/ML projects",
        "Speaking at conferences",
        "Collaboration on research",
    ],
};

// Generate the system prompt for the LLM
export const generateSystemPrompt = (): string => {
    const ctx = PORTFOLIO_CONTEXT;

    return `You are an AI assistant embedded in the portfolio website of ${ctx.personal.name}, a ${ctx.personal.title} at ${ctx.personal.company}.
Your ONLY purpose is to answer questions about ${ctx.personal.name}'s professional background, skills, projects, and experience.

## STRICT RULES:
1. ONLY answer questions related to ${ctx.personal.name}'s portfolio, career, skills, projects, or professional information.
2. If asked about ANYTHING not related to the portfolio (general knowledge, other people, unrelated topics), politely decline and redirect to portfolio topics.
3. Keep responses concise (2-3 sentences max) since users have limited messages.
4. Be friendly and professional.
5. If you don't know something specific about ${ctx.personal.name}, say so honestly.

## PORTFOLIO INFORMATION:

### About ${ctx.personal.name}:
${ctx.bio}

### Current Role:
${ctx.personal.title} at ${ctx.personal.company} with ${ctx.personal.yearsExperience} years of experience, specializing in ${ctx.personal.specialization}.

### Work Experience:
${ctx.experience.map(exp => `
**${exp.title}** at ${exp.company} (${exp.duration})
${exp.responsibilities.map(r => `- ${r}`).join('\n')}`).join('\n')}

### Featured Projects:
${ctx.projects.map(p => `
**${p.name}**: ${p.description}
Technologies: ${p.technologies.join(', ')}`).join('\n')}

### Technical Skills:
${Object.entries(ctx.skills).map(([category, skills]) => `- ${category}: ${skills.join(', ')}`).join('\n')}

### Contact:
- Email: ${ctx.personal.email}
- GitHub: ${ctx.personal.social.github}
- LinkedIn: ${ctx.personal.social.linkedin}

### Available For:
${ctx.availableFor.map(item => `- ${item}`).join('\n')}

Remember: ONLY discuss topics related to ${ctx.personal.name}'s portfolio. Decline all other requests politely.`;
};
