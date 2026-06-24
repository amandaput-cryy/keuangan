const express = require('express');
const router = express.Router();
const { 
  register, login, logout, getCurrentUser,
  tambahTransaksi, daftarTransaksi, editTransaksi, hapusTransaksi,
  getFinancialSummary, getMonthlyReport, getChartData
} = require('./handlers');

// Autentikasi Routes - Anggota 2
router.post('/auth/register', register);
router.post('/auth/login', login);
router.post('/auth/logout', logout);
router.get('/auth/user', getCurrentUser);

// Transaksi Routes - Anggota 3
router.get('/transaksi', daftarTransaksi);
router.post('/transaksi', tambahTransaksi);
router.put('/transaksi/:id', editTransaksi);
router.delete('/transaksi/:id', hapusTransaksi);

// Dashboard & Laporan Routes - Anggota 4
router.get('/dashboard/summary', getFinancialSummary);
router.get('/dashboard/report', getMonthlyReport);
router.get('/dashboard/chart', getChartData);

module.exports = router
