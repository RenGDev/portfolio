"use client";

import Image from "next/image";
import { motion } from "motion/react";

const container = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
        },
    }
}

const title = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const info = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

export default function About() {

    return (
        <motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} id="about" className="flex flex-col-reverse md:flex-row gap-10 items-center justify-center min-h-screen">
            <motion.div
                variants={container}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}

                className="flex flex-col items-center justify-center max-w-3xl p-5 md:p-0"
            >
                <motion.h1
                    variants={title}
                    className="text-4xl font-bold mb-4 text-shadow-md text-shadow-primary"
                >
                    ABOUT ME
                </motion.h1>
                <motion.p 
                    variants={info}
                    className="text-lg max-w-2xl text-accent text-center"
                >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem corrupti blanditiis optio nobis odit animi repellat dolores fugiat molestias debitis, aperiam libero unde! Quod possimus hic ratione nam tempore maiores?
                </motion.p>
            </motion.div>
            <motion.aside
                variants={info}
                className="flex items-center justify-center">
                <Image
                    src="/banner_pixel.png"
                    width={450}
                    height={450}
                    alt="Profile Picture"
                    className="mt-10 w-64 h-64 md:w-[450px] md:h-[450px] drop-shadow-lg drop-shadow-primary about-me"
                />

            </motion.aside>
        </motion.div>
    )
}