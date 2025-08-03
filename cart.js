// ====================================================================
//  NEW: Central function to add items to the cart.
//  This function can now be called from any other script.
// ====================================================================
function addToCart(product, quantity = 1) {
    if (!product) {
        console.error("addToCart: Product is not valid.");
        return;
    }

    // 1. Load the current cart from the browser's memory
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // 2. Check if this product is already in the cart
    const existingItemIndex = cart.findIndex(item => item.id === product.id);

    if (existingItemIndex > -1) {
        // If yes, just increase its quantity
        cart[existingItemIndex].quantity += quantity;
    } else {
        // If no, add it as a new item
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }

    // 3. Save the updated cart back to the browser's memory
    localStorage.setItem('cart', JSON.stringify(cart));

    // 4. Update the cart icon in the header
    updateCartIcon();
}

// ====================================================================
//  The rest of your cart.js file remains mostly the same
// ====================================================================

// Function to update the cart icon count in the header
function updateCartIcon() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartIcons = document.querySelectorAll('.cart-count');
    cartIcons.forEach(icon => {
        icon.textContent = totalItems;
    });
}


document.addEventListener('DOMContentLoaded', function() {
    const cartItemsList = document.getElementById('cart-items-list');
    const subtotalEl = document.getElementById('subtotal');
    const totalEl = document.getElementById('total');
    const shippingEl = document.getElementById('shipping');
    const shippingMessageEl = document.getElementById('shipping-message');
    const emptyCartEl = document.getElementById('empty-cart');
    const cartContentEl = document.getElementById('cart-content');
    const cartItemsCountEl = document.querySelector('.cart-items-count');
    const clearCartBtn = document.getElementById('clear-cart');

    function displayCart() {
        if (!cartContentEl || !emptyCartEl) {
            updateCartIcon(); // Just update icon on non-cart pages
            return;
        }
        
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        if (cart.length === 0) {
            emptyCartEl.style.display = 'block';
            cartContentEl.style.display = 'none';
        } else {
            emptyCartEl.style.display = 'none';
            cartContentEl.style.display = 'grid';

            cartItemsList.innerHTML = '';
            let subtotal = 0;

            cart.forEach((item, index) => {
                const itemTotal = item.price * item.quantity;
                subtotal += itemTotal;
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartItem.innerHTML = `
                    <div class="cart-item-image"><img src="${item.image}" alt="${item.name}"></div>
                    <div class="cart-item-details">
                        <h3>${item.name}</h3>
                        <p>Price: Rs. ${item.price.toFixed(2)}</p>
                        <div class="quantity-control">
                            <button class="quantity-btn" data-index="${index}" data-action="decrease">-</button>
                            <span class="quantity">${item.quantity}</span>
                            <button class="quantity-btn" data-index="${index}" data-action="increase">+</button>
                        </div>
                    </div>
                    <div class="cart-item-total">Rs. ${itemTotal.toFixed(2)}</div>
                    <button class="remove-item" data-index="${index}">×</button>
                `;
                cartItemsList.appendChild(cartItem);
            });

            const freeShippingThreshold = 2000;
            let shippingCost = (subtotal < freeShippingThreshold && subtotal > 0) ? 100 : 0;
            shippingMessageEl.style.display = (shippingCost > 0) ? 'block' : 'none';
            shippingMessageEl.textContent = `Add Rs. ${(freeShippingThreshold - subtotal).toFixed(2)} more for free shipping.`;
            
            const total = subtotal + shippingCost;
            subtotalEl.textContent = `Rs. ${subtotal.toFixed(2)}`;
            shippingEl.textContent = subtotal === 0 ? 'Rs. 0.00' : (shippingCost === 0 ? 'Free' : `Rs. ${shippingCost.toFixed(2)}`);
            totalEl.textContent = `Rs. ${total.toFixed(2)}`;
            cartItemsCountEl.textContent = `${cart.length} Items`;
        }
        updateCartIcon();
    }
    
    function updateCartStateAndRedisplay() {
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
    }

    if (cartItemsList) {
        cartItemsList.addEventListener('click', function(event) {
            const target = event.target;
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            if (target.matches('.quantity-btn')) {
                const index = parseInt(target.dataset.index, 10);
                if (target.dataset.action === 'increase') cart[index].quantity++;
                else if (target.dataset.action === 'decrease') {
                    cart[index].quantity--;
                    if (cart[index].quantity <= 0) cart.splice(index, 1);
                }
            }
            if (target.matches('.remove-item')) {
                const index = parseInt(target.dataset.index, 10);
                cart.splice(index, 1);
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            displayCart();
        });
    }

    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', function() {
            localStorage.removeItem('cart');
            displayCart();
        });
    }

    displayCart();
});// ====================================================================
//  NEW: Central function to add items to the cart.
//  This function can now be called from any other script.
// ====================================================================
function addToCart(product, quantity = 1) {
    if (!product) {
        console.error("addToCart: Product is not valid.");
        return;
    }

    // 1. Load the current cart from the browser's memory
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // 2. Check if this product is already in the cart
    const existingItemIndex = cart.findIndex(item => item.id === product.id);

    if (existingItemIndex > -1) {
        // If yes, just increase its quantity
        cart[existingItemIndex].quantity += quantity;
    } else {
        // If no, add it as a new item
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }

    // 3. Save the updated cart back to the browser's memory
    localStorage.setItem('cart', JSON.stringify(cart));

    // 4. Update the cart icon in the header
    updateCartIcon();
}

