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

type TextOption = {
    text: string;
    fontSize: number;
    color: string;
    top: number;
    left: number;
}

export interface CanvasOption {
    height: number;
    orientation: string;
    size: string;
    backgroundColor: string;
}

export type EditorStore = {
    selectedLayer: "canvas" | "text"
    textOption: TextOption
    canvasOption: CanvasOption
    setSelectedLayer: (newLayer: EditorStore['selectedLayer']) => void
    setTextOption: (newOption: TextOption) => void
    addText: () => void
    setCanvasOption: (newCanvasOpt: CanvasOption) => void
}

export const useEditorStore = create<EditorStore>((set) => ({
    selectedLayer: "canvas",
    textOption: {
        text: "",
        fontSize: 48,
        color: "#000000",
        top: 0,
        left: 0
    },
    canvasOption: {
        height: 0,
        orientation: "",
        size: "original",
        backgroundColor: "#008080"
    },
    setSelectedLayer: (newLayer: EditorStore['selectedLayer']) => set({ selectedLayer: newLayer }),
    setTextOption: (newOption: EditorStore['textOption']) => set({ textOption: newOption }),
    addText: () => set(prev => ({ textOption: { ...prev.textOption, text: "Add Text" } })),
    setCanvasOption: (newCanvasOpt: CanvasOption) => set({ canvasOption: newCanvasOpt })
}))