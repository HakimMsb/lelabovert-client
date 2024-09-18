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

    // Function to validate the token and handle expiration
    const validateToken = async () => {
        const token = localStorage.getItem('jwt');
        if (token) {
            const decodedToken = jwtDecode<JwtTokenPayload>(token);
            // Check if the token has expired (expiration in seconds, so multiply by 1000)
            if (decodedToken.expiration * 1000 < Date.now()) {
                localStorage.removeItem('jwt');
                setIsLoggedIn(false); // Trigger logout if token is expired
            } else {
                try {
                    // Fetch the user profile if the token is valid
                    const userProfile = await accountApiClient.getAuthenticatedAccount();
                    setUserProfile(userProfile.data);
                } catch (error) {
                    console.error('Failed to fetch user profile:', error);
                    localStorage.removeItem('jwt'); // Logout if API call fails
                    setIsLoggedIn(false);
                }
            }
        }
    };

    useEffect(() => {
        validateToken(); // Validate on initial load

        // Set interval to validate the token every 10 seconds
        const intervalId = setInterval(validateToken, 10 * 1000);

        // Listen for token changes in localStorage (for multi-tab scenarios)
        const handleStorageChange = () => {
            if (!localStorage.getItem('jwt')) {
                setIsLoggedIn(false); // If the token is removed from another tab, log out
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            clearInterval(intervalId); // Clean up interval
            window.removeEventListener('storage', handleStorageChange); // Clean up storage listener
        };
    }, []);

    // Handle login
    const handleLogin = async (email: string, password: string) => {
        await login(email, password);
        setIsLoggedIn(true); // Set logged in state
        validateToken(); // Validate the token immediately after login
    };

    // Handle logout
    const handleLogout = async () => {
        await logout();
        localStorage.removeItem('jwt'); // Clear the token from localStorage
        setIsLoggedIn(false); // Set logged out state
        setUserProfile(null); // Clear user profile
    };

    // Handle register
    const handleRegister = async (email: string, password: string) => {
        await register(email, password);
        setIsLoggedIn(true); // Set logged in state
        validateToken(); // Validate the token immediately after registration
    };

    return (
        <AuthContext.Provider value={{ userProfile, isLoggedIn, login: handleLogin, logout: handleLogout, register: handleRegister }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook to use the authentication context
const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export { AuthProvider, useAuth };
