// Dashboard JS - Anggota 4
let chart = null;
let recentTransaksi = [];

function updateRecentTable(transaksi) {
  const tbody = document.querySelector('#recent-table tbody');
  if (!tbody) return;
  tbody.innerHTML = '';

  transaksi.slice(0, 5).forEach(t => {
    const row = tbody.insertRow();
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const tanggal = new Date(t.tanggal).toLocaleDateString('id-ID', dateOptions);

    row.insertCell(0).textContent = tanggal;
    row.insertCell(1).textContent = t.keterangan;
    row.insertCell(2).textContent = t.jenis === 'Pemasukan' ? 'Pemasukan' : 'Pengeluaran';
    row.insertCell(3).textContent = 'Rp ' + parseFloat(t.jumlah).toLocaleString('id-ID');
  });
}

function applyRecentFilter(filterType) {
  let filtered = recentTransaksi;

  if (filterType === 'Pemasukan' || filterType === 'Pengeluaran') {
    filtered = recentTransaksi.filter(t => t.jenis === filterType);
  }

  updateRecentTable(filtered);
}

function initFilterButtons() {
  const buttons = document.querySelectorAll('.filter-pill');
  const activeClass = 'active';

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(btn => btn.classList.remove(activeClass));
      button.classList.add(activeClass);

      const type = button.textContent.trim();
      if (type === 'Semua') {
        applyRecentFilter('Semua');
      } else {
        applyRecentFilter(type);
      }
    });
  });
}

async function loadDashboard() {
  // Check authentication
  const authResponse = await fetch('/api/auth/user');
  if (!authResponse.ok) {
    window.location.href = '/login';
    return;
  }
  
  const user = await authResponse.json();
  const userName = user.nama || 'Pengguna';
  document.getElementById('dashboard-user-name').textContent = userName;
  const navNameEl = document.getElementById('nav-user-name');
  if (navNameEl) navNameEl.textContent = userName;
  const navAvatarEl = document.getElementById('nav-avatar');
  if (navAvatarEl) navAvatarEl.textContent = userName.charAt(0).toUpperCase();
  
  // Load financial summary
  try {
    const summaryResponse = await fetch('/api/dashboard/summary');
    const summary = await summaryResponse.json();

    if (!summaryResponse.ok) {
      console.error('Summary error:', summary);
      return;
    }

    const totalIncome = Number(summary.totalIncome) || 0;
    const totalExpense = Number(summary.totalExpense) || 0;
    const balance = Number(summary.balance) || 0;
    const incomeRatio = Number(summary.incomeRatio) || 0;
    const expenseRatio = Number(summary.expenseRatio) || 0;
    const balanceRatio = Number(summary.balanceRatio) || 0;

    document.getElementById('total-income').textContent = 'Rp ' + totalIncome.toLocaleString('id-ID');
    document.getElementById('total-expense').textContent = 'Rp ' + totalExpense.toLocaleString('id-ID');
    document.getElementById('balance').textContent = 'Rp ' + balance.toLocaleString('id-ID');

    // Update balance color
    const balanceEl = document.getElementById('balance');
    if (balance < 0) {
      balanceEl.parentElement.classList.add('negative');
    }
  } catch (error) {
    console.error('Error loading summary:', error);
  }
  
  // Load chart data
  try {
    const chartResponse = await fetch('/api/dashboard/chart');
    const chartData = await chartResponse.json();
    
    const labels = chartData.map(d => d.bulan);
    const incomeData = chartData.map(d => d.income);
    const expenseData = chartData.map(d => d.expense);
    
    const ctx = document.getElementById('chart').getContext('2d');
    
    if (chart) {
      chart.destroy();
    }

    console.log("chartData:", chartData);
    
    chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Pemasukan',
            data: incomeData,
            backgroundColor: '#4CAF50',
            borderColor: '#4CAF50',
            borderWidth: 1
          },
          {
            label: 'Pengeluaran',
            data: expenseData,
            backgroundColor: '#FF6B6B',
            borderColor: '#FF6B6B',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            stacked: false
          },
          y: {
            beginAtZero: true,
            ticks: {
              callback: value => 'Rp ' + value.toLocaleString('id-ID')
            }
          }
        },
        plugins: {
          legend: {
            position: 'top'
          },
          tooltip: {
            callbacks: {
              label: context => `${context.dataset.label}: Rp ${context.parsed.y.toLocaleString('id-ID')}`
            }
          }
        }
      }
    });
  } catch (error) {
    console.error('Error loading chart:', error);
  }
  
  // Load recent transactions
  try {
    const transaksiResponse = await fetch('/api/transaksi');
    recentTransaksi = await transaksiResponse.json();
    updateRecentTable(recentTransaksi);
  } catch (error) {
    console.error('Error loading transactions:', error);
  }

  initFilterButtons();
}

// Load dashboard on page load
document.addEventListener('DOMContentLoaded', loadDashboard);
