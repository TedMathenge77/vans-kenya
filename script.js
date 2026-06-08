// ---------------- WHATSAPP ORDER FUNCTION ----------------
function order(product) {
  let phone = "254701484665"; // your WhatsApp number

  // Get size, location, and quantity fields by product ID (only exist in catalogue.html)
  let sizeField = document.getElementById("size-" + product);
  let locationField = document.getElementById("location-" + product);
  let qtyField = document.getElementById("qty-" + product);

  let size = sizeField ? sizeField.value : "";
  let location = locationField ? locationField.value : "";
  let qty = qtyField ? qtyField.value : "1";

  // Build message
  let message = `Hello, I want to order: ${product}\nSize: ${size || "[please enter]"}\nPickup location: ${location || "[please enter]"}\nQuantity: ${qty}`;

  // Open WhatsApp
  let url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

// ---------------- CART SYSTEM ----------------
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(product) {
  let sizeField = document.getElementById("size-" + product);
  let locationField = document.getElementById("location-" + product);
  let qtyField = document.getElementById("qty-" + product);

  let size = sizeField ? sizeField.value : "";
  let location = locationField ? locationField.value : "";
  let qty = qtyField ? parseInt(qtyField.value) : 1;

  let item = { product, size, location, qty, price: 2500 };

  cart.push(item);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(`${product} added to cart!`);
}

function updateCartCount() {
  let count = cart.reduce((sum, item) => sum + item.qty, 0);
  let badge = document.getElementById("cart-count");
  if (badge) badge.textContent = count;
}

function openCart() {
  let modal = document.querySelector(".cart-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.className = "cart-modal";
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <h2>Your Cart</h2>
    ${cart.map((item) => `
      <div class="cart-item">
        <span>${item.product} (${item.size || "Size?"}) x${item.qty}</span>
        <span>KES ${item.price * item.qty}</span>
      </div>
    `).join("")}
    <div class="cart-total">Total: KES ${cart.reduce((sum, item) => sum + item.price * item.qty, 0)}</div>
    <p><strong>Payment:</strong> Mpesa Paybill 123456, Account: VansKenya</p>
    <p><strong>Delivery:</strong> Enter your location during checkout</p>
    <button class="checkout-btn" onclick="checkout()">Checkout via WhatsApp</button>
    <button class="checkout-btn" onclick="clearCart()">Clear Cart</button>
    <button class="checkout-btn" onclick="closeCart()">Close</button>
  `;
  modal.classList.add("active");
}

function closeCart() {
  let modal = document.querySelector(".cart-modal");
  if (modal) modal.classList.remove("active");
}

function clearCart() {
  cart = [];
  localStorage.removeItem("cart");
  updateCartCount();
  closeCart();
  alert("Cart cleared!");
}

function checkout() {
  let phone = "254701484665";
  let summary = cart.map(item => `${item.product} (${item.size || "Size?"}) x${item.qty} @ KES ${item.price * item.qty}`).join("\n");
  let total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  let message = `Hello, I want to checkout:\n${summary}\nTotal: KES ${total}\n\nPayment: Mpesa\nPaybill: 123456\nAccount: VansKenya\n\nDelivery: [please enter location]\n\nFor help, call/WhatsApp: 0701484665`;

  let url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

// ---------------- EFFECTS ----------------
window.addEventListener("scroll", () => {
  const reveals = document.querySelectorAll(".reveal");
  for (let i = 0; i < reveals.length; i++) {
    const windowHeight = window.innerHeight;
    const revealTop = reveals[i].getBoundingClientRect().top;
    const revealPoint = 100;

    if (revealTop < windowHeight - revealPoint) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
});

window.addEventListener("scroll", () => {
  const header = document.querySelector(".main-header");
  if (window.scrollY > 50) {
    header.style.boxShadow = "0 2px 10px rgba(0,0,0,0.4)";
  } else {
    header.style.boxShadow = "none";
  }
});

document.addEventListener("DOMContentLoaded", updateCartCount);

// ---------------- MULTIPLE SLIDESHOWS WITH FADE ----------------
function startSlideshow(containerSelector, interval = 4000) {
  let slides = document.querySelectorAll(`${containerSelector} .slide`);
  let index = 0;

  if (slides.length > 0) {
    slides[0].style.opacity = 1; // show first immediately
  }

  function show() {
    let current = slides[index];
    let next = slides[(index + 1) % slides.length];

    current.style.opacity = 0;
    next.style.opacity = 1;

    index = (index + 1) % slides.length;
    setTimeout(show, interval);
  }

  if (slides.length > 1) {
    setTimeout(show, interval);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  startSlideshow(".hero-slideshow", 6000);       // Hero background slideshow (slower, calmer)
  startSlideshow(".slideshow-container", 4000);  // Categories slideshow (faster)
});
