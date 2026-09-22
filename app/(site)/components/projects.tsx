'use client';

import Image from "next/image"
import { motion } from "motion/react"
import AnimatedButton from "@/app/components/utils/AnimatedButton";
import { useEffect, useState } from "react";
import ProjectCard from "./ui/projectCard";

const container = {
	hidden: {},
	visible: {
		transition: {
			staggerChildren: 0.15,
		},
	}
}

const grid_projects = {
	hidden: {},
	visible: {
		transition: {
			staggerChildren: 0.15,
		},
	}
}

const itens = {
	hidden: { opacity: 0, x: 100 },
	visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

export default function Projects(){

	const [ projects, setProjects ] = useState()

	useEffect(() => {
		async function fetchProjects(){
			const res = await fetch('/api/projects')
			const json = await res.json()

			setProjects(json);
		}

		fetchProjects()
	}, [])

	return(
		<motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} id="projects" className="flex flex-col px-15 md:px-20 gap-10 justify-center mt-10 min-h-screen">
			<motion.h1 variants={itens} className="border-l-2 border-primary pl-2 text-5xl float-start font-bold mb-4 text-shadow-md text-shadow-primary">
				Projects
			</motion.h1>

			<motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" variants={grid_projects} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }}>
				{projects?.map((project, index) => (
					<ProjectCard key={project.id ?? index} index={index} project={project} variants={itens}/>
				))}
			</motion.div>

			<AnimatedButton 
				className="mx-auto px-6 py-3 bg-primary uppercase font-bold text-white rounded-lg cursor-pointer transition-colors duration-300"
				variants={itens}
				text="See More Projects"
				onClick={() => window.location.href = "/projects"}
			/>	
		</motion.div>
	)
}