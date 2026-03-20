import { createContext, type ReactNode } from "react";
import { useMe } from "@/features/user/user.hooks";
import type { UserDto } from "@/features/user/user.types";

type AuthContext = {
    user: UserDto | null;
    isLoading: boolean;
    isAuthenticated: boolean;
};

const initialState = {
    user: null,
    isLoading: false,
    isAuthenticated: false,
};

export const AuthContext = createContext<AuthContext>(initialState)

export function AuthProvider({ children }: { children: ReactNode }) {
    const { data, isPending, isSuccess } = useMe();
    return <AuthContext.Provider
        value={{
            user: data,
            isLoading: isPending,
            isAuthenticated: isSuccess && !!data,
        }}
    >{children}</AuthContext.Provider>
}
