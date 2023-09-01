"use client"
import React, { createContext, ReactNode, useState, useContext, useEffect } from 'react';
import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider, User } from 'firebase/auth';
import { auth } from '@/firebase/firebase';
import { setUserId } from 'firebase/analytics';
import { useRouter } from 'next/navigation';

interface IAuth {
    user: User | null;
    signUp?: (email: string, password: string) => Promise<void>;
    signIn?: (email: string, password: string) => Promise<void>;
    logOut(): void;
    googleSignIn: ()=> Promise<void>;
    error?: string | null;
    loading?: boolean;
  }
  interface AuthProviderProps {
    children: React.ReactNode;
  }

export const AuthContext = createContext<IAuth>({
    user: null,
    signUp: async () => {},
    signIn: async () => {},
    logOut: () => {},
    googleSignIn: async () => {},
    error: null,
    loading: false,
  })


  


export const AuthProvider = ({children}:AuthProviderProps) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState(null)
    const [initialLoading, setInitialLoading] = useState(true)
    const router = useRouter();

    const googleSignIn= async ()=>{
        const provider = new GoogleAuthProvider();
       await signInWithPopup(auth, provider)
    }

    const logOut = async ()=>{
        await signOut(auth)
    }
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
        setUser(currentUser)
      })
      setLoading(false)
      
      return () => unsubscribe();
    }, [user])
    
    return (
        <AuthContext.Provider value={{user, googleSignIn, logOut, loading}}>{loading ? "loading.." : children}</AuthContext.Provider>
    )

}

export const useAuth = ()=>{
    return useContext(AuthContext)
}