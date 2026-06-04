# Aplikasi Rekap Foto Lapangan (Dark Mode Edition)

Aplikasi Web modern berbasis **Google Apps Script** dan **Google Sheets** yang digunakan untuk melakukan dokumentasi rekap status di lapangan menggunakan kamera HP secara *real-time*.

## ✨ Fitur Utama
- **Modern Night Mode UI:** Tampilan gelap yang nyaman di mata untuk aktivitas lapangan.
- **Kamera Sistem HP Terintegrasi:** Memanfaatkan sistem input kamera bawaan yang anti-blokir browser.
- **Live Counter Dashboard:** Angka rekap langsung sinkron dari rumus Google Sheets saat data terkirim dengan efek transisi yang mulus.
- **Auto Image Compression:** Foto otomatis dikompresi hingga 70% di sisi klien sebelum diunggah demi menghemat kuota data lapangan.

## 🛠️ Cara Pemasangan (Deployment)
1. Buat Google Sheets baru dengan dua tab bernama `Dashboard` dan `Rekap`.
2. Buka **Ekstensi** > **Apps Script**.
3. Salin kode dari file `Code.gs` dan `index.html` di repositori ini ke editor Google Apps Script.
4. Lakukan **Deploy (Terapkan)** sebagai **Aplikasi Web** dengan akses ke **Siapa saja (Anyone)**.
5. Gunakan URL berakhiran `/exec` untuk diakses via browser HP.
