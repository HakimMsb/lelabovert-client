import { authenticationApiClient, removeJwtToken, setJwtToken } from './api-clients';

export const login = async (email: string, password: string) => {
    try {
        const response = await authenticationApiClient.login({ email, password });
        const token = response.data.accessToken;
        if (token) {
            setJwtToken(token);
        }
    } catch (error) {
        console.error('Login error', error);
        throw error;
    }
};

export const register = async (email: string, password: string) => {
    try {
        const response = await authenticationApiClient.register({ email, password });
        const token = response.data.accessToken;
        if(token){
            setJwtToken(token);
        }
    } catch (error) {
        console.error('Login error', error);
        throw error;
    }
}

export const logout = async () => {
    try {
        await authenticationApiClient.logout();
        removeJwtToken();
    } catch (error) {
        console.error('Login error', error);
        throw error;
    }
}