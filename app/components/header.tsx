import Image from "next/image";

export default function Header(){
    return(
        <div className="flex items-center justify-between px-9 text-white">
            <Image 
                src="/logo_vermelha.png"
                width={100}
                height={100}
                alt="Logo"        
            />
            <nav>
                <ul className="flex space-x-9">
                    <li className="hover:text-foreground hover:border-b-2 hover:border-primary duration-100 text-sm font-bold"><a href="#hero">HERO</a></li>
                    <li className="hover:text-foreground hover:border-b-2 hover:border-primary duration-100 text-sm font-bold"><a href="#sobre">ABOUT</a></li>
                    <li className="hover:text-foreground hover:border-b-2 hover:border-primary duration-100 text-sm font-bold"><a href="#contato">CONTACT</a></li>
                    <li className="hover:text-foreground hover:border-b-2 hover:border-primary duration-100 text-sm font-bold"><a href="#portfolio">PORTFOLIO</a></li>
                </ul> 
            </nav>
        </div>
    )
}