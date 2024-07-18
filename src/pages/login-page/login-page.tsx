import classNames from 'classnames';
import styles from './login-page.module.scss';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '/src/router/config';
import { useAuth } from '/src/api/auth-context';

export interface LoginPageProps {
    className?: string;
}

export const LoginPage = ({ className }: LoginPageProps) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const {login} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            login(email, password);
            navigate(ROUTES.home.to());
        } catch (error) {
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className={classNames(styles.root, className)}>
            <form onSubmit={handleSubmit} className={styles.loginForm}>
                <div className={styles.inputGroup}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className={styles.error}>{error}</p>}
                <button type="submit" className={styles.button}>
                    Login
                </button>
                <p className={styles.registerLink}>
                    Don't have an account yet? <Link to={ROUTES.register.to()}>Register</Link>
                </p>
            </form>
        </div>
    );
};
