import { Pagination } from "@/types";
import { motion } from "motion/react";

export default function Table(
    { headers, items, pagination, setPage, setIsOpen, setId } 
        : 
    { 
        headers: String[], 
        items?: any[], 
        pagination?: Pagination, 
        setPage: (page: number) => void, 
        setIsOpen?: (isOpen: boolean) => void,
        setId?: (id: number) => void 
    }
){
    
    function generateTabs() {
        const tabs: React.ReactNode[] = [];
        const page = pagination?.page ?? 1;
        const totalPages = pagination?.total_pages ?? 0;
        const delta = 1;

        const range: (number | 'dots')[] = [];
        const rangeWithDots: (number | 'dots')[] = [];

        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 ||                      
                i === totalPages ||      
                (i >= page - delta && i <= page + delta) 
            ) {
                range.push(i);
            }
        }

        let lastNumber: number | null = null;
        for (const i of range) {
            if (typeof i === 'number') {
                if (lastNumber !== null) {
                    if (i - lastNumber === 2) {
                        rangeWithDots.push(lastNumber + 1);
                    } else if (i - lastNumber > 2) {
                        rangeWithDots.push('dots');
                    }
                }
                rangeWithDots.push(i);
                lastNumber = i;
            }
        }

      rangeWithDots.forEach((item, index) => {
        if (item === 'dots') {
          tabs.push(
            <li key={`dots-${index}`}>
              <span className="flex items-center justify-center text-accent bg-neutral-900 box-border border-y-2 border-primary font-medium text-sm w-9 h-9">
                ...
              </span>
            </li>
          );
        } else {
          const isActive = item === page;
          tabs.push(
            <li key={item}>
                <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(item);
                    }}
                    className={`flex items-center justify-center box-border border-2 border-primary font-medium text-sm w-9 h-9 focus:outline-none ${
                      isActive
                        ? 'bg-neutral-950 text-secondary'
                        : 'bg-neutral-900 text-accent hover:bg-neutral-950 hover:text-secondary'
                    }`}
                >
                    {item}
                </a>
            </li>
          );
        }
      });

      return tabs;
    }

    function nextPage(){
        const nextPage = (pagination?.page ?? 1) + 1
        const totalPages = (pagination?.total_pages ?? 0)

        if((nextPage) <= totalPages){
            setPage(nextPage)
        }
    }

    function previousPage(){
        const actualPage = (pagination?.page ?? 1)
        const previousPage = (pagination?.page ?? 1) - 1

        if((previousPage < actualPage) && (previousPage > 0)){
            setPage(previousPage)
        }
    }

    return (
        <motion.div 
            className="relative shadow-xs rounded-lg border-2 border-primary overflow-x-scroll"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex items-center  justify-end flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 p-4">
                <label htmlFor="input-group-1" className="sr-only">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/></svg>
                    </div>
                    <input type="text" id="input-group-1" className="block w-full max-w-96 ps-9 pe-3 py-2 bg-neutral-secondary-medium border border-primary text-secondary text-sm rounded-lg focus:ring-brand focus:border-brand shadow-xs placeholder:text-body" placeholder="Search" />
                </div>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-accent">
                <thead className="text-sm bg-foreground border-b border-neutral-950">
                    <tr>
                        {
                            headers.map((header, index) => {
                                return(
                                    <th key={index} scope="col" className="px-6 py-3 font-medium">
                                        {header}
                                    </th>
                                )
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        items?.map((item, index) => {
                            return(
                                <tr key={index} className="bg-background cursor-pointer border-b border-neutral-800 hover:bg-neutral-950" onClick={() => { setIsOpen?.(true); setId?.(item.id); }}>
                                    {
                                        Object.entries(item).map(([key, value]) => (
                                            key != 'id' &&
                                                <td key={key} scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                                                    {String(value)}
                                                </td>
                                        ))
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <nav className="flex items-center bg-foreground flex-column flex-wrap md:flex-row justify-between p-4" aria-label="Table navigation">
                <span className="text-sm font-normal text-accent mb-4 md:mb-0 block w-full md:inline md:w-auto">
                    Showing 
                    <span className="font-semibold text-secondary"> {pagination?.page}-{pagination?.total_per_page} </span> 
                    of 
                    <span className="font-semibold text-secondary"> {pagination?.total} </span>
                </span>
                <ul className="flex -space-x-px text-sm">
                    <li>
                        <a href="#" onClick={() => previousPage()} className="flex items-center justify-center text-accent bg-neutral-900 box-border border-2 border-primary hover:bg-neutral-950 hover:text-secondary font-medium rounded-s-lg text-sm px-3 h-9 focus:outline-none">Previous</a>
                    </li>

                    { generateTabs() }

                    <li>
                        <a href="#" onClick={() => nextPage()} className="flex items-center justify-center text-accent bg-neutral-900 box-border border-2 border-primary hover:bg-neutral-950 hover:text-secondary font-medium rounded-e-lg text-sm px-3 h-9 focus:outline-none">Next</a>
                    </li>
                </ul>
            </nav>
        </motion.div>

    )
}