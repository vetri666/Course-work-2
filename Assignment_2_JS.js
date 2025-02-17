function generateReceipt() {
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const creditCard = document.getElementById('creditCard').value;
    const expiryMonth = document.getElementById('expiryMonth').value;
    const expiryYear = document.getElementById('expiryYear').value;

    // Item quantities
    const item1Qty = parseInt(document.getElementById('item1').value) || 0;
    const item2Qty = parseInt(document.getElementById('item2').value) || 0;
    const item3Qty = parseInt(document.getElementById('item3').value) || 0;
    const item4Qty = parseInt(document.getElementById('item4').value) || 0;
    const item5Qty = parseInt(document.getElementById('item5').value) || 0;

    // Prices of items
    const item1Price = 15;
    const item2Price = 20;
    const item3Price = 25;
    const item4Price = 30;
    const item5Price = 10;

    //exception
    let errors = [];

    // Validation of mandatory fields
    if (!name || !email) {
        errors.push("Name and Email are required.");
    }

    // Validating the credit card format (xxxx-xxxx-xxxx-xxxx)
    const creditCardRegex = /^\d{4}-\d{4}-\d{4}-\d{4}$/;
    if (!creditCardRegex.test(creditCard)) {
        errors.push("Credit Card format should be xxxx-xxxx-xxxx-xxxx.");
    }




    // Validating the credit card expiry month (MMM format)
    const expiryMonthRegex = /^(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)$/;
    if (!expiryMonthRegex.test(expiryMonth)) {
        errors.push("Expiry Month should be in MMM format.");
    }

    // Validate expiry year (yyyy format)
    const expiryYearRegex = /^\d{4}$/;
    if (!expiryYearRegex.test(expiryYear)) {
        errors.push("Expiry Year should be in yyyy format.");
    }

    // Validate item quantities (should be a positive integer)
    if (item1Qty < 0 || item2Qty < 0 || item3Qty < 0 || item4Qty < 0 || item5Qty < 0) {
        errors.push("Item quantities must be positive integers.");
    }

    // Display errors if any
    const errorMessages = document.getElementById('errorMessages');
    errorMessages.innerHTML = '';
    if (errors.length > 0) {
        errors.forEach(error => {
            const p = document.createElement('p');
            p.textContent = error;
            errorMessages.appendChild(p);
        });
        return;
        // Stop if there are errors
    }

    // Calculating total cost
    const totalCost = (item1Qty * item1Price) + (item2Qty * item2Price) + (item3Qty * item3Price) + (item4Qty * item4Price) + (item5Qty * item5Price);

    // Calculate donation (either $10 or 10% of total cost, whichever is higher)
    const donation = Math.max(10, totalCost * 0.1);

    // Get last 4 digits of credit card
    const last4Digits = creditCard.slice(-4);




    // Generate receipt
    const receiptOutput = document.getElementById('receiptOutput');
    receiptOutput.innerHTML = `
        <h2>Receipt</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Items Purchased:</strong></p>
        <ul>
            ${item1Qty > 0 ? `<li>Item 1: $${item1Price} x ${item1Qty}</li>` : ''}
            ${item2Qty > 0 ? `<li>Item 2: $${item2Price} x ${item2Qty}</li>` : ''}
            ${item3Qty > 0 ? `<li>Item 3: $${item3Price} x ${item3Qty}</li>` : ''}
            ${item4Qty > 0 ? `<li>Item 4: $${item4Price} x ${item4Qty}</li>` : ''}
            ${item5Qty > 0 ? `<li>Item 5: $${item5Price} x ${item5Qty}</li>` : ''}
        </ul>
        <p><strong>Total Cost:</strong> $${totalCost}</p>
        <p><strong>Donation:</strong> $${donation}</p>
        <p><strong>Credit Card:</strong> **** **** **** ${last4Digits}</p>
    `;
}