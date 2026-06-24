// Authentication JS - Anggota 2
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const errorMessageDiv = document.getElementById('error-message');

// Check if user is already logged in
function checkAuthentication() {
  fetch('/api/auth/user')
    .then(response => {
      if (response.ok) {
        // User sudah login, redirect ke dashboard
        window.location.href = 'dashboard.html';
      }
    })
    .catch(err => console.log('User tidak login'));
}

// Login Form Handler
if (loginForm) {
  checkAuthentication();
  
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Login berhasil
        window.location.href = 'dashboard.html';
      } else {
        // Login gagal
        errorMessageDiv.textContent = data.error || 'Login gagal';
        errorMessageDiv.style.display = 'block';
      }
    } catch (error) {
      console.error('Error:', error);
      errorMessageDiv.textContent = 'Terjadi kesalahan pada server';
      errorMessageDiv.style.display = 'block';
    }
  });
}

// Register Form Handler
if (registerForm) {
  checkAuthentication();
  
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nama = document.getElementById('nama').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nama, email, password, confirmPassword })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Register berhasil
        alert(data.message);
        window.location.href = 'login.html';
      } else {
        // Register gagal
        errorMessageDiv.textContent = data.error || 'Register gagal';
        errorMessageDiv.style.display = 'block';
      }
    } catch (error) {
      console.error('Error:', error);
      errorMessageDiv.textContent = 'Terjadi kesalahan pada server';
      errorMessageDiv.style.display = 'block';
    }
  });
}

// Logout Function
function logout() {
  fetch('/api/auth/logout', { method: 'POST' })
    .then(() => {
      window.location.href = 'login.html';
    })
    .catch(err => console.error('Logout error:', err));
}

// Setup Logout Button
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    logout();
  });
}

// Display User Name
const userNameEl = document.getElementById('user-name');
if (userNameEl) {
  fetch('/api/auth/user')
    .then(response => {
      if (!response.ok) {
        window.location.href = 'login.html';
      }
      return response.json();
    })
    .then(data => {
      userNameEl.textContent = data.nama || data.email;
    })
    .catch(err => {
      window.location.href = 'login.html';
    });
}
