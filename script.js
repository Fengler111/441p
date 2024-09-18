//I am Fengler
// Page initialization function  
function init() {  
    var bodyClass = document.body.className;  
      
    // Hide all pages by default  
    var pages = document.querySelectorAll('.page');  
    for (var i = 0; i < pages.length; i++) {  
        pages[i].style.display = 'none';  
    }  
      
    // Show the appropriate page based on the body class  
    if (bodyClass.includes('index-page')) {  
        showPage('createUserPage');  
    } else if (bodyClass.includes('login-page')) {  
        showPage('loginPage');  
    }  
}  
  
/**  
 * Display the page with the specified ID and hide all other pages  
 *  
 * @param {string} pageId - The ID of the page to be displayed  
 */  
function showPage(pageId) {  
    // Hide all pages  
    var pages = document.querySelectorAll('.page');  
    for (var i = 0; i < pages.length; i++) {  
        pages[i].style.display = 'none';  
    }  
    // Display the page with the specified ID  
    var page = document.getElementById(pageId);  
    if (page) {  
        page.style.display = 'block';  
    }  
}  
  
// Call the init function when the page loads  
window.onload = init;
  
function setItemWithExpiry(key, value, ttl) {  
    const now = new Date();  
    
    const item = {  
        value: value,  
        expiry: now.getTime() + ttl,  
    };  
    localStorage.setItem(key, JSON.stringify(item));  
}  


function getItemWithExpiry(key) {  
    const itemStr = localStorage.getItem(key);  
 
    if (!itemStr) {  
        return null;  
    }  
    const item = JSON.parse(itemStr);  
    const now = new Date();  
   
    if (now.getTime() > item.expiry) {  
       
        localStorage.removeItem(key);  
        return null;  
    }  
    return item.value;  
}  

function createUser() {  
    
    var username = document.getElementById("username").value;  
    var password = document.getElementById("password").value;  

  
    setItemWithExpiry('username', username, 3 * 24 * 60 * 60 * 1000); 
    setItemWithExpiry('password', password, 3 * 24 * 60 * 60 * 1000); 

 
    alert('user ' + username + 'Created successfully!');  

 
}  
  
/**  
 * Verify login information. If correct, redirect to the shopping page. Otherwise, return to the user creation page  
 */  
function login() {  
     
    var loginUsername = document.getElementById("loginUsername").value;  
    var loginPassword = document.getElementById("loginPassword").value;  
  
    
    var storedUsername = getItemWithExpiry('username');  
    var storedPassword = getItemWithExpiry('password');  
  
      
    if (storedUsername === loginUsername && storedPassword === loginPassword) {  
        
        alert('user' + loginUsername + ' Login succeeded！');  
        showPage('shoppingPage');  
    } else {  
        
        showPage('createUserPage');  
        alert("Invalid username or password. Please try again.");  
    }  
}  
  
 
window.onload = init;  
  

  
/**  
 * Calculate the total price of items in the shopping cart and display it on the page  
 */  
var cart = {}; // Shopping Cart Object  
  
  // script.js  
document.addEventListener('DOMContentLoaded', function() {  
    // Get all product and cart summary elements  
    const products = document.querySelectorAll('.product');  
    const productTotalsElement = document.getElementById('product-totals');  
    const totalPriceElement = document.getElementById('total-price');  
  
    // Changes in the number of listeners input box  
    products.forEach(function(product) {  
        const quantityInput = product.querySelector('.quantity');  
        quantityInput.addEventListener('input', function() {  
            calculateTotals();  
        });  
    });  
  
    // Listen for the click event of the remove button  
    document.querySelectorAll('.remove').forEach(function(removeButton) {  
        removeButton.addEventListener('click', function() {  
            // Get the product index to be deleted  
            const productIndex = parseInt(removeButton.dataset.productIndex, 10);  
  
            // Check if the index is valid and reset the product quantity to 0  
            if (productIndex >= 0 && productIndex < products.length) {  
                products[productIndex].querySelector('.quantity').value = 0;  
                // Recalculate the total price  
                calculateTotals();  
            }  
        });  
    });  
  
    // Calculate total price  
    function calculateTotals() {  
        let totalPrice = 0;  
        let productTotalsHTML = '';  
  
        products.forEach(function(product) {  
            const quantity = parseInt(product.querySelector('.quantity').value, 10) || 0;  
            const price = parseFloat(product.dataset.price);  
  
            const subtotal = quantity * price;  
            totalPrice += subtotal;  
  
            productTotalsHTML += `<p>Course${product.textContent.match(/Course(\d+)/)[1]} total price is: $${subtotal.toFixed(2)}</p>`;  
        });  
  
        productTotalsElement.innerHTML = productTotalsHTML;  
        totalPriceElement.textContent = totalPrice.toFixed(2);  
    }  
  
     // The click event of the purchase button  
     function purchase() {  
        alert('Purchase successful!');  
        // Here, you can add purchasing logic, such as sending Ajax requests to the server, etc  
        // ...  
    }  
  
    // Clear the click event of the shopping cart button  
    function clearCart() {  
        products.forEach(function(product) {  
            product.querySelector('.quantity').value = 0; // Set quantity to 0  
        });  
        calculateTotals(); // Recalculate the total price 
    }  
  
    // Assuming the IDs of the purchase and delete buttons are 'purchase button' and 'clear part button', respectively  
    const purchaseButton = document.getElementById('purchase-button');  
    if (purchaseButton) {  
        purchaseButton.addEventListener('click', purchase);  
    }  
  
    const clearCartButton = document.getElementById('clear-cart-button');  
    if (clearCartButton) {  
        clearCartButton.addEventListener('click', clearCart);  
    }  
  
    // Calculate the total price initially  
    calculateTotals();  
});
document.getElementById('contactForm').addEventListener('submit', function(event) {  
    event.preventDefault(); // Block the default submission behavior of forms  
    
    // Clear previous success messages (if any)  
    document.getElementById('successMessage').style.display = 'none';  
    
    // AJAX requests or other backend processing logic can be added here to send data  
    // For demonstration purposes, we will only display a success message  
    
    // Display success message  
    document.getElementById('successMessage').style.display = 'block';  
    
    // Clear form fields (optional)  
    this.reset();  
  });
