// Laporan JS - Anggota 4
let allReports = [];

async function loadLaporan() {
  // Check authentication
  const authResponse = await fetch('/api/auth/user');
  if (!authResponse.ok) {
    window.location.href = 'login.html';
    return;
  }
  
  const user = await authResponse.json();
  document.getElementById('user-name').textContent = user.nama;
  
  // Set default year to current year
  const currentYear = new Date().getFullYear();
  document.getElementById('report-year').value = currentYear;
  
  try {
    const response = await fetch('/api/dashboard/report');
    if (response.ok) {
      allReports = await response.json();
      displayReports(allReports);
    }
  } catch (error) {
    console.error('Error loading report:', error);
  }
}

function displayReports(reports) {
  const tbody = document.querySelector('#laporan-table tbody');
  tbody.innerHTML = '';
  
  reports.forEach(report => {
    const row = tbody.insertRow();
    row.insertCell(0).textContent = formatBulan(report.bulan);
    row.insertCell(1).textContent = 'Rp ' + report.totalIncome.toLocaleString('id-ID');
    row.insertCell(2).textContent = 'Rp ' + report.totalExpense.toLocaleString('id-ID');
    
    const balanceCell = row.insertCell(3);
    balanceCell.textContent = 'Rp ' + report.balance.toLocaleString('id-ID');
    
    if (report.balance < 0) {
      balanceCell.style.color = '#FF6B6B';
      balanceCell.style.fontWeight = 'bold';
    } else {
      balanceCell.style.color = '#4CAF50';
    }
  });
}

function formatBulan(bulanString) {
  const [tahun, bulan] = bulanString.split('-');
  const bulanNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];
  return bulanNames[parseInt(bulan) - 1] + ' ' + tahun;
}

// Filter Handler
document.getElementById('filter-btn').addEventListener('click', async () => {
  const year = document.getElementById('report-year').value;
  const month = document.getElementById('report-month').value;
  
  try {
    let url = '/api/dashboard/report';
    const params = new URLSearchParams();
    
    if (year) params.append('year', year);
    if (month) params.append('month', month);
    
    if (params.toString()) {
      url += '?' + params.toString();
    }
    
    const response = await fetch(url);
    if (response.ok) {
      const reports = await response.json();
      displayReports(reports);
    }
  } catch (error) {
    console.error('Error filtering report:', error);
  }
});

// Export Handler
document.getElementById('export-btn').addEventListener('click', () => {
  const year = document.getElementById('report-year').value;
  const month = document.getElementById('report-month').value;
  
  let filteredReports = allReports;
  
  if (year || month) {
    filteredReports = allReports.filter(report => {
      const [reportYear, reportMonth] = report.bulan.split('-');
      
      if (year && year !== reportYear) return false;
      if (month && month !== reportMonth) return false;
      
      return true;
    });
  }
  
  // Create CSV content
  let csv = 'Bulan,Total Pemasukan,Total Pengeluaran,Saldo\n';
  
  filteredReports.forEach(report => {
    csv += `"${formatBulan(report.bulan)}","Rp ${report.totalIncome.toLocaleString('id-ID')}","Rp ${report.totalExpense.toLocaleString('id-ID')}","Rp ${report.balance.toLocaleString('id-ID')}"\n`;
  });
  
  // Download CSV
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv));
  element.setAttribute('download', `laporan_keuangan_${new Date().toISOString().split('T')[0]}.csv`);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
});

// Load on page load
document.addEventListener('DOMContentLoaded', loadLaporan);
