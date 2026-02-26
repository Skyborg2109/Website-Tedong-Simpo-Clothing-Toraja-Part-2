import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LockKey, User } from 'phosphor-react';
import './AdminLogin.css';

const AdminLogin = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleLogin = (e) => {
        e.preventDefault();

        // Mock authentication
        if (credentials.username === 'admin' && credentials.password === 'tedong123') {
            localStorage.setItem('tedong_admin_auth', 'true');
            navigate('/admin');
        } else {
            setError('Username atau password salah!');
        }
    };

    return (
        <div className="admin-login-container">
            <div className="admin-login-card">
                <div className="admin-login-header">
                    <h2>Tedong Simpo</h2>
                    <p>Admin Control Panel</p>
                </div>

                <form onSubmit={handleLogin} className="admin-login-form">
                    {error && <div className="admin-login-error">{error}</div>}

                    <div className="admin-form-group">
                        <label>Username</label>
                        <div className="admin-input-wrapper">
                            <User size={20} className="input-icon" />
                            <input
                                type="text"
                                name="username"
                                value={credentials.username}
                                onChange={handleChange}
                                placeholder="Masukkan username"
                                required
                            />
                        </div>
                    </div>

                    <div className="admin-form-group">
                        <label>Password</label>
                        <div className="admin-input-wrapper">
                            <LockKey size={20} className="input-icon" />
                            <input
                                type="password"
                                name="password"
                                value={credentials.password}
                                onChange={handleChange}
                                placeholder="Masukkan password"
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn-login-submit">Login Sekarang</button>
                    <a href="/" className="back-to-site">Kembali ke Website</a>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
