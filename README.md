# Portfolio Irvan Sindy

Website statis untuk memperkenalkan Irvan Sindy sebagai freelance web dan mobile developer di Indonesia. Proyek ini dirancang untuk Cloudflare Workers Static Assets dan tidak memerlukan framework.

## Mulai secara lokal

Persyaratan:

- Node.js versi aktif yang masih didukung
- Python untuk server lokal, atau server statis lain

Jalankan pemeriksaan repository:

```sh
npm run check
```

Jalankan server lokal:

```sh
npm run serve
```

Buka `http://localhost:4173`.

## Rute

- `/` untuk homepage
- `/portfolio/restaurant-modern/` untuk studi konsep Modern × Classic Restaurant
- `/portfolio/restaurant-editorial/` untuk studi konsep Contemporary Dining
- `/portfolio/law-firm/` untuk studi konsep Law Firm Corporate
- `/portfolio/company-profile/` untuk catatan pengalaman Company Profile & CMS
- `/portfolio/business-system/` untuk catatan pengalaman Dashboard & Business Operations
- `/404.html` untuk halaman tidak ditemukan

## Struktur

```text
.
├── index.html
├── 404.html
├── assets/
│   ├── css/
│   ├── img/
│   └── js/
├── portfolio/
├── docs/
├── scripts/
├── DESIGN.md
├── ROADMAP.md
├── CHANGELOG.md
├── AGENTS.md
├── robots.txt
└── _headers
```

## Dokumentasi utama

- `DESIGN.md` menjelaskan arah visual dan alasan keputusan desain.
- `docs/CONTENT.md` menjadi sumber kebenaran untuk identitas, kontak, layanan, dan batas klaim.
- `docs/DEVELOPMENT.md` menjelaskan workflow perubahan, pengujian, SEO, dan deployment.
- `docs/DEPLOYMENT.md` berisi langkah deployment Cloudflare Workers dari persiapan sampai verifikasi produksi.
- `ROADMAP.md` mencatat pekerjaan yang masih perlu dilakukan.
- `CHANGELOG.md` mencatat perubahan yang sudah diterapkan.

## Deployment Cloudflare Workers

- Framework: Static
- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Assets directory: `./dist`
- Production branch: `main`

Domain produksi belum tercatat di repository. Setelah domain ditentukan, ikuti bagian SEO pada `docs/DEVELOPMENT.md` untuk memperbarui canonical URL, social image URL, dan sitemap.

Ikuti [panduan deployment](docs/DEPLOYMENT.md) untuk menghubungkan GitHub, mengatur domain, dan memeriksa hasil produksi.

## Kontak

Konfigurasi WhatsApp, email, dan pesan awal berada di `assets/js/main.js`. HTML tetap menyimpan URL kontak yang valid sebagai fallback ketika JavaScript tidak berjalan. Perbarui kedua tempat ketika data kontak berubah, lalu jalankan `npm run check`.
