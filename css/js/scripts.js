document.addEventListener("DOMContentLoaded", function() {
    const products = [];
    const productGrid = document.getElementById('productGrid');
    const categoryFilter = document.getElementById('categoryFilter');

    // Cargar productos desde products.json
    fetch('catalog/products.json')
        .then(response => response.json())
        .then(data => {
            products.push(...data);
            displayProducts(products);
            populateCategories(products);
        });

    // Mostrar productos
    function displayProducts(productList) {
        productGrid.innerHTML = '';
        productList.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <p><strong>Precio: $${product.price}</strong></p>
                <a href="${product.purchaseLink}" target="_blank" class="purchase-btn">Comprar</a>
            `;
            productGrid.appendChild(productCard);
        });
    }

    // Poblar las categorías en el filtro
    function populateCategories(products) {
        const categories = new Set(products.map(product => product.category));
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        });
    }

    // Filtrar productos por categoría
    categoryFilter.addEventListener('change', function() {
        const selectedCategory = categoryFilter.value;
        const filteredProducts = selectedCategory === 'all' ? products : products.filter(product => product.category === selectedCategory);
        displayProducts(filteredProducts);
    });
});
