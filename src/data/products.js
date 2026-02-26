const initialProducts = [
    {
        id: 1,
        name: "Kemeja Tenun Toraja Premium",
        price: "Rp 350.000",
        images: ["https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80"],
        category: "Pakaian Pria"
    },
    {
        id: 2,
        name: "Gaun Kombinasi Paramba",
        price: "Rp 450.000",
        images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80"],
        category: "Pakaian Wanita"
    },
    {
        id: 3,
        name: "Jaket Bomber Motif Ne'limbongan",
        price: "Rp 550.000",
        images: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80"],
        category: "Unisex"
    },
    {
        id: 4,
        name: "Kaos Polos Sablon Toraja",
        price: "Rp 150.000",
        images: ["https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80"],
        category: "Kasual"
    }
];

export const getProducts = () => {
    const stored = localStorage.getItem('tedong_simpo_products');
    let data = stored ? JSON.parse(stored) : initialProducts;

    // Migrate old structure (single `image` to `images` array)
    let needsMigration = false;
    data = data.map(p => {
        if (!p.images && p.image) {
            needsMigration = true;
            return { ...p, images: [p.image] };
        } else if (!p.images) {
            needsMigration = true;
            return { ...p, images: [] };
        }
        return p;
    });

    if (!stored || needsMigration) {
        localStorage.setItem('tedong_simpo_products', JSON.stringify(data));
    }

    return data;
};

export const saveProducts = (products) => {
    localStorage.setItem('tedong_simpo_products', JSON.stringify(products));
};

export const deleteProduct = (id) => {
    const products = getProducts();
    const updated = products.filter(p => p.id !== id);
    saveProducts(updated);
    return updated;
};

export const addProduct = (product) => {
    const products = getProducts();
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    const newProduct = { ...product, id: newId };
    products.push(newProduct);
    saveProducts(products);
    return products;
};

export const updateProduct = (updatedProduct) => {
    const products = getProducts();
    const index = products.findIndex(p => p.id === updatedProduct.id);
    if (index !== -1) {
        products[index] = updatedProduct;
        saveProducts(products);
    }
    return products;
};
