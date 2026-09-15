'use client';
import AnimatedText from "@/app/components/utils/AnimatedText";
import { useState } from "react";
import Form from "./ui/form";
import Contacts from "./ui/contacts";

export default function Contact() {
    const [showNext, setShowNext] = useState(false);
    
    return (
        <div id="contact" className="flex flex-col items-center justify-center h-screen">
  
            <AnimatedText
                text="Tem um projeto em mente ou quer trocar uma ideia? Manda uma mensagem, respondo o mais rápido possível."
                className="text-2xl font-bold mb-4 text-accent opacity-75 max-w-2xl text-center wrap-break-word"
                onFinished={() => setShowNext(true)}
            />
            

            {showNext && (
                <div className="flex gap-10 py-20 px-32 justify-center w-full h-full">
                    <Contacts />
                    <aside className="w-7/12 h-full">
                        <Form />
                    </aside>
                </div>
            )}
        </div>
    )
}