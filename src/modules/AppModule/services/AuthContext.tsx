import React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  setPersistence,
  browserSessionPersistence,
  onAuthStateChanged,
  User,
  UserCredential,
  browserLocalPersistence,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/modules/AppModule/services/firebase-config";

type AuthObject = {
  currentUser: User | null | undefined;
  signup: (email: string, password: string, nickname: string) => Promise<void>;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  setSessionPersistence: (isRememberMeOn: boolean) => Promise<void>;
};

const AuthContext = createContext<AuthObject>({} as AuthObject);

export const useAuth = () => {
  return useContext(AuthContext);
};

interface Props {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const signup = async (email: string, password: string, nickname: string) => {
    return createUserWithEmailAndPassword(auth, email, password).then((res) => {
      updateProfile(res.user, { displayName: nickname });
    });
  };

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const setSessionPersistence = (isRememberMeOn: boolean) => {
    if (!isRememberMeOn) return setPersistence(auth, browserSessionPersistence);
    return setPersistence(auth, browserLocalPersistence);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    setSessionPersistence,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
