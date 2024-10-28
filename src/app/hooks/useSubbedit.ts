/* eslint-disable no-unused-vars */
import type { Subbedit } from "@prisma/client";
import { create } from "zustand";

interface SubbeditState {
  subbedit: Subbedit | null;
  setSubbedit: (subbedit: Subbedit | null) => void;
}

const useSubbedit = create<SubbeditState>()((set) => ({
  subbedit: null,
  setSubbedit: (value: Subbedit | null) => set({ subbedit: value }),
}));

export default useSubbedit;
