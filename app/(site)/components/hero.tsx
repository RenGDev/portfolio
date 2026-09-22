'use client'

import { User } from "@/types"
import { useState, useEffect } from "react"

export default function Hero() {
    const [ user, setUser ] = useState<User>()
        
    useEffect(() => {
        async function fetchUser(){
            const res = await fetch('/api/users')
            const json = await res.json()

            setUser(json)
        }

        fetchUser()
    }, [])
    
    return (
        <div id="hero" className="flex flex-col items-center overflow-hidden justify-center h-screen">
            <h1 className="text-4xl md:text-6xl uppercase font-bold italic max-w-fit typing_entry text-shadow-md text-shadow-primary">{user?.first_name} {user?.last_name}</h1>
            <h1 className="text-2xl md:text-4xl font-bold italic typing_words"></h1>
        </div>
    )
}