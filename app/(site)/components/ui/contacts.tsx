'use client'

import { motion } from "motion/react"
import { useEffect, useState } from "react"

interface User{
    first_name: string,
    last_name: string,
    email: string,
    git_hub_link: string,
    linkedin_link: string 
}

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

    const [ user, setUser ] = useState<User>()

    useEffect(() => {
        async function fetchUser(){
            const res = await fetch('/api/users')
            const json = await res.json()
            setUser(json)
        }

        fetchUser()
    }, [])

    return(
        <motion.div
            variants={contactContainer}
            initial='hidden'
            whileInView='visible'
            viewport={{once: false, amount: 0.2}}
            className="flex flex-col justify-center md:w-2/5"
        >
            <motion.h1 variants={contactItem} className="text-secondary text-shadow-primary text-shadow-md text-2xl">Contacts</motion.h1>
            <motion.hr variants={contactItem} className="border-0 h-0.5 bg-primary"/>

            <motion.div variants={contactItem} className="flex items-center gap-2 hover:bg-neutral-950 p-4 cursor-pointer">
                <span className="text-lg p-2 rounded-full py-1 bg-foreground border-2 border-secondary text-secondary font-bold">@</span>
                <a href={`mailto:${user?.email}`} className="flex flex-col gap-1 text-accent">
                    <span className="text-sm opacity-75">EMAIL</span>
                    <span className="text-md">{user?.email}</span>
                </a>
            </motion.div>
            <motion.hr variants={contactItem} className="border-0 h-0.5 bg-foreground"/>

            <motion.div variants={contactItem} className="flex items-center gap-2 hover:bg-neutral-950 p-4 cursor-pointer">
                <span className="text-lg p-2 rounded-full py-1 bg-foreground border-2 border-secondary text-secondary font-bold">in</span>
                <a href={user?.linkedin_link} target="_blank" rel="noopener noreferrer" className="flex flex-col gap-1 text-accent">
                    <span className="text-sm opacity-75">LINKEDIN</span>
                    <span className="text-md">{user?.linkedin_link}</span>
                </a>
            </motion.div>
            <motion.hr variants={contactItem} className="border-0 h-0.5 bg-foreground"/>

            <motion.div variants={contactItem} className="flex items-center gap-2 hover:bg-neutral-950 p-4 cursor-pointer">
                <span className="text-lg p-2 rounded-full py-1 bg-foreground border-2 border-secondary text-secondary font-bold">gh</span>
                <a href={user?.git_hub_link} target="_blank" rel="noopener noreferrer" className="flex flex-col gap-1 text-accent">
                    <span className="text-sm opacity-75">GITHUB</span>
                    <span className="text-md">{user?.git_hub_link}</span>
                </a>
            </motion.div>
            <motion.hr variants={contactItem} className="border-0 h-0.5 bg-foreground"/>
        </motion.div>
    )
}