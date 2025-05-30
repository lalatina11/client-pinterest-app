import type { User } from "@/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";


type AuthStore = {
    currentUser: User | null,
    setCurrentUser: (newUser: User) => void
    removeCurrentUser: () => void
    updateCurrentUser: (updatedUser: User) => void,
}



export const useAuthStore = create((persist<AuthStore>(
    (set) => ({
        currentUser: null,
        setCurrentUser: (newUser: User) => set({ currentUser: newUser }),
        removeCurrentUser: () => set({ currentUser: null }),
        updateCurrentUser: (updatedUser: User) => set({ currentUser: updatedUser }),
    }), {
    name: "user",
    storage: createJSONStorage(() => sessionStorage)
})))

