import { Project } from "@/types";
import { motion, Variants } from "motion/react";
import Image from "next/image";

export default function ProjectCard({ index, variants, project} : {index: number, variants: Variants, project: Project}){
    return(
        <motion.div
        	key={index}
        	variants={variants}
        	className="cursor-pointer bg-foreground rounded-lg shadow-md shadow-primary hover:shadow-lg transition-shadow duration-300"
        >
        	<Image 
        		src={`${project.image_url}`}
        		alt="a"
        		width={400}
        		height={225}
        		className="mb-2 w-full h-36 rounded-t-lg border-b-2 border-secondary"
        	/>
        	<div className="p-6 text-accent">
        		<h2 className="text-xl font-semibold mb-2">{project.name}</h2>
        		<p className="opacity-75 mb-4 text-xs">{project.description}</p>
        		<div className="flex flex-wrap gap-4 mb-4">
        			{project.project_techs?.map((tech, i) => (
        				<span key={i} className="text-secondary text-xs uppercase">
        					{tech.techs?.name}
        				</span>
        			))}
        		</div>
        		<a href={project.link} target="_blank" rel="noopener noreferrer" className="mb-4 text-primary decoration-0 font-bold uppercase text-sm float-right">
        			Visit Project &gt;
        		</a>
        	</div>
        </motion.div>
    )
}

