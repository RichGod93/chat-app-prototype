import { createContext, ReactElement, useEffect, useState, FC } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    sendPasswordResetEmail,
} from 'firebase/auth';
import { auth } from '../config/firebase';
import { useRouter } from 'next/router';

interface User {
    uid: string;
    email: string;
    displayName?: string;
};

interface AuthContextProps {
    currentUser: User | null,
    signup: (email: string, password: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
};

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextProps>({
    currentUser: null,
    signup: async () => { },
    login: async () => { },
    logout: async () => { },
});

export const AuthProvider: FC<AuthProviderProps> = ({ children }): ReactElement | null => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser({
                    uid: user.uid,
                    email: user.email || '',
                    displayName: user.displayName || '',
                });
            } else {
                setCurrentUser(null);
            }
        });

        return unsubscribe;
    }, []);

    async function signup(email: string, password: string): Promise<void> {
        try {
            await createUserWithEmailAndPassword(auth, email, password);

        } catch (error: any) {
            console.log(error);
            throw error;
        }

    };

    async function login(email: string, password: string) {
        await signInWithEmailAndPassword(auth, email, password);
    };

    async function forgotPassword(email: any) {
        try {
            await sendPasswordResetEmail(auth, email, {
                url: 'http://localhost:3000/'
            });
        } catch (error: any) {
            console.log(error);
        }
    }

    async function logout() {
        await signOut(auth);
    };

    const value = {
        currentUser,
        signup,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};