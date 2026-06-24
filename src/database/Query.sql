CREATE TABLE users (
    id_user INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    role ENUM('admin','user') DEFAULT 'user'
);
CREATE TABLE kategori (
    id_kategori INT AUTO_INCREMENT PRIMARY KEY,
    nama_kategori VARCHAR(100),
    jenis ENUM('Pemasukan','Pengeluaran')
);
CREATE TABLE transaksi (
    id_transaksi INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT,
    id_kategori INT,
    jumlah DECIMAL(12,2),
    tanggal DATE,
    keterangan TEXT,

    FOREIGN KEY(id_user)
        REFERENCES users(id_user),

    FOREIGN KEY(id_kategori)
        REFERENCES kategori(id_kategori)
);
CREATE TABLE laporan (
    id_laporan INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT,
    periode VARCHAR(20),
    total_pemasukan DECIMAL(12,2),
    total_pengeluaran DECIMAL(12,2),
    saldo DECIMAL(12,2),

    FOREIGN KEY(id_user)
        REFERENCES users(id_user)
);
CREATE TABLE notifikasi (
    id_notifikasi INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT,
    pesan VARCHAR(255),
    status ENUM('Belum Dibaca','Dibaca'),

    FOREIGN KEY(id_user)
        REFERENCES users(id_user)
);