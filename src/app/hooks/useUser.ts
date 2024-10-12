/* eslint-disable no-unused-vars */
import { create } from "zustand";
import type { User as UserModel } from "@prisma/client";

interface UserState {
  user: UserModel | null;
  setUser: (user: UserModel | null) => void;
}

const useUser = create<UserState>()((set) => ({
  user: null,
  setUser: (user: UserModel | null) => set({ user }),
}));

export default useUser;
