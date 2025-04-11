/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import React, {createContext, useState} from 'react';

const API_URL = 'http://10.0.2.2:5000';

interface AuthContextData {
  token: string | null;
  isLoading: boolean;
  userId: string | null;
  signUp: (email: string, password: string) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const signUp = async (email: string, password: string): Promise<boolean> => {
    console.log('Sign up server log:', email, password);

    try {
      const res = await axios.post(`${API_URL}/api/auth/register`, {
        email,
        password,
      });

      console.log('Server response:', res.data);

      return !!res.data?.success; // cleaner way to return true/false
    } catch (error: any) {
      console.error('Sign up error:', error?.response?.data || error.message);
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    console.log('Login server log:', email, password);

    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });

      console.log('login Server response:', res.data);

      return !!res.data?.success; // cleaner way to return true/false
    } catch (error: any) {
      console.error(' Login error:', error?.response?.data || error.message);
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    return;
  };

  return (
    <AuthContext.Provider
      value={{token, isLoading, userId, signUp, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};
