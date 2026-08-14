// Global variables for caching selected states
let currentSweet = "";
let currentPricePerKg = 0;

/**
 * Open the order form modal and set active sweet details
 */
function openOrderModal(sweetName, pricePerKg) {
    currentSweet = sweetName;
    currentPricePerKg = pricePerKg;
    
    document.getElementById("sweetName").innerText = sweetName;
    document.getElementById("quantity").value = "1";
    
    calculateTotal();
    document.getElementById("orderModal").style.display = "flex";
}

/**
 * Closes the order modal and resets form inputs
 */
function closeOrderModal() {
    document.getElementById("orderModal").style.display = "none";
    document.getElementById("orderForm").reset();
}

/**
 * Live price counter triggered on quantity inputs changes
 */
function calculateTotal() {
    const inputWeightValue = document.getElementById("quantity").value;
    const kgValue = parseFloat(inputWeightValue);
    
    if (!isNaN(kgValue) && kgValue > 0) {
        const computedSum = kgValue * currentPricePerKg;
        document.getElementById("totalPriceDisplay").innerText = "₹" + Math.round(computedSum);
    } else {
        document.getElementById("totalPriceDisplay").innerText = "₹0";
    }
}

/**
 * Prepares the formatted message and redirects the user directly to owner's WhatsApp chat
 */
function prepareWhatsAppMessage(event) {
    event.preventDefault(); // Default form redirect ko rokne ke liye

    const kgValue = document.getElementById("quantity").value;
    const nameValue = document.getElementById("customerName").value.trim();
    const phoneValue = document.getElementById("customerPhone").value.trim();
    const addressValue = document.getElementById("customerAddress").value.trim(); 
    const finalPrice = Math.round(parseFloat(kgValue) * currentPricePerKg);

    // WhatsApp Message Formatting (Bold styling ke sath)
    const message = `*Naya Mithai Order Aaya Hai!* 🏪\n\n` +
                    `*Mithai Name:* ${currentSweet}\n` +
                    `*Quantity:* ${kgValue} KG\n` +
                    `*Total Estimated Price:* ₹${finalPrice}\n\n` +
                    `*Customer Delivery Profile:*\n` +
                    `- Name: ${nameValue}\n` +
                    `- Contact No: ${phoneValue}\n` +
                    `- Full Address: ${addressValue}`;

    // ⚠️ YAHA APNA WHATSAPP NUMBER DAALEIN (Bina '+' sign ke, jaise: 919234216110)
    const ownerWhatsAppNumber = "919234216110"; 
    
    // URL safe string me convert karne ke liye encodeURIComponent
    const encodedMessage = encodeURIComponent(message);
    
    // Direct chat link setup with auto-filled text
    const whatsappURL = `https://whatsapp.com{ownerWhatsAppNumber}&text=${encodedMessage}`;

    // WhatsApp open karega new tab ya app me
    window.open(whatsappURL, "_blank");

    // Modal ko close karega
    closeOrderModal();
}

// Background par click karne se modal close karne ke liye
window.onclick = function(event) {
    const orderModal = document.getElementById("orderModal");
    if (event.target === orderModal) closeOrderModal();
};
