document.addEventListener('DOMContentLoaded', function() {
    // --- Element Selectors ---
    const checkoutForm = document.querySelector('.checkout-form');
    const totalEl = document.getElementById('checkout-total');
    
    // --- eSewa Modal Elements ---
    const esewaModal = document.getElementById('esewa-modal');
    const esewaModalAmount = document.getElementById('esewa-modal-amount');
    const esewaConfirmBtn = document.getElementById('esewa-confirm-payment-btn');
    const esewaCloseBtn = document.getElementById('esewa-modal-close');
    const esewaForm = document.getElementById('esewa-form');

    // --- Khalti Configuration (if you still have it) ---
    // (Your Khalti config code would go here)


    // =================================================================
    //  NEW ESEWA PAYMENT HANDLER
    // =================================================================
    function handleEsewaPayment(totalAmount) {
        // Step 1: Populate the modal with the correct amount
        esewaModalAmount.textContent = `NPR ${totalAmount.toFixed(2)}`;
        
        // Step 2: Show the modal
        esewaModal.classList.remove('hidden');

        // The actual form submission is now handled by the button inside the modal
    }
    
    // Add event listener for the final confirmation button INSIDE the eSewa modal
    esewaConfirmBtn.addEventListener('click', function() {
        const totalAmountText = totalEl.textContent.replace('NPR', '').trim();
        const totalAmount = parseFloat(totalAmountText);

        // Populate the hidden eSewa form with transaction details
        document.getElementById('t-amt').value = totalAmount;
        document.getElementById('amt').value = totalAmount;
        document.getElementById('pid').value = `DNS-ORDER-${new Date().getTime()}`; // Unique ID

        // Submit the form to redirect to eSewa
        esewaForm.submit();
    });

    // Add event listener to close the eSewa modal if the user cancels
    esewaCloseBtn.addEventListener('click', () => {
        esewaModal.classList.add('hidden');
    });


    // =================================================================
    //  MAIN FORM SUBMISSION LOGIC
    // =================================================================
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Always prevent the default submission

            const paymentMethod = document.querySelector('input[name="payment"]:checked').value;

            if (paymentMethod === 'esewa') {
                const totalAmountText = totalEl.textContent.replace('NPR', '').trim();
                const totalAmount = parseFloat(totalAmountText);
                // Call our new function to show the confirmation modal
                handleEsewaPayment(totalAmount);

            } else if (paymentMethod === 'khalti') {
                // Your Khalti checkout logic here
                // khaltiCheckout.show({ amount: totalAmount * 100 });
                alert("Khalti payment goes here.");

            } else {
                alert("This payment method is not yet integrated.");
            }
        });
    }
    
    // ... (The rest of your `displayCheckoutCart` function and other code remains here) ...
});