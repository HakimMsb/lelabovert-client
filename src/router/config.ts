import { generatePath } from 'react-router-dom';

const HOME = '/';
const ABOUT = '/about';
const PRODUCTS = '/products';
const PRODUCT = `/product/:slug`;
const CATEGORY = `/category/:slug`
const THANK_YOU = '/thank-you';
const LOGIN = '/login';
const REGISTER = '/register';
const PROFILE = '/profile';

export const ROUTES = {
    home: { route: HOME, to: () => HOME },
    about: { route: ABOUT, to: () => ABOUT },
    products: { route: PRODUCTS, to: () => PRODUCTS },
    thankYou: { route: THANK_YOU, to: () => THANK_YOU },
    login: { route: LOGIN, to: () => LOGIN},
    register: { route: REGISTER, to: () => REGISTER},
    profile: { route: PROFILE, to: () => PROFILE},
    category: { 
        route: CATEGORY,
        to: (categorySlug: string) => generatePath(CATEGORY, {slug: categorySlug })
    },
    product: {
        route: PRODUCT,
        to: (productSlug: string) => generatePath(PRODUCT, { slug: productSlug }),
    },
};

export type ROUTE_KEYS = keyof typeof ROUTES;

export type RouteParams = {
    [PRODUCT]: { slug: string };
    [CATEGORY]: { slug: string };
};
