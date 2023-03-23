import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/router';
import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
    onAuthStateChanged,
    User,
} from 'firebase/auth';
import { auth } from '@/config/firebase';

type AuthContextType = {
    user: User | null;
    loading: boolean;
    signUp: (email: string, password: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
    logout: () => Promise<void>;
};

type AuthProviderProps = {
    children: ReactNode;
};

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    signUp: async () => { },
    login: async () => { },
    resetPassword: async () => { },
    logout: async () => { },
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, (user) => {
    //         setUser(user);
    //         setLoading(false);
    //         if (!user) {
    //             router.push('/');
    //         }
    //     });

    //     return () => unsubscribe();
    // }, []);

    const signUp = async (email: string, password: string) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // if (userCredential.user) {
        //     await sendEmailVerification(userCredential.user);
        // }
    };

    const login = async (email: string, password: string) => {
        await signInWithEmailAndPassword(auth, email, password);
    };

    const resetPassword = async (email: string) => {
        await sendPasswordResetEmail(auth, email, {
            url: 'http://localhost:3000',
        });
    };

    const logout = async () => {
        await signOut(auth);
        localStorage.clear();
        window.location.pathname = '/';
    };

    return (
        <AuthContext.Provider value={{ user, loading, signUp, login, resetPassword, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
