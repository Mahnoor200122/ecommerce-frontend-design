document.addEventListener('DOMContentLoaded', function() {
    // Product data 
    const allProducts = [
        {
            id: 1,
            title: "Premium Smartphone X2000 with 128GB Storage",
            price: 599.99,
            rating: 4.5,
            orders: 154,
            shipping: "Free shipping",
            description: "The latest smartphone with advanced features including 48MP camera, 6.5\" AMOLED display.",
            image: "images/samsung.jpg",
            category: "Smartphones",
            brand: "Samsung",
            featured: true,
            verified: true
        },
        {
            id: 2,
            title: "Men's T-shirt",
            price: 98,
            rating: 4,
            orders: 87,
            shipping: "Free shipping",
            description: "Good quality men's T-shirt light grey comfortable",
            image: "images/group 1004.png",
            category: "Men's wear",
            brand: "Khaadi",
            featured: false,
            verified: true
        },
        {
            id: 3,
            title: "Smart Watch Series 5 with Fitness Tracker",
            price: 249.99,
            rating: 5,
            orders: 203,
            shipping: "Free shipping",
            description: "Advanced smartwatch with heart rate monitoring, GPS tracking, water resistance.",
            image: "images/p1.png",
            category: "Wearables",
            brand: "Apple",
            featured: true,
            verified: true
        },
        {
            id: 4,
            title: "iPhone 14",
            price: 729.99,
            rating: 4.5,
            orders: 142,
            shipping: "Free shipping",
            description: "iPhone 14 and 14 Plus are available in three internal storage configurations: 128, 256, and 512 GB. Both models have 6 GB of RAM",
            image: "images/iphone14.jpg",
            category: "Smartphones",
            brand: "Apple",
            featured: false,
            verified: true
        },
        {
            id: 5,
            title: "4K Ultra HD Smart TV 55\"",
            price: 699.99,
            rating: 4,
            orders: 56,
            shipping: "Free shipping",
            description: "Immerse yourself in stunning 4K Ultra HD picture quality with this smart TV.",
            image: "images/smarttv.jpg",
            category: "Televisions",
            brand: "Lenovo",
            featured: true,
            verified: true
        },
        {
            id: 6,
            title: "Gaming Laptop Pro - RTX 3060",
            price: 1299.99,
            rating: 5,
            orders: 34,
            shipping: "Free shipping",
            description: "High-performance gaming laptop with NVIDIA RTX 3060, 16GB RAM, 1TB SSD.",
            image: "images/macbook.jpg",
            category: "Laptops",
            brand: "Apple",
            featured: true,
            verified: true
        },
        {
            id: 7,
            title: "DSLR Camera with 18-55mm Lens",
            price: 499.99,
            rating: 4.5,
            orders: 78,
            shipping: "Free shipping",
            description: "Professional DSLR camera with 24.2MP sensor and full HD video recording.",
            image: "images/canon.jpg",
            category: "Cameras",
            brand: "Canon",
            featured: false,
            verified: true
        },
        {
            id: 8,
            title: "Wireless Charging Pad",
            price: 29.99,
            rating: 3.5,
            orders: 215,
            shipping: "Free shipping",
            description: "Fast wireless charging pad compatible with all Qi-enabled devices.",
            image: "images/tablet.jpg",
            category: "Mobile accessory",
            brand: "Belkin",
            featured: false,
            verified: false
        },
        {
            id: 9,
            title: "Noise Cancelling Headphones",
            price: 199.99,
            rating: 4.5,
            orders: 92,
            shipping: "Free shipping",
            description: "Premium over-ear headphones with active noise cancellation technology.",
            image: "images/p4.png",
            category: "Electronics",
            brand: "Bose",
            featured: true,
            verified: true
        },
        {
            id: 10,
            title: "iPhone 14 blue",
            price: 89.99,
            rating: 4,
            orders: 124,
            shipping: "Free shipping",
            description: "iPhone 14 and 14 Plus are available in three internal storage configurations: 128, 256, and 512 GB. Both models have 6 GB of RAM",
            image: "images/mbl.png",
            category: "Smartphones",
            brand: "Apple",
            featured: false,
            verified: true
        },
        {
            id: 11,
            title: "Fitness Tracker Band",
            price: 49.99,
            rating: 3.5,
            orders: 187,
            shipping: "Free shipping",
            description: "Track your steps, heart rate, and sleep patterns with this comfortable band.",
            image: "images/fitness.jpg",
            category: "Electronics",
            brand: "Xiaomi",
            featured: false,
            verified: false
        },
        {
            id: 12,
            title: "External SSD 1TB",
            price: 129.99,
            rating: 5,
            orders: 63,
            shipping: "Free shipping",
            description: "Ultra-fast external SSD with read speeds up to 1050MB/s.",
            image: "images/sandick.jpg",
            category: "Modern tech",
            brand: "SanDisk",
            featured: true,
            verified: true
        }
    ];

    // DOM Elements 
    const productList = document.querySelector('.product-list');
    const filterBoxes = document.querySelectorAll('.filter-box');
    const priceRange = document.querySelector('.price-range');
    const minPriceInput = document.querySelector('.price-inputs input[placeholder="Min"]');
    const maxPriceInput = document.querySelector('.price-inputs input[placeholder="Max"]');
    const applyBtn = document.querySelector('.apply-btn');
    const viewOptions = document.querySelectorAll('.view-option');
    const searchInput = document.querySelector('.search-bar input');
    const searchBtn = document.querySelector('.search-btn');
    const pagination = document.querySelector('.pagination');
    const showCount = document.querySelector('.show-count');

    // Current state 
    let currentFilters = {
        category: [],
        brand: [],
        feature: [],
        condition: [],
        rating: [],
        minPrice: 0,
        maxPrice: 1000,
        verifiedOnly: false,
        featuredOnly: false,
        searchQuery: '',
        sortBy: 'default',
        currentPage: 1,
        itemsPerPage: 6
    };

    // Wishlist functionality
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    // Initialize the page
    function init() {
        localStorage.setItem('allProducts', JSON.stringify(allProducts));
        renderProducts();
        setupEventListeners();
        updateWishlistIcons();
        updateWishlistCounter();
    }

    // Set up event listeners
    function setupEventListeners() {
        filterBoxes.forEach(box => {
            const checkboxes = box.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                checkbox.addEventListener('change', handleFilterChange);
            });
        });

        priceRange.addEventListener('input', updatePriceInputs);
        minPriceInput.addEventListener('change', updatePriceRange);
        maxPriceInput.addEventListener('change', updatePriceRange);
        applyBtn.addEventListener('click', applyPriceFilter);

        viewOptions.forEach(option => {
            option.addEventListener('click', handleViewOptionClick);
        });

        searchInput.addEventListener('keyup', handleSearch);
        searchBtn.addEventListener('click', handleSearch);

        document.querySelector('.page-controls').addEventListener('click', handlePagination);

        // Updated wishlist 
        productList.addEventListener('click', function(e) {
            if (e.target.closest('.wishlist-btn')) {
                e.preventDefault();
                e.stopPropagation();
                const btn = e.target.closest('.wishlist-btn');
                const productId = parseInt(btn.dataset.id);
                toggleWishlist(productId);
            }
        });
    }

    // Wishlist functions 
    function toggleWishlist(productId) {
        const index = wishlist.indexOf(productId);
        if (index === -1) {
            wishlist.push(productId);
        } else {
            wishlist.splice(index, 1);
        }
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        updateWishlistIcons();
        updateWishlistCounter();
    }

    function updateWishlistIcons() {
        document.querySelectorAll('.wishlist-btn').forEach(btn => {
            const productId = parseInt(btn.dataset.id);
            const icon = btn.querySelector('i');
            if (wishlist.includes(productId)) {
                icon.classList.remove('far');
                icon.classList.add('fas', 'text-danger');
            } else {
                icon.classList.remove('fas', 'text-danger');
                icon.classList.add('far');
            }
        });
    }

    function updateWishlistCounter() {
        const counter = document.querySelector('.wishlist-count');
        if (counter) {
            counter.textContent = wishlist.length;
        }
    }

    // Filter products 
    function filterProducts() {
        return allProducts.filter(product => {
            if (product.price < currentFilters.minPrice || product.price > currentFilters.maxPrice) {
                return false;
            }
            if (currentFilters.category.length > 0 && !currentFilters.category.includes(product.category)) {
                return false;
            }
            if (currentFilters.brand.length > 0 && !currentFilters.brand.includes(product.brand)) {
                return false;
            }
            if (currentFilters.verifiedOnly && !product.verified) {
                return false;
            }
            if (currentFilters.featuredOnly && !product.featured) {
                return false;
            }
            if (currentFilters.searchQuery && 
                !product.title.toLowerCase().includes(currentFilters.searchQuery.toLowerCase())) {
                return false;
            }
            return true;
        });
    }

    // Sort products 
    function sortProducts(filteredProducts) {
        switch(currentFilters.sortBy) {
            case 'price-low':
                return filteredProducts.sort((a, b) => a.price - b.price);
            case 'price-high':
                return filteredProducts.sort((a, b) => b.price - a.price);
            case 'rating':
                return filteredProducts.sort((a, b) => b.rating - a.rating);
            case 'orders':
                return filteredProducts.sort((a, b) => b.orders - a.orders);
            default:
                return filteredProducts;
        }
    }

    // Render products to the DOM 
    function renderProducts() {
        const filteredProducts = filterProducts();
        const sortedProducts = sortProducts(filteredProducts);
        const startIndex = (currentFilters.currentPage - 1) * currentFilters.itemsPerPage;
        const endIndex = startIndex + currentFilters.itemsPerPage;
        const paginatedProducts = sortedProducts.slice(startIndex, endIndex);
        
        productList.innerHTML = '';
        
        paginatedProducts.forEach(product => {
            const isInWishlist = wishlist.includes(product.id);
            const productElement = document.createElement('div');
            productElement.className = 'product-item';
            productElement.innerHTML = `
                <a href="product-detail.html?id=${product.id}" class="product-item-link">
                    <div class="product-image-container">
                        <img src="${product.image}" alt="${product.title}" class="product-image">
                    </div>
                    <div class="product-details">
                        <h3 class="product-title">${product.title}</h3>
                        <div class="product-price">$${product.price.toFixed(2)}</div>
                        <div class="product-meta">
                            <div class="stars">
                                ${renderStars(product.rating)}
                            </div>
                            <span class="orders">${product.orders} orders</span>
                            <span class="shipping">${product.shipping}</span>
                        </div>
                        <p class="product-description">
                            ${product.description}
                        </p>
                        <span class="view-details">View details</span>
                    </div>
                </a>
                <button class="wishlist-btn" data-id="${product.id}">
                    <i class="${isInWishlist ? 'fas text-danger' : 'far'} fa-heart"></i>
                </button>
            `;
            productList.appendChild(productElement);
        });
        
        updatePaginationControls(filteredProducts.length);
    }

    // Render star ratings
    function renderStars(rating) {
        let stars = '';
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        
        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }
        
        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }
        
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star"></i>';
        }
        
        return stars;
    }

    // Update pagination controls
    function updatePaginationControls(totalProducts) {
        const totalPages = Math.ceil(totalProducts / currentFilters.itemsPerPage);
        const pageControls = document.querySelector('.page-controls');
        const showing = Math.min(currentFilters.itemsPerPage, totalProducts - ((currentFilters.currentPage - 1) * currentFilters.itemsPerPage));
        showCount.textContent = `Showing ${showing} of ${totalProducts}`;
        
        const prevBtn = pageControls.querySelector('.page-btn:first-child');
        const nextBtn = pageControls.querySelector('.page-btn:last-child');
        prevBtn.disabled = currentFilters.currentPage === 1;
        nextBtn.disabled = currentFilters.currentPage === totalPages || totalPages === 0;
        
        document.querySelectorAll('.page-btn:not(:first-child):not(:last-child)').forEach((btn, index) => {
            btn.style.display = index < totalPages ? 'block' : 'none';
            btn.classList.toggle('active', index + 1 === currentFilters.currentPage);
        });
    }

    // Event handlers (keep exactly as is)
    function handleFilterChange(e) {
        const filterType = e.target.closest('.filter-box').querySelector('.filter-title').textContent;
        const filterValue = e.target.nextSibling.textContent.trim();
        
        switch(filterType) {
            case 'Category':
                updateFilterArray('category', filterValue, e.target.checked);
                break;
            case 'Brands':
                updateFilterArray('brand', filterValue, e.target.checked);
                break;
            case 'Features':
                updateFilterArray('feature', filterValue, e.target.checked);
                break;
            case 'Condition':
                updateFilterArray('condition', filterValue, e.target.checked);
                break;
            case 'Ratings':
                updateFilterArray('rating', filterValue, e.target.checked);
                break;
        }
        
        currentFilters.currentPage = 1;
        renderProducts();
    }

    function updateFilterArray(filterType, value, isChecked) {
        const filterArray = currentFilters[filterType];
        if (isChecked) {
            filterArray.push(value);
        } else {
            const index = filterArray.indexOf(value);
            if (index > -1) {
                filterArray.splice(index, 1);
            }
        }
    }

    function updatePriceInputs() {
        minPriceInput.value = priceRange.min;
        maxPriceInput.value = priceRange.value;
    }

    function updatePriceRange() {
        priceRange.min = minPriceInput.value;
        priceRange.max = maxPriceInput.value;
    }

    function applyPriceFilter() {
        currentFilters.minPrice = parseFloat(minPriceInput.value) || 0;
        currentFilters.maxPrice = parseFloat(maxPriceInput.value) || 1000;
        currentFilters.currentPage = 1;
        renderProducts();
    }

    function handleViewOptionClick(e) {
        const option = e.currentTarget.textContent.trim();
        switch(option) {
            case 'Verified only':
                currentFilters.verifiedOnly = !currentFilters.verifiedOnly;
                e.currentTarget.classList.toggle('active', currentFilters.verifiedOnly);
                break;
            case 'Featured':
                currentFilters.featuredOnly = !currentFilters.featuredOnly;
                e.currentTarget.classList.toggle('active', currentFilters.featuredOnly);
                break;
            case 'Filter':
                break;
        }
        currentFilters.currentPage = 1;
        renderProducts();
    }

    function handleSearch(e) {
        if (e.type === 'click' || (e.type === 'keyup' && e.key === 'Enter')) {
            currentFilters.searchQuery = searchInput.value;
            currentFilters.currentPage = 1;
            renderProducts();
        }
    }

    function handlePagination(e) {
        if (e.target.classList.contains('page-btn')) {
            if (e.target.classList.contains('active') || e.target.disabled) return;
            
            if (e.target.textContent === '←') {
                currentFilters.currentPage--;
            } else if (e.target.textContent === '→') {
                currentFilters.currentPage++;
            } else {
                currentFilters.currentPage = parseInt(e.target.textContent);
            }
            
            renderProducts();
        }
    }

    // Initialize the page
    init();
});