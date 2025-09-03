
import React, { createContext, useState, ReactNode } from 'react';
import { User, UserRole } from '../types';
import { MOCK_USERS } from '../constants';

interface AuthContextType {
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user] = useState<User | null>(MOCK_USERS.find(u => u.role === UserRole.GURU) || null);

    const login = (userData: User) => {
        // Fungsi login dihapus sesuai permintaan.
    };

    const logout = () => {
        // Fungsi logout dihapus sesuai permintaan.
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};