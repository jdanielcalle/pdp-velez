import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, User as FirebaseUser } from 'firebase/auth';
import { firebaseApp } from '../firebase';

interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  firstName: string | null;
}

interface AuthContextType {
  user: User | null;
  signInWithGoogle: () => Promise<void>;
  signOutUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  signInWithGoogle: async () => {},
  signOutUser: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const auth = getAuth(firebaseApp);

  const formatUser = (fbUser: FirebaseUser): User => {
    return {
      uid: fbUser.uid,
      email: fbUser.email,
      displayName: fbUser.displayName,
      firstName: fbUser.displayName ? fbUser.displayName.split(' ')[0] : null,
    };
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        const formatted = formatUser(result.user);
        setUser(formatted);
        localStorage.setItem('user', JSON.stringify(formatted));
      }
    } catch (error) {
      console.error('Google sign-in error:', error);
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      setUser(null);
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Sign-out error:', error);
    }
  };

  useEffect(() => {
    // Revisar si hay user en localStorage
    const stored = localStorage.getItem('user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
    // Escuchar cambios en auth
    const unsubscribe = auth.onAuthStateChanged((fbUser) => {
      if (fbUser) {
        const formatted = formatUser(fbUser);
        setUser(formatted);
        localStorage.setItem('user', JSON.stringify(formatted));
      } else {
        setUser(null);
        localStorage.removeItem('user');
      }
    });
    return () => unsubscribe();
  }, [auth]);

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, signOutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
