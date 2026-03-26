const products = [
    { id: 1, name: "Tshirt Boxy 20s (001)", price: 200000, img: "asset/001.png" },
    { id: 2, name: "Tshirt Boxy 20s (002)", price: 200000, img: "asset/002.png" },
    { id: 3, name: "Tshirt Boxy 20s (003)", price: 200000, img: "asset/003.png" },
    { id: 4, name: "Tshirt Boxy 20s (004)", price: 200000, img: "asset/004.png" },
    { id: 5, name: "Tshirt Boxy 20s (005)", price: 200000, img: "asset/005.png" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderProducts() {
    let el = document.getElementById("product-list");
    el.innerHTML = "";

    products.forEach(p => {
        el.innerHTML += `
      <div class="card">
        <img src="${p.img}">
        <div class="card-body">
          <b>${p.name}</b>
          <div>Rp ${p.price}</div>
          <div class="btn-card" onclick="addToCart(${p.id})">Add</div>
        </div>
      </div>
    `;
    });
}

function addToCart(id) {
    let item = cart.find(i => i.id === id);

    if (item) item.qty++;
    else {
        let p = products.find(p => p.id === id);
        cart.push({ ...p, qty: 1 });
    }

    saveCart();
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

function renderCart() {
    let el = document.getElementById("cart-items");
    el.innerHTML = "";

    let total = 0;

    cart.forEach((item, i) => {
        total += item.price * item.qty;

        el.innerHTML += `
      <div class="cart-item">
        ${item.name} x${item.qty}
        <br>
        <span onclick="changeQty(${i},-1)">➖</span>
        <span onclick="changeQty(${i},1)">➕</span>
      </div>
    `;
    });

    document.getElementById("total").innerText = total;
    document.getElementById("count").innerText = cart.length;
}

function changeQty(i, change) {
    cart[i].qty += change;
    if (cart[i].qty <= 0) cart.splice(i, 1);
    saveCart();
}

function toggleCart() {
    document.getElementById("cart").classList.toggle("active");
}

function toggleMenu() {
    // document.getElementById("nav-menu").classList.toggle("active");
    const cartEl = document.getElementById("cart");
    // const overlayEl = document.getElementById("overlay");

    cartEl.classList.toggle("active");
    overlayEl.classList.toggle("active");
}
function checkoutWA() {
    let nama = document.getElementById("nama").value;
    let alamat = document.getElementById("alamat").value;

    if (!nama || !alamat) {
        alert("Isi data dulu!");
        return;
    }

    let text = "Order:%0A";
    cart.forEach(item => {
        text += `- ${item.name} x${item.qty}%0A`;
    });

    window.open(`https://wa.me/6281340941936?text=${text}`);
}

renderProducts();
renderCart();