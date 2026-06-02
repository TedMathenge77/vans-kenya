function order(product) {
  // 🔴 IMPORTANT: Replace this with your real WhatsApp number
  let phone = "254701484665"; 

  // Message that will be sent
  let message = `Hello, I want to order: ${product}`;

  // Create WhatsApp link
  let url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  // Open WhatsApp
  window.open(url, "_blank");
}