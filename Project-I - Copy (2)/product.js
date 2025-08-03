document.addEventListener('DOMContentLoaded', function() {
    // --- Element Selectors ---
    const checkoutForm = document.querySelector('.checkout-form');
    const orderItemsContainer = document.getElementById('checkout-order-items');
    const totalEl = document.getElementById('checkout-total');
    // ... (other selectors for subtotal, etc.)

    // --- Khalti Checkout Configuration ---
    const khaltiConfig = {
        // Replace with your public key
        "publicKey": "test_public_key_dc74e0fd57cb46cd93832aee0a39d282",
        "productIdentity": "DNS-STORE-ORDER-123", // A unique ID for the product/order
        "productName": "DNS Store Order",
        "productUrl": "http://dnsstore.com/products",
        "paymentPreference": [
            "KHALTI",
            "EBANKING",
            "MOBILE_BANKING",
            "CONNECT_IPS",
            "SCT",
        ],
        "eventHandler": {
            onSuccess(payload) {
                // This function is called after the user completes the payment successfully.
                // IMPORTANT: Here you need to send the 'payload' to your backend server for verification.
                console.log("Khalti Payment Success:", payload);
                
                // For now, we will simulate success by clearing the cart and showing a message.
                // In a real app, do this ONLY after your server confirms the payment.
                localStorage.removeItem('cart');
                sessionStorage.setItem('orderPlacedSuccessfully', 'true');
                window.location.href = './index.html';
            },
            onError(error) {
                // This is called if an error occurs during the payment process.
                console.log("Khalti Payment Error:", error);
                alert("Khalti payment failed. Please try again.");
            },
            onClose() {
                // This is called when the user closes the payment popup without completing the payment.
                console.log('Khalti widget is closing');
            }
        }
    };

    const khaltiCheckout = new KhaltiCheckout(khaltiConfig);

    // --- Form Submission Logic ---
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
            const totalAmountText = totalEl.textContent.replace('NPR', '').trim();
            const totalAmount = parseFloat(totalAmountText);

            if (paymentMethod === 'khalti') {
                // Launch the Khalti checkout popup
                khaltiCheckout.show({ amount: totalAmount * 100 }); // Amount is in paisa
            } else if (paymentMethod === 'esewa') {
                // eSewa logic will be added here
                handleEsewaPayment(totalAmount);
            } else {
                // Handle direct bank transfer or other methods
                alert("This payment method is not yet integrated.");
            }
        });
    }
    
    // ... (The rest of your `displayCheckoutCart` function remains here)
    // The function that populates the order summary should be here.
});