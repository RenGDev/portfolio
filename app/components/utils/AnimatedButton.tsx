import { motion, Variants } from "motion/react"

export default function AnimatedButton({
    className, 
    variants, 
    text,
    onClick,
    type = "button"
} : {
    className?: string; 
    variants?: Variants; 
    text: string;
    onClick?: () => void;
    type?: 'reset' | 'submit' | 'button' | undefined; 
}){
    return(
        <motion.button
		        type={type}
				variants={variants}
				whileHover={{
  				  scale: 1.1,
  				  transition: { duration: 0.1 }
  				}}
				whileTap={{
  				  scale: 0.95,
  				  transition: { duration: 0.1 }
  				}}
  				transition={{ duration: 0.5 }}
				className={className}
				onClick={onClick}
			>
				{text} &gt;
		</motion.button>
    )
}