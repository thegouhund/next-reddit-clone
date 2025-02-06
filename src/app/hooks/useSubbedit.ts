/* eslint-disable no-unused-vars */
import { create } from "zustand";
import { SubbeditWithFlair } from "../types/subbedit";

interface SubbeditState {
  subbedit: SubbeditWithFlair | null;
  setSubbedit: (subbedit: SubbeditWithFlair | null) => void;
}

const useSubbedit = create<SubbeditState>()((set) => ({
  subbedit: null,
  setSubbedit: (value: SubbeditWithFlair | null) => set({ subbedit: value }),
}));

export default useSubbedit;
