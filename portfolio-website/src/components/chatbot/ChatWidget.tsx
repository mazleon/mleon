// Chat Widget Component - Floating Chatbot UI
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, AlertCircle } from "lucide-react";
import { useChatSession } from "@/hooks/useChatSession";
import { sendChatMessage } from "@/services/chatbot";
import { ChatMessageBubble, TypingIndicator } from "./ChatMessage";
import { PORTFOLIO_CONTEXT } from "@/data/portfolioContext";

const MAX_INPUT_LENGTH = 60;

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const {
        messages,
        remainingMessages,
        isExpired,
        addMessage,
    } = useChatSession();

    // Auto-scroll to bottom on new messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isLoading]);

    // Focus input when chat opens
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const trimmedInput = input.trim();
        if (!trimmedInput || isLoading || isExpired) return;

        // Add user message
        addMessage({ role: "user", content: trimmedInput });
        setInput("");
        setIsLoading(true);

        try {
            // Get response from LLM
            const response = await sendChatMessage(trimmedInput, messages);
            addMessage({ role: "assistant", content: response });
        } catch (error) {
            console.error("Chat error:", error);
            addMessage({
                role: "assistant",
                content: "Sorry, I encountered an error. Please try again.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.length <= MAX_INPUT_LENGTH) {
            setInput(value);
        }
    };

    return (
        <>
            {/* Floating Button */}
            <motion.button
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-accent-primary text-white shadow-lg shadow-accent-primary/30 flex items-center justify-center hover:scale-110 transition-transform ${isOpen ? "hidden" : ""
                    }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Open chat"
            >
                <MessageCircle size={24} />
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] h-[500px] max-h-[calc(100vh-100px)] bg-[#0a0a0b]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-accent-primary/20 flex items-center justify-center">
                                    <span className="text-accent-primary font-bold text-sm">ML</span>
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold text-sm">
                                        {PORTFOLIO_CONTEXT.personal.name.split(" ")[0]}'s Assistant
                                    </h3>
                                    <p className="text-gray-500 text-xs">
                                        {remainingMessages} messages left
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-400 hover:text-white transition-colors p-1"
                                aria-label="Close chat"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {/* Welcome Message */}
                            {messages.length === 0 && (
                                <div className="text-center py-8">
                                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent-primary/10 flex items-center justify-center">
                                        <MessageCircle size={28} className="text-accent-primary" />
                                    </div>
                                    <h4 className="text-white font-medium mb-2">
                                        Hi! I'm {PORTFOLIO_CONTEXT.personal.name.split(" ")[0]}'s AI assistant
                                    </h4>
                                    <p className="text-gray-400 text-sm">
                                        Ask me about his skills, projects, or experience!
                                    </p>
                                </div>
                            )}

                            {/* Messages */}
                            {messages.map((msg, idx) => (
                                <ChatMessageBubble key={idx} role={msg.role} content={msg.content} />
                            ))}

                            {/* Typing Indicator */}
                            {isLoading && <TypingIndicator />}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Session Expired Message */}
                        {isExpired && (
                            <div className="px-4 py-3 bg-red-500/10 border-t border-red-500/20 flex items-center gap-2 text-red-400 text-sm">
                                <AlertCircle size={16} />
                                <span>Session limit reached. Refresh the page for a new session.</span>
                            </div>
                        )}

                        {/* Input Area */}
                        {!isExpired && (
                            <form onSubmit={handleSubmit} className="p-3 border-t border-white/10">
                                <div className="relative">
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={input}
                                        onChange={handleInputChange}
                                        placeholder="Ask about Leon's work..."
                                        disabled={isLoading}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-20 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-accent-primary/50 transition-colors disabled:opacity-50"
                                    />
                                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                        <span
                                            className={`text-xs ${input.length >= MAX_INPUT_LENGTH
                                                    ? "text-red-400"
                                                    : "text-gray-500"
                                                }`}
                                        >
                                            {input.length}/{MAX_INPUT_LENGTH}
                                        </span>
                                        <button
                                            type="submit"
                                            disabled={!input.trim() || isLoading}
                                            className="w-8 h-8 rounded-lg bg-accent-primary text-white flex items-center justify-center disabled:opacity-30 hover:bg-accent-primary/80 transition-colors"
                                        >
                                            <Send size={16} />
                                        </button>
                                    </div>
                                </div>
                            </form>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
