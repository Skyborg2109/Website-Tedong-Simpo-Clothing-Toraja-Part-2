import React from 'react';
import './CustomProduction.css';
import { PencilCircle, Scissors, Package, CheckCircle } from 'phosphor-react';

const steps = [
    {
        icon: <PencilCircle size={48} weight="light" />,
        title: "Konsultasi Desain",
        desc: "Diskusikan ide dan kebutuhan Anda dengan tim desainer kami."
    },
    {
        icon: <Scissors size={48} weight="light" />,
        title: "Proses Produksi",
        desc: "Pembuatan sampel hingga produksi massal dengan QC ketat."
    },
    {
        icon: <Package size={48} weight="light" />,
        title: "Pengiriman",
        desc: "Pesanan dikemas rapi dan dikirim tepat waktu ke lokasi Anda."
    }
];

const CustomProduction = () => {
    return (
        <section id="custom" className="custom-section">
            <div className="custom-container">
                <div className="custom-content">
                    <h3 className="section-subtitle">Layanan Khusus</h3>
                    <h2 className="section-title">Produksi <span className="text-red">Kustom</span></h2>
                    <div className="title-separator-left"></div>

                    <p className="custom-description">
                        Kami menerima pesanan pembuatan seragam, kaos komunitas, jaket instansi,
                        dan merchandise lainnya. Dengan sentuhan khas Toraja atau desain sesuai keinginan Anda.
                    </p>

                    <ul className="custom-features">
                        <li><CheckCircle size={20} className="text-gold" /> Minimum order relatif kecil (mulai dari 24 pcs)</li>
                        <li><CheckCircle size={20} className="text-gold" /> Pilihan bahan premium dan berkualitas</li>
                        <li><CheckCircle size={20} className="text-gold" /> Tepat waktu dan profesional</li>
                        <li><CheckCircle size={20} className="text-gold" /> Garansi kualitas produksi</li>
                    </ul>

                    <button
                        className="btn btn-primary mt-4"
                        onClick={() => {
                            const message = encodeURIComponent('Halo Tedong Simpo, saya ingin konsultasi mengenai produksi kustom.');
                            window.open(`https://wa.me/6282226506493?text=${message}`, '_blank');
                        }}
                    >
                        Konsultasi Sekarang
                    </button>
                </div>

                <div className="custom-steps">
                    {steps.map((step, index) => (
                        <div key={index} className="step-card">
                            <div className="step-number">{index + 1}</div>
                            <div className="step-icon text-gold">{step.icon}</div>
                            <h4 className="step-title">{step.title}</h4>
                            <p className="step-desc">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CustomProduction;
