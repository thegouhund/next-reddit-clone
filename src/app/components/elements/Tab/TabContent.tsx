import React from 'react'

const TabContent = ({ title, children }: { title: string, children: React.ReactNode }) => {
    return (
        <>
        <p className="text-lg border-t-2 border-r-2 border-l-2 rounded-lg rounded-b-none px-2 cursor-pointer transition-all hover:text-blue-500 hover:bg-slate-200 bg-slate-200">{title}</p>
        {children}
        </>
    )
}

export default TabContent