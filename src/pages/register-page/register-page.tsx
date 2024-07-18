import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import styles from './register-page.module.scss';
import { register } from '../../api/auth';
import { ROUTES } from '/src/router/config';

export const RegisterPage = ({ className }: { className?: string }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            const data = await register(email, password);
            console.log('Registration successful', data);
            navigate(ROUTES.home.to()); // Redirect to login route
        } catch (error) {
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <div className={classNames(styles.root, className)}>
            <form onSubmit={handleSubmit} className={styles.registerForm}>
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
                <div className={styles.inputGroup}>
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className={styles.error}>{error}</p>}
                <button type="submit" className={styles.button}>
                    Register
                </button>
                <p className={styles.registerLink}>
                    Already have an account? <Link to={ROUTES.login.to()}>Login</Link>
                </p>
            </form>
        </div>
    );
};
