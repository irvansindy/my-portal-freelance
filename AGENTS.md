# Petunjuk Pengembangan

Sebelum mengubah antarmuka atau copy, baca berurutan:

1. `DESIGN.md`
2. `docs/CONTENT.md`
3. `docs/DEVELOPMENT.md`
4. `ROADMAP.md`

Pertahankan identitas editorial hangat dan positioning Irvan Sindy sebagai freelance web dan mobile developer. Jangan mengganti arah visual menjadi tema teknologi generik.

Jangan membuat nama klien, testimoni, angka, hasil bisnis, teknologi, durasi, harga, atau detail proyek tanpa sumber yang telah disetujui. Gunakan label studi konsep, catatan pengalaman, atau status sedang disiapkan bila bukti belum tersedia.

Setiap kontrol harus dapat digunakan dengan keyboard dan sentuhan. Target sentuh minimum adalah 44 x 44 px, fokus harus terlihat, dan halaman tidak boleh memiliki overflow horizontal pada viewport 320 px.

Gunakan HTML, CSS, dan JavaScript standar. Tambahkan dependensi hanya bila kebutuhan tidak dapat diselesaikan dengan sumber yang sudah ada dan alasan keputusannya dicatat.

Setelah perubahan:

1. Jalankan `npm run check`.
2. Jalankan server lokal.
3. Periksa homepage, seluruh halaman karya, dan halaman 404.
4. Uji keyboard, menu mobile, FAQ, kontak, dan viewport utama.
5. Perbarui `CHANGELOG.md` dan `ROADMAP.md` bila ruang lingkup berubah.
