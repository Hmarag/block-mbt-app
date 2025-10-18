import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

// 1. Ορίζουμε τη δομή του Context
interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

// 2. Δημιουργούμε το Context με μια αρχική τιμή
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. Δημιουργούμε τον "Provider" - το component που θα "αγκαλιάσει" την εφαρμογή μας
export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(sessionStorage.getItem('authToken'));

  const login = (newToken: string) => {
    setToken(newToken);
    sessionStorage.setItem('authToken', newToken); // Αποθηκεύουμε το token στο sessionStorage
  };

  const logout = () => {
    setToken(null);
    sessionStorage.removeItem('authToken');
  };

  const value = { token, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// 4. Δημιουργούμε ένα custom hook για εύκολη πρόσβαση στο context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}