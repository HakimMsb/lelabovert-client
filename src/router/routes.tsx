import { RouteObject } from 'react-router-dom';
import { SiteWrapper } from '../components/site-wrapper/site-wrapper';
import { HomePage } from '../pages/home-page/home-page';
import { AboutPage } from '../pages/about-page/about-page';
import { ROUTES } from './config';
import { ProductDetailsPage } from '../pages/product-details-page/product-details-page';
import { ProductsPage } from '../pages/products-page/products-page';
import { ThankYouPage } from '../components/thank-you-page/thank-you-page';
import { LoginPage } from '../pages/login-page/login-page';
import { RegisterPage } from '../pages/register-page/register-page';
import { ProfilePage } from '../pages/profile-page/profile-page';


export const getRoutes: () => RouteObject[] = () => [
    {
        path: '/',
        element: <SiteWrapper />,
        children: [
            { path: ROUTES.home.route, index: true, element: <HomePage /> },
            { path: ROUTES.products.route, element: <ProductsPage /> },
            { path: ROUTES.product.route, element: <ProductDetailsPage /> },
            { path: ROUTES.about.route, element: <AboutPage /> },
            { path: ROUTES.thankYou.route, element: <ThankYouPage /> },
            { path: ROUTES.category.route, element: <ProductsPage />},
            { path: ROUTES.login.route, element: <LoginPage />},
            { path: ROUTES.register.route, element: <RegisterPage />},
            { path: ROUTES.profile.route, element: <ProfilePage />}
        ],
    },
];
