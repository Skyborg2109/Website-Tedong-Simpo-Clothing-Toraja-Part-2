import React, { useMemo } from 'react';
import { Package, Tag, Calculator, ChartLineUp, Clock } from 'phosphor-react';
import { getProducts } from '../../data/products.js';

const Dashboard = () => {
    const products = getProducts();

    const stats = useMemo(() => {
        const totalProducts = products.length;

        // Cek kategori unik
        const uniqueCategories = new Set(products.map(p => p.category)).size;

        // Hitung estimasi rata-rata harga (parsing dari string Rp)
        const parsedPrices = products.map(p => {
            const num = parseInt(p.price.replace(/[^0-9]/g, ''));
            return isNaN(num) ? 0 : num;
        });

        const totalValue = parsedPrices.reduce((a, b) => a + b, 0);
        const avgPrice = parsedPrices.length > 0 ? totalValue / parsedPrices.length : 0;

        const formattedAvgPrice = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0
        }).format(avgPrice);

        // Produk terbaru (ambil 3 terakhir)
        const recentProducts = [...products].reverse().slice(0, 3);

        return {
            totalProducts,
            uniqueCategories,
            formattedAvgPrice,
            recentProducts
        };
    }, [products]);

    return (
        <div className="admin-dashboard">
            <h1 className="admin-page-title">Dashboard Overview</h1>

            <div className="dashboard-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                <div className="stat-card" style={{ background: 'white', padding: '25px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '20px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
                    <div className="stat-icon" style={{ background: 'rgba(212, 175, 55, 0.2)', color: 'var(--color-gold)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Package size={32} />
                    </div>
                    <div className="stat-info">
                        <h3 style={{ fontSize: '0.9rem', color: '#888', marginBottom: '5px' }}>Total Produk</h3>
                        <p style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--color-dark)', margin: 0 }}>{stats.totalProducts}</p>
                    </div>
                </div>

                <div className="stat-card" style={{ background: 'white', padding: '25px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '20px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
                    <div className="stat-icon" style={{ background: 'rgba(163, 29, 29, 0.1)', color: 'var(--color-red)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Tag size={32} />
                    </div>
                    <div className="stat-info">
                        <h3 style={{ fontSize: '0.9rem', color: '#888', marginBottom: '5px' }}>Kategori Unik</h3>
                        <p style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--color-dark)', margin: 0 }}>{stats.uniqueCategories}</p>
                    </div>
                </div>

                <div className="stat-card" style={{ background: 'white', padding: '25px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '20px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
                    <div className="stat-icon" style={{ background: 'rgba(0, 150, 255, 0.1)', color: '#0096FF', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Calculator size={32} />
                    </div>
                    <div className="stat-info">
                        <h3 style={{ fontSize: '0.9rem', color: '#888', marginBottom: '5px' }}>Rata-rata Harga</h3>
                        <p style={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'var(--color-dark)', margin: 0 }}>{stats.formattedAvgPrice}</p>
                    </div>
                </div>

                <div className="stat-card" style={{ background: 'white', padding: '25px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '20px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
                    <div className="stat-icon" style={{ background: 'rgba(0, 200, 83, 0.1)', color: '#00C853', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ChartLineUp size={32} />
                    </div>
                    <div className="stat-info">
                        <h3 style={{ fontSize: '0.9rem', color: '#888', marginBottom: '5px' }}>Status Sistem</h3>
                        <p style={{ fontSize: '1.4rem', fontWeight: 'bold', margin: 0, color: '#00C853' }}>Online (Lokal)</p>
                    </div>
                </div>
            </div>

            <div className="admin-card">
                <h3 style={{ marginBottom: '20px', fontSize: '1.2rem', color: 'var(--color-dark)' }}>Produk Terbaru Ditambahkan</h3>

                {stats.recentProducts.length === 0 ? (
                    <p style={{ color: '#888' }}>Belum ada produk di dalam katalog.</p>
                ) : (
                    <div style={{ display: 'grid', gap: '15px' }}>
                        {stats.recentProducts.map(product => (
                            <div key={product.id} style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', background: '#f9f9f9', borderRadius: '8px', borderLeft: '4px solid var(--color-gold)' }}>
                                <div style={{ width: '50px', height: '50px', borderRadius: '6px', overflow: 'hidden', backgroundColor: '#eee' }}>
                                    <img
                                        src={(product.images && product.images.length > 0) ? product.images[0] : (product.image || 'https://via.placeholder.com/50')}
                                        alt={product.name}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h4 style={{ margin: '0 0 5px', fontSize: '1rem', color: 'var(--color-dark)' }}>{product.name}</h4>
                                    <span style={{ fontSize: '0.85rem', color: '#666', background: '#eee', padding: '3px 8px', borderRadius: '12px' }}>{product.category}</span>
                                </div>
                                <div style={{ fontWeight: 'bold', color: 'var(--color-gold)' }}>
                                    {product.price}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div style={{ marginTop: '25px', paddingTop: '15px', borderTop: '1px solid #eee', color: '#888', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Clock size={16} /> Data diperbarui secara real-time berdasarkan inventaris lokal.
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
