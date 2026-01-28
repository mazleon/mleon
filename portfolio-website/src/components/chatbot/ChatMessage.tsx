// Individual Chat Message Component
import { motion } from "framer-motion";
import { Bot, User } from "lucide-react";

interface ChatMessageProps {
    role: "user" | "assistant";
    content: string;
}

export function ChatMessageBubble({ role, content }: ChatMessageProps) {
    const isUser = role === "user";

    return (
        <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.2 }}
            className={`flex gap-2 ${isUser ? "flex-row-reverse" : "flex-row"}`}
        >
            {/* Avatar */}
            <div
                className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${isUser
                        ? "bg-accent-primary/20 text-accent-primary"
                        : "bg-accent-secondary/20 text-accent-secondary"
                    }`}
            >
                {isUser ? <User size={14} /> : <Bot size={14} />}
            </div>

            {/* Message Bubble */}
            <div
                className={`max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed ${isUser
                        ? "bg-accent-primary text-white rounded-tr-sm"
                        : "bg-white/10 text-gray-200 rounded-tl-sm"
                    }`}
            >
                {content}
            </div>
        </motion.div>
    );
}

// Typing Indicator
export function TypingIndicator() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-2"
        >
            <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 bg-accent-secondary/20 text-accent-secondary">
                <Bot size={14} />
            </div>
            <div className="bg-white/10 px-4 py-3 rounded-xl rounded-tl-sm flex gap-1">
                {[0, 1, 2].map((i) => (
                    <motion.span
                        key={i}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ y: [0, -4, 0] }}
                        transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: i * 0.15,
                        }}
                    />
                ))}
            </div>
        </motion.div>
    );
}
