export type Theme = "dark" | "light" | "system"

export type ThemeProviderProps = {
    children: React.ReactNode
    defaultTheme?: Theme
    storageKey?: string
}

export type ThemeProviderState = {
    theme: Theme
    setTheme: (theme: Theme) => void
}

export interface TempItems {
    id: number
    imageUrl: string;
    width: number;
    height: number;
}

export interface Pin {
    _id: string;
    board: string;
    createdAt: string;
    description: string;
    height: number;
    link: string;
    media: string;
    tags: string[];
    title: string;
    updatedAt: string;
    user: User
    width: number;
    __v: number;
}

export interface User {
    avatar: string;
    name: string;
    username: string;
    _id: string;
}

export interface Comment {
    createdAt: string;
    description: string;
    pin: string;
    updatedAt: string;
    __v: number;
    _id: string;
    user: User;
}

export interface UserAuthForm {
    register: {
        username?: string;
        password?: string;
        email?: string;
        name?: string;
    },
    login: {
        identifier?: string;
        password?: string;

    },
    verify: {
        identifier?: string;
        otp?: string;
    }
}