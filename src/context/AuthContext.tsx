/* eslint-disable @typescript-eslint/no-unused-vars */
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';
import { ActivityIndicator } from 'react-native';

const API_URL = 'http://10.0.2.2:5000';

interface AuthContextData {
  token: string | null;
  isLoading: boolean;
  userId: string | null;
  signUp: (email: string, password: string) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  checkAuth: () => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = async () => {
    try {
      const istoken = await AsyncStorage.getItem('token');
      const isuserId = await AsyncStorage.getItem('userId');
      if (istoken && isuserId) {
        setToken(token);
        setUserId(userId);
        setIsAuthenticated(true);
        return true;
      } else return false;
    } catch (error) {
      console.error('Error checking authentication status:', error);
      return false;
    } finally{
      setIsLoading(false)
    }
  };

  useEffect(() => {
    checkAuth();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const signUp = async (email: string, password: string): Promise<boolean> => {
    console.log('Sign up server log:', email, password);

    try {
      const res = await axios.post(`${API_URL}/api/auth/register`, {
        email,
        password,
      });

      console.log('Server response:', res.data);
  
      if (!res.data?.success) return false;

      const {token:userToken, userId : userUserId} = res.data;

      await AsyncStorage.setItem('token', userToken);
      await AsyncStorage.setItem('userId', userUserId);

      setToken(userToken);
      setUserId(userUserId);
      setIsAuthenticated(true);

      return true; // cleaner way to return true/false
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

      if (!res.data?.success) return false;

      const {token:userToken, userId : userUserId} = res.data;

      await AsyncStorage.setItem('token', userToken);
      await AsyncStorage.setItem('userId', userUserId);

      setToken(userToken);
      setUserId(userUserId);
      setIsAuthenticated(true);

      return true; // cleaner way to return true/false
    } catch (error: any) {
      console.error(' Login error:', error?.response?.data || error.message);
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    setToken(null);
    setUserId(null);
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('userId');
    setIsAuthenticated(false);
  };

  if(isLoading) return <ActivityIndicator size={'large'} color={'#FF914D'}/>

  return (
    <AuthContext.Provider
      value={{token, isLoading, userId, signUp, login, logout,isAuthenticated,checkAuth}}>
      {children}
    </AuthContext.Provider>
  );
};
