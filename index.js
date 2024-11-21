async function loadProducts() {
  const response = await fetch("https://fakestoreapi.com/products");

  // Handle response as text and parse it as JavaScript objects
  const text = await response.text();

  // Create a new Function to evaluate the text as JavaScript
  const products = new Function(`return ${text}`)();

  const grid = document.getElementById("product-grid");

  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h2>${product.title}</h2>
            <p>$${product.price.toFixed(2)}</p>
            <p>Rating: ${product.rating.rate}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
            <button onclick="addToWishlist(${
              product.id
            })">Add to Wishlist</button>`;
    grid.appendChild(card);
  });
}

function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (!cart.includes(id)) {
    cart.push(id);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert(`Added Product ID ${id} to Cart!`);
  }
}

function addToWishlist(id) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  if (!wishlist.includes(id)) {
    wishlist.push(id);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    updateWishlistCount();
    alert(`Added Product ID ${id} to Wishlist!`);
  }
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  document.getElementById("cart-count").innerText = `Cart: ${cart.length}`;
}

function updateWishlistCount() {
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  document.getElementById(
    "wishlist-count"
  ).innerText = `Wishlist: ${wishlist.length}`;
}

// Initialize the product loading and counts
document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
  updateCartCount();
  updateWishlistCount();
});
