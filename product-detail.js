document.addEventListener('DOMContentLoaded', function() {
    // ========== Image Gallery Functionality ==========
    const thumbnails = document.querySelectorAll('.thumbnail img');
    const mainImage = document.querySelector('.main-image img');
    
    // Set first thumbnail as active by default
    if (thumbnails.length > 0) {
        thumbnails[0].parentElement.classList.add('active');
    }
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // Change main image
            mainImage.src = this.src;
            
            // Update active thumbnail
            thumbnails.forEach(thumb => thumb.parentElement.classList.remove('active'));
            this.parentElement.classList.add('active');
        });
    });

    // ========== Quantity Selector ==========
    const minusBtn = document.querySelector('.qty-btn.minus');
    const plusBtn = document.querySelector('.qty-btn.plus');
    const qtyInput = document.querySelector('.qty-input');
    
    minusBtn.addEventListener('click', function() {
        let currentVal = parseInt(qtyInput.value);
        if (currentVal > 1) {
            qtyInput.value = currentVal - 1;
        }
    });
    
    plusBtn.addEventListener('click', function() {
        let currentVal = parseInt(qtyInput.value);
        qtyInput.value = currentVal + 1;
    });
    
    qtyInput.addEventListener('change', function() {
        if (isNaN(this.value) || this.value < 1) {
            this.value = 1;
        }
    });

    // ========== Add to Cart Functionality ==========
    const addToCartBtn = document.querySelector('.add-to-cart');
    const cartModal = document.createElement('div');
    cartModal.className = 'cart-modal';
    cartModal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h3>Item Added to Cart</h3>
            <div class="modal-product">
                <div class="modal-product-image">
                    <img src="${mainImage.src}" alt="Product Image">
                </div>
                <div class="modal-product-info">
                    <h4 class="modal-product-name">Men's Long Sleeve T-shirt Cotton Base Layer Slim Muscle</h4>
                    <p>Quantity: <span class="modal-product-qty">1</span></p>
                    <p>Price: $<span class="modal-product-price">98.00</span></p>
                </div>
            </div>
            <div class="modal-buttons">
                <button class="continue-shopping">Continue Shopping</button>
                <button class="view-cart">View Cart</button>
            </div>
        </div>
    `;
    document.body.appendChild(cartModal);
    
    addToCartBtn.addEventListener('click', function() {
        const quantity = parseInt(qtyInput.value);
        const price = 98.00;
        const product = {
            id: "TSH-2023-MEN",
            name: "Men's Long Sleeve T-shirt Cotton Base Layer Slim Muscle",
            price: price,
            image: mainImage.src,
            quantity: quantity,
            desc: "Size: medium, Color: black, Material: cotton"
        };
        
        // Update modal with product info
        document.querySelector('.modal-product-name').textContent = product.name;
        document.querySelector('.modal-product-qty').textContent = quantity;
        document.querySelector('.modal-product-price').textContent = (product.price * quantity).toFixed(2);
        
        // Add to cart
        addToCart(product);
        
        // Show modal
        cartModal.style.display = 'block';
    });
    
    // Close modal functionality
    document.querySelector('.close-modal')?.addEventListener('click', function() {
        cartModal.style.display = 'none';
    });
    
    document.querySelector('.continue-shopping')?.addEventListener('click', function() {
        cartModal.style.display = 'none';
    });
    
    document.querySelector('.view-cart')?.addEventListener('click', function() {
        window.location.href = 'cart.html';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });

    // ========== Cart Management Functions ==========
    function addToCart(product) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Check if product already in cart
        const existingItemIndex = cart.findIndex(item => item.id === product.id);
        
        if (existingItemIndex !== -1) {
            // Update quantity if product exists
            cart[existingItemIndex].quantity += product.quantity;
        } else {
            // Add new item to cart
            cart.push(product);
        }
        
        // Save to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Update cart count
        updateCartCount();
    }
    
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        
        // Update cart count in header
        const cartCountElements = document.querySelectorAll('.cart span');
        cartCountElements.forEach(el => {
            el.textContent = `Cart (${totalItems})`;
        });
    }
    
    // Initialize cart count on page load
    updateCartCount();

    // ========== Tab Switching Functionality ==========
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Initialize first tab as active
    if (tabs.length > 0) {
        tabs[0].classList.add('active');
    }
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
        });
    });

    // ========== Save for Later Functionality ==========
    const saveForLaterBtn = document.querySelector('.save-for-later');
    if (saveForLaterBtn) {
        saveForLaterBtn.addEventListener('click', function() {
            const product = {
                id: "TSH-2023-MEN",
                name: "Men's Long Sleeve T-shirt Cotton Base Layer Slim Muscle",
                price: 98.00,
                image: mainImage.src,
                desc: "Size: medium, Color: black, Material: cotton"
            };
            
            let savedItems = JSON.parse(localStorage.getItem('savedItems')) || [];
            savedItems.push(product);
            localStorage.setItem('savedItems', JSON.stringify(savedItems));
            
            // Visual feedback
            const heartIcon = this.querySelector('i');
            heartIcon.classList.remove('far');
            heartIcon.classList.add('fas');
            heartIcon.style.color = '#e74c3c';
            
            setTimeout(() => {
                heartIcon.classList.remove('fas');
                heartIcon.classList.add('far');
                heartIcon.style.color = '';
            }, 1000);
        });
    }
});