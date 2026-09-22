import AnimatedButton from "@/app/components/utils/AnimatedButton"
import Toast from "@/app/components/utils/Toast"
import { X } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"

interface Inputs{
    name: string,
    type: string,
    label: string
}

const container = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
        },
    }
}

const button = {
    hidden: {x: 100, opacity: 0},
    visible: {x: 0, opacity: 1}
}
export default function FormCreate({
    inputs, action, buttonText, onSuccess
} : {
    inputs: Inputs[], action: string, buttonText:string, onSuccess?: () => void
}){
    
    const [isOpen, setIsOpen] = useState(false)
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('')
    
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const fileInput = inputs.find((input) => input.type === 'file');
        let link: string | undefined;

        if (fileInput) {
            const file = formData.get(fileInput.name) as File;
        
            if (!file || file.size === 0) {
                setToastMessage('Selecione um arquivo');
                setShowToast(true);
                return;
            }
        
            const fileData = new FormData();
            fileData.append('file', file);
        
            const uploadRes = await fetch('/api/upload', {
                method: 'POST',
                body: fileData,
            });
        
            if (!uploadRes.ok) {
                setToastMessage('Erro ao enviar arquivo');
                setShowToast(true)
                return;
            }
        
            const uploadJson = await uploadRes.json();
            link = uploadJson.link;
        }
      
        const data: Record<string, FormDataEntryValue | boolean> = Object.fromEntries(formData.entries());

        inputs.forEach((input) => {
            if (input.type === 'checkbox') {
                data[input.name] = formData.get(input.name) === 'on';
            }
        });

        if (link && fileInput) {
            data.image_url = link;
            delete data[fileInput.name];
        }
      
        const res = await fetch(action, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
      
        if (res.ok) {
            const json = await res.json();
            setIsOpen(false);
            onSuccess?.();
            setToastMessage(json.message);
            setShowToast(true);
        }
    }
    
    return(
        <motion.div variants={container} initial="hidden" animate="visible">
            <AnimatedButton variants={button} className={`relative cursor-pointer float-left text-sm p-4 bg-primary text-accent rounded-lg font-bold uppercase ${isOpen ?? 'hidden'}`} text={buttonText} onClick={() => setIsOpen(!isOpen)}/>
            <AnimatePresence>
                { isOpen && (
                    <motion.div 
                        className="fixed top-0 p-6 right-0 shadow-md shadow-primary h-screen w-80 bg-background z-40 flex flex-col gap-8 overflow-y-scroll"
                        initial={{ x: 100 }}
                        animate={{ x: 0 }}
                        exit={{ x: 400 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30  }}
                    >
                        <button onClick={() => setIsOpen(!isOpen)}>
                            <X className="text-primary cursor-pointer" />
                        </button>
                        <form className="flex flex-col gap-3 p-2" onSubmit={handleSubmit}>
                            {
                                inputs.map((input, index) => {
                                    return(
                                        <div key={index} className="flex flex-col gap-1">
                                            
                                            {
                                                input.type != 'textarea' ?(

                                                    input.type != 'checkbox' ?(

                                                        <>
                                                            <label htmlFor={input.name}>{input.label}</label>
                                                            <input 
                                                                 id={input.name}
                                                                 type={input.type} 
                                                                 name={input.name} 
                                                                 className="bg-background px-2.5 py-3 rounded-md border-[0.5px] border-primary"
                                                                 placeholder={input.name}
                                                            />
                                                        </>
                                                    ):(
                                                        <label className="inline-flex items-center me-5 cursor-pointer">
                                                            <input type={input.type} className="sr-only peer" />
                                                            <div className="relative w-9 h-5 bg-neutral-quaternary rounded-full peer peer-focus:ring-4 peer-focus:ring-primary dark:peer-focus:ring-primary dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary dark:peer-checked:bg-primary"></div>
                                                            <span className="select-none ms-3 text-sm font-medium text-heading">{input.label}</span>
                                                        </label>
                                                    )
                                                ) : (
                                                    <>
                                                        <label htmlFor={input.name}>{input.label}</label>
                                                        <textarea 
                                                            id={input.name} 
                                                            name={input.name} 
                                                            className="bg-background px-2.5 py-3 rounded-md border-[0.5px] border-primary"
                                                            placeholder={input.name}
                                                        />
                                                    </>
                                                )
                                            }
                                        </div>
                                    )
                                })
                            }

                            <AnimatedButton className="cursor-pointer float-left text-sm p-4 bg-primary text-accent rounded-lg font-bold uppercase" text="Save" type="submit"/>
                        </form>
                    </motion.div>
                    )
                }
            </AnimatePresence>

            <Toast message={toastMessage} show={showToast} onClose={() => setShowToast(false)} />
        </motion.div>
    )
}