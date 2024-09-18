import axios from 'axios';
import { AccountControllerApi, AlgeriaCitiesControllerApi, AuthenticationControllerApi, CartControllerApi, CategoryControllerApi, CustomerControllerApi, ProductControllerApi } from './lelabovert-api-generated-client/api';
import { BASE_PATH, BaseAPI } from './lelabovert-api-generated-client/base';
import { jwtDecode } from 'jwt-decode';
import { ROUTES } from '../router/config';

let token: string | null = localStorage.getItem('jwt');

export interface JwtTokenPayload {
    isLoggedOut: boolean;
    expiration: number;
}

const axiosInstance = axios.create({
    baseURL: BASE_PATH,
    withCredentials: true
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('jwt');
        if (token) {
            const decodedJwtToken = jwtDecode<JwtTokenPayload>(token);
            const currentTime = Date.now(); 

            // Check if the token is expired
            if (decodedJwtToken.expiration < currentTime) {
                // Token is expired, remove it and redirect to the home page
                localStorage.removeItem('jwt');
                window.location.href = ROUTES.home.to();
            }else{
                config.headers['Authorization'] = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const setJwtToken = (jwtToken: string) => {
    localStorage.setItem('jwt', jwtToken);
    token = jwtToken;
};

export const removeJwtToken = () => {
    localStorage.removeItem('jwt');
    token = null;
};

export const authenticationApiClient = new AuthenticationControllerApi(undefined, undefined, axiosInstance);

export const accountApiClient = new AccountControllerApi(undefined, undefined, axiosInstance);
export const productApiClient = new ProductControllerApi(undefined, undefined, axiosInstance);
export const categoryApiClient = new CategoryControllerApi(undefined, undefined, axiosInstance);
export const algeriaCitiesApiClient = new AlgeriaCitiesControllerApi(undefined, undefined, axiosInstance);
export const customerApiClient = new CustomerControllerApi(undefined, undefined, axiosInstance);
export const cartApiClient = new CartControllerApi(undefined, undefined, axiosInstance);
