import React from 'react'

const Tab = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="max-[900px]:flex hidden gap-1 mb-4 border-b-2 ">
            {children}
        </div>
    )
}

export default Tab