// ====================================================================
//  The rest of your cart.js file remains mostly the same
// ====================================================================

// Function to update the cart icon count in the header
function updateCartIcon() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartIcons = document.querySelectorAll('.cart-count');
    cartIcons.forEach(icon => {
        icon.textContent = totalItems;
    });
}


document.addEventListener('DOMContentLoaded', function() {
    const cartItemsList = document.getElementById('cart-items-list');
    const subtotalEl = document.getElementById('subtotal');
    const totalEl = document.getElementById('total');
    const shippingEl = document.getElementById('shipping');
    const shippingMessageEl = document.getElementById('shipping-message');
    const emptyCartEl = document.getElementById('empty-cart');
    const cartContentEl = document.getElementById('cart-content');
    const cartItemsCountEl = document.querySelector('.cart-items-count');
    const clearCartBtn = document.getElementById('clear-cart');

    function displayCart() {
        if (!cartContentEl || !emptyCartEl) {
            updateCartIcon(); // Just update icon on non-cart pages
            return;
        }
        
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        if (cart.length === 0) {
            emptyCartEl.style.display = 'block';
            cartContentEl.style.display = 'none';
        } else {
            emptyCartEl.style.display = 'none';
            cartContentEl.style.display = 'grid';

            cartItemsList.innerHTML = '';
            let subtotal = 0;

            cart.forEach((item, index) => {
                const itemTotal = item.price * item.quantity;
                subtotal += itemTotal;
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartItem.innerHTML = `
                    <div class="cart-item-image"><img src="${item.image}" alt="${item.name}"></div>
                    <div class="cart-item-details">
                        <h3>${item.name}</h3>
                        <p>Price: Rs. ${item.price.toFixed(2)}</p>
                        <div class="quantity-control">
                            <button class="quantity-btn" data-index="${index}" data-action="decrease">-</button>
                            <span class="quantity">${item.quantity}</span>
                            <button class="quantity-btn" data-index="${index}" data-action="increase">+</button>
                        </div>
                    </div>
                    <div class="cart-item-total">Rs. ${itemTotal.toFixed(2)}</div>
                    <button class="remove-item" data-index="${index}">×</button>
                `;
                cartItemsList.appendChild(cartItem);
            });

            const freeShippingThreshold = 2000;
            let shippingCost = (subtotal < freeShippingThreshold && subtotal > 0) ? 100 : 0;
            shippingMessageEl.style.display = (shippingCost > 0) ? 'block' : 'none';
            shippingMessageEl.textContent = `Add Rs. ${(freeShippingThreshold - subtotal).toFixed(2)} more for free shipping.`;
            
            const total = subtotal + shippingCost;
            subtotalEl.textContent = `Rs. ${subtotal.toFixed(2)}`;
            shippingEl.textContent = subtotal === 0 ? 'Rs. 0.00' : (shippingCost === 0 ? 'Free' : `Rs. ${shippingCost.toFixed(2)}`);
            totalEl.textContent = `Rs. ${total.toFixed(2)}`;
            cartItemsCountEl.textContent = `${cart.length} Items`;
        }
        updateCartIcon();
    }
    
    function updateCartStateAndRedisplay() {
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
    }

    if (cartItemsList) {
        cartItemsList.addEventListener('click', function(event) {
            const target = event.target;
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            if (target.matches('.quantity-btn')) {
                const index = parseInt(target.dataset.index, 10);
                if (target.dataset.action === 'increase') cart[index].quantity++;
                else if (target.dataset.action === 'decrease') {
                    cart[index].quantity--;
                    if (cart[index].quantity <= 0) cart.splice(index, 1);
                }
            }
            if (target.matches('.remove-item')) {
                const index = parseInt(target.dataset.index, 10);
                cart.splice(index, 1);
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            displayCart();
        });
    }

    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', function() {
            localStorage.removeItem('cart');
            displayCart();
        });
    }

    displayCart();
});