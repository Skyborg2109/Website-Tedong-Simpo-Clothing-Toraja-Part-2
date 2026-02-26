import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import './Products.css';
import { ShoppingBag, Eye } from 'phosphor-react';


import { getProducts } from '../data/products.js';

const Products = () => {
    const navigate = useNavigate();
    const products = getProducts();
    const { addToCart } = useCart();

    return (
        <section id="collections" className="products-section">
            <div className="section-header">
                <h3 className="section-subtitle">Koleksi Terbaru</h3>
                <h2 className="section-title">Tedong Simpo <span className="text-gold">Exclusive</span></h2>
                <div className="title-separator"></div>
            </div>

            <div className="products-container">
                {products.map((product) => (
                    <div key={product.id} className="product-card" onClick={() => navigate(`/product/${product.id}`)} style={{ cursor: 'pointer' }}>
                        <div className="product-image-container">
                            <img src={product.images && product.images.length > 0 ? product.images[0] : product.image} alt={product.name} className="product-image" />
                            <div className="product-actions" onClick={(e) => e.stopPropagation()}>
                                <button className="icon-btn" title="Quick View" onClick={() => navigate(`/product/${product.id}`)}>
                                    <Eye size={20} />
                                </button>
                                <button className="icon-btn" title="Add to Cart" onClick={(e) => {
                                    e.stopPropagation();
                                    addToCart(product);
                                }}>
                                    <ShoppingBag size={20} />
                                </button>
                            </div>
                            <div className="product-category">{product.category}</div>
                        </div>
                        <div className="product-info">
                            <h4 className="product-name">{product.name}</h4>
                            <p className="product-price">{product.price}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="view-all-container">
                <button className="btn btn-outline">Lihat Semua Koleksi</button>
            </div>
        </section>
    );
};

export default Products;
