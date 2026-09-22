'use client';
import Image from "next/image";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import MenuMobile from "@/app/(site)/components/ui/menuMobile";

export default function Header(){

    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
      const previous = scrollY.getPrevious() ?? 0;
      const diff = latest - previous;

      if (latest < 80) {
        setHidden(false);
      } else if (diff > 0) {
        setHidden(true);
      } else if (diff < 0) {
        setHidden(false);
      }
    });

    return(
        <motion.div 
            className="flex items-center md:justify-between px-9 text-white sticky top-0 z-50 h-20"
            animate={{ y: hidden ? "-100%" : "0%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          
        >
            <Image 
                src="/logo_vermelha.png"
                width={100}
                height={100}
                alt="Logo"
                className="m-auto md:m-0"        
            />
            <nav>
                <ul className="hidden md:flex space-x-9">
                    <li className="hover:text-secondary duration-100 text-sm font-bold relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:ease-in after:duration-200 hover:after:w-full"><a href="#hero">HERO</a></li>
                    <li className="hover:text-secondary duration-100 text-sm font-bold relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:ease-in after:duration-200 hover:after:w-full"><a href="#about">ABOUT</a></li>
                    <li className="hover:text-secondary duration-100 text-sm font-bold relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:ease-in after:duration-200 hover:after:w-full"><a href="#projects">PROJECTS</a></li>
                    <li className="hover:text-secondary duration-100 text-sm font-bold relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:ease-in after:duration-200 hover:after:w-full"><a href="#contact">CONTACT</a></li>       
                </ul> 
            </nav>

            <MenuMobile />
        </motion.div>
    )
}