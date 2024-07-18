import { useMemo } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { getRoutes } from './router/routes';
import { CartOpenContextProvider } from './components/cart/cart-open-context';
import { AuthProvider } from './api/auth-context';

const routes = getRoutes();
function App() {
    const router = useMemo(() => createBrowserRouter(routes), []);

    return (
        <CartOpenContextProvider>
            <AuthProvider>
                <RouterProvider router={router} />
            </AuthProvider>
        </CartOpenContextProvider>
    );
}

export default App;
