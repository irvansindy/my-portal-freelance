# Deployment ke Cloudflare Workers

Panduan ini berlaku untuk repository `irvansindy/my-portal-freelance`. Situs memakai HTML, CSS, dan JavaScript standar. Cloudflare Workers Static Assets mengambil file publik dari direktori `dist`.

## 1. Siapkan repository

Pastikan perubahan yang akan diterbitkan sudah berada di branch `main` dan tidak ada file yang tidak sengaja ikut berubah.

```sh
git status
npm run check
npm run build
```

Jalankan situs secara lokal:

```sh
npm run serve
```

Buka `http://localhost:4173`, lalu periksa homepage, lima halaman karya, dan `/404.html`. Uji menu pada layar kecil, tombol Escape, navigasi keyboard, FAQ, WhatsApp, email, dan tampilan pada lebar 320 px.

Jika hasilnya benar, commit dan push ke GitHub:

```sh
git add <file-yang-disetujui>
git commit -m "chore: configure Cloudflare Workers deployment"
git push origin main
```

Tinjau daftar file sebelum menjalankan `git add`. Jangan memakai `git add .` bila working tree berisi perubahan lain.

## 2. Hubungkan GitHub ke Cloudflare Workers

1. Masuk ke Cloudflare Dashboard.
2. Buka **Workers & Pages**.
3. Pilih **Create application**, lalu pilih **Import a repository**.
4. Hubungkan akun GitHub jika belum pernah dihubungkan.
5. Beri akses ke repository `irvansindy/my-portal-freelance`.
6. Pilih repository tersebut dan mulai pengaturan proyek.

Gunakan konfigurasi berikut:

| Pengaturan | Nilai |
| --- | --- |
| Project name | Nama yang tersedia, misalnya `irvan-sindy-portfolio` |
| Production branch | `main` |
| Framework preset | `Static` jika pilihan tersedia |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Root directory | Kosong, karena situs berada di root repository |

`wrangler.jsonc` mengarahkan upload ke `dist`. Jangan mengganti `assets.directory` menjadi `.` karena direktori tersebut juga berisi source, dokumentasi, dan `node_modules`.

Pilih **Save and Deploy**. Setelah proses selesai, buka URL `*.workers.dev` yang diberikan Cloudflare.

## 3. Periksa deployment pertama

Pada URL `*.workers.dev`, periksa:

- homepage dan seluruh halaman karya dapat dibuka;
- URL yang tidak ada menampilkan halaman 404;
- CSS, gambar, favicon, dan font termuat;
- menu mobile, FAQ, WhatsApp, dan email bekerja;
- tidak ada error dari kode proyek di browser console;
- tidak ada scroll horizontal pada lebar 320 px;
- fokus keyboard terlihat pada tautan dan kontrol.

Periksa header dari terminal dengan mengganti URL contoh:

```sh
curl -I https://nama-proyek.workers.dev/
```

Respons produksi perlu memuat CSP dan header keamanan dari `_headers`, termasuk `Content-Security-Policy`, `Strict-Transport-Security`, dan `X-Content-Type-Options`.

## 4. Tambahkan domain pribadi

Lakukan bagian ini setelah domain produksi sudah ditentukan.

1. Pastikan domain sudah menjadi zone aktif di Cloudflare dan nameserver domain mengarah ke Cloudflare.
2. Buka Worker di **Workers & Pages**.
3. Buka **Settings**, lalu **Domains & Routes**.
4. Pilih **Add**, lalu **Custom Domain**.
5. Masukkan domain utama yang ingin dipakai.
6. Ikuti pemeriksaan DNS sampai status domain aktif dan sertifikat HTTPS tersedia.

Workers Custom Domains memerlukan domain yang DNS-nya dikelola Cloudflare. Dashboard akan membuat record DNS dan sertifikat yang diperlukan setelah domain dikaitkan dengan Worker.

Tentukan satu alamat utama, misalnya domain tanpa `www`, lalu arahkan varian lainnya ke alamat utama dengan Redirect Rules agar mesin pencari tidak melihat dua versi situs.

## 5. Lengkapi metadata domain

Setelah domain final tersedia, ubah canonical, Open Graph URL, social image, dan URL pada structured data menjadi URL HTTPS absolut. Lalu buat sitemap:

```sh
SITE_URL=https://domain-anda.example npm run sitemap
```

Tambahkan baris berikut ke `robots.txt` dengan domain yang benar:

```text
Sitemap: https://domain-anda.example/sitemap.xml
```

Jangan commit domain contoh. Jalankan kembali:

```sh
npm run check
git diff --check
```

Commit dan push perubahan metadata ke `main`. Git integration akan menjalankan deployment produksi baru secara otomatis.

## 6. Verifikasi domain produksi

Setelah deployment baru selesai:

1. Buka domain dengan HTTPS dan pastikan sertifikat valid.
2. Ulangi pemeriksaan halaman, kontrol, keyboard, dan viewport dari deployment pertama.
3. Jalankan `curl -I` pada homepage dan satu halaman karya untuk memeriksa header produksi.
4. Periksa bahwa canonical mengarah ke domain utama.
5. Buka `/robots.txt` dan `/sitemap.xml` dari domain produksi.
6. Uji social image dengan alat debug platform yang akan digunakan.
7. Daftarkan sitemap pada alat webmaster yang dipilih.

Setiap push berikutnya ke `main` akan memperbarui production deployment. Branch lain dapat menghasilkan preview deployment tanpa mengganti situs produksi, sesuai pengaturan branch di Cloudflare.

## 7. Jika deployment bermasalah

Buka Worker di Cloudflare, pilih **Deployments**, lalu baca log deployment yang gagal. Periksa kembali nama branch, build command, dan `assets.directory` pada `wrangler.jsonc`.

Jika perubahan terbaru merusak situs, pilih deployment terakhir yang sehat pada halaman **Deployments** dan gunakan opsi rollback. Setelah situs pulih, perbaiki sumber di repository dan push commit baru agar riwayat Git tetap menjadi sumber kebenaran.

Jangan menonaktifkan CSP hanya untuk menghilangkan error. Periksa resource yang diblokir, lalu izinkan hanya origin yang memang digunakan situs.
