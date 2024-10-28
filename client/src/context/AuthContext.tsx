'use client'
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useState, useEffect } from 'react';
interface AuthContextType {
    token: string | null; // Token akses
    refreshToken: string | null; // Menambahkan refresh token ke context
    login: (token: string, refreshToken: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const [refreshToken, setRefreshToken] = useState<string | null>(null);
    const router = useRouter()

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedRefreshToken = localStorage.getItem('refreshToken'); 
        if (storedToken) {
            setToken(storedToken);
        }
        if (storedRefreshToken) {
            setRefreshToken(storedRefreshToken);  
        }
    }, []);

    const login = (token: string, refreshToken: string) => {
        setToken(token);
        setRefreshToken(refreshToken);
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);  
    };

    const logout = () => {
        setToken(null);
        setRefreshToken(null);  
        router.push('/login')
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
    };

    return (
        <AuthContext.Provider value={{ token, refreshToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
