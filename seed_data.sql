-- =================================================================
-- DUMMY DATA UNTUK SMP PLUS BABUSSALAM
-- Silakan jalankan kueri ini di phpMyAdmin untuk mengisi tabel
-- =================================================================

-- 1. Insert Data Berita
INSERT INTO berita (title, date, image, excerpt) VALUES
('Penerimaan Peserta Didik Baru (PPDB) Tahun Ajaran 2024/2025', '12 Agustus 2024', 'https://placehold.co/600x400/1e40af/ffffff?text=PPDB+2024', 'SMP Plus Babussalam resmi membuka pendaftaran peserta didik baru. Segera daftarkan putra-putri Anda karena kuota terbatas.'),
('Kunjungan Edukatif ke Museum Geologi Bandung', '20 Juli 2024', 'https://placehold.co/600x400/1e40af/ffffff?text=Kunjungan+Museum', 'Siswa-siswi kelas 7 dan 8 melaksanakan kegiatan field trip yang sangat menyenangkan dan penuh ilmu pengetahuan.'),
('Prestasi: Juara 1 Lomba Tahfidz Tingkat Kota', '05 Juni 2024', 'https://placehold.co/600x400/1e40af/ffffff?text=Juara+Tahfidz', 'Selamat kepada ananda Fulan yang telah berhasil menjuarai lomba tahfidz antar SMP se-kota Bandung.');

-- 2. Insert Data Galeri
INSERT INTO galeri (image, caption) VALUES
('https://placehold.co/600x400/0ea5e9/ffffff?text=Kegiatan+Pramuka', 'Kegiatan Ekstrakurikuler Pramuka Mingguan'),
('https://placehold.co/600x400/0ea5e9/ffffff?text=Upacara+Bendera', 'Upacara Bendera Hari Senin Penuh Khidmat'),
('https://placehold.co/600x400/0ea5e9/ffffff?text=Lomba+17+Agustus', 'Keseruan Lomba Peringatan Kemerdekaan 17 Agustus'),
('https://placehold.co/600x400/0ea5e9/ffffff?text=Lab+Komputer', 'Praktik TIK di Laboratorium Komputer Baru');

-- 3. Insert Data Guru
INSERT INTO guru (nama, mapel) VALUES
('Umar Yusuf, M.Sos', 'Guru PAI / Al-Qur''an'),
('Lia Karliah, S.Pd', 'Guru Seni Budaya'),
('Mulyana Kurniawan, M.Pd', 'Guru Tafsir'),
('Dr. H. Fadhlullah M. Said, M.A', 'Guru Hadist'),
('Agus Suryaman, M.A', 'Guru PAI / Bahasa Arab'),
('Ida Farida, S.P', 'Guru IPA'),
('Ra''idah Shabirah, S.Pd', 'Guru Bahasa Arab'),
('Safrayani, S.Pd', 'Guru IPS'),
('Rachma Fira, S.Hum', 'Guru Bahasa Inggris'),
('Irfan Rahmatullah, S.Sos', 'Guru BK / Prakarya'),
('Firmansyah, S.Pd', 'Guru PJOK'),
('Nurul Syamiatul Ulfah, S.Pd', 'Guru Bahasa Indonesia'),
('Ilham Nasrulloh, S.Pd', 'Guru PKN'),
('Wina Halimatus S., S.Pd', 'Guru Bahasa Inggris / Al-Qur''an'),
('Fikriyah Nurul Arofah, S.Ag', 'Guru Tafsir Hadist'),
('Nurazizah', 'Guru Al-Qur''an'),
('Nurlaela', 'Guru Al-Qur''an'),
('Ahmad Sobirin', 'Guru Al-Qur''an'),
('Nurwidaningsih', 'Guru Al-Qur''an'),
('Alin Karlina, S.Pd', 'Guru Bahasa Indonesia'),
('Aji Kurniawan', 'Guru Informatika'),
('Rami Rahmayanti, S.Pd', 'Guru Matematika'),
('Atina Rahmah Ichtiari, S.Pd', 'Guru Matematika'),
('Deni Sopian, S.Pd', 'Guru PAI');

-- 4. Insert Data Testimoni
INSERT INTO testimoni (name, title, quote, image) VALUES
('Fulan Bin Fulan', 'Alumni Angkatan 2022', 'Sekolah di SMP Plus Babussalam adalah pengalaman terbaik. Fasilitas lengkap dan guru yang sangat inspiratif.', 'https://placehold.co/150x150/10b981/ffffff?text=FB'),
('Bapak Budi', 'Orang Tua Siswa', 'Anak saya menjadi lebih disiplin dan akhlaknya semakin baik sejak sekolah di asrama Babussalam. Alhamdulillah.', 'https://placehold.co/150x150/10b981/ffffff?text=BB'),
('Aisyah Azzahra', 'Siswi Kelas 9', 'Saya suka sekali ekstrakurikuler di sini, memfasilitasi minat dan bakat saya di bidang tahfidz dan public speaking.', 'https://placehold.co/150x150/10b981/ffffff?text=AA');

-- 5. Pengaturan sudah terisi otomatis melalui schema.sql sebelumnya
-- Namun jika belum ada, ini perintahnya:
INSERT IGNORE INTO pengaturan (id, telepon, email, whatsapp, alamat, instagram, instagramUrl, tiktokUrl, youtubeUrl, statsGuru, statsSiswa, statsKelas) 
VALUES (1, '(022) 250497', 'babussalamdago@gmail.com', '6281234567890', 'Jalan Ciburial Indah, Dago Atas, RT 1/RW 1, Desa Ciburial, Kecamatan Cimenyan, Kabupaten Bandung, Jawa Barat 40198', '@smpplusbabussalam', 'https://www.instagram.com/smpplusbabussalam/', 'https://www.tiktok.com/@smpplusbabussalam', 'https://www.youtube.com/@SmpPlusBabussalam', 30, 103, 6);

