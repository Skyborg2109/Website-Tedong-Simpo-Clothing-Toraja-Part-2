import React from 'react';
import './Hero.css';
import { ArrowRight } from 'phosphor-react';

const Hero = () => {
    return (
        <section id="home" className="hero-section">
            <div className="hero-overlay"></div>
            <div className="hero-content">
                <h2 className="hero-subtitle animate-fade-in">Masyarakat Adat & Modernitas</h2>
                <h1 className="hero-title animate-fade-in delay-100">
                    Warisan Leluhur dalam <span className="text-gold">Setiap Helai</span> Kain
                </h1>
                <p className="hero-description animate-fade-in delay-200">
                    Temukan koleksi pakaian eksklusif dengan sentuhan budaya Toraja yang otentik.
                    Kami juga melayani produksi kustom untuk komunitas, instansi, dan acara spesial Anda.
                </p>
                <div className="hero-cta animate-fade-in delay-300">
                    <a href="/#collections" className="btn btn-primary">
                        Eksplorasi Koleksi <ArrowRight size={20} weight="bold" />
                    </a>
                    <a href="/#custom" className="btn btn-outline">
                        Pesan Kustom
                    </a>
                </div>
            </div>

            <div className="scroll-indicator">
                <div className="mouse">
                    <div className="wheel"></div>
                </div>
                <span className="scroll-text">Scroll ke bawah</span>
            </div>
        </section>
    );
};

export default Hero;
