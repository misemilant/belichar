# BELICHAR

Website marketplace Point Blank untuk **Character** dan **Top Up PB Cash**.

## Jalankan lokal

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`.

## Deploy ke Vercel

1. Upload folder project ini ke repository GitHub.
2. Di Vercel pilih **Add New → Project**.
3. Import repository GitHub BELICHAR.
4. Framework akan terdeteksi sebagai Next.js.
5. Klik Deploy.
6. Setelah online, tambahkan domain `belichar.qd.je` di Vercel → Project → Settings → Domains.
7. Ikuti record DNS yang ditampilkan Vercel pada panel DNS DigitalPlat.

## Data yang perlu diganti

Buka `app/store.tsx` dan ubah:

- `WA_NUMBER` untuk nomor WhatsApp admin.
- `DANA_NUMBER` untuk nomor DANA.
- Data `characters` untuk daftar Character.
- Data `cash` untuk nominal PB Cash.

## QRIS

Masukkan gambar QRIS milikmu ke folder `public` dengan nama:

`qris.png`

Kemudian bagian QRIS pada `app/store.tsx` dapat diganti dari placeholder menjadi `<img src="/qris.png" ... />`.

## Catatan

Versi ini adalah storefront frontend yang siap deploy. Checkout mengarahkan pembeli ke WhatsApp. Sistem database/admin, upload bukti pembayaran, dan autentikasi dapat ditambahkan pada tahap berikutnya.
