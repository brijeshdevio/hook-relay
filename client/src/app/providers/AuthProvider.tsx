import { createContext, type ReactNode } from "react";
import { useMe } from "@/features/user/user.hooks";

export const AuthContext = createContext({})

export function AuthProvider({ children }: { children: ReactNode }) {
    const { data, isPending, isSuccess } = useMe();
    return <AuthContext.Provider
        value={{
            user: data,
            isLoading: isPending,
            isAuthenticated: isSuccess && data,
        }}
    >{children}</AuthContext.Provider>
}
