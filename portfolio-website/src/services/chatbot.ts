// Chatbot Service - OpenRouter API Integration
import { generateSystemPrompt } from "@/data/portfolioContext";

export interface ChatMessage {
    role: "user" | "assistant";
    content: string;
}

interface OpenRouterResponse {
    choices: {
        message: {
            content: string;
        };
    }[];
    error?: {
        message: string;
    };
}

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "anthropic/claude-3.5-haiku"; // Fast, cost-effective

export async function sendChatMessage(
    userMessage: string,
    history: ChatMessage[]
): Promise<string> {
    // Get API key from environment
    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

    if (!apiKey) {
        console.error("OpenRouter API key not found");
        return "I'm having trouble connecting right now. Please try again later.";
    }

    // Build messages array with system prompt and history
    const messages = [
        { role: "system", content: generateSystemPrompt() },
        ...history.map((msg) => ({ role: msg.role, content: msg.content })),
        { role: "user", content: userMessage },
    ];

    try {
        const response = await fetch(OPENROUTER_API_URL, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
                "HTTP-Referer": window.location.origin,
                "X-Title": "Portfolio Chatbot",
            },
            body: JSON.stringify({
                model: MODEL,
                messages,
                max_tokens: 200, // Keep responses concise
                temperature: 0.7,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("OpenRouter API error:", errorData);
            return "I encountered an error. Please try again.";
        }

        const data: OpenRouterResponse = await response.json();

        if (data.error) {
            console.error("OpenRouter error:", data.error);
            return "I encountered an error. Please try again.";
        }

        return data.choices[0]?.message?.content || "I couldn't generate a response.";
    } catch (error) {
        console.error("Chatbot service error:", error);
        return "I'm having trouble connecting. Please check your connection and try again.";
    }
}
