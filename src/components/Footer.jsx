import React from 'react';
import './Footer.css';
import { MapPin, Phone, InstagramLogo, FacebookLogo, WhatsappLogo, EnvelopeSimple } from 'phosphor-react';

const Footer = () => {
    return (
        <footer id="about" className="footer">
            <div className="pattern-border"></div>

            <div className="footer-container">
                <div className="footer-col brand-col">
                    <h2 className="footer-logo">
                        TEDONG SIMPO <span className="logo-accent">CLOTHING</span>
                    </h2>
                    <p className="logo-subtext-footer">Store & Custom Production</p>
                    <p className="brand-desc">
                        Menggabungkan keindahan motif Toraja dengan kenyamanan apparel modern.
                        Solusi untuk kebutuhan seragam komunitas, instansi, dan gaya sehari-hari dengan identitas budaya yang kuat.
                    </p>
                    <p className="brand-desc mt-3">
                        Kunjungi juga:<br />
                        &bull; Kids Apparel: <a href="https://instagram.com/tedongmini_toraja" target="_blank" rel="noreferrer" className="text-gold">@tedongmini_toraja</a><br />
                        &bull; Eat & Artspace: <a href="https://instagram.com/roemahnene" target="_blank" rel="noreferrer" className="text-gold">@roemahnene</a>
                    </p>
                </div>

                <div className="footer-col links-col">
                    <h3 className="footer-heading">Navigasi</h3>
                    <ul className="footer-links">
                        <li><a href="/#home">Home</a></li>
                        <li><a href="/#collections">Koleksi</a></li>
                        <li><a href="/#custom">Pesanan Kustom</a></li>
                        <li><a href="/#about">Tentang Kami</a></li>
                    </ul>
                </div>

                <div className="footer-col links-col">
                    <h3 className="footer-heading">Ketentuan</h3>
                    <ul className="footer-links">
                        <li><a href="#">Cara Pemesanan</a></li>
                        <li><a href="#">Pengiriman</a></li>
                        <li><a href="#">Kebijakan Privasi</a></li>
                        <li><a href="#">Syarat & Ketentuan</a></li>
                    </ul>
                </div>

                <div className="footer-col contact-col">
                    <h3 className="footer-heading">Hubungi Kami</h3>
                    <div className="contact-item">
                        <MapPin size={24} className="text-red" weight="fill" />
                        <div className="contact-text">
                            <strong>Toko & Workshop</strong><br />
                            Jalan Ratulangi 21,<br />
                            Rantepao, Kabupaten Toraja Utara,<br />
                            Sulawesi Selatan, Indonesia
                        </div>
                    </div>
                    <div className="contact-item mt-3">
                        <WhatsappLogo size={24} className="text-red" weight="fill" />
                        <div className="contact-text">0822-2650-6493</div>
                    </div>
                    <div className="contact-item mt-3">
                        <EnvelopeSimple size={24} className="text-red" weight="fill" />
                        <div className="contact-text">halo@torajaclothingkatan.com</div>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="footer-bottom-container">
                    <div className="copyright">
                        &copy; {new Date().getFullYear()} Tedong Simpo Clothing Store & Custom Production.<br />
                        Powered by Tedong Simpo. All rights reserved.
                    </div>
                    <div className="social-links">
                        <a href="#" aria-label="Instagram"><InstagramLogo size={24} /></a>
                        <a href="#" aria-label="Facebook"><FacebookLogo size={24} /></a>
                        <a href="#" aria-label="WhatsApp"><WhatsappLogo size={24} /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
