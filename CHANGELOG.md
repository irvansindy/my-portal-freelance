# Changelog

Perubahan penting pada proyek dicatat di file ini.

## 2026-09-17

### Ditambahkan

- Daftar izin aset publik melalui `.assetsignore` agar Wrangler tidak mengunggah file repository atau dependensi.
- Konfigurasi Wrangler untuk deployment Workers Static Assets langsung dari root repository dan halaman 404.
- Aturan Git untuk mengabaikan output build, dependensi lokal, dan state Wrangler.

### Diubah

- Panduan deployment disesuaikan dengan alur Workers Builds yang digunakan Cloudflare.

## 2026-09-16

### Ditambahkan

- Panduan deployment Cloudflare yang mencakup persiapan repository, Git integration, domain, metadata, verifikasi produksi, dan rollback.

### Diubah

- Konfigurasi deployment pada dokumentasi diselaraskan dengan branch produksi `main`.

## 2026-09-12

### Ditambahkan

- Positioning freelance web dan mobile developer.
- Ilustrasi identitas web dan mobile berbasis HTML serta CSS.
- Menu mobile dengan dukungan Escape dan fallback tanpa JavaScript.
- Focus ring kontras tinggi, skip link, dan target sentuh minimum.
- Halaman studi konsep dan catatan pengalaman yang substantif.
- Favicon, social card, Open Graph, Twitter metadata, dan structured data.
- Dokumentasi desain, konten, development, roadmap, dan petunjuk agent.
- Pemeriksa struktur situs serta generator sitemap.

### Diubah

- Scope layanan diperluas dari pengembangan web dan mobile sampai deployment produk serta maintenance server.
- Metadata, hero, peta produk, layanan, kapabilitas, proses, FAQ, kontak, dan dokumentasi diselaraskan dengan scope server.
- Arah visual dikembangkan menjadi Editorial Product Developer dengan deep teal sebagai penanda sistem dan platform.
- Ilustrasi hero kini menunjukkan hubungan Web, Mobile, API, data, autentikasi, dan deployment.
- Label karya membedakan kategori Web, Web + CMS, System, dan Mobile secara langsung.
- Visual sistem serta social card diselaraskan dengan bahasa warna produk yang baru.
- Tombol WhatsApp mengambang dihapus agar tidak menutupi peta produk; tujuan kontak tetap tersedia pada navigasi dan bagian kontak.
- Nama publik dari Sindy Freelance menjadi Irvan Sindy.
- Copy campuran menjadi bahasa Indonesia yang lebih konsisten.
- Paket bernomor menjadi layanan berbasis kebutuhan tanpa angka yang belum dikonfirmasi.
- Thumbnail berbentuk mockup generik menjadi komposisi editorial yang diberi konteks.
- Halaman 404 diselaraskan dengan identitas portfolio.
- Google Fonts dipindahkan dari CSS import ke resource link dengan preconnect.
- Header Cloudflare diperkuat dan strategi cache didokumentasikan.
- Layout satu kolom, headline, visual karya, dan alamat kontak diperbaiki agar tetap reflow pada pembesaran teks 200 persen.

### Dihapus

- Lima halaman placeholder.
- Tautan kontak dengan `href="#"`.
- Panah dekoratif berulang.
- Em dash pada sumber publik.
- Selector CSS lama yang tidak digunakan.
- Angka durasi, pembayaran, revisi, halaman, dan maintenance yang belum mempunyai sumber kebenaran.
