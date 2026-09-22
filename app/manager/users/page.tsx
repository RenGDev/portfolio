'use client'

import Table from "@/app/manager/components/ui/table";
import { useState, useEffect } from "react";
import FormCreate from "../components/ui/formCreate";
import { PaginatedResponse, Pagination, User } from "@/types";
import FormUpdate from "../components/ui/formUpdate";
import { motion } from "motion/react";

const inputs = [
  { name: "first_name", label: "Nome", type: "text" },
  { name: "last_name", label: "Sobrenome", type: "text" },
  { name: "username", label: "Usuário", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "password", label: "Senha", type: "password" },
  { name: "git_hub_link", label: "GitHub", type: "url" },
  { name: "linkedin_link", label: "LinkedIn", type: "url" },
  { name: "about_me", label: "About me", type: "textarea" },
  { name: 'is_admin', label: 'Is Admin', type: "checkbox" },
];

const headers = ['username', 'email', 'github', 'linkedin']

export default function Users(){
    const [ isOpen, setIsOpen ] = useState(false)
    const [ id, setId ] = useState<number | undefined>(undefined)

    const [ users, setUsers ] = useState<User[]>()
    const [ pagination, setPagination ] = useState<Pagination>()
    const [ page, setPage ] = useState(1)
    const [ refreshKey, setRefreshKey ] = useState(0)

    useEffect(() => {
        const api = '/api/users/manager?page=' + page

        async function fetchUsers(){
            const res = await fetch(api)
            const json: PaginatedResponse<User> = await res.json()

            setUsers(json.data)
            setPagination(json.pagination)
        }

        fetchUsers()
    }, [page, refreshKey])

    return(
        <div id="users" className="flex flex-col gap-10 p-10 min-h-screen">
            <motion.h1 
                className="text-4xl text-secondary border-l-2 border-primary pl-2"
                initial={{ paddingLeft: 0, opacity: 0 }}
                animate={{ paddingLeft: 10, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                Users
            </motion.h1>
    
            <div className="flex flex-col gap-8">
                <div className="flex justify-end w-full">
                    <FormCreate inputs={inputs} buttonText="New User" action="/api/users" onSuccess={() => setRefreshKey((k) => k + 1)} />
                </div>
                <Table headers={headers} items={users} pagination={pagination} setPage={setPage} setIsOpen={setIsOpen} setId={setId} />
            </div>
            {id !== undefined && (
                <FormUpdate inputs={inputs} action={`/api/users/${id}`} fetchurl={`/api/users/manager/${id}`} setIsOpen={setIsOpen} isOpen={isOpen} onSuccess={() => setRefreshKey((k) => k + 1)}/>
            )}
        </div>
    )
}