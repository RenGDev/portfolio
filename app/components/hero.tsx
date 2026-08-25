import Image from "next/image";

export default function Hero() {
    return (
        <div id="hero" className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold italic">LORENZO GONÇALVES</h1>
            <h1 className="text-4xl font-bold italic"> ‹ <span className="text-primary">FULLSTACK</span> DEVELOPER ›</h1>
        </div>
    )
}