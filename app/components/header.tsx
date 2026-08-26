import Image from "next/image";

export default function Header(){
    return(
        <div className="flex items-center justify-between px-9 text-white sticky top-0 z-50 h-20">
            <Image 
                src="/logo_vermelha.png"
                width={100}
                height={100}
                alt="Logo"        
            />
            <nav>
                <ul className="flex space-x-9">
                    <li className="hover:text-foreground duration-100 text-sm font-bold relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:ease-in after:duration-200 hover:after:w-full"><a href="#hero">HERO</a></li>
                    <li className="hover:text-foreground duration-100 text-sm font-bold relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:ease-in after:duration-200 hover:after:w-full"><a href="#sobre">ABOUT</a></li>
                    <li className="hover:text-foreground duration-100 text-sm font-bold relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:ease-in after:duration-200 hover:after:w-full"><a href="#contato">CONTACT</a></li>
                    <li className="hover:text-foreground duration-100 text-sm font-bold relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:ease-in after:duration-200 hover:after:w-full"><a href="#portfolio">PORTFOLIO</a></li>
                </ul> 
            </nav>
        </div>
    )
}