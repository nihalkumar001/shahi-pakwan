 // Global variables for caching selected states
let currentSweet = "";
let currentPricePerKg = 0;

/**
 * Open the order form sheet window dialog overlay frame context
 */
function openOrderModal(sweetName, pricePerKg) {
    currentSweet = sweetName;
    currentPricePerKg = pricePerKg;
    
    // Inject active sweet values onto HTML modal tags
    document.getElementById("sweetName").innerText = sweetName;
    document.getElementById("quantity").value = "1";
    
    // Trigger total price compilation
    calculateTotal();
    
    // Bring the popup dialog structure view into viewport
    document.getElementById("orderModal").style.display = "flex";
}

/**
 * Collapses the dynamic interactive dialog layers layout panel
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
 * Native Browser Navigation Hook: Injecting text parameters before browser submits the GET request
 */
function prepareWhatsAppMessage(event) {
    // Reading live form inputs datasets safely
    const kgValue = document.getElementById("quantity").value;
    const nameValue = document.getElementById("customerName").value.trim();
    const phoneValue = document.getElementById("customerPhone").value.trim();
    const addressValue = document.getElementById("customerAddress").value.trim(); 
    const finalPrice = Math.round(parseFloat(kgValue) * currentPricePerKg);

    // Formatted structural string payload blueprint
    const message = `*Naya Mithai Order Aaya Hai!* 🏪\n\n` +
                    `*Mithai Name:* ${currentSweet}\n` +
                    `*Quantity:* ${kgValue} KG\n` +
                    `*Total Estimated Price:* ₹${finalPrice}\n\n` +
                    `*Customer Delivery Profile:*\n` +
                    `- Name: ${nameValue}\n` +
                    `- Contact No: ${phoneValue}\n` +
                    `- Full Address: ${addressValue}`;

    const form = document.getElementById("orderForm");
    
    // Cleaning stale hidden elements nodes if existing to avoid stacked parameters strings
    const oldInput = document.getElementById("hiddenWsText");
    if (oldInput) oldInput.remove();

    // Dynamically building a hidden form element field to carry the formatted query parameters
    const hiddenInput = document.createElement("input");
    hiddenInput.type = "hidden";
    hiddenInput.name = "text";
    hiddenInput.id = "hiddenWsText";
    hiddenInput.value = message;
    
    // Inject node inside the active sub-tree form structure
    form.appendChild(hiddenInput);

    // Fade modal interface view smoothly slightly after launch trigger sequence runs
    setTimeout(() => {
        closeOrderModal();
    }, 600);

    // Return true tells the HTML system to run native browser navigation bypass loops safely
    return true; 
}

// Background blur overlay window listeners to handle safe dialog unmount configurations
window.onclick = function(event) {
    const orderModal = document.getElementById("orderModal");
    if (event.target === orderModal) closeOrderModal();
};
