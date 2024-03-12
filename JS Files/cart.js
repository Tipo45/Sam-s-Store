// Cart to store items
// const cart = {};

// Function to add item to the cart
function addItem(product, price) {
  if (cart[product]) {
    // If the product is already in the cart, increase quantity
    cart[product].quantity++;
  } else {
    // If the product is not in the cart, add it with quantity 1
    cart[product] = { quantity: 1, price: price };
  }

  // Update the cart display
  updateCartDisplay();
}

// Function to remove item from the cart
function removeItem(product) {
  if (cart[product]) {
    // Remove the product from the cart
    delete cart[product];

    // Update the cart display
    updateCartDisplay();
  }
}

// Function to handle button clicks using event delegation
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("add-to-cart-button")) {
    const product = event.target.getAttribute("data-product");
    const price = parseFloat(event.target.getAttribute("data-price"));
    addItem(product, price);
  }
});

// Function to close the cart
function closeCart() {
  document.querySelector(".cart-open").style.display = "none";
}

// Function to open the cart (optional, you can implement it as needed)
function openCart() {
  document.querySelector(".cart-open").style.display = "block";
}

// Function to update the cart display
function updateCartDisplay() {
  const cartItemsElement = document.getElementById("cart-items");
  cartItemsElement.innerHTML = "";

  for (const product in cart) { 
    const item = cart[product];
    const listItem = document.createElement("div");
    listItem.innerHTML = `
      <span>${product} (Quantity: ${item.quantity})</span>
      <span>$${item.price * item.quantity}</span>
      <button onclick="removeItem('${product}')">Remove</button>
    `;
    cartItemsElement.appendChild(listItem);
  }
}

// Placeholder function for checkout (replace with your actual checkout logic)
// function checkout() {
//   alert('Checkout logic goes here!');
// }
