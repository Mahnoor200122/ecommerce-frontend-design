document.addEventListener('DOMContentLoaded', function() {
    const wishlistItemsContainer = document.querySelector('.wishlist-items');
    const allProducts = JSON.parse(localStorage.getItem('allProducts')) || [];
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    function renderWishlist() {
        wishlistItemsContainer.innerHTML = '';
        
        if (wishlist.length === 0) {
            wishlistItemsContainer.innerHTML = '<p class="empty-wishlist">Your wishlist is empty</p>';
            return;
        }

        const wishlistProducts = allProducts.filter(product => 
            wishlist.includes(product.id)
        );

        wishlistProducts.forEach(product => {
            const itemElement = document.createElement('div');
            itemElement.className = 'product-item'; 
            itemElement.innerHTML = `
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
                    <a href="#" class="view-details">View details</a>
                </div>
                <button class="wishlist-btn active" data-id="${product.id}">
                    <i class="fas fa-heart text-danger"></i>
                </button>
            `;
            wishlistItemsContainer.appendChild(itemElement);
        });

        // Add click event to wishlist buttons
        document.querySelectorAll('.wishlist-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const productId = parseInt(this.dataset.id);
                toggleWishlist(productId);
                renderWishlist(); // Refresh the list after removal
            });
        });
    }

    function toggleWishlist(productId) {
        const index = wishlist.indexOf(productId);
        if (index === -1) {
            wishlist.push(productId);
        } else {
            wishlist.splice(index, 1);
        }
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        updateHeaderCounter();
    }

    function updateHeaderCounter() {
        const counter = document.querySelector('.wishlist-count');
        if (counter) {
            counter.textContent = wishlist.length;
        }
    }

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

    renderWishlist();
});