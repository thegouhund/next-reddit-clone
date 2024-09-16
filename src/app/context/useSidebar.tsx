"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SidebarContextType {
    content: ReactNode;
    setContent: (content: ReactNode) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [content, setContent] = useState<ReactNode>(null);

    return (
        <SidebarContext.Provider value={{ content, setContent }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (context === undefined) {
        throw new Error('useSidebar must be used within a SidebarProvider');
    }
    return context;
};
