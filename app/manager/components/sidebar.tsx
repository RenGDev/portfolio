"use client";

import { ChevronRight, ChevronLeft } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
    { href: "/manager/projects", label: "Projects" },
    { href: "/manager/techs", label: "Techs" },
    { href: "/manager/users", label: "Users" },
];

export default function SideBar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            animate={{ width: isOpen ? 208 : 72 }} // 208px = w-52 (expandida), 72px = mini
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative h-screen flex flex-col gap-10 bg-background p-4 shadow-md shadow-primary overflow-hidden"
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="absolute top-6 cursor-pointer -right-3 bg-background border border-primary rounded-full p-1 z-50"
            >
                {isOpen ? (
                    <ChevronLeft className="text-primary" size={16} />
                ) : (
                    <ChevronRight className="text-primary" size={16} />
                )}
            </button>

            <Image
                src="/logo_vermelha.png"
                width={100}
                height={100}
                alt="Logo"
                className="mx-auto shrink-0"
            />

            <nav className="flex flex-col gap-6">
                {links.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`whitespace-nowrap transition-opacity duration-200 ${
                                isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                            } ${
                                isActive
                                    ? "text-primary font-bold pl-2 border-l-2 border-primary"
                                    : "text-accent"
                            }`}
                        >
                            {link.label}
                        </Link>
                    );
                })}
            </nav>
        </motion.div>
    );
}