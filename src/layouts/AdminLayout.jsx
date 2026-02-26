import React, { useState } from 'react';
import { Outlet, Link, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { SquaresFour, Package, SignOut, Storefront, List, X } from 'phosphor-react';
import './AdminLayout.css';

const AdminLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isAuthenticated = localStorage.getItem('tedong_admin_auth') === 'true';
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace />;
    }

    const handleLogout = () => {
        localStorage.removeItem('tedong_admin_auth');
        navigate('/admin/login');
    };

    return (
        <div className="admin-layout">
            <div className={`admin-overlay ${isSidebarOpen ? 'active' : ''}`} onClick={() => setIsSidebarOpen(false)}></div>

            <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="admin-brand">
                    <h2>Tedong Simpo</h2>
                    <p>Admin Dashboard</p>
                </div>

                <nav className="admin-nav">
                    <Link to="/admin" className={location.pathname === '/admin' ? 'active' : ''} onClick={() => setIsSidebarOpen(false)}>
                        <SquaresFour size={24} />
                        Dashboard
                    </Link>
                    <Link to="/admin/products" className={location.pathname.includes('/admin/products') ? 'active' : ''} onClick={() => setIsSidebarOpen(false)}>
                        <Package size={24} />
                        Kelola Produk
                    </Link>
                </nav>

                <div className="admin-sidebar-footer">
                    <Link to="/" className="btn-back-store">
                        <Storefront size={20} /> Lihat Website
                    </Link>
                    <button className="btn-logout" onClick={handleLogout}>
                        <SignOut size={20} /> Logout
                    </button>
                </div>
            </aside>

            <main className="admin-main">
                <header className="admin-header">
                    <div className="header-left">
                        <button className="sidebar-toggle" onClick={() => setIsSidebarOpen(true)}>
                            <List size={28} />
                        </button>
                        <h1>Sistem Manajemen Konten</h1>
                    </div>
                    <div className="admin-user">
                        <span className="user-greeting">Halo, Admin</span>
                        <div className="admin-avatar">A</div>
                    </div>
                </header>

                <div className="admin-content-wrapper">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
