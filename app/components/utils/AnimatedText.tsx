"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const container = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.05 },
    },
};

const charc = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.01 } },
};

export default function AnimatedText({
    text,
    className,
    onFinished,
}: {
    text: string;
    className?: string;
    onFinished?: () => void;
}) {
    const [isTyping, setIsTyping] = useState(true);
    const characters = text.split("");

    return (
        <AnimatePresence onExitComplete={onFinished}>
            {isTyping && (
                <motion.p
                    key="text" // AnimatePresence precisa de uma key estável pra saber o que animar
                    variants={container}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, transition: { duration: 0.6 } }} // fade suave na saída
                    className={className}
                >
                    {characters.map((char, index) => {
                        const isLast = index === characters.length - 1;
                        return (
                            <motion.span
                                key={index}
                                variants={charc}
                                onAnimationComplete={
                                    isLast
                                        ? () => {
                                              // espera um pouco depois de terminar de digitar, então começa o fade
                                              setTimeout(() => setIsTyping(false), 800);
                                          }
                                        : undefined
                                }
                            >
                                {char}
                            </motion.span>
                        );
                    })}
                </motion.p>
            )}
        </AnimatePresence>
    );
}