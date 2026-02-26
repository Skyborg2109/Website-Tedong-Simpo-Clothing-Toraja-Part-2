import React from 'react';
import { X, Trash, Plus, Minus, WhatsappLogo } from 'phosphor-react';
import { useCart } from '../context/CartContext.jsx';
import './CartDrawer.css';

const CartDrawer = ({ isOpen, onClose }) => {
    const {
        cartItems,
        removeFromCart,
        updateQuantity,
        cartTotal,
    } = useCart();

    const handleCheckout = () => {
        if (cartItems.length === 0) return;

        let message = `Halo Tedong Simpo, saya ingin memesan produk berikut dari keranjang saya:\n\n`;

        cartItems.forEach((item, index) => {
            message += `${index + 1}. *${item.name}* (x${item.quantity}) - ${item.price}\n`;
        });

        // Format Total
        const totalRp = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(cartTotal);

        message += `\n*Total Estimasi: ${totalRp}*\n\nApakah pesanan saya bisa diproses?`;

        // Redirect to WhatsApp
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/6282226506493?text=${encodedMessage}`, '_blank');
        onClose();
    };

    return (
        <div className={`cart-drawer-container ${isOpen ? 'open' : ''}`}>
            <div className="cart-overlay" onClick={onClose}></div>

            <div className="cart-drawer">
                <div className="cart-header">
                    <h2>Keranjang Belanja</h2>
                    <button className="cart-close-btn" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                <div className="cart-items">
                    {cartItems.length === 0 ? (
                        <div className="cart-empty">
                            <p>Keranjang Anda masih kosong.</p>
                            <button className="btn btn-outline" onClick={onClose} style={{ marginTop: '15px' }}>Mulai Belanja</button>
                        </div>
                    ) : (
                        cartItems.map(item => (
                            <div key={item.id} className="cart-item">
                                <img src={item.images && item.images.length > 0 ? item.images[0] : item.image} alt={item.name} className="cart-item-img" />
                                <div className="cart-item-info">
                                    <h4>{item.name}</h4>
                                    <p className="cart-item-price">{item.price}</p>

                                    <div className="cart-item-actions">
                                        <div className="quantity-control">
                                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus size={14} /></button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus size={14} /></button>
                                        </div>
                                        <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                                            <Trash size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="cart-footer">
                        <div className="cart-total">
                            <span>Total</span>
                            <span className="total-price">
                                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(cartTotal)}
                            </span>
                        </div>
                        <button className="btn btn-primary checkout-btn" onClick={handleCheckout}>
                            <WhatsappLogo size={24} weight="fill" /> Checkout via WA
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartDrawer;
