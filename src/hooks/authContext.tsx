"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Apiservices from '@/apiservices/apiServices';

type UserType = {
    id: number;
    role: number;
    [key: string]: any;
};

type AuthContextType = {
    user: any | null;
    setUser: React.Dispatch<React.SetStateAction<any | null>>;
    loading: boolean;
    login: (key: string) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const setKeyWithExpiration = (key: string, expirationHours: number) => {
    const now = new Date();
    const expirationTime = now.getTime() + expirationHours * 60 * 60 * 1000;
    const data = { key, expirationTime };
    localStorage.setItem('token', JSON.stringify(data));
};

export const getKeyWithExpiration = (): string | null => {
    const data = localStorage.getItem('token');
    if (!data) return null;

    const { key, expirationTime } = JSON.parse(data);
    const now = new Date().getTime();

    if (now > expirationTime) {
        localStorage.removeItem('token');
        return null;
    }

    return key;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const router = useRouter();
    const pathname = usePathname();
    const [user, setUser] = useState<any | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const key = getKeyWithExpiration();
        if (!key) {
            if (pathname.startsWith('/movies')) {
                router.push('/login');
            }
            setLoading(false);
        } else {
            Apiservices.profile()
                .then((result: any) => {
                    if (result?.success) {
                        setUser(result.data);
                    }
                })
                .catch((error) => {
                    router.push('/login');
                })
                .finally(() => setLoading(false));
        }
    }, [router, pathname]);

    const login = (key: string) => {
        setKeyWithExpiration(key, 24);
    };

    const logout = () => {
        router.push('/login');

        localStorage.removeItem('token');
        setUser(null);
    };

    const contextValue: AuthContextType = {
        user,
        setUser,
        loading,
        login,
        logout,
    };

    return loading ? (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 " >
            <h1 className="font-bold"> Loading...</h1>
        </div>
    ) : (
        <AuthContext.Provider value={contextValue} > {children} </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
