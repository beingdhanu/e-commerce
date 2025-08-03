// document.addEventListener('DOMContentLoaded', function() {
//     // --- Selectors for page elements ---
//     const productNameEl = document.getElementById('product-name');
//     const productCategoryEl = document.getElementById('product-category');
//     const productPriceEl = document.getElementById('product-price');
//     const productImageEl = document.getElementById('product-image');
//     const productDescriptionEl = document.getElementById('product-description');
//     const addToCartBtn = document.getElementById('add-to-cart');
//     const quantityInput = document.getElementById('quantity');

//     // --- Get Product ID from URL ---
//     // This creates a URL object to easily access query parameters like "?id=1"
//     const urlParams = new URLSearchParams(window.location.search);
//     const productId = parseInt(urlParams.get('id'), 10);

//     // Find the product in our `products` array that matches the ID from the URL
//     const product = products.find(p => p.id === productId);

//     if (product) {
//         // --- Populate Page with Product Data ---
//         productNameEl.textContent = product.name;
//         productCategoryEl.textContent = product.category;
//         productPriceEl.textContent = `Rs. ${product.price.toFixed(2)}`;
//         productImageEl.src = product.image;
//         productImageEl.alt = product.name;
//         productDescriptionEl.textContent = product.description;

//         // --- "ADD TO CART" BUTTON EVENT LISTENER ---
//         addToCartBtn.addEventListener('click', function() {
//             // Load the current cart from localStorage
//             let cart = JSON.parse(localStorage.getItem('cart')) || [];

//             // Get the quantity the user selected
//             const quantity = parseInt(quantityInput.value, 10);

//             // Check if the product is already in the cart
//             const existingItemIndex = cart.findIndex(item => item.id === product.id);

//             if (existingItemIndex > -1) {
//                 // If it exists, just update the quantity
//                 cart[existingItemIndex].quantity += quantity;
//             } else {
//                 // If it's a new item, add it to the cart
//                 cart.push({
//                     id: product.id,
//                     name: product.name,
//                     price: product.price,
//                     image: product.image,
//                     quantity: quantity
//                 });
//             }

//             // Save the updated cart back to localStorage
//             localStorage.setItem('cart', JSON.stringify(cart));

//             // Give user feedback
//             addToCartBtn.textContent = 'Added!';
//             addToCartBtn.style.backgroundColor = '#28a745'; // Green color
//             setTimeout(() => {
//                 // Reset button after 2 seconds
//                 addToCartBtn.innerHTML = `
//                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
//                     Add to Cart`;
//                 addToCartBtn.style.backgroundColor = ''; // Revert to original color
//             }, 2000);
            
//             // Update the cart icon count in the header
//             updateCartIcon();
//         });
//     } else {
//         // If no product with that ID is found
//         document.querySelector('.product-details').innerHTML = '<h1>Product not found</h1>';
//     }

//     // This function must be accessible to update the header
//     function updateCartIcon() {
//         const cart = JSON.parse(localStorage.getItem('cart')) || [];
//         const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
//         const cartIcons = document.querySelectorAll('.cart-count');
//         cartIcons.forEach(icon => {
//             icon.textContent = totalItems;
//         });
//     }

//     // Call it once on page load
//     updateCartIcon();
// });




// This code runs only on the product-details.html page

document.addEventListener('DOMContentLoaded', function() {
    // --- Get all the elements we need from the page ---
    const productNameEl = document.getElementById('product-name');
    const productCategoryEl = document.getElementById('product-category');
    const productPriceEl = document.getElementById('product-price');
    const productImageEl = document.getElementById('product-image');
    const productDescriptionEl = document.getElementById('product-description');
    const addToCartBtn = document.getElementById('add-to-cart');
    const quantityInput = document.getElementById('quantity');

    // --- Figure out which product to display ---
    // 1. Get the URL, which looks like "...?id=1"
    const urlParams = new URLSearchParams(window.location.search);
    // 2. Get the value of the 'id' parameter
    const productId = parseInt(urlParams.get('id'));

    // 3. Use the getProductById function from your product.js file to find the product
    const product = getProductById(productId);

    // --- If the product was found, display its details ---
    if (product) {
        productNameEl.textContent = product.name;
        productCategoryEl.textContent = product.category;
        productPriceEl.textContent = `Rs. ${product.price.toFixed(2)}`;
        productImageEl.src = product.image;
        productImageEl.alt = product.name;
        productDescriptionEl.textContent = product.description;

        // --- THIS IS THE FIX: Add the click event listener to the button ---
        addToCartBtn.addEventListener('click', function() {
            // 1. Load the cart from the browser's memory
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            
            // 2. Get the quantity the user selected
            const quantity = parseInt(quantityInput.value, 10);

            // 3. Check if this product is already in the cart
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

            // 4. Save the updated cart back to the browser's memory
            localStorage.setItem('cart', JSON.stringify(cart));
            
            // 5. Update the cart icon in the header (using the function from your cart.js)
            if (typeof updateCartIcon === 'function') {
                updateCartIcon();
            } else if (typeof displayCart === 'function') {
                // Fallback to call displayCart which also updates the icon
                displayCart();
            }


            // 6. Give the user some visual feedback
            addToCartBtn.textContent = 'Added!';
            addToCartBtn.style.backgroundColor = '#28a745'; // Green color
            setTimeout(() => {
                // Change it back after 2 seconds
                addToCartBtn.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                    Add to Cart`;
                addToCartBtn.style.backgroundColor = ''; 
            }, 2000);
        });

    } else {
        // If no product with that ID exists, show an error message
        document.querySelector('.product-details').innerHTML = '<h1>Product not found.</h1>';
    }
});