"use client"
import { User } from "@prisma/client"
import axios from "axios"
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react"
import { getCookie } from 'cookies-next';

interface UserStateType {
    loading: boolean
    data: User | null,
    error: string | null
}
interface AuthState extends UserStateType {
    setAuthState: Dispatch<SetStateAction<UserStateType>>
}

const AuthenticationContext = createContext<AuthState>({ data: null, error: null, loading: false, setAuthState: () => { } })

const AuthContext = ({ children }: { children: ReactNode }) => {
    const [authState, setAuthState] = useState<UserStateType>({
        loading: true,
        error: null,
        data: null
    })

    const fetchUser = async () => {
        setAuthState({
            ...authState,
            loading: true,
        });

        try {
            const jwt = getCookie("jwt");
            if (!jwt) {
                return setAuthState({
                    ...authState,
                    loading: false,
                    data: null,
                    error: null,
                });
            }
            const response = await axios.get<{me:User}>("/api/auth/me", {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });

            axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`

            setAuthState({ ...authState, data: response.data.me, loading: false });

        } catch (error) {
            setAuthState({
                ...authState,
                loading: false,
            });
        }
    };

    useEffect(() => {
        fetchUser()
    }, [])

    return (
        <AuthenticationContext.Provider value={{ ...authState, setAuthState }}>{children}</AuthenticationContext.Provider>
    )
}

export function useUser() {
    const user = useContext(AuthenticationContext)
    return user
}

export default AuthContext