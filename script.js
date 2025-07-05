/* ---------- product catalogue ---------- */
/* ---------- product catalogue with REAL images ---------- */
const products = [
  {
    id: 1,
    name: "Apple",
    price: 35,
    img: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=400&q=60"
  },
  {
    id: 2,
    name: "Banana",
    price: 35,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREL-8788jl8vQerRj-pw3_XJ2gs5tJUvRJrw&s"   
  },
  {
    id: 3,
    name: "Grapes",
    price: 35,
    img: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=60"   // ✅ new
  },
  {
    id: 4,
    name: "Pineapple",
    price: 35,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU0005JVQ03xEdEkJ1BZGMnkQH9b6jjgLt7w&s"
  },
  {
    id: 5,
    name: "Orange",
    price: 35,
    img: "https://images.pexels.com/photos/207085/pexels-photo-207085.jpeg?cs=srgb&dl=pexels-pixabay-207085.jpg&fm=jpg"  
  },
  {
    id: 6,
    name: "Mango",
    price: 35,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL24eDnrVQ_XWzldg-prfJnmWMzDv790aMzg&s"
  }
];

/* ---------- cart helpers ---------- */
let cart = JSON.parse(localStorage.getItem("cart") || "[]");
const saveCart = () => localStorage.setItem("cart", JSON.stringify(cart));

function changeQty(id, delta) {
  const item = cart.find(p => p.id === id);
  if (item) {
    item.qty += delta;
    if (item.qty <= 0) cart = cart.filter(p => p.id !== id);
  } else if (delta > 0) {
    const prod = products.find(p => p.id === id);
    cart.push({ ...prod, qty: 1 });
  }
  saveCart();
  render();
}

function deleteItem(id) {
  cart = cart.filter(p => p.id !== id);
  saveCart();
  render();
}

/* ---------- render groceries ---------- */
function renderGroceries() {
  const list = document.getElementById("product-list");
  if (!list) return;
  list.innerHTML = "";
  products.forEach(p => {
    const qty = cart.find(c => c.id === p.id)?.qty || 0;
    list.insertAdjacentHTML("beforeend", `
      <div class="product-card">
        <img src="${p.img}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>1 kg</p>
        <div class="qty">
          <button data-action="dec" data-id="${p.id}">−</button>
          <span>${qty}</span>
          <button data-action="inc" data-id="${p.id}">+</button>
        </div>
        <p class="price">₹${p.price}</p>
      </div>
    `);
  });
}

/* ---------- render cart ---------- */
function renderCart() {
  const box   = document.getElementById("cart-container");
  const total = document.getElementById("total-amount");
  if (!box || !total) return;
  box.innerHTML = "";
  let sum = 0;
  cart.forEach(item => {
    sum += item.price * item.qty;
    box.insertAdjacentHTML("beforeend", `
      <div class="cart-item">
        <img src="${item.img}" alt="${item.name}">
        <div class="cart-item-details">
          <h4>${item.name}</h4>
          <p>₹${item.price} × ${item.qty}</p>
        </div>
        <div class="cart-item-qty">
          <button data-action="dec" data-id="${item.id}">−</button>
          <span>${item.qty}</span>
          <button data-action="inc" data-id="${item.id}">+</button>
          <button data-action="del" data-id="${item.id}" class="delete-btn">🗑️</button>
        </div>
      </div>
    `);
  });
  total.textContent = `₹${sum}`;
}

/* ---------- global click handler ---------- */
document.addEventListener("click", e => {
  const id     = Number(e.target.dataset.id);
  const action = e.target.dataset.action;
  if (!id || !action) return;
  if (action === "inc") changeQty(id, 1);
  if (action === "dec") changeQty(id, -1);
  if (action === "del") deleteItem(id);
});

/* ---------- master render ---------- */
function render() {
  renderGroceries();
  renderCart();
}
document.addEventListener("DOMContentLoaded", render);

