# Panduan Pengembangan

## Arsitektur

Proyek ini adalah website statis tanpa framework dan tanpa dependensi runtime.

- `index.html` memuat homepage dan structured data.
- `portfolio/*/index.html` memuat studi konsep atau catatan pengalaman.
- `assets/css/style.css` memuat sistem visual homepage.
- `assets/css/portfolio.css` memuat sistem visual halaman karya.
- `assets/css/404.css` hanya memuat komposisi halaman 404.
- `assets/js/main.js` memuat konfigurasi kontak, menu mobile, tahun, dan perilaku FAQ.
- `_headers` memuat header keamanan dan cache untuk Cloudflare Static Assets.

## Workflow perubahan

1. Baca `DESIGN.md` dan `docs/CONTENT.md`.
2. Tentukan apakah perubahan menyentuh fakta, visual, perilaku, atau deployment.
3. Ubah sumber yang paling dekat dengan tanggung jawabnya.
4. Jalankan `npm run check`.
5. Jalankan `npm run serve` dan periksa perubahan di browser.
6. Uji keyboard, mobile, dan semua kontrol yang berubah.
7. Perbarui `CHANGELOG.md`.

Jangan memakai skrip pencarian dan penggantian untuk menambal HTML atau CSS. Ubah sumbernya secara langsung agar hasil tetap mudah ditinjau.

## Konfigurasi kontak

Kontak disimpan pada dua lapisan:

- HTML menyimpan URL yang dapat bekerja tanpa JavaScript.
- `assets/js/main.js` menyusun URL dengan pesan dan subject yang konsisten.

Jika nomor, email, atau pesan berubah, perbarui keduanya. Pemeriksa repository akan menolak `href="#"`.

## Menambah karya

Sebelum membuat halaman baru, tentukan salah satu status:

- Studi konsep: eksplorasi mandiri dan bukan proyek klien.
- Case study klien: mempunyai izin publikasi serta sumber untuk detail dan hasil.
- Catatan pengalaman: area kompetensi nyata dengan detail sensitif yang tidak dipublikasikan.

Salin struktur semantik salah satu halaman karya, lalu ubah title, description, canonical path, heading, fakta, visual, isi, dan tautan berikutnya. Jangan menambahkan angka, nama, screenshot, teknologi, atau hasil yang belum disetujui di `docs/CONTENT.md`.

## Pemeriksaan otomatis

```sh
npm run check
```

Pemeriksaan mencakup:

- file wajib dan struktur metadata
- duplicate ID
- tujuan asset serta link lokal
- fallback kontak
- structured data yang dapat diparse
- placeholder lama
- em dash pada sumber proyek

## Pemeriksaan manual

Gunakan sekurangnya viewport berikut:

- 320 px
- 390 px
- 768 px
- 1024 px
- 1440 px

Pada setiap perubahan UI, periksa:

- tidak ada scroll horizontal
- teks tidak terpotong pada zoom 200 persen
- target sentuh minimum 44 x 44 px
- urutan Tab mengikuti urutan visual
- focus ring terlihat pada latar terang dan gelap
- menu mobile membuka, menutup, dan merespons Escape
- FAQ dapat dibuka dengan keyboard
- WhatsApp dan email mempunyai URL sebelum serta sesudah JavaScript berjalan
- setiap halaman karya dan halaman 404 dapat dibuka
- console browser tidak memuat error dari kode proyek

## SEO dan domain produksi

Canonical saat ini memakai path relatif agar mengikuti host deployment. Domain produksi tetap diperlukan untuk sitemap dan URL social image yang absolut.

Setelah domain tersedia:

1. Jalankan generator sitemap dengan URL HTTPS.

   ```sh
   SITE_URL=https://domain-anda.example npm run sitemap
   ```

2. Tambahkan `Sitemap: https://domain-anda.example/sitemap.xml` ke `robots.txt`.
3. Ubah canonical dan social image menjadi URL absolut.
4. Tambahkan URL pada structured data homepage.
5. Jalankan `npm run check` dan deploy ulang.

Jangan menyimpan domain contoh sebagai nilai produksi.

## Font

Instrument Serif dan DM Sans dimuat dari Google Fonts dengan preconnect. Fallback Georgia dan Arial menjaga konten tetap terbaca saat layanan eksternal tidak tersedia. Bila privasi atau ketahanan jaringan menjadi prioritas, self-host file font dan perbarui CSP pada `_headers`.

## Deployment Cloudflare Workers

- Framework: Static
- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Assets directory: `./dist`
- Production branch: `main`

`scripts/build-static.mjs` menyalin hanya file publik ke `dist`; jangan arahkan `assets.directory` ke root repository. Langkah lengkap dan checklist produksi tersedia di `docs/DEPLOYMENT.md`. Setelah deployment, verifikasi response header pada domain produksi karena server lokal tidak menerapkan `_headers`.

## Version control

Repository memiliki metadata Git yang dapat dibaca. Sebelum membuat commit, tinjau `git status`, jangan ikut mengubah file di luar lingkup pekerjaan, lalu jalankan `git diff --check` untuk menemukan masalah whitespace. Perubahan besar sebaiknya dipisahkan berdasarkan tujuan agar riwayat tetap mudah ditinjau dan dikembalikan bila diperlukan.
