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

export async function sendChatMessage(
    userMessage: string,
    history: ChatMessage[]
): Promise<string> {
    try {
        const response = await fetch("/.netlify/functions/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message: userMessage,
                history: history.map((msg) => ({ role: msg.role, content: msg.content })),
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Chat function error:", errorData);
            return "I encountered an error. Please try again.";
        }

        const data = await response.json();
        return data.content || "I couldn't generate a response.";
    } catch (error) {
        console.error("Chatbot service error:", error);
        return "I'm having trouble connecting to my brain. Please try again later.";
    }
}
