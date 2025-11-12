import { createContext, useContext, useState, ReactNode, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { api } from "../lib/api/api"

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
    const navigateRef = useRef<ReturnType<typeof useNavigate>>()
    
    // This effect runs after the component mounts and has access to the router context
    const navigate = useNavigate()
    
    useEffect(() => {
        // Store the navigate function in a ref
        navigateRef.current = navigate
        
        const checkAuth = async () => {
            const token = localStorage.getItem("token")
            if (token) {
                try {
                    const { data } = await api.get("/auth/me")
                    setUser(data.user)
                } catch (error) {
                    localStorage.removeItem("token")
                    // Only navigate if we have access to the router
                    if (navigateRef.current) {
                        navigateRef.current("/login")
                    }
                }
            }
            setIsLoading(false)
        }

        checkAuth()
    }, [])

    const login = async (email: string, password: string) => {
        try {
            const { data } = await api.post("/auth/login", { email, password })
            localStorage.setItem("token", data.accessToken)
            setUser(data.user)
            if (navigateRef.current) {
                navigateRef.current("/dashboard")
            }
        } catch (error) {
            console.error("Login failed:", error)
            throw new Error("Login failed. Please check your credentials.")
        }
    }

    const logout = () => {
        localStorage.removeItem("token")
        setUser(null)
        if (navigateRef.current) {
            navigateRef.current("/login")
        }
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
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