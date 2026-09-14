"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

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

    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0], { clamp: false });
    const y = useTransform(scrollYProgress, [0, 1], [100, -50], { clamp: false });
    const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1], { clamp: false });
    const x = useTransform(scrollYProgress, [0, 1], [-100, 0], { clamp: false });

    return (
        <div ref={ref} id="about" className="flex gap-10 items-center justify-center h-screen">
            <motion.div
                variants={container}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 1 }}

                className="flex flex-col items-center justify-center max-w-3xl"
            >
                <motion.h1
                    variants={title}
                    className="text-4xl font-bold mb-4 text-shadow-md text-shadow-primary"
                >
                    ABOUT ME
                </motion.h1>
                <motion.p 
                    variants={info}
                    className="text-lg max-w-2xl text-accent"
                >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem corrupti blanditiis optio nobis odit animi repellat dolores fugiat molestias debitis, aperiam libero unde! Quod possimus hic ratione nam tempore maiores?
                </motion.p>
            </motion.div>
            <motion.aside
                style={{ opacity, scale, x }}
                className="flex items-center justify-center">
                <Image
                    src="/banner_pixel.png"
                    width={450}
                    height={450}
                    alt="Profile Picture"
                    className="mt-10 drop-shadow-lg drop-shadow-primary about-me"
                />

            </motion.aside>
        </div>
    )
}