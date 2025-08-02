document.addEventListener('DOMContentLoaded', function() {
    // Countdown Timer
    function updateTimer() {
        const daysElement = document.getElementById('days');
        const hoursElement = document.getElementById('hours');
        const minutesElement = document.getElementById('minutes');
        const secondsElement = document.getElementById('seconds');

        let days = parseInt(daysElement.textContent);
        let hours = parseInt(hoursElement.textContent);
        let minutes = parseInt(minutesElement.textContent);
        let seconds = parseInt(secondsElement.textContent);

        if (seconds > 0) {
            seconds--;
        } else {
            seconds = 59;
            if (minutes > 0) {
                minutes--;
            } else {
                minutes = 59;
                if (hours > 0) {
                    hours--;
                } else {
                    hours = 23;
                    if (days > 0) {
                        days--;
                    } else {
                        // Timer ended
                        clearInterval(timerInterval);
                        return;
                    }
                }
            }
        }

        daysElement.textContent = days.toString().padStart(2, '0');
        hoursElement.textContent = hours.toString().padStart(2, '0');
        minutesElement.textContent = minutes.toString().padStart(2, '0');
        secondsElement.textContent = seconds.toString().padStart(2, '0');
    }

    const timerInterval = setInterval(updateTimer, 1000);

    // Cart functionality
    const cartCount = document.querySelector('.cart-count');
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    
    function updateCartCount() {
        const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
    
    updateCartCount();

    // Add to cart functionality for all product items
    document.querySelectorAll('.product-item, .recommended-item, .deal-item').forEach(item => {
        item.addEventListener('click', function() {
            let productName, productPrice, productImage;
            
            if (this.classList.contains('product-item')) {
                productName = this.querySelector('.product-name').textContent;
                productPrice = parseFloat(this.querySelector('.product-price').textContent.replace('$', ''));
                productImage = this.querySelector('img').src;
            } else if (this.classList.contains('recommended-item')) {
                productName = this.querySelector('.recommended-name').textContent;
                productPrice = parseFloat(this.querySelector('.recommended-price').textContent.replace('$', ''));
                productImage = this.querySelector('img').src;
            } else if (this.classList.contains('deal-item')) {
                // For demo purposes, we'll use placeholder data for deal items
                productName = "Special Deal Item";
                productPrice = 99.99;
                productImage = this.querySelector('img').src;
            }
            
            // Check if product already in cart
            const existingItem = cartItems.find(item => item.name === productName);
            
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cartItems.push({
                    id: Date.now().toString(),
                    name: productName,
                    price: productPrice,
                    quantity: 1,
                    image: productImage
                });
            }
            
            localStorage.setItem('cart', JSON.stringify(cartItems));
            updateCartCount();
            
            // Show added to cart notification
            const notification = document.createElement('div');
            notification.className = 'cart-notification';
            notification.textContent = `${productName} added to cart!`;
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.remove();
            }, 2000);
        });
    });

    // Form submission
    const supplierForm = document.querySelector('.supplier-form-box form');
    if (supplierForm) {
        supplierForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Your inquiry has been sent to suppliers!');
            this.reset();
        });
    }

    // Join Now button
    const joinBtn = document.querySelector('.join-btn');
    if (joinBtn) {
        joinBtn.addEventListener('click', function() {
            window.location.href = 'register.html';
        });
    }

    // Login button
    const loginBtn = document.querySelector('.login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            window.location.href = 'login.html';
        });
    }

    // Newsletter subscription
    const newsletterForm = document.querySelector('.newsletter');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input').value;
            if (email) {
                alert(`Thank you for subscribing with ${email}!`);
                this.querySelector('input').value = '';
            }
        });
    }

    // Mobile menu toggle
    const menuIcon = document.querySelector('.menu-icon');
    if (menuIcon) {
        menuIcon.addEventListener('click', function() {
            document.querySelector('.left-links').classList.toggle('active');
        });
    }
});

// Add some basic animations
document.addEventListener('DOMContentLoaded', function() {
    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.product-section, .recommended-section, .extra-services-section');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animation
    const sections = document.querySelectorAll('.product-section, .recommended-section, .extra-services-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
});