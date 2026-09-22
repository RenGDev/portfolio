'use client'

import Table from "@/app/manager/components/ui/table";
import { useEffect, useState } from "react";
import FormCreate from "../components/ui/formCreate";
import { PaginatedResponse, Pagination, Project } from "@/types";
import FormUpdate from "../components/ui/formUpdate";
import { motion } from "motion/react";

const inputs =[
    {name: 'name', label: 'Name', type: 'text'},
    {name: 'description', label: 'Description', type: 'textarea'},
    {name: 'link', label: 'Link', type: 'url'},
    { name: 'image', label: 'Image', type: 'file' }
] 

const headers = ['name', 'created_at', 'updated_at', 'link']

export default function Projects(){

    const [ isOpen, setIsOpen ] = useState(false)
    const [ id, setId ] = useState<number | undefined>(undefined)

    const [ projects, setProjects ] = useState<Project[]>();
    const [ pagination, setPagination ] = useState<Pagination>();
    const [ page, setPage ] = useState(1)
    const [ refreshKey, setRefreshKey ] = useState(0)

    useEffect(() => {
        const api = '/api/projects/manager?page=' + page

        async function fetchProjects(){
            const res = await fetch(api)
            const json: PaginatedResponse<Project> = await res.json()

            setProjects(json.data)
            setPagination(json.pagination)
        }

        fetchProjects()
    }, [page, refreshKey])

    return(
        <div id="projects" className="flex flex-col gap-15 p-10 min-h-screen">
            <motion.h1 
                className="text-4xl text-secondary border-l-2 border-primary pl-2"
                initial={{ paddingLeft: 0, opacity: 0 }}
                animate={{ paddingLeft: 10, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                Projects
            </motion.h1>

            <div className="flex flex-col gap-8">
                <div className="flex justify-end w-full">
                    <FormCreate inputs={inputs} action="/api/projects" buttonText="new project" onSuccess={() => setRefreshKey((k) => k + 1)} />
                </div>
                <Table headers={headers} items={projects} pagination={pagination} setPage={setPage} setIsOpen={setIsOpen} setId={setId}/>
            </div>
            {id !== undefined && (
                <FormUpdate inputs={inputs} action={`/api/projects/${id}`} fetchurl={`/api/projects/manager/${id}`} setIsOpen={setIsOpen} isOpen={isOpen} onSuccess={() => setRefreshKey((k) => k + 1)} />
            )}
        </div>
    )
}