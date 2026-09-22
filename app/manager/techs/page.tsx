'use client'

import Table from "@/app/manager/components/ui/table";
import { useState, useEffect } from "react";
import FormCreate from "../components/ui/formCreate";
import { PaginatedResponse, Pagination, Tech } from "@/types";
import FormUpdate from "../components/ui/formUpdate";
import { motion } from "motion/react";

const inputs =[
    {name: 'name', label: 'Name', type: 'text'},
    {name: 'description', label: 'Description', type: 'text'},
] 

const headers = ['name', 'description', 'created_at', 'updated_at']

export default function Techs(){
    const [ isOpen, setIsOpen ] = useState(false)
    const [ id, setId ] = useState<number | undefined>(undefined)

    const [ techs, setTechs ] = useState<Tech[]>()
    const [ pagination, setPagination ] = useState<Pagination>()
    const [ page, setPage ] = useState(1)
    const [ refreshKey, setRefreshKey ] = useState(0)


    useEffect(() => {
        const api = '/api/techs?page=' + page

        async function fetchTechs(){
            const res = await fetch(api)
            const json: PaginatedResponse<Tech> = await res.json()

            setTechs(json.data)
            setPagination(json.pagination)
        }

        fetchTechs()
    }, [page, refreshKey])

    return(
        <div id="techs" className="flex flex-col gap-10 p-10 min-h-screen">
            <motion.h1 
                className="text-4xl text-secondary border-l-2 border-primary pl-2"
                initial={{ paddingLeft: 0, opacity: 0 }}
                animate={{ paddingLeft: 10, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                Techs
            </motion.h1>

            <div className="flex flex-col gap-8">
                <div className="flex justify-end w-full">
                    <FormCreate inputs={inputs} buttonText="New Tech" action="/api/techs" onSuccess={() => setRefreshKey((k) => k + 1)} />
                </div>
                <Table headers={headers} items={techs} pagination={pagination} setPage={setPage} setIsOpen={setIsOpen} setId={setId}/>
            </div>
            {id !== undefined && (
                <FormUpdate inputs={inputs} action={`/api/techs/${id}`} fetchurl={`/api/techs/${id}`} setIsOpen={setIsOpen} isOpen={isOpen} onSuccess={() => setRefreshKey((k) => k + 1)}/>
            )}
        </div>
    )
}