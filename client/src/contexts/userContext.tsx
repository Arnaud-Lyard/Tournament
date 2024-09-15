'use client';
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { HttpService } from '@/services';
import { IResponse } from '@/types/api';

interface IUserContext {
  isLoggedIn: boolean;
  name: string;
  email: string;
  role: string;
  notification: boolean;
  loading: boolean;
  avatar: string;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  fetchUserDetails: () => Promise<void>;
}

const UserContext = createContext<IUserContext | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [notification, setNotification] = useState<boolean>(false);
  const [loading, setIsloading] = useState(true);
  const [avatar, setAvatar] = useState<string>('');

  const http = new HttpService();

  const fetchUserDetails = async () => {
    try {
      const response = await http.service().get<IResponse>('/users/me');
      if (response.data.isConnect === true) {
        setName(response.data.informations.username);
        setEmail(response.data.informations.email);
        setRole(response.data.informations.role);
        setAvatar(response.data.informations.avatar);
        setNotification(response.data.informations.notification === true);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const response = await http.service().get<IResponse>('/users/me');
        setIsLoggedIn(true);
        if (response.data.isConnect === true) {
          setIsLoggedIn(true);
          setName(response.data.informations.username);
          setEmail(response.data.informations.email);
          setRole(response.data.informations.role);
          setAvatar(response.data.informations.avatar);
          if (response.data.informations.notification === true) {
            setNotification(true);
          }
        } else {
          setIsLoggedIn(false);
        }
        setIsloading(false);
      } catch (error) {
        setIsLoggedIn(false);
      }
    };

    checkUserLoggedIn();
  }, []);

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        name,
        email,
        notification,
        role,
        loading,
        avatar,
        setIsLoggedIn,
        fetchUserDetails,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
