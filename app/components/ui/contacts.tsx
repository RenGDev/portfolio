import { motion } from "motion/react"

const contactContainer = {
    hidden: {},
	visible: {
		transition: {
			staggerChildren: 0.15,
		},
	}
}

const contactItem = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 }
}

export default function Contacts(){
    return(
        <motion.div
            variants={contactContainer}
            initial='hidden'
            whileInView='visible'
            viewport={{once: false, amount: 0.2}}
            className="flex flex-col justify-center w-2/5 gap-4"
        >
            <motion.h1 variants={contactItem} className="text-secondary text-shadow-primary text-shadow-md text-2xl">Contacts</motion.h1>
            <motion.hr variants={contactItem} className="border-0 h-0.5 bg-primary"/>
            <motion.div variants={contactItem} className="flex items-center gap-2">
                <span className="text-lg p-2 rounded-full py-1 bg-foreground border-2 border-secondary text-secondary font-bold">@</span>
                <div className="flex flex-col gap-1 text-accent">
                    <span className="text-sm opacity-75">EMAIL</span>
                    <span className="text-md">lorenzodequadrosgoncalves@gmail.com</span>
                </div>
            </motion.div>
            <motion.hr variants={contactItem} className="border-0 h-0.5 bg-foreground"/>
            <motion.div variants={contactItem} className="flex items-center gap-2">
                <span className="text-lg p-2 rounded-full py-1 bg-foreground border-2 border-secondary text-secondary font-bold">in</span>
                <div className="flex flex-col gap-1 text-accent">
                    <span className="text-sm opacity-75">LINKEDIN</span>
                    <span className="text-md">/in/lorenzodequadrosgoncalves</span>
                </div>
            </motion.div>
            <motion.hr variants={contactItem} className="border-0 h-0.5 bg-foreground"/>
            <motion.div variants={contactItem} className="flex items-center gap-2">
                <span className="text-lg p-2 rounded-full py-1 bg-foreground border-2 border-secondary text-secondary font-bold">gh</span>
                <div className="flex flex-col gap-1 text-accent">
                    <span className="text-sm opacity-75">GITHUB</span>
                    <span className="text-md">/lorenzodequadrosgoncalves</span>
                </div>
            </motion.div>
            <motion.hr variants={contactItem} className="border-0 h-0.5 bg-foreground"/>
        </motion.div>
    )
}