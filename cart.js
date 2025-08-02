document.addEventListener('DOMContentLoaded', function() {
    // Load cart and saved items from localStorage
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    let savedItems = JSON.parse(localStorage.getItem('savedItems')) || [];

    // Initialize default saved items if empty
    if (savedItems.length === 0) {
        savedItems = [
            {
                id: "EB-2023",
                name: "Wireless Earbuds with charging case",
                price: 99.50,
                image: "images/tab.png",
                desc: "Wireless Earbuds with charging case"
            },
            {
                id: "PS-2023",
                name: "Phone stand with wireless charger",
                price: 99.50,
                image: "images/mbl.png",
                desc: "Phone stand with wireless charger"
            },
            {
                id: "SL-2023",
                name: "Smartphone lens kit",
                price: 99.50,
                image: "images/p1.png",
                desc: "Smartphone lens kit"
            },
            {
                id: "PC-2023",
                name: "Phone case with card holder",
                price: 99.50,
                image: "images/p2.png",
                desc: "Phone case with card holder"
            }
        ];
        localStorage.setItem('savedItems', JSON.stringify(savedItems));
    }

    // DOM Elements
    const cartContainer = document.querySelector('.cart-items');
    const savedContainer = document.querySelector('.saved-items');
    const cartCount = document.querySelector('.cart-count');
    const cartHeader = document.querySelector('.cart-header');
    const subtotalElement = document.querySelector('.summary-row:nth-child(2) span:last-child');
    const discountElement = document.querySelector('.summary-row:nth-child(3) span:last-child');
    const taxElement = document.querySelector('.summary-row:nth-child(4) span:last-child');
    const totalElement = document.querySelector('.summary-row.total span:last-child');
    const checkoutBtn = document.querySelector('.checkout-btn');

    // Initialize the page
    function initPage() {
        renderCartItems();
        renderSavedItems();
        updateCartHeader();
        updateCartCount();
        calculateTotals();
        setupEventListeners();
    }

    // Calculate and update order summary totals
    function calculateTotals() {
        if (!subtotalElement || !discountElement || !taxElement || !totalElement) return;
        
        // Calculate subtotal (sum of price * quantity for all items)
        const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
        
        // Fixed discount for demo (you can modify this as needed)
        const discount = 60.00;
        
        // Calculate tax (14% of subtotal)
        const tax = subtotal * 0.14;
        
        // Calculate total (subtotal - discount + tax)
        const total = subtotal - discount + tax;
        
        // Update the DOM elements
        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        discountElement.textContent = `-$${discount.toFixed(2)}`;
        taxElement.textContent = `$${tax.toFixed(2)}`;
        totalElement.textContent = `$${total.toFixed(2)}`;
    }

    // Render cart items
    function renderCartItems() {
        if (!cartContainer) return;
        
        cartContainer.innerHTML = '';
        
        if (cartItems.length === 0) {
            cartContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
            calculateTotals(); // Update totals when cart is empty
            return;
        }
        
        cartItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.dataset.id = item.id;
            
            itemElement.innerHTML = `
                <div class="item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="item-details">
                    <div class="item-title">${item.name}</div>
                    <div class="item-desc">${item.desc}</div>
                </div>
                <div class="item-price">$${item.price.toFixed(2)}</div>
                <div class="item-quantity">
                    <button class="quantity-btn minus">-</button>
                    <input type="text" class="quantity-input" value="${item.quantity}">
                    <button class="quantity-btn plus">+</button>
                </div>
                <div class="remove-item">Remove</div>
            `;
            
            cartContainer.appendChild(itemElement);
        });

        // Add cart actions at the end
        const actionsElement = document.createElement('div');
        actionsElement.className = 'cart-actions';
        actionsElement.innerHTML = `
            <div class="back-to-shop">
                <i class="fas fa-arrow-left"></i> Back to shop
            </div>
            <div class="remove-all">
                Remove all
            </div>
        `;
        cartContainer.appendChild(actionsElement);
    }

    // Render saved for later items
    function renderSavedItems() {
        if (!savedContainer) return;
        
        savedContainer.innerHTML = '';
        
        if (savedItems.length === 0) {
            savedContainer.innerHTML = '<p class="empty-saved">No items saved for later</p>';
            return;
        }
        
        savedItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'saved-item';
            itemElement.dataset.id = item.id;
            
            itemElement.innerHTML = `
                <div class="saved-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="saved-details">
                    <div class="saved-title">${item.name}</div>
                    <div class="saved-desc">${item.desc}</div>
                </div>
                <div class="saved-price">$${item.price.toFixed(2)}</div>
                <div class="saved-actions">
                    <button class="move-to-cart">Move to cart</button>
                    <button class="remove-saved">Remove</button>
                </div>
            `;
            
            savedContainer.appendChild(itemElement);
        });
    }

    // Update cart header with item count
    function updateCartHeader() {
        if (cartHeader) {
            const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
            cartHeader.textContent = `My Cart (${totalItems} ${totalItems === 1 ? 'item' : 'items'})`;
        }
    }

    // Update cart count in header
    function updateCartCount() {
        if (cartCount) {
            const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
            cartCount.textContent = totalItems;
        }
    }

    // Update localStorage with current cart/saved items
    function updateStorage() {
        localStorage.setItem('cart', JSON.stringify(cartItems));
        localStorage.setItem('savedItems', JSON.stringify(savedItems));
    }

    // Setup event listeners
    function setupEventListeners() {
        // Back to shop button
        document.addEventListener('click', function(e) {
            if (e.target.closest('.back-to-shop')) {
                window.location.href = 'index.html';
            }
        });

        // Quantity buttons
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('quantity-btn')) {
                const itemElement = e.target.closest('.cart-item');
                if (!itemElement) return;
                
                const itemId = itemElement.dataset.id;
                const item = cartItems.find(item => item.id === itemId);
                const input = itemElement.querySelector('.quantity-input');
                
                if (e.target.classList.contains('plus')) {
                    item.quantity++;
                } else if (e.target.classList.contains('minus') && item.quantity > 1) {
                    item.quantity--;
                }
                
                input.value = item.quantity;
                updateStorage();
                updateCartCount();
                updateCartHeader();
                calculateTotals(); // Update totals when quantity changes
            }
        });

        // Quantity input changes
        document.addEventListener('change', function(e) {
            if (e.target.classList.contains('quantity-input')) {
                const itemElement = e.target.closest('.cart-item');
                if (!itemElement) return;
                
                const itemId = itemElement.dataset.id;
                const item = cartItems.find(item => item.id === itemId);
                const newQuantity = parseInt(e.target.value) || 1;
                
                item.quantity = newQuantity;
                e.target.value = newQuantity;
                updateStorage();
                updateCartCount();
                updateCartHeader();
                calculateTotals(); // Update totals when quantity changes
            }
        });

        // Remove item from cart
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('remove-item')) {
                const itemElement = e.target.closest('.cart-item');
                if (!itemElement) return;
                
                const itemId = itemElement.dataset.id;
                cartItems = cartItems.filter(item => item.id !== itemId);
                updateStorage();
                renderCartItems();
                updateCartCount();
                updateCartHeader();
                calculateTotals(); // Update totals when item is removed
            }
        });

        // Remove all items
        const removeAllBtn = document.querySelector('.remove-all');
        if (removeAllBtn) {
            removeAllBtn.addEventListener('click', function() {
                cartItems = [];
                updateStorage();
                renderCartItems();
                updateCartCount();
                updateCartHeader();
                calculateTotals(); // Update totals when all items are removed
            });
        }

        // Move to cart from saved items
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('move-to-cart')) {
                const itemElement = e.target.closest('.saved-item');
                if (!itemElement) return;
                
                const itemId = itemElement.dataset.id;
                const itemIndex = savedItems.findIndex(item => item.id === itemId);
                
                if (itemIndex !== -1) {
                    const item = savedItems[itemIndex];
                    // Check if item already in cart
                    const existingCartItem = cartItems.find(cartItem => cartItem.id === itemId);
                    
                    if (existingCartItem) {
                        existingCartItem.quantity += 1;
                    } else {
                        // Add to cart with quantity 1
                        cartItems.push({...item, quantity: 1});
                    }
                    
                    // Remove from saved items
                    savedItems.splice(itemIndex, 1);
                    
                    updateStorage();
                    renderCartItems();
                    renderSavedItems();
                    updateCartCount();
                    updateCartHeader();
                    calculateTotals(); // Update totals when item is moved to cart
                }
            }
        });

        // Remove from saved items
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('remove-saved')) {
                const itemElement = e.target.closest('.saved-item');
                if (!itemElement) return;
                
                const itemId = itemElement.dataset.id;
                savedItems = savedItems.filter(item => item.id !== itemId);
                updateStorage();
                renderSavedItems();
            }
        });

        // Checkout button functionality
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', function() {
                if (cartItems.length === 0) {
                    alert('Your cart is empty. Please add items before checkout.');
                    return;
                }
                
                // In a real application, you would redirect to a checkout page
                // For now, we'll just show a confirmation
                const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                alert(`Proceeding to checkout. Total amount: $${total.toFixed(2)}\n\n`);
                
                
            });
        }
    }

    // Initialize the page
    initPage();
});