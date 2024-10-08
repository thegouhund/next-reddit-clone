/* eslint-disable no-unused-vars */
import { create } from "zustand";

interface LoginPopupState {
  showLoginPopup: boolean;
  setShowLoginPopup: (value: boolean) => void;
}

const useLoginPopup = create<LoginPopupState>()((set) => ({
  showLoginPopup: false,
  setShowLoginPopup: (value: boolean) => set({ showLoginPopup: value }),
}));

export default useLoginPopup;
