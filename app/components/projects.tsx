'use client';

import Image from "next/image"
import { motion } from "motion/react"
import AnimatedButton from "./utils/AnimatedButton";

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

const projects = 
[
	{
		name: "Portfolio",
		description: "My personal portfolio website built with Next.js and Tailwind CSS.",
		technologies: ["Next.js", "Tailwind CSS", "TypeScript"],
		link: "https://github.com/yourusername/portfolio",
	},
	{
		name: "E-commerce Store",
		description: "An online store built with React and Node.js.",
		technologies: ["React", "Node.js", "Express", "MongoDB"],
		link: "https://github.com/yourusername/e-commerce-store",
	},
	{
		name: "Blog Platform",
		description: "A blogging platform built with Django and PostgreSQL.",
		technologies: ["Django", "PostgreSQL", "Bootstrap"],
		link: "",
	},
]

export default function Projects(){
	return(
		<motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} id="projects" className="flex flex-col px-15 md:px-20 gap-10 justify-center mt-10 min-h-screen">
			<motion.h1 variants={itens} className="border-l-2 border-primary pl-2 text-5xl float-start font-bold mb-4 text-shadow-md text-shadow-primary">
				Projects
			</motion.h1>

			<motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" variants={grid_projects} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }}>
				{projects.slice(0, 3).map((project, index) => (
					<motion.div
						key={index}
						variants={itens}
						className="cursor-pointer bg-foreground rounded-lg shadow-md shadow-primary hover:shadow-lg transition-shadow duration-300"
					>
						<Image 
							src="/teste.png"
							alt="a"
							width={400}
							height={225}
							className="mb-2 w-full h-36 rounded-t-lg border-b-2 border-secondary"
						/>
						<div className="p-6 text-accent">
							<h2 className="text-xl font-semibold mb-2">{project.name}</h2>
							<p className="opacity-75 mb-4">{project.description}</p>
							<div className="flex flex-wrap gap-4 mb-4">
								{project.technologies.map((tech, i) => (
									<span key={i} className="text-secondary text-xs uppercase">
										{tech}
									</span>
								))}
							</div>
							<a href={project.link} target="_blank" rel="noopener noreferrer" className="mb-4 text-primary decoration-0 font-bold uppercase text-sm float-right">
								Visit Project &gt;
							</a>
						</div>
					</motion.div>
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