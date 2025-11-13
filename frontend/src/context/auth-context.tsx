import { createContext, useContext, useState, ReactNode, useEffect, useRef, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { api } from "@/lib/api"

type User = {
    id: string
    email: string
    name: string
    role: string
}

type AuthContextType = {
    user: User | null
    login: (email: string, password: string) => Promise<void>
    logout: () => void
    isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()
    const isMounted = useRef(true)
    
    // Store the navigate function in a ref to avoid re-renders
    const navigateRef = useRef(navigate)
    
    // Update the ref when navigate changes
    useEffect(() => {
        navigateRef.current = navigate
    }, [navigate])
    
    const checkAuth = useCallback(async () => {
        const token = localStorage.getItem("token")
        if (token) {
            try {
                const { data } = await api.get("/auth/me")
                if (isMounted.current) {
                    setUser(data.user)
                }
            } catch (error) {
                localStorage.removeItem("token")
                if (isMounted.current && navigateRef.current) {
                    navigateRef.current("/login")
                }
            }
        } else if (isMounted.current) {
            navigateRef.current("/login")
        }
        
        if (isMounted.current) {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        checkAuth()
        
        return () => {
            isMounted.current = false
        }
    }, [checkAuth])

    const login = async (email: string, password: string) => {
        try {
            const { data } = await api.post("/auth/login", { email, password })
            localStorage.setItem("token", data.accessToken)
            setUser(data.user)
            navigateRef.current("/dashboard")
        } catch (error: unknown) {
            console.error("Login failed:", error)
            const errorMessage = error instanceof Error ? error.message : 'Login failed. Please check your credentials.'
            throw new Error(errorMessage)
        }
    }

    const logout = () => {
        localStorage.removeItem("token")
        setUser(null)
        navigateRef.current("/login")
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {!isLoading ? children : null}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}