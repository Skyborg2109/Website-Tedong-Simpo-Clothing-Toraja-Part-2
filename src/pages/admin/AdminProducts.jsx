import React, { useState } from 'react';
import { PencilSimple, Trash, Plus, X } from 'phosphor-react';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../../data/products.js';
import './AdminProducts.css';

const AdminProducts = () => {
    const [products, setProducts] = useState(() => getProducts());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    const [formData, setFormData] = useState({
        id: null,
        name: '',
        price: '',
        category: '',
        mainImage: '',
        galleryImages: []
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const [galleryUrlInput, setGalleryUrlInput] = useState('');

    const handleMainImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) { // 2MB limit
                alert("Ukuran gambar maksimal 2MB.");
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, mainImage: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleGalleryImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) { // 2MB limit
                alert("Ukuran gambar maksimal 2MB.");
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, galleryImages: [...(prev.galleryImages || []), reader.result] }));
            };
            reader.readAsDataURL(file);
            e.target.value = ''; // Reset file input
        }
    };

    const handleAddGalleryUrl = () => {
        if (galleryUrlInput.trim() !== '') {
            setFormData(prev => ({ ...prev, galleryImages: [...(prev.galleryImages || []), galleryUrlInput] }));
            setGalleryUrlInput('');
        }
    };

    const removeGalleryImage = (indexToRemove) => {
        setFormData(prev => ({
            ...prev,
            galleryImages: prev.galleryImages.filter((_, index) => index !== indexToRemove)
        }));
    };

    const openModal = (product = null) => {
        if (product) {
            setFormData({
                ...product,
                mainImage: product.images && product.images.length > 0 ? product.images[0] : (product.image || ''),
                galleryImages: product.images && product.images.length > 1 ? product.images.slice(1) : []
            });
            setIsEditMode(true);
        } else {
            setFormData({
                id: null,
                name: '',
                price: 'Rp ',
                category: '',
                mainImage: '',
                galleryImages: []
            });
            setIsEditMode(false);
        }
        setGalleryUrlInput('');
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const dataToSave = {
            ...formData,
            images: [formData.mainImage, ...(formData.galleryImages || [])].filter(Boolean)
        };

        if (isEditMode) {
            const updatedProducts = updateProduct(dataToSave);
            setProducts(updatedProducts);
        } else {
            const updatedProducts = addProduct(dataToSave);
            setProducts(updatedProducts);
        }

        closeModal();
    };

    const handleDelete = (id) => {
        if (window.confirm('Yakin ingin menghapus produk ini?')) {
            const updatedProducts = deleteProduct(id);
            setProducts(updatedProducts);
        }
    };

    return (
        <div className="admin-products">
            <div className="admin-page-header">
                <h1 className="admin-page-title">Manajemen Produk</h1>
                <button className="btn btn-add" onClick={() => openModal()}>
                    <Plus size={20} weight="bold" /> Tambah Produk
                </button>
            </div>

            <div className="admin-card">
                <div className="table-responsive">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Gambar</th>
                                <th>Nama Produk</th>
                                <th>Kategori</th>
                                <th>Harga</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length === 0 ? (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center', padding: '30px', color: '#888' }}>Belum ada produk.</td>
                                </tr>
                            ) : (
                                products.map(product => (
                                    <tr key={product.id}>
                                        <td>#{product.id}</td>
                                        <td>
                                            <div className="table-image-wrapper">
                                                <img src={(product.images && product.images.length > 0) ? product.images[0] : 'https://via.placeholder.com/80'} alt={product.name} />
                                            </div>
                                        </td>
                                        <td><strong>{product.name}</strong></td>
                                        <td><span className="badge category-badge">{product.category}</span></td>
                                        <td className="text-gold" style={{ fontWeight: 600 }}>{product.price}</td>
                                        <td>
                                            <div className="action-buttons">
                                                <button className="btn-icon edit" onClick={() => openModal(product)} title="Edit">
                                                    <PencilSimple size={20} />
                                                </button>
                                                <button className="btn-icon delete" onClick={() => handleDelete(product.id)} title="Hapus">
                                                    <Trash size={20} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal Form */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>{isEditMode ? 'Edit Produk' : 'Tambah Produk Baru'}</h2>
                            <button className="btn-close" onClick={closeModal}><X size={24} /></button>
                        </div>

                        <form onSubmit={handleSubmit} className="modal-form">
                            <div className="form-group">
                                <label>Nama Produk</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Contoh: Kemeja Tenun"
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Harga</label>
                                    <input
                                        type="text"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Contoh: Rp 350.000"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Kategori</label>
                                    <input
                                        type="text"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Contoh: Pria"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Foto Utama (Katalog)</label>
                                <div className="image-upload-container">
                                    <input
                                        type="url"
                                        name="mainImage"
                                        value={formData.mainImage && formData.mainImage.startsWith('http') ? formData.mainImage : ''}
                                        onChange={handleInputChange}
                                        placeholder="Masukkan URL Gambar..."
                                    />
                                    <div className="upload-divider"><span>ATAU UPLOAD FILE</span></div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleMainImageUpload}
                                        className="file-input"
                                    />
                                </div>
                                {formData.mainImage && (
                                    <div className="image-preview relative-preview mt-2" style={{ height: 'auto', minHeight: '150px' }}>
                                        <img src={formData.mainImage} alt="Main Preview" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }} />
                                        <button
                                            type="button"
                                            className="btn-remove-image"
                                            onClick={() => setFormData(prev => ({ ...prev, mainImage: '' }))}
                                            style={{ left: '90px', right: 'auto' }}
                                        >
                                            <X size={14} weight="bold" />
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="form-group" style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px dashed #eee' }}>
                                <label>Galeri Belakang / Tambahan (Bisa lebih dari 1)</label>
                                <div className="image-upload-container">
                                    <div className="input-group-flex">
                                        <input
                                            type="url"
                                            value={galleryUrlInput}
                                            onChange={(e) => setGalleryUrlInput(e.target.value)}
                                            placeholder="Masukkan URL Gambar Tambahan..."
                                            style={{ flex: 1, marginBottom: 0 }}
                                        />
                                        <button
                                            type="button"
                                            className="btn-add-url"
                                            onClick={handleAddGalleryUrl}
                                        >
                                            <Plus size={16} /> Tambah
                                        </button>
                                    </div>
                                    <div className="upload-divider"><span>ATAU UPLOAD FILE</span></div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleGalleryImageUpload}
                                        className="file-input"
                                    />
                                </div>

                                {formData.galleryImages && formData.galleryImages.length > 0 && (
                                    <div className="images-preview-grid mt-3">
                                        {formData.galleryImages.map((img, idx) => (
                                            <div key={idx} className="image-preview relative-preview">
                                                <img src={img} alt={`Preview ${idx + 1}`} />
                                                <button
                                                    type="button"
                                                    className="btn-remove-image"
                                                    onClick={() => removeGalleryImage(idx)}
                                                >
                                                    <X size={14} weight="bold" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-outline-dark" onClick={closeModal}>Batal</button>
                                <button type="submit" className="btn btn-save">{isEditMode ? 'Simpan Perubahan' : 'Tambah Produk'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminProducts;
