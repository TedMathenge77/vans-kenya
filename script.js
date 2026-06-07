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

// Add to Cart
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

// Update cart count badge
function updateCartCount() {
  let count = cart.reduce((sum, item) => sum + item.qty, 0);
  let badge = document.getElementById("cart-count");
  if (badge) badge.textContent = count;
}

// Open cart modal
function openCart() {
  let modal = document.querySelector(".cart-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.className = "cart-modal";
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <h2>Your Cart</h2>
    ${cart.map((item, i) => `
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

// Close cart modal
function closeCart() {
  let modal = document.querySelector(".cart-modal");
  if (modal) modal.classList.remove("active");
}

// Clear cart
function clearCart() {
  cart = [];
  localStorage.removeItem("cart");
  updateCartCount();
  closeCart();
  alert("Cart cleared!");
}

// Checkout flow (Mpesa + WhatsApp)
function checkout() {
  let phone = "254701484665";
  let summary = cart.map(item => `${item.product} (${item.size || "Size?"}) x${item.qty} @ KES ${item.price * item.qty}`).join("\n");
  let total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  let message = `Hello, I want to checkout:\n${summary}\nTotal: KES ${total}\n\nPayment: Mpesa\nPaybill: 123456\nAccount: VansKenya\n\nDelivery: [please enter location]\n\nFor help, call/WhatsApp: 0701484665`;

  let url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

// ---------------- EFFECTS ----------------
// Scroll reveal effect
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

// Sticky header shadow
window.addEventListener("scroll", () => {
  const header = document.querySelector(".main-header");
  if (window.scrollY > 50) {
    header.style.boxShadow = "0 2px 10px rgba(0,0,0,0.4)";
  } else {
    header.style.boxShadow = "none";
  }
});

// Initialize cart count on load
document.addEventListener("DOMContentLoaded", updateCartCount);

// ---------------- SLIDESHOW ----------------
let slideIndex = 0;
function showSlides() {
  let slides = document.getElementsByClassName("slide");
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) { slideIndex = 1 }
  slides[slideIndex - 1].style.display = "block";
  slides[slideIndex - 1].classList.add("fade");
  setTimeout(showSlides, 4000); // Change slide every 4 seconds
}

// Start slideshow when DOM is ready
document.addEventListener("DOMContentLoaded", showSlides);
