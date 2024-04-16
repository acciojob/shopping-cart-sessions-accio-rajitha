// This is the boilerplate code given for you
// You can modify this code
// Product data
// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Initialize cart array
let cart = [];

// Render product list
function renderProducts() {
  productList.innerHTML = '';
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${product.name} - $${product.price}
      <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
    `;
    productList.appendChild(li);
  });
}

// Add item to cart
function addToCart(productId) {
  const product = products.find(item => item.id === productId);
  if (product) {
    cart.push(product);
    renderCart();
    updateSessionStorage();
  }
}

// Render cart list
function renderCart() {
  cartList.innerHTML = '';
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// Clear cart
function clearCart() {
  cart = [];
  renderCart();
  updateSessionStorage();
}

// Update session storage
function updateSessionStorage() {
  sessionStorage.setItem('cart', JSON.stringify(cart));
}

// Load cart from session storage
function loadCartFromSessionStorage() {
  const cartData = sessionStorage.getItem('cart');
  if (cartData) {
    cart = JSON.parse(cartData);
    renderCart();
  }
}

// Event listeners
productList.addEventListener('click', (event) => {
  if (event.target.classList.contains('add-to-cart-btn')) {
    const productId = parseInt(event.target.dataset.id);
    addToCart(productId);
  }
});

clearCartBtn.addEventListener('click', clearCart);

// Initialize cart from session storage
loadCartFromSessionStorage();

// Initial render
renderProducts();
