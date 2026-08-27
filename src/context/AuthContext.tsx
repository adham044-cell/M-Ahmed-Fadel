import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, AuthSession, Role } from '../types';
import { AuthService } from '../services/auth';
import { StorageService } from '../services/storage';
import { UsersService } from '../services/users';

interface AuthContextType {
  user: User | null;
  session: AuthSession | null;
  role: Role | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isStudent: boolean;
  login: (email: string, pass: string) => { success: boolean; session?: AuthSession; message?: string };
  register: (data: any) => { success: boolean; session?: AuthSession; errors?: Record<string, string>; message?: string };
  logout: () => void;
  refreshUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<AuthSession | null>(() => AuthService.getSession());
  const [user, setUser] = useState<User | null>(() => AuthService.getCurrentUser());

  const refreshUser = useCallback(() => {
    const currentSession = AuthService.getSession();
    setSession(currentSession);
    if (currentSession) {
      const u = UsersService.getUserById(currentSession.userId);
      setUser(u || null);
    } else {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    refreshUser();

    const handleStorageUpdate = () => {
      refreshUser();
    };

    window.addEventListener('the_sniper_storage_update', handleStorageUpdate);
    window.addEventListener('storage', handleStorageUpdate);

    return () => {
      window.removeEventListener('the_sniper_storage_update', handleStorageUpdate);
      window.removeEventListener('storage', handleStorageUpdate);
    };
  }, [refreshUser]);

  const login = (email: string, pass: string) => {
    const result = AuthService.login(email, pass);
    if (result.success && result.session) {
      setSession(result.session);
      const u = UsersService.getUserById(result.session.userId);
      setUser(u || null);
    }
    return result;
  };

  const register = (data: any) => {
    const result = AuthService.register(data);
    if (result.success && result.session) {
      setSession(result.session);
      const u = UsersService.getUserById(result.session.userId);
      setUser(u || null);
    }
    return result;
  };

  const logout = () => {
    AuthService.logout();
    setSession(null);
    setUser(null);
  };

  const isAuthenticated = !!session && !!user;
  const role = session ? session.role : null;
  const isAdmin = role === 'admin';
  const isStudent = role === 'student';

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        role,
        isAuthenticated,
        isAdmin,
        isStudent,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
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
