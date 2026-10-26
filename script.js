
/* =========================================
   REWEAR — PRELOVED FASHION MARKETPLACE
   JavaScript untuk interaksi website
========================================= */

/* =========================================
   1. DATA PRODUK
========================================= */

const photo = (id, width = 700) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=80`;

const products = [
  {
    id: 1,
    name: "Kaos Oversize",
    category: "Kaos",
    price: 75000,
    old: 120000,
    condition: "Sangat Baik",
    rating: "4.8",
    image: photo("photo-1521572163474-6864f9cf17ab"),
    description: "Kaos oversize kasual untuk penggunaan sehari-hari."
  },
  {
    id: 2,
    name: "Kemeja Flanel Vintage",
    category: "Kemeja",
    price: 95000,
    old: 150000,
    condition: "Baik",
    rating: "4.7",
    image: photo("photo-1598033129183-c4f50c736f10"),
    description: "Kemeja flanel vintage dengan gaya kasual."
  },
  {
    id: 3,
    name: "Hoodie Hijau",
    category: "Hoodie",
    price: 120000,
    old: 180000,
    condition: "Sangat Baik",
    rating: "4.9",
    image: photo("photo-1556821840-3a63f95609a7"),
    description: "Hoodie nyaman untuk aktivitas sehari-hari."
  },
  {
    id: 4,
    name: "Jaket Denim",
    category: "Jaket",
    price: 150000,
    old: 220000,
    condition: "Baik",
    rating: "4.8",
    image: photo("photo-1543076447-215ad9ba6923"),
    description: "Jaket denim bergaya klasik."
  },
  {
    id: 5,
    name: "Celana Denim",
    category: "Celana",
    price: 110000,
    old: 175000,
    condition: "Sangat Baik",
    rating: "4.8",
    image: photo("photo-1542272604-787c3835535d"),
    description: "Celana denim untuk gaya kasual."
  },
  {
    id: 6,
    name: "Tas Kanvas",
    category: "Tas",
    price: 65000,
    old: 100000,
    condition: "Baik",
    rating: "4.6",
    image: photo("photo-1544816155-12df9643f363"),
    description: "Tas kanvas sederhana untuk kebutuhan harian."
  },
  {
    id: 7,
    name: "Kemeja Linen",
    category: "Kemeja",
    price: 85000,
    old: 135000,
    condition: "Seperti Baru",
    rating: "4.9",
    image: photo("photo-1603252109303-2751441dd157"),
    description: "Kemeja bergaya minimalis untuk berbagai acara."
  },
  {
    id: 8,
    name: "Jaket Kasual",
    category: "Jaket",
    price: 135000,
    old: 200000,
    condition: "Baik",
    rating: "4.7",
    image: photo("photo-1551028719-00167b16eac5"),
    description: "Jaket kasual untuk melengkapi gaya harian."
  }
];

/* =========================================
   2. DATA DAN STATE
========================================= */

function loadData(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    console.warn("Data lokal tidak dapat dibaca:", error);
    return fallback;
  }
}

let cart = loadData("rewear-cart", []);
let orders = loadData("rewear-orders", []);

let activeCategory = "Semua";
let activeOrderStatus = "Semua";
let uploadedPhoto = "";

/* =========================================
   3. FUNGSI BANTU
========================================= */

function rupiah(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(value);
}

function escapeHTML(text) {
  return String(text).replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[character]));
}

function saveData() {
  try {
    localStorage.setItem("rewear-cart", JSON.stringify(cart));
    localStorage.setItem("rewear-orders", JSON.stringify(orders));
  } catch (error) {
    console.warn("Data tidak dapat disimpan:", error);
    alert("Penyimpanan browser penuh atau tidak tersedia.");
  }
}

/* =========================================
   4. NAVIGASI HALAMAN
========================================= */

function showPage(page) {
  const target = document.getElementById(page);

  if (!target) {
    console.warn("Halaman tidak ditemukan:", page);
    return;
  }

  document.querySelectorAll(".page").forEach(element => {
    element.classList.remove("active");
  });

  target.classList.add("active");

  document.querySelectorAll(".nav-link").forEach(element => {
    element.classList.toggle(
      "active",
      element.dataset.page === page
    );
  });

  if (page === "cart") {
    renderCart();
  }

  if (page === "orders") {
    renderOrders();
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

document.querySelectorAll(".nav-link").forEach(button => {
  button.addEventListener("click", () => {
    showPage(button.dataset.page);
  });
});

/* =========================================
   5. MENAMPILKAN PRODUK
========================================= */

function renderProducts() {
  const searchInput = document.getElementById("search");
  const productContainer = document.getElementById("products");
  const productCount = document.getElementById("product-count");

  if (!productContainer) return;

  const query = searchInput
    ? searchInput.value.toLowerCase().trim()
    : "";

  const filteredProducts = products.filter(product => {
    const matchesCategory =
      activeCategory === "Semua" ||
      product.category === activeCategory;

    const searchableText =
      `${product.name} ${product.category} ${product.description || ""}`
        .toLowerCase();

    return matchesCategory && searchableText.includes(query);
  });

  if (productCount) {
    productCount.textContent = `${filteredProducts.length} produk`;
  }

  if (filteredProducts.length === 0) {
    productContainer.innerHTML = `
      <div class="empty">
        Produk tidak ditemukan.
        <br>
        Coba kata kunci atau kategori lain.
      </div>
    `;
    return;
  }

  productContainer.innerHTML = filteredProducts.map(product => `
    <article class="product-card">
      <div class="product-image">
        <img
          src="${escapeHTML(product.image)}"
          alt="${escapeHTML(product.name)}"
          loading="lazy"
          onerror="this.onerror=null;this.src='https://placehold.co/600x700/e5eadb/214d36?text=ReWear';"
        >
        <span class="tag">PRELOVED</span>
      </div>

      <div class="product-info">
        <h3>${escapeHTML(product.name)}</h3>

        <p class="muted">
          ${escapeHTML(product.condition)}
          ·
          ${escapeHTML(product.category)}
        </p>

        <div>
          <span class="price">${rupiah(product.price)}</span>

          ${
            product.old > product.price
              ? `<span class="old-price">${rupiah(product.old)}</span>`
              : ""
          }
        </div>

        <div class="rating">
          ${product.rating === "Baru" ? "✦ Produk baru ditambahkan" : `★ ${product.rating} · Pilihan preloved`}
        </div>

        <div class="product-actions">
          <button
            class="btn btn-small"
            onclick="addToCart(${Number(product.id)})"
          >
            + Keranjang
          </button>

          <button
            class="btn btn-small btn-light"
            onclick="buyNow(${Number(product.id)})"
          >
            Beli
          </button>
        </div>
      </div>
    </article>
  `).join("");
}

/* Pencarian produk */

const searchInput = document.getElementById("search");

if (searchInput) {
  searchInput.addEventListener("input", renderProducts);
}

/* Filter kategori */

document.querySelectorAll(".category").forEach(button => {
  button.addEventListener("click", () => {
    activeCategory = button.dataset.category;

    document.querySelectorAll(".category").forEach(categoryButton => {
      categoryButton.classList.toggle(
        "active",
        categoryButton === button
      );
    });

    renderProducts();
  });
});

/* =========================================
   6. KERANJANG BELANJA
========================================= */

function addToCart(id) {
  const product = products.find(item => item.id === id);

  if (!product) {
    alert("Produk tidak ditemukan.");
    return;
  }

  const existingItem = cart.find(item => item.id === id);

  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      old: product.old,
      condition: product.condition,
      image: product.image,
      qty: 1
    });
  }

  saveData();
  updateCartCount();

  alert(`${product.name} berhasil ditambahkan ke keranjang.`);
}

function buyNow(id) {
  addToCart(id);
  showPage("cart");
}

function updateCartCount() {
  const countElement = document.getElementById("cart-count");

  if (!countElement) return;

  const totalItems = cart.reduce((sum, item) => {
    return sum + item.qty;
  }, 0);

  countElement.textContent = totalItems;
}

function changeQty(id, amount) {
  const item = cart.find(product => product.id === id);

  if (!item) return;

  item.qty += amount;

  if (item.qty <= 0) {
    cart = cart.filter(product => product.id !== id);
  }

  saveData();
  updateCartCount();
  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);

  saveData();
  updateCartCount();
  renderCart();
}

function renderCart() {
  const container = document.getElementById("cart-items");
  const summary = document.getElementById("cart-summary");

  if (!container || !summary) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty">
        <p>🛍️</p>
        <p>Keranjangmu masih kosong.</p>
        <button class="btn" onclick="showPage('home')">
          Mulai Belanja
        </button>
      </div>
    `;

    summary.innerHTML = "";
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="cart-row">
      <img
        class="mini-image"
        src="${escapeHTML(item.image)}"
        alt="${escapeHTML(item.name)}"
        onerror="this.onerror=null;this.src='https://placehold.co/200x240/e5eadb/214d36?text=ReWear';"
      >

      <div class="grow">
        <h3>${escapeHTML(item.name)}</h3>
        <div class="price">${rupiah(item.price)}</div>

        <div class="quantity">
          <button
            aria-label="Kurangi jumlah"
            onclick="changeQty(${Number(item.id)}, -1)"
          >−</button>

          <span>${Number(item.qty)}</span>

          <button
            aria-label="Tambah jumlah"
            onclick="changeQty(${Number(item.id)}, 1)"
          >+</button>
        </div>
      </div>

      <button
        class="icon-button"
        aria-label="Hapus produk"
        onclick="removeFromCart(${Number(item.id)})"
      >✕</button>
    </div>
  `).join("");

  const subtotal = cart.reduce((sum, item) => {
    return sum + item.price * item.qty;
  }, 0);

  const shipping = 15000;
  const total = subtotal + shipping;

  summary.innerHTML = `
    <div class="total-line">
      <span>Subtotal</span>
      <span>${rupiah(subtotal)}</span>
    </div>

    <div class="total-line">
      <span>Ongkos kirim (simulasi)</span>
      <span>${rupiah(shipping)}</span>
    </div>

    <div class="total-line final">
      <span>Total</span>
      <span>${rupiah(total)}</span>
    </div>

    <button
      class="btn"
      style="width:100%;margin-top:12px"
      onclick="checkout()"
    >
      Buat Pesanan
    </button>

    <p class="muted" style="margin-top:10px">
      Checkout ini hanya simulasi dan belum memproses pembayaran nyata.
    </p>
  `;
}

/* =========================================
   7. CHECKOUT DEMO
========================================= */

function checkout() {
  if (cart.length === 0) {
    alert("Keranjang masih kosong.");
    return;
  }

  const subtotal = cart.reduce((sum, item) => {
    return sum + item.price * item.qty;
  }, 0);

  const order = {
    id: "RW" + Date.now().toString().slice(-8),
    date: new Date().toLocaleDateString("id-ID"),
    items: cart.map(item => ({ ...item })),
    total: subtotal + 15000,
    status: "Dikemas"
  };

  orders.unshift(order);
  cart = [];

  saveData();
  updateCartCount();
  renderCart();
  renderOrders();
  showPage("orders");

  alert("Pesanan demo berhasil dibuat!");
}

/* =========================================
   8. DAFTAR PESANAN
========================================= */

function renderOrders() {
  const container = document.getElementById("order-list");

  if (!container) return;

  const filteredOrders = orders.filter(order => {
    return activeOrderStatus === "Semua" ||
      order.status === activeOrderStatus;
  });

  document.querySelectorAll("#order-tabs .tab").forEach(tab => {
    tab.classList.toggle(
      "active",
      tab.dataset.status === activeOrderStatus
    );
  });

  if (filteredOrders.length === 0) {
    container.innerHTML = `
      <div class="empty">
        Belum ada pesanan pada kategori ini.
      </div>
    `;
    return;
  }

  container.innerHTML = filteredOrders.map(order => {
    const firstItem = order.items[0];

    const statusClass =
      order.status === "Dikirim" ? "shipped" :
      order.status === "Selesai" ? "done" : "";

    const nextStatus =
      order.status === "Dikemas" ? "Dikirim" :
      order.status === "Dikirim" ? "Selesai" : null;

    return `
      <div class="order-row">
        <img
          class="mini-image"
          src="${escapeHTML(firstItem.image)}"
          alt="${escapeHTML(firstItem.name)}"
          onerror="this.onerror=null;this.src='https://placehold.co/200x240/e5eadb/214d36?text=ReWear';"
        >

        <div class="grow">
          <h3>Pesanan #${escapeHTML(order.id)}</h3>

          <p class="muted">
            ${escapeHTML(order.date)}
            ·
            ${order.items.length} jenis produk
          </p>

          <p class="price" style="margin:7px 0">
            ${rupiah(order.total)}
          </p>

          <span class="status ${statusClass}">
            ${escapeHTML(order.status)}
          </span>
        </div>

        <div>
          ${
            nextStatus
              ? `<button class="btn btn-small"
                    onclick="advanceOrder('${escapeHTML(order.id)}')">
                    Simulasikan: ${nextStatus}
                 </button>`
              : '<span class="muted">Pesanan selesai</span>'
          }
        </div>
      </div>
    `;
  }).join("");
}

/* Filter status pesanan */

document.querySelectorAll("#order-tabs .tab").forEach(button => {
  button.addEventListener("click", () => {
    activeOrderStatus = button.dataset.status;
    renderOrders();
  });
});

/* Perbarui status pesanan demo */

function advanceOrder(id) {
  const order = orders.find(item => item.id === id);

  if (!order) return;

  if (order.status === "Dikemas") {
    order.status = "Dikirim";
  } else if (order.status === "Dikirim") {
    order.status = "Selesai";
  }

  saveData();
  renderOrders();

  alert(`Status pesanan diperbarui menjadi ${order.status}.`);
}

/* =========================================
   9. UNGGAH FOTO PRODUK
========================================= */

const imageInput = document.getElementById("item-image");
const imagePreview = document.getElementById("image-preview");

if (imageInput && imagePreview) {
  imageInput.addEventListener("change", event => {
    const file = event.target.files[0];

    if (!file) {
      uploadedPhoto = "";
      imagePreview.hidden = true;
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Silakan pilih file gambar yang valid.");
      imageInput.value = "";
      return;
    }

    const maximumSize = 3 * 1024 * 1024;

    if (file.size > maximumSize) {
      alert("Ukuran foto maksimal 3 MB.");
      imageInput.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      uploadedPhoto = reader.result;
      imagePreview.src = uploadedPhoto;
      imagePreview.hidden = false;
    };

    reader.onerror = () => {
      alert("Foto gagal dibaca. Silakan coba kembali.");
    };

    reader.readAsDataURL(file);
  });
}

/* =========================================
   10. FORM JUAL BARANG
========================================= */

const sellForm = document.getElementById("sell-form");

if (sellForm) {
  sellForm.addEventListener("submit", event => {
    event.preventDefault();

    const name = document.getElementById("item-name").value.trim();
    const category = document.getElementById("item-category").value;
    const condition = document.getElementById("item-condition").value;
    const price = Number(document.getElementById("item-price").value);
    const description =
      document.getElementById("item-description").value.trim();

    if (!name || !category || !condition || price < 1000) {
      alert("Periksa kembali data produk.");
      return;
    }

    const newProduct = {
      id: Date.now(),
      name,
      category,
      price,
      old: price,
      condition,
      rating: "Baru",
      description,
      image: uploadedPhoto ||
        photo("photo-1445205170230-053b83016050")
    };

    products.unshift(newProduct);

    renderProducts();

    sellForm.reset();
    uploadedPhoto = "";

    if (imagePreview) {
      imagePreview.removeAttribute("src");
      imagePreview.hidden = true;
    }

    alert("Produk berhasil ditambahkan ke katalog demo.");
    showPage("home");
  });
}

/* =========================================
   11. INISIALISASI WEBSITE
========================================= */

function initializeReWear() {
  renderProducts();
  renderCart();
  renderOrders();
  updateCartCount();
}

initializeReWear();
