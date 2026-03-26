const products = [
    { id: 1, name: "Tshirt Boxy 20s (001)", price: 200000, img: "asset/001.png" },
    { id: 2, name: "Tshirt Boxy 20s (002)", price: 200000, img: "asset/002.png" },
    { id: 3, name: "Tshirt Boxy 20s (003)", price: 200000, img: "asset/003.png" },
    { id: 4, name: "Tshirt Boxy 20s (004)", price: 200000, img: "asset/004.png" },
    { id: 5, name: "Tshirt Boxy 20s (005)", price: 200000, img: "asset/005.png" },
    { id: 5, name: "Tshirt Boxy 20s (005)", price: 200000, img: "asset/005.png" },
];

/* =========================
   NAVBAR ANIMATION
========================= */
let lastScroll = 0;

window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    let currentScroll = window.scrollY;

    // efek shrink + shadow
    if (currentScroll > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

    // hide saat scroll down
    if (currentScroll > lastScroll && currentScroll > 80) {
        header.classList.add("hide");
    } else {
        header.classList.remove("hide");
    }

    lastScroll = currentScroll;
});

/* =========================
   CART SYSTEM
========================= */
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function formatRupiah(angka) {
    return angka.toLocaleString("id-ID");
}

function renderProducts() {
    let el = document.getElementById("product-list");
    el.innerHTML = "";

    products.forEach(p => {
        el.innerHTML += `
        <div class="card">
            <img src="${p.img}">
            <div class="card-body">
                <b>${p.name}</b>
                <div>Rp ${formatRupiah(p.price)}</div>
                <div class="btn-card" onclick="addToCart(${p.id})">Tambah</div>
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

    // auto buka cart
    openCart();
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

function renderCart() {
    let el = document.getElementById("cart-items");
    el.innerHTML = "";

    let total = 0;
    let totalItem = 0;

    cart.forEach((item, i) => {
        total += item.price * item.qty;
        totalItem += item.qty;

        el.innerHTML += `
        <div class="cart-item">
            ${item.name} x${item.qty}
            <br>
            <span onclick="changeQty(${i},-1)">➖</span>
            <span onclick="changeQty(${i},1)">➕</span>
        </div>
        `;
    });

    document.getElementById("total").innerText = "Rp " + formatRupiah(total);
    document.getElementById("count").innerText = totalItem;
}

function changeQty(i, change) {
    cart[i].qty += change;
    if (cart[i].qty <= 0) cart.splice(i, 1);
    saveCart();
}

/* =========================
   CART TOGGLE
========================= */
function openCart() {
    document.getElementById("cart").classList.add("active");
    document.getElementById("overlay").classList.add("active");
}

function closeCart() {
    document.getElementById("cart").classList.remove("active");
    document.getElementById("overlay").classList.remove("active");
}

function toggleCart() {
    document.getElementById("cart").classList.toggle("active");
    document.getElementById("overlay").classList.toggle("active");
}
//payment/


/* klik overlay = tutup */
document.getElementById("overlay").addEventListener("click", closeCart);

/* =========================
   CHECKOUT WHATSAPP
========================= */
function checkoutWA() {
    let nama = document.getElementById("nama").value;
    let alamat = document.getElementById("alamat").value;

    if (!nama || !alamat) {
        alert("Isi data dulu!");
        return;
    }

    let text = `Order:%0A`;
    cart.forEach(item => {
        text += `- ${item.name} x${item.qty}%0A`;
    });

    text += `%0ATotal: Rp ${formatRupiah(
        cart.reduce((sum, i) => sum + i.price * i.qty, 0)
    )}`;

    window.open(`https://wa.me/6281340941936?text=${text}`);
}

/* =========================
   INIT
========================= */
renderProducts();
renderCart();