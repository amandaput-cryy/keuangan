<<<<<<< HEAD
# keuangan
=======
# Sistem Manajemen Keuangan Pribadi

Aplikasi web untuk mengelola keuangan pribadi dengan fitur authentication, CRUD transaksi, dashboard, dan reporting.

## Fitur Aplikasi

### ✅ Anggota 1 – Frontend & UI/UX
- [x] Halaman Dashboard dengan ringkasan keuangan
- [x] Halaman Login
- [x] Halaman Register
- [x] Halaman Kelola Transaksi (Tambah, Edit, Hapus)
- [x] Halaman Laporan dengan filter bulanan
- [x] Navbar dan Footer responsif
- [x] CSS responsif untuk mobile, tablet, dan desktop
- [x] Design yang profesional dan user-friendly

### ✅ Anggota 2 – Backend Autentikasi
- [x] Sistem Register dengan validasi data
- [x] Sistem Login dengan password hashing (bcrypt)
- [x] Sistem Logout
- [x] Session Management (express-session)
- [x] Middleware Autentikasi untuk protect routes
- [x] Validasi data pengguna (email unique, password confirm)
- [x] Endpoint GET `/api/auth/user` untuk cek user yang login

### ✅ Anggota 3 – CRUD Transaksi
- [x] Menambah transaksi pemasukan
- [x] Menambah transaksi pengeluaran
- [x] Mengedit transaksi yang sudah ada
- [x] Menghapus transaksi
- [x] Menampilkan daftar transaksi pengguna
- [x] Validasi data transaksi
- [x] Koneksi user dan transaksi melalui user_id
- [x] Query transaksi per user (isolated data)

### ✅ Anggota 4 – Dashboard, Grafik, dan Laporan
- [x] Menampilkan ringkasan keuangan (total income, expense, balance)
- [x] Menghitung total pemasukan per user
- [x] Menghitung total pengeluaran per user
- [x] Menghitung saldo (income - expense)
- [x] Menampilkan grafik keuangan bulanan menggunakan Chart.js
- [x] Membuat laporan bulanan dengan filter tahun dan bulan
- [x] Export laporan ke CSV
- [x] Menampilkan transaksi terbaru di dashboard

## Struktur Folder

```
nodejs-keuangan-master/
├── src/
│   ├── db.js                 # Database connection
│   ├── handlers.js           # API handlers (auth, transaksi, dashboard)
│   ├── index.js              # Express server setup
│   ├── routes.js             # API routes
│   └── public/
│       ├── index.html        # Landing page
│       ├── login.html        # Login page
│       ├── register.html     # Register page
│       ├── dashboard.html    # Dashboard page
│       ├── transaksi.html    # Transaction management page
│       ├── laporan.html      # Report page
│       ├── auth.js           # Authentication logic
│       ├── dashboard.js      # Dashboard logic
│       ├── transaksi.js      # Transaction management logic
│       ├── laporan.js        # Report logic
│       ├── style.css         # Responsive CSS
│       ├── tabel.sql         # Database schema
│       └── tabel_users.sql   # Users table schema
├── package.json              # Dependencies
└── README.md                 # This file
```

## Database Schema

### Tabel Users
```sql
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nama` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL UNIQUE,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);
```

### Tabel Transaksi (Updated)
```sql
ALTER TABLE `transaksi` ADD COLUMN `user_id` int(11) DEFAULT NULL;
ALTER TABLE `transaksi` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
```

## API Endpoints

### Autentikasi
- `POST /api/auth/register` - Register user baru
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/user` - Get current logged-in user

### Transaksi
- `GET /api/transaksi` - Get semua transaksi user (protected)
- `POST /api/transaksi` - Tambah transaksi baru (protected)
- `PUT /api/transaksi/:id` - Edit transaksi (protected)
- `DELETE /api/transaksi/:id` - Hapus transaksi (protected)

### Dashboard & Laporan
- `GET /api/dashboard/summary` - Get financial summary (protected)
- `GET /api/dashboard/report` - Get monthly report (protected)
- `GET /api/dashboard/chart` - Get chart data untuk grafik (protected)

## Setup & Installation

### Prerequisites
- Node.js v14+
- MySQL database
- npm

### Steps
1. Clone repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Setup Database:
   ```bash
   mysql -u userpk -p vCi52Zu2 -h localhost pengelolaan_keuangan < src/public/tabel.sql
   mysql -u userpk -p vCi52Zu2 -h localhost pengelolaan_keuangan < src/public/tabel_users.sql
   ```

4. Start application:
   ```bash
   npm start
   ```

5. Open browser:
   ```
   http://localhost:8081
   ```

## Dependencies

```json
{
  "bcrypt": "^5.1.0",          // Password hashing
  "body-parser": "^1.20.2",    // Parse request bodies
  "express": "^4.18.2",        // Web framework
  "express-session": "^1.17.3", // Session management
  "morgan": "^1.10.0",         // HTTP logger
  "mysql2": "^3.1.2"           // MySQL driver
}
```

## Fitur Keamanan

- ✅ Password hashing menggunakan bcrypt
- ✅ Session-based authentication
- ✅ CSRF protection (via session)
- ✅ User isolation (setiap user hanya bisa akses data mereka)
- ✅ Input validation
- ✅ Error handling

## Git Commit Messages

### Anggota 1 – Frontend & UI/UX
```
feat: create dashboard page
feat: create login page
feat: create register page
feat: create transaction form page
feat: create report page
feat: add responsive css
feat: add navbar and footer
style: improve user interface design
```

### Anggota 2 – Backend Autentikasi
```
feat: add user registration
feat: add user login
feat: add user logout
feat: implement session management
feat: add authentication middleware
feat: add user validation
```

### Anggota 3 – CRUD Transaksi
```
feat: add income transaction
feat: add expense transaction
feat: add transaction update feature
feat: add transaction delete feature
feat: display user transactions
feat: create transaction validation
feat: connect user and transaction tables
```

### Anggota 4 – Dashboard, Grafik, dan Laporan
```
feat: create financial summary dashboard
feat: calculate total income
feat: calculate total expense
feat: calculate balance
feat: add monthly financial chart
feat: generate monthly report
feat: export report data
```

## Testing

### Login Test
- Email: testuser@example.com
- Password: password123

### Manual Testing Checklist
- [ ] Register new user
- [ ] Login with registered user
- [ ] Add income transaction
- [ ] Add expense transaction
- [ ] Edit transaction
- [ ] Delete transaction
- [ ] View dashboard with summary
- [ ] View chart in dashboard
- [ ] View monthly report
- [ ] Filter report by year/month
- [ ] Export report to CSV
- [ ] Logout
- [ ] Login with different user (verify data isolation)

## Author
- Anggota 1: Frontend & UI/UX
- Anggota 2: Backend Autentikasi
- Anggota 3: CRUD Transaksi
- Anggota 4: Dashboard, Grafik, dan Laporan

## License
ISC
>>>>>>> 5fddd57 (initial commit)
