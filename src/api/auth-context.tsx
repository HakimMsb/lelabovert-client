import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { login, logout, register } from "./auth";
import { AccountDto } from "./lelabovert-api-generated-client";
import { accountApiClient, JwtTokenPayload } from "./api-clients";
import { jwtDecode } from "jwt-decode";

interface AuthContextProps {
    userProfile: AccountDto | null;
    isLoggedIn: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
  }
  
  const AuthContext = createContext<AuthContextProps | undefined>(undefined);
  
  const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => !!localStorage.getItem('jwt'));
    const [userProfile, setUserProfile] = useState<AccountDto | null>(null);

    useEffect(() => {
      const validateToken = async () => {
        const token = localStorage.getItem('jwt');
        if (token) {
            const decodedToken = jwtDecode<JwtTokenPayload>(token);
            if (decodedToken.isLoggedOut || decodedToken.expiration * 1000 < Date.now()) {
                setIsLoggedIn(false);
                localStorage.removeItem('jwt');
            } else {
                const userProfile = await accountApiClient.getAuthenticatedAccount();
                setUserProfile(userProfile.data);
            }
        }
    };

    if (isLoggedIn) {
        validateToken();
    }

    const intervalId = setInterval(validateToken, 15 * 60 * 1000); // Validate every 15 minutes

    return () => clearInterval(intervalId);
    }, [isLoggedIn])
  
    const handleLogin = async (email: string, password: string) => {
      await login(email, password);
      setIsLoggedIn(true);
    };
  
    const handleLogout = async () => {
      await logout();
      setIsLoggedIn(false);
    };
  
    const handleRegister = async (email: string, password: string) => {
      await register(email, password);
      setIsLoggedIn(true);
    };
  
    return (
      <AuthContext.Provider value={{ userProfile, isLoggedIn, login: handleLogin, logout: handleLogout, register: handleRegister }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };
  
  export { AuthProvider, useAuth };