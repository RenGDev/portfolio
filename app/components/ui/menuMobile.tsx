import { motion, AnimatePresence, Variants } from "motion/react"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import Image from "next/image";

const container: Variants = {
    hidden: {
        x: 100,
        transition: { 
            type: "spring", 
            stiffness: 300, 
            damping: 30 
        },
    },
    visible: {
        x: 0,
        transition: {
            type: "spring",
            stiffness: 300, 
            damping: 30,
            staggerChildren: 0.15
        }
    }
}

const item: Variants = {
    hidden: {
        opacity: 0,
        x: -100
    },
    visible: {
        opacity: 1,
        x: 0
    }
} 

export default function MenuMobile(){

    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden relative z-50">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={isOpen ? "close" : "open"}
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {
                            isOpen ? (
                                <X className="text-primary" size={28}/>
                            ) : (
                                <Menu className="text-primary" size={28} />
                            )
                        }
                    </motion.div>
                </AnimatePresence>
            </button>
            <AnimatePresence>
                {
                    isOpen && (
                        <motion.nav
                            variants={ container }
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            className="fixed top-0 right-0 h-screen w-64 bg-background z-40 flex flex-col items-center justify-center gap-8"
                        >
                            <motion.div
                                variants={item}
                            >
                                <Image 
                                    src="/logo_vermelha.png"
                                    width={100}
                                    height={100}
                                    alt="Logo"
                                    className="mx-auto"        
                                />
                            </motion.div>
                            

                            <motion.a variants={ item } href="#hero" onClick={() => setIsOpen(false)}>HERO</motion.a>
                            <motion.a variants={ item } href="#about" onClick={() => setIsOpen(false)}>ABOUT</motion.a>
                            <motion.a variants={ item } href="#projects" onClick={() => setIsOpen(false)}>PROJECTS</motion.a>
                            <motion.a variants={ item } href="#contato" onClick={() => setIsOpen(false)}>CONTACT</motion.a>
                        </motion.nav>
                    )
                }
            </AnimatePresence>
        </>
    )
}