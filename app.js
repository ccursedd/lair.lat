javascript
const products = JSON.parse(localStorage.getItem("products")) || [
  {
    name: "Black Luxury Watch",
    price: "$399",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49",
    category: "Luxury"
  },
  {
    name: "Future Headphones",
    price: "$249",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    category: "Technology"
  },
  {
    name: "Minimal Sneakers",
    price: "$189",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    category: "Fashion"
  }
];

const productsGrid = document.getElementById("productsGrid");

function renderProducts() {

  if (!productsGrid) return;

  productsGrid.innerHTML = "";

  products.forEach(product => {

    productsGrid.innerHTML += `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}">

        <div class="product-info">
          <h3>${product.name}</h3>
          <p>${product.category}</p>
          <div class="product-price">${product.price}</div>
        </div>
      </div>
    `;
  });
}

renderProducts();
