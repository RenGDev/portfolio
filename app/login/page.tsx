'use client'

import Image from "next/image";
import AnimatedButton from "../components/utils/AnimatedButton";
import { useState } from "react";
import Toast from "../components/utils/Toast";
import { useRouter } from "next/navigation";

export default function LoginPage(){

    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('')
    
    const router = useRouter()

    async function handleLogin(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        const data = Object.fromEntries(formData.entries())

        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if(!res.ok){
            const json = await res.json();
            setToastMessage(json.message);
            setShowToast(true);
            return;
        }

        router.push('/manager/projects');

    }

    return(
        <>
            <div className="flex h-[700px] w-full max-h-screen">

                <div className="w-full flex flex-col items-center justify-center">

                    <form className="md:w-96 w-80 flex flex-col items-center justify-center" onSubmit={handleLogin}>
                        <Image
                            src={"/logo_vermelha.png"}
                            width={150}
                            height={150}
                            alt="logo" 
                            className="drop-shadow-lg drop-shadow-primary shadow-blink"
                        />
                        <h2 className="text-4xl text-primary font-medium text-shadow-lg text-shadow-primary">Sign in</h2>
                        <p className="text-sm text-accent/90 my-3">Welcome back! Please sign in to continue</p>

                        <div className="flex items-center w-full bg-transparent border border-primary/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                  d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" fill="#ad0013"
                                />
                            </svg>
                            <input type="text" placeholder="Username" name="username" id="username" className="bg-transparent text-accent/80 placeholder-accent/80 outline-none text-sm w-full h-full" required />                 
                        </div>

                        <div className="flex items-center mt-6 w-full bg-transparent border border-primary/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                            <svg width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z" fill="#ad0013"/>
                            </svg>
                            <input type="password" placeholder="Password" name="password" id="password" className="bg-transparent text-accent/80 placeholder-accent/80 outline-none text-sm w-full h-full" required />
                        </div>

                        <AnimatedButton text="Login" type="submit" className="mt-8 cursor-pointer w-full h-11 rounded-full text-accent bg-primary hover:opacity-90 transition-opacity"/>
                    </form>
                </div>
            </div>
            <Toast message={toastMessage} show={showToast} onClose={() => setShowToast(false)} />
        </>
    )
}