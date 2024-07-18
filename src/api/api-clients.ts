import axios from 'axios';
import { AccountControllerApi, AlgeriaCitiesControllerApi, AuthenticationControllerApi, CartControllerApi, CategoryControllerApi, CustomerControllerApi, ProductControllerApi } from './lelabovert-api-generated-client/api';
import { BASE_PATH, BaseAPI } from './lelabovert-api-generated-client/base';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../router/config';

let jwtToken: string | null = localStorage.getItem('jwt');

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
        if (jwtToken) {
            const decodedJwtToken = jwtDecode<JwtTokenPayload>(jwtToken);
            if(decodedJwtToken.isLoggedOut){
                localStorage.removeItem('jwt');
                window.location.href = ROUTES.home.to();
            }else{
                config.headers['Authorization'] = `Bearer ${jwtToken}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const setJwtToken = (token: string) => {
    jwtToken = token;
    localStorage.setItem('jwt', token);
};

export const removeJwtToken = () => {
    jwtToken = null;
    localStorage.removeItem('jwt');
};

export const authenticationApiClient = new AuthenticationControllerApi(undefined, undefined, axiosInstance);

export const accountApiClient = new AccountControllerApi(undefined, undefined, axiosInstance);
export const productApiClient = new ProductControllerApi(undefined, undefined, axiosInstance);
export const categoryApiClient = new CategoryControllerApi(undefined, undefined, axiosInstance);
export const algeriaCitiesApiClient = new AlgeriaCitiesControllerApi(undefined, undefined, axiosInstance);
export const customerApiClient = new CustomerControllerApi(undefined, undefined, axiosInstance);
export const cartApiClient = new CartControllerApi(undefined, undefined, axiosInstance);
