// Chat Session Management Hook
import { useState, useEffect, useCallback } from "react";
import { ChatMessage } from "@/services/chatbot";

const SESSION_KEY = "portfolio_chat_session";
const MAX_MESSAGES = 10;

interface ChatSession {
    messages: ChatMessage[];
    messageCount: number;
    isExpired: boolean;
}

export function useChatSession() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [messageCount, setMessageCount] = useState(0);
    const [isExpired, setIsExpired] = useState(false);

    // Load session from storage on mount
    useEffect(() => {
        try {
            const stored = sessionStorage.getItem(SESSION_KEY);
            if (stored) {
                const session: ChatSession = JSON.parse(stored);
                setMessages(session.messages);
                setMessageCount(session.messageCount);
                setIsExpired(session.messageCount >= MAX_MESSAGES);
            }
        } catch (error) {
            console.error("Failed to load chat session:", error);
        }
    }, []);

    // Save session to storage whenever it changes
    useEffect(() => {
        try {
            const session: ChatSession = {
                messages,
                messageCount,
                isExpired: messageCount >= MAX_MESSAGES,
            };
            sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
        } catch (error) {
            console.error("Failed to save chat session:", error);
        }
    }, [messages, messageCount]);

    // Add a message to the conversation
    const addMessage = useCallback((message: ChatMessage) => {
        setMessages((prev) => [...prev, message]);
        if (message.role === "user") {
            setMessageCount((prev) => {
                const newCount = prev + 1;
                if (newCount >= MAX_MESSAGES) {
                    setIsExpired(true);
                }
                return newCount;
            });
        }
    }, []);

    // Get remaining messages count
    const remainingMessages = MAX_MESSAGES - messageCount;

    // Reset session (optional utility)
    const resetSession = useCallback(() => {
        sessionStorage.removeItem(SESSION_KEY);
        setMessages([]);
        setMessageCount(0);
        setIsExpired(false);
    }, []);

    return {
        messages,
        messageCount,
        remainingMessages,
        isExpired,
        addMessage,
        resetSession,
        maxMessages: MAX_MESSAGES,
    };
}
