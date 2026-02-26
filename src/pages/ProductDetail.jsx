import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, WhatsappLogo, ArrowLeft, CaretLeft, CaretRight } from 'phosphor-react';
import { getProducts } from '../data/products.js';
import { useCart } from '../context/CartContext.jsx';
import './ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const products = getProducts();
    const product = products.find(p => p.id === parseInt(id));
    const { addToCart } = useCart();

    // Ensure we have images array, fallback to old structured string if necessary
    const images = product?.images && product.images.length > 0 ? product.images : [product?.image || 'https://via.placeholder.com/800'];
    const [selectedImage, setSelectedImage] = React.useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    const nextImage = () => {
        setSelectedImage((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    if (!product) {
        return (
            <div className="product-not-found">
                <h2>Produk tidak ditemukan</h2>
                <button onClick={() => navigate('/')} className="btn btn-primary">Kembali ke Beranda</button>
            </div>
        );
    }

    const handleAddToCart = () => {
        addToCart(product);
    };

    return (
        <div className="product-detail-page">
            <div className="product-detail-container">
                <button className="back-btn" onClick={() => navigate(-1)}>
                    <ArrowLeft size={20} /> Kembali
                </button>

                <div className="detail-grid">
                    <div className="detail-image-wrapper animate-fade-in relative">
                        <div className="main-image-container">
                            <img src={images[selectedImage]} alt={product.name} className="detail-image" />

                            {images.length > 1 && (
                                <>
                                    <button className="gallery-nav prev" onClick={prevImage}>
                                        <CaretLeft size={24} weight="bold" />
                                    </button>
                                    <button className="gallery-nav next" onClick={nextImage}>
                                        <CaretRight size={24} weight="bold" />
                                    </button>
                                </>
                            )}
                        </div>

                        {images.length > 1 && (
                            <div className="product-thumbnails">
                                {images.map((img, idx) => (
                                    <div
                                        key={idx}
                                        className={`thumbnail-btn ${selectedImage === idx ? 'active' : ''}`}
                                        onClick={() => setSelectedImage(idx)}
                                    >
                                        <img src={img} alt={`Thumbnail ${idx + 1}`} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="detail-info animate-fade-in delay-100">
                        <div className="detail-category">{product.category}</div>
                        <h1 className="detail-title">{product.name}</h1>
                        <p className="detail-price">{product.price}</p>

                        <div className="detail-separator"></div>

                        <div className="detail-description">
                            <p>
                                Pakaian eksklusif dari Tedong Simpo yang dirancang dengan memadukan keindahan motif Toraja dengan kenyamanan modern. Cocok untuk digunakan pada acara formal maupun kasual.
                            </p>
                            <ul>
                                <li><strong>Kualitas:</strong> Premium & Nyaman</li>
                                <li><strong>Ukuran:</strong> S, M, L, XL, XXL (Tanyakan ketersediaan)</li>
                                <li><strong>Perawatan:</strong> Cuci dengan putaran lembut, hindari sinar matahari langsung.</li>
                            </ul>
                        </div>

                        <div className="detail-actions">
                            <button className="btn btn-primary btn-checkout" onClick={handleAddToCart}>
                                <ShoppingCart size={24} weight="fill" /> Tambah ke Keranjang
                            </button>
                        </div>

                        <div className="detail-extra">
                            <p>Ada pertanyaan? Silakan konsultasi gratis melalui WhatsApp kami.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
