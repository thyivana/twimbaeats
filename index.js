
import { menuData } from './data.js';

let cart = [];

const menuSection = document.getElementById("menu-section");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const totalPriceElement = document.getElementById("total-price");
const checkoutButton = document.getElementById("checkout-button");
const cartSidebar = document.getElementById("cart-sidebar");
const cartToggleBtn = document.getElementById("cart-toggle");

function displayMenu(category = "burgers") {
  menuSection.innerHTML = "";
  menuData.filter(item => item.category === category).forEach(item => {
    const div = document.createElement("div");
    div.classList.add("menu-item");
    div.innerHTML = `
      <h3>${item.name}</h3>
      <p>$${item.price.toFixed(2)}</p>
      <button onclick="addToCart(${item.id})">Add to Cart</button>
    `;
    menuSection.appendChild(div);
  });
}

function addToCart(itemId) {
  const item = menuData.find(p => p.id === itemId);
  if (item) {
    cart.push(item);
    saveCart();
    updateCart();
    alert(`${item.name} added to cart!`);
  } else {
    console.warn("Item not found:", itemId);
  }
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

function updateCart() {
  cartItems.innerHTML = "";
  let totalPrice = 0;

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "❌";
    removeBtn.style.marginLeft = "10px";
    removeBtn.onclick = () => removeFromCart(index);
    li.appendChild(removeBtn);
    cartItems.appendChild(li);

    totalPrice += item.price;
  });

  cartCount.textContent = cart.length;
  totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
}

function calculateTotal() {
  return cart.reduce((total, item) => total + item.price, 0);
}

checkoutButton.addEventListener("click", function () {
  if (cart.length > 0) {
    alert(`Checkout complete! Total price: $${calculateTotal().toFixed(2)}`);
    cart = [];
    updateCart();
  } else {
    alert("Your cart is empty. Please add items to the cart first.");
  }
});

cartToggleBtn.addEventListener("click", () => {
  cartSidebar.classList.toggle("active");
});

document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", function () {
    document.querySelector(".tab.active").classList.remove("active");
    this.classList.add("active");
    displayMenu(this.dataset.category);
  });
});

window.addToCart = addToCart;

displayMenu();
updateCart();
    