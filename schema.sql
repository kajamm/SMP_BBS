-- Database Schema untuk SMP Plus Babussalam

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

-- 3. Tabel Guru
CREATE TABLE IF NOT EXISTS guru (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(150) NOT NULL,
    mapel VARCHAR(150) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Tabel Testimoni
CREATE TABLE IF NOT EXISTS testimoni (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    title VARCHAR(150),
    quote TEXT,
    image TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Tabel Pengaturan Sekolah
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

-- Insert Default Data Pengaturan
INSERT IGNORE INTO pengaturan (id, telepon, email, whatsapp, alamat, instagram, instagramUrl, tiktokUrl, youtubeUrl, statsGuru, statsSiswa, statsKelas) 
VALUES (
    1, 
    '(022) 250497', 
    'info@smpplusbabussalam.sch.id', 
    '6281234567890', 
    'Kawasan Pesantren Sains dan Teknologi Darul Hikam, Jalan Cikadut, Kec. Cimenyan, Kabupaten Bandung, Jawa Barat 40194', 
    '@smpbabussalam', 
    'https://instagram.com/smpbabussalam', 
    'https://tiktok.com/@smpbabussalam', 
    'https://youtube.com/@smpbabussalam',
    15, 250, 12
);
