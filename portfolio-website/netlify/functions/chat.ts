import { Handler, HandlerEvent } from "@netlify/functions";

// Portfolio data included directly to ensure serverless environment has context
const PORTFOLIO_CONTEXT = {
    personal: {
        name: "Mazharul Islam Leon",
        title: "Senior AI/ML Engineer",
        company: "Brain Station 23",
        location: "Bangladesh",
        yearsExperience: "6+",
        specialization: "Machine Learning & AI",
        email: "mzleon.cse@gmail.com",
        social: {
            github: "https://github.com/mazleon",
            linkedin: "https://www.linkedin.com/in/mazharul-islam-leon-2b998b98/",
            twitter: "https://x.com/LeonMazharul",
        },
    },
    bio: `Mazharul Islam Leon is an expert machine learning engineer with over 5+ years of experience. He specializes in building scalable AI-driven solutions, computer vision, and agent-based chatbots.`,
    experience: [
        {
            title: "Senior AI/ML Engineer",
            company: "Brain Station 23",
            duration: "Aug 2026 - Present",
            responsibilities: [
                "Building agentic multi-hop orchestration-based chatbot development, leveraging LLM orchestration frameworks for complex reasoning and tool-augmented workflows",
            ],
        },
        {
            title: "Senior Software Engineer",
            company: "RedDot Digital Limited",
            duration: "Aug 2021 - Jul 2026",
            responsibilities: [
                "Architected an Agent-Based AI Chatbot using advanced NLP (LangChain, CrewAI)",
                "Designed the Digital Leaf Grading System for BAT with 95%+ accuracy",
                "Built a real-time Suspicious Anomaly Detection system",
            ],
        },
        {
            title: "Jr. Data Science Engineer",
            company: "CMED Health Limited",
            duration: "Sep 2020 - July 2021",
            responsibilities: [
                "Developed predictive ML models for medical diagnostics",
                "Implemented data processing pipelines for IoT medical sensors",
            ],
        },
    ],
    projects: [
        { name: "Digital Leaf Grading System", description: "AI-powered tobacco leaf grading with custom CNN for BAT." },
        { name: "Suspicious Anomaly Detection", description: "Security intelligence platform using unsupervised learning." },
        { name: "Agent Based AI Chatbot", description: "Context-aware conversational agent using orchestrated NLP modules." },
        { name: "Biometric Verification System", description: "Identity verification platform with liveness detection." },
    ],
    skills: {
        "ML & AI": ["Deep Learning", "Computer Vision", "NLP/LLMs", "TensorFlow", "PyTorch", "LangChain"],
        "Programming": ["Python", "C/C++", "SQL", "JavaScript"],
        "Backend": ["FastAPI", "Django", "Flask"],
        "Cloud": ["AWS", "Docker", "Kubernetes"],
    },
};

const generateSystemPrompt = () => {
    const ctx = PORTFOLIO_CONTEXT;
    return `You are an AI assistant for ${ctx.personal.name}, a ${ctx.personal.title}.
STRICT RULES:
1. ONLY answer questions about his career, skills, projects, and professional background using this context: ${JSON.stringify(ctx)}.
2. If asked about ANYTHING else, politely decline.
3. Keep responses under 3 sentences.
4. If you don't know, say so.`;
};

const handler: Handler = async (event: HandlerEvent) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
        return { statusCode: 500, body: JSON.stringify({ error: "API key not configured" }) };
    }

    try {
        const { message, history } = JSON.parse(event.body || "{}");

        const models = ["z-ai/glm-4.5-air", "openai/gpt-4o-mini"];
        let lastError: string | null = null;
        let data: any = null;

        for (const model of models) {
            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                    "HTTP-Referer": "https://mazleon.com",
                    "X-Title": "Leon Portfolio Chatbot",
                },
                body: JSON.stringify({
                    model,
                    messages: [
                        { role: "system", content: generateSystemPrompt() },
                        ...history,
                        { role: "user", content: message },
                    ],
                    max_tokens: 200,
                    temperature: 0.7,
                }),
            });

            const raw = await response.text();
            console.log(`[chat] model=${model} status=${response.status} body=${raw.slice(0, 300)}`);

            try {
                data = JSON.parse(raw);
            } catch {
                data = null;
            }

            if (!response.ok || data?.error) {
                lastError = data?.error?.message || `Upstream ${response.status}`;
                continue;
            }

            const content = data.choices?.[0]?.message?.content;
            if (content) {
                return {
                    statusCode: 200,
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ content }),
                };
            }

            lastError = "Empty response from model";
        }

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                content: lastError
                    ? `I couldn't generate a response (${lastError}). Please try again later.`
                    : "I couldn't generate a response.",
            }),
        };
    } catch (error) {
        console.error("[chat] error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error" }),
        };
    }
};

export { handler };
