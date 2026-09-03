-- Database Schema untuk SMP Plus Babussalam
-- Versi 2 — dengan tabel-tabel baru untuk admin panel

-- 1. Tabel Berita
CREATE TABLE IF NOT EXISTS berita (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    date VARCHAR(50),
    image TEXT,
    excerpt TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabel Galeri
CREATE TABLE IF NOT EXISTS galeri (
    id INT AUTO_INCREMENT PRIMARY KEY,
    image TEXT NOT NULL,
    caption VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Tabel Guru (dengan kolom baru: foto, jabatan, pendidikan)
CREATE TABLE IF NOT EXISTS guru (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(150) NOT NULL,
    mapel VARCHAR(150) NOT NULL,
    foto TEXT,
    jabatan VARCHAR(150),
    pendidikan VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Jika tabel guru sudah ada, tambahkan kolom baru (jalankan jika upgrade dari versi lama)
-- ALTER TABLE guru ADD COLUMN IF NOT EXISTS foto TEXT;
-- ALTER TABLE guru ADD COLUMN IF NOT EXISTS jabatan VARCHAR(150);
-- ALTER TABLE guru ADD COLUMN IF NOT EXISTS pendidikan VARCHAR(100);

-- 4. Tabel Testimoni
CREATE TABLE IF NOT EXISTS testimoni (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    title VARCHAR(150),
    quote TEXT,
    image TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Tabel Pengaturan Sekolah (kontak, sosmed, statistik)
CREATE TABLE IF NOT EXISTS pengaturan (
    id INT PRIMARY KEY DEFAULT 1,
    telepon VARCHAR(50),
    email VARCHAR(100),
    whatsapp VARCHAR(50),
    alamat TEXT,
    instagram VARCHAR(50),
    instagramUrl TEXT,
    tiktokUrl TEXT,
    youtubeUrl TEXT,
    statsGuru INT DEFAULT 0,
    statsSiswa INT DEFAULT 0,
    statsKelas INT DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 6. Sambutan Kepala Sekolah
CREATE TABLE IF NOT EXISTS sambutan (
    id INT PRIMARY KEY DEFAULT 1,
    nama VARCHAR(255),
    jabatan VARCHAR(255),
    foto TEXT,
    teks TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 7. Visi, Misi, Pilar, Sistem Pendidikan (disimpan sebagai JSON text)
CREATE TABLE IF NOT EXISTS visi_misi (
    id INT PRIMARY KEY DEFAULT 1,
    visi TEXT,
    misi JSON,
    pilar_utama JSON,
    sistem_pendidikan JSON,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 8. Sejarah / Timeline
CREATE TABLE IF NOT EXISTS sejarah (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tahun VARCHAR(10) NOT NULL,
    judul VARCHAR(255) NOT NULL,
    deskripsi TEXT,
    urutan INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 9. Identitas Sekolah
CREATE TABLE IF NOT EXISTS identitas (
    id INT PRIMARY KEY DEFAULT 1,
    nama_lengkap VARCHAR(255),
    nama_singkat VARCHAR(100),
    inisial VARCHAR(10),
    npsn VARCHAR(20),
    akreditasi VARCHAR(5),
    akreditasi_sk VARCHAR(255),
    sk_pendirian VARCHAR(255),
    logo_url TEXT,
    website VARCHAR(255),
    status_sekolah TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 10. Prestasi Siswa & Sekolah
CREATE TABLE IF NOT EXISTS prestasi (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(255) NOT NULL,
    kategori ENUM('siswa', 'sekolah') DEFAULT 'siswa',
    keterangan TEXT,
    tahun VARCHAR(10),
    foto TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 11. Ekstrakurikuler
CREATE TABLE IF NOT EXISTS ekskul (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(255) NOT NULL,
    deskripsi TEXT,
    foto TEXT,
    pembina VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 12. Agenda / Kalender Kegiatan
CREATE TABLE IF NOT EXISTS agenda (
    id INT AUTO_INCREMENT PRIMARY KEY,
    judul VARCHAR(255) NOT NULL,
    tanggal_mulai DATE NOT NULL,
    tanggal_selesai DATE,
    deskripsi TEXT,
    kategori VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 13. PPDB (Penerimaan Peserta Didik Baru)
CREATE TABLE IF NOT EXISTS ppdb (
    id INT PRIMARY KEY DEFAULT 1,
    tahun_ajaran VARCHAR(20),
    tanggal_buka DATE,
    tanggal_tutup DATE,
    syarat JSON,
    info_biaya TEXT,
    catatan TEXT,
    is_open TINYINT(1) DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 14. Fasilitas Sekolah
CREATE TABLE IF NOT EXISTS fasilitas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(255) NOT NULL,
    deskripsi TEXT,
    foto TEXT,
    kategori VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- INSERT DEFAULT DATA
-- ============================================================

INSERT IGNORE INTO pengaturan (id, telepon, email, whatsapp, alamat, instagram, instagramUrl, tiktokUrl, youtubeUrl, statsGuru, statsSiswa, statsKelas)
VALUES (
    1,
    '(022) 250497',
    'babussalamdago@gmail.com',
    '6281234567890',
    'Jl. Ciburial Indah Dago Atas Bandung, RT 1/RW 1, Kel. Ciburial, Kec. Cimenyan, Kab. Bandung, Jawa Barat 40198',
    '@smpplusbabussalam',
    'https://www.instagram.com/smpplusbabussalam/',
    'https://www.tiktok.com/@smpplusbabussalam',
    'https://www.youtube.com/@SmpPlusBabussalam',
    30, 103, 6
);

INSERT IGNORE INTO sambutan (id, nama, jabatan, foto, teks) VALUES (
    1,
    'H. Andi Rustandi, S.S',
    'Mudir Ma''had Pesantren Sains & Teknologi Babussalam',
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop',
    'Selamat datang di website resmi SMP Plus Babussalam, media informasi dan komunikasi yang kami hadirkan untuk memperkenalkan program, kegiatan, serta perkembangan pesantren. Kami berkomitmen menyelenggarakan pendidikan Islam terpadu yang terintegrasikan nilai keislaman, sains, dan teknologi guna membentuk generasi yang beriman, berakhlak mulia, berilmu, dan siap menghadapi tantangan zaman.'
);

INSERT IGNORE INTO visi_misi (id, visi, misi, pilar_utama, sistem_pendidikan) VALUES (
    1,
    'Terwujudnya peserta didik yang unggul dalam ilmu pengetahuan dan teknologi, beriman dan bertakwa kepada Tuhan Yang Maha Esa, berkarakter mulia, berwawasan lingkungan, serta mampu bersaing di era global.',
    '["Menyelenggarakan pendidikan yang mengintegrasikan ilmu pengetahuan umum dengan nilai-nilai kepesantrenan.", "Membentuk karakter peserta didik yang beriman, bertakwa, dan berakhlak mulia.", "Mewujudkan lingkungan sekolah yang bersih, sehat, dan berwawasan lingkungan.", "Membekali peserta didik dengan keterampilan dan teknologi agar mampu bersaing di era global."]',
    '["Unggul", "Beriman", "Berkarakter", "Global"]',
    '["Sistem full-day, 6 hari belajar per minggu.", "Menggunakan kurikulum integral, memadukan kurikulum Kemendikbud dengan kurikulum kepesantrenan (nahwu-sharaf, fiqh, tafsir, hadits, aqidah-akhlak, khitabah).", "Santri tingkat SMP dan SMA diwajibkan tinggal di asrama.", "Target hafalan: siswa kelas 3 SMP ditargetkan hafal Al-Quran juz 29."]'
);

INSERT IGNORE INTO sejarah (tahun, judul, deskripsi, urutan) VALUES
    ('1983', 'Cikal Bakal: Madrasah Tsanawiyah (MTs)', 'Didirikan tahun 1983, sebagai kelanjutan lulusan SD di lingkungan Ponpes Al-Quran Babussalam yang berdiri sejak 8 Januari 1981 M oleh KH. Drs. Muchtar Adam.', 1),
    ('1999', 'Perubahan Status Menjadi SMP', 'Terjadi perubahan status dari naungan Departemen Agama ke Departemen Pendidikan Nasional, sehingga MTs resmi berubah nama menjadi SMP.', 2);

INSERT IGNORE INTO identitas (id, nama_lengkap, nama_singkat, inisial, npsn, akreditasi, akreditasi_sk, sk_pendirian, logo_url, website, status_sekolah) VALUES (
    1,
    'SMP PLUS BABUSSALAM',
    'SMP Plus Babussalam',
    'BBS',
    '20252483',
    'A',
    'SK No. 1347/BAN-SM/SK/2021',
    '527/I02.7/Kep/OT/1997, tanggal 6 November 1997',
    'https://ui-avatars.com/api/?name=BBS&background=007A43&color=fff&rounded=true&bold=true',
    'www.babussalamdago.com',
    'Swasta, di bawah Yayasan Babussalam Al-Muchtariyah Pusat Bandung'
);

INSERT IGNORE INTO ppdb (id, tahun_ajaran, syarat, info_biaya, catatan, is_open) VALUES (
    1,
    '2025/2026',
    '["Fotokopi Akta Kelahiran", "Fotokopi Kartu Keluarga", "Fotokopi Ijazah SD/MI", "Pas foto 3x4 (4 lembar)", "Surat Keterangan Sehat"]',
    'Hubungi sekretariat sekolah untuk informasi biaya pendaftaran dan SPP.',
    'Pendaftaran dibuka setiap tahun. Kuota terbatas.',
    0
);

-- 15. Struktur Organisasi
CREATE TABLE IF NOT EXISTS struktur_bagan (
    id INT PRIMARY KEY DEFAULT 1,
    bagan_url TEXT,
    keterangan TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS struktur_organisasi (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(255) NOT NULL,
    jabatan VARCHAR(255) NOT NULL,
    kategori VARCHAR(100) DEFAULT 'Pimpinan Utama',
    urutan INT DEFAULT 0,
    foto TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT IGNORE INTO struktur_bagan (id, bagan_url, keterangan) VALUES (
    1,
    '',
    'Bagan Struktur Organisasi dan Tata Kerja SMP Plus Babussalam'
);

-- 16. Tugas dan Fungsi Wali Kelas
CREATE TABLE IF NOT EXISTS wali_kelas_tugas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    judul VARCHAR(255) NOT NULL,
    deskripsi TEXT NOT NULL,
    urutan INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT IGNORE INTO wali_kelas_tugas (id, judul, deskripsi, urutan) VALUES
    (1, 'Pengelolaan Kelas', 'Mengelola kelas yang menjadi tanggung jawabnya secara aktif dan berkesinambungan.', 1),
    (2, 'Penyelenggaraan Administrasi', 'Menyelenggarakan administrasi kelas seperti denah tempat duduk, absensi, dan jadwal pelajaran.', 2),
    (3, 'Penyusunan Statistik', 'Menyusun statistik bulanan kelas untuk memantau tingkat kehadiran dan partisipasi siswa.', 3),
    (4, 'Pengisian Daftar Kumpulan Nilai', 'Mengisi daftar kumpulan nilai (legger) secara akurat berdasarkan laporan setiap guru mata pelajaran.', 4),
    (5, 'Pembuatan Catatan Khusus', 'Membuat catatan khusus tentang siswa terkait perkembangan akademik maupun pembinaan karakter.', 5),
    (6, 'Pencatatan Mutasi', 'Mencatat mutasi atau perpindahan siswa yang terjadi di dalam kelasnya selama tahun ajaran berjalan.', 6),
    (7, 'Pelaporan Hasil Belajar', 'Mengisi dan membagikan buku laporan penilaian hasil belajar (rapor) kepada orang tua/wali murid.', 7);


