"use client";

import { motion } from "motion/react"
import AnimatedButton from "@/app/components/utils/AnimatedButton"


const formContainer = {
    hidden: { opacity: 0, x: 100 },
    visible: { 
        opacity: 1,
        x: 0,
        transition: {
            staggerChildren: 0.15
        }
     }
}

const formItem = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 }
}

export default function Form(){
    return(
        <motion.form 
            action={process.env.NEXT_PUBLIC_FORM_URL}
            method="POST" 
            className="flex flex-col justify-between gap-6 p-10 bg-foreground h-full rounded-md shadow-md shadow-primary shadow-blink"
            variants={formContainer}
            initial="hidden"
            whileInView="visible"
            viewport= {{once: false, amount: 0.2}}
        >
            <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col gap-1.5 text-accent">
                    <motion.label className="opacity-75 uppercase text-xs" variants={formItem} htmlFor="name">Name</motion.label>
                    <motion.input variants={formItem} className="bg-background px-2.5 py-3 rounded-md border-[0.5px] border-primary" type="text" name="name" id="name" placeholder="Your Name..." required />
                </div>
                <div className="flex flex-col gap-1.5 text-accent">
                    <motion.label className="opacity-75 uppercase text-xs" variants={formItem} htmlFor="email">Email</motion.label>
                    <motion.input variants={formItem} className="bg-background px-2.5 py-3 rounded-md border-[0.5px] border-primary" type="email" name="email" id="email" placeholder="Your Email..." required />
                </div>
            </div>
            <div className="flex flex-col gap-1.5 text-accent">
                <motion.label className="opacity-75 uppercase text-xs" variants={formItem} htmlFor="subject">Subject</motion.label>
                <motion.input variants={formItem} className="bg-background px-2.5 py-3 rounded-md border-[0.5px] border-primary" type="text" name="subject" id="subject" placeholder="Subject..." required />
            </div>
            <div className="flex flex-col gap-1.5 text-accent">
                <motion.label className="opacity-75 uppercase text-xs" variants={formItem} htmlFor="message">Message</motion.label>
                <motion.textarea variants={formItem} className="bg-background px-2.5 py-3 rounded-md border-[0.5px] border-primary" name="message" id="message" placeholder="Your message..." required />
            </div>
            <AnimatedButton 
                className="text-primary cursor-pointer text-sm uppercase font-bold border-[1px] border-primary p-4 rounded-md hover:bg-secondary transition-colors duration-300"
                variants={formItem}
                text="Send Message"
                type="submit"
            />
        </motion.form>
    )
}