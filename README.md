
# ReWear 👕🌿

**ReWear** adalah website marketplace pakaian preloved yang membantu pengguna menemukan, membeli, dan menjual pakaian bekas yang masih layak pakai.

Proyek ini menggunakan HTML, CSS, dan JavaScript dengan desain bernuansa hijau dan krem yang sederhana, modern, serta ramah lingkungan.

## ✨ Fitur Website

- 🏠 **Beranda:** Menampilkan produk pakaian preloved.
- 🔍 **Pencarian Produk:** Mencari produk berdasarkan nama.
- 🗂️ **Kategori:** Memfilter produk berdasarkan kategori.
- 🛒 **Keranjang:** Menambahkan, menghapus, dan mengubah jumlah produk.
- 📦 **Pesanan:** Melihat pesanan dengan status Dikemas, Dikirim, dan Selesai.
- 🧥 **Jual Barang:** Mengisi formulir untuk menambahkan produk.
- 🖼️ **Foto Produk:** Menampilkan gambar produk.
- 💾 **Penyimpanan Lokal:** Menyimpan data keranjang dan pesanan menggunakan `localStorage`.

## 📁 Struktur Folder

Pastikan file proyek tersusun seperti berikut:

```text
ReWear/
├── index.html
├── style.css
├── script.js
└── README.md
```

## 🖥️ Cara Menjalankan Website

### Cara 1: Membuka Langsung

1. Unduh atau salin seluruh file proyek ke dalam satu folder.
2. Pastikan `index.html`, `style.css`, dan `script.js` berada dalam folder yang sama.
3. Buka file `index.html` menggunakan browser, seperti Google Chrome, Microsoft Edge, atau Firefox.

### Cara 2: Menggunakan Visual Studio Code

1. Instal [Visual Studio Code](https://code.visualstudio.com/).
2. Buka folder proyek ReWear di Visual Studio Code.
3. Instal ekstensi **Live Server** jika belum tersedia.
4. Klik kanan `index.html`.
5. Pilih **Open with Live Server**.

Website akan terbuka di browser dan dapat diuji secara lokal.

## 🚀 Cara Publikasi ke GitHub Pages

### Langkah 1: Membuat Repository

1. Buka [GitHub](https://github.com/).
2. Masuk ke akun GitHub.
3. Klik tombol **New repository**.
4. Isi nama repository, misalnya `rewear`.
5. Pilih **Public** agar website dapat diakses publik dengan mudah.
6. Klik **Create repository**.

### Langkah 2: Mengunggah File

1. Buka repository yang baru dibuat.
2. Pilih **Add file → Upload files**.
3. Unggah file berikut:
   - `index.html`
   - `style.css`
   - `script.js`
   - `README.md`
4. Pastikan `index.html` berada di direktori utama repository, bukan di dalam subfolder.
5. Klik **Commit changes** untuk menyimpan file.

### Langkah 3: Mengaktifkan GitHub Pages

1. Buka repository ReWear.
2. Pilih menu **Settings**.
3. Buka bagian **Pages**.
4. Pada bagian **Build and deployment**, pilih:
   - **Source:** Deploy from a branch
   - **Branch:** `main`
   - **Folder:** `/ (root)`
5. Klik **Save**.

### Langkah 4: Membuka Website

Tunggu hingga proses publikasi selesai. GitHub Pages akan menyediakan alamat website dengan format:

```text
https://USERNAME.github.io/rewear/
```

Ganti `USERNAME` dengan nama pengguna GitHub milikmu. Jika nama repository berbeda dari `rewear`, sesuaikan bagian URL tersebut.

Kamu dapat membuka menu **Settings → Pages** untuk melihat alamat website yang sebenarnya.

## 🎨 Teknologi yang Digunakan

| Teknologi | Kegunaan |
|---|---|
| HTML5 | Membuat struktur halaman website |
| CSS3 | Mengatur desain, warna, dan tata letak |
| JavaScript | Menjalankan interaksi dan fitur website |
| localStorage | Menyimpan data tertentu di browser |
| GitHub Pages | Mempublikasikan website secara online |

## 🖼️ Catatan Gambar Produk

Jika website menggunakan gambar dari URL eksternal, gambar tersebut memerlukan koneksi internet agar dapat ditampilkan.

Untuk penggunaan jangka panjang, pertimbangkan menyimpan gambar produk di folder lokal, misalnya:

```text
ReWear/
├── index.html
├── style.css
├── script.js
├── images/
│   ├── jacket.jpg
│   └── shirt.jpg
└── README.md
```

Pastikan URL gambar di dalam kode sesuai dengan lokasi file gambar yang digunakan.

## ⚠️ Batasan Proyek

ReWear dalam versi ini merupakan prototipe frontend.

- Data keranjang dan pesanan tersimpan di browser melalui `localStorage`.
- Data tersebut tidak otomatis tersinkronisasi dengan perangkat atau pengguna lain.
- Fitur checkout belum terhubung ke pembayaran sungguhan.
- Status pengiriman belum terhubung ke jasa ekspedisi.
- Data produk yang ditambahkan melalui formulir belum tersimpan secara permanen ke katalog bersama tanpa backend.

Untuk menjadikannya marketplace sungguhan, diperlukan backend, database, autentikasi pengguna, dan integrasi pembayaran serta pengiriman yang sesuai.

## 🌱 Tujuan Proyek

ReWear dibuat untuk mendukung penggunaan kembali pakaian, mengurangi limbah tekstil, dan mempermudah jual beli pakaian preloved melalui pengalaman website yang praktis.

---

**ReWear — Wear Again, Care for the Planet. 🌍**
