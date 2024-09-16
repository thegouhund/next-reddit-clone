"use client"
import { useSidebar } from "@/app/context/useSidebar";


const Sidebar = () => {
    const { content } = useSidebar();
    return (
        <aside className='h-full p-4 border border-gray-400 rounded w-[300px] min-w-[200px] max-[900px]:hidden'>
            {content}
        </aside>
    )
}

export default Sidebar