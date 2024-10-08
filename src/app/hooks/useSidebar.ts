/* eslint-disable no-unused-vars */
import { ReactNode } from "react";
import { create } from "zustand";

interface SidebarState {
  sidebar: ReactNode;
  setSidebar: (sidebar: ReactNode) => void;
}

const useSidebar = create<SidebarState>()((set) => ({
  sidebar: null,
  setSidebar: (sidebar: ReactNode) => set({ sidebar }),
}));

export default useSidebar;
