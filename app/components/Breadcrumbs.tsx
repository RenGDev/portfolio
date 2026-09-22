"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumbs() {
    const pathname = usePathname(); 
    const segments = pathname.split("/").filter(Boolean);

    return (
        <nav className="flex items-center gap-2 text-sm text-accent">
            {segments.map((segment, index) => {
                const href = "/" + segments.slice(0, index + 1).join("/");
                const isLast = index === segments.length - 1;

                return (
                    <span key={href} className="flex items-center gap-2">
                        <span>/</span>
                        {isLast ? (
                            <span className="text-primary font-medium capitalize">{segment}</span>
                        ) : (
                            <Link href={href} className="hover:text-primary capitalize">
                                {segment}
                            </Link>
                        )}
                    </span>
                );
            })}
        </nav>
    );
}