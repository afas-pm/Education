import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

    useEffect(() => {
        const fetchUser = async () => {
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`${backendUrl}/api/user/me`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();

                if (data.success) {
                    setUser(data.user);
                } else {
                    // Token might be invalid or expired
                    logout();
                }
            } catch (error) {
                console.error('Error fetching user:', error);
                logout();
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [token]);

    const login = async (email, password) => {
        try {
            const response = await fetch(`${backendUrl}/api/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();

            if (data.success) {
                setToken(data.token);
                localStorage.setItem('token', data.token);
                setUser(data.user);
                toast.success('Login successful!');
                navigate('/');
                return { success: true };
            } else {
                toast.error(data.message || 'Login failed');
                return { success: false, message: data.message };
            }
        } catch (error) {
            toast.error('Server error. Please try again.');
            return { success: false, message: 'Server error' };
        }
    };

    const register = async (name, email, password) => {
        try {
            const response = await fetch(`${backendUrl}/api/user/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            });
            const data = await response.json();

            if (data.success) {
                // Return success but don't log in automatically or navigate here
                return { success: true };
            } else {
                toast.error(data.message || 'Registration failed');
                return { success: false, message: data.message };
            }
        } catch (error) {
            toast.error('Server error. Please try again.');
            return { success: false, message: 'Server error' };
        }
    };

    const logout = () => {
        setToken('');
        setUser(null);
        localStorage.removeItem('token');
        navigate('/login');
    };

    const value = {
        user,
        token,
        loading,
        login,
        register,
        logout,
        backendUrl
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
