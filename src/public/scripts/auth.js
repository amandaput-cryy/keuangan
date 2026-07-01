document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("register-form");
  const loginForm = document.getElementById("login-form");

  if (registerForm) {
    registerForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const nama = document.getElementById("nama").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirm-password").value;
      const errorMessage = document.getElementById("error-message");

      errorMessage.style.display = "none";
      errorMessage.innerHTML = "";

      if (password !== confirmPassword) {
        errorMessage.innerHTML = "Password dan konfirmasi password tidak sama";
        errorMessage.style.display = "block";
        return;
      }

      try {
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            nama: nama,
            email: email,
            password: password,
            confirmPassword: confirmPassword
          })
        });

        const data = await response.json();
        const message = data.message || data.error || "Terjadi kesalahan";

        if (response.ok) {
          alert("Register berhasil");
          window.location.href = "/login";
        } else {
          errorMessage.innerHTML = message;
          errorMessage.style.display = "block";
        }
      } catch (error) {
        console.log(error);
        errorMessage.innerHTML = "Server tidak dapat dihubungi";
        errorMessage.style.display = "block";
      }
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const errorMessage = document.getElementById("error-message");

      errorMessage.style.display = "none";
      errorMessage.innerHTML = "";

      try {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: email,
            password: password
          })
        });

        const data = await response.json();
        const message = data.message || data.error || "Email atau password salah";

        if (response.ok) {
          window.location.href = "/dashboard";
        } else {
          errorMessage.innerHTML = message;
          errorMessage.style.display = "block";
        }
      } catch (error) {
        console.log(error);
        errorMessage.innerHTML = "Server tidak dapat dihubungi";
        errorMessage.style.display = "block";
      }
    });
  }

  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async function (e) {
      e.preventDefault();
      try {
        const response = await fetch("/api/auth/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          }
        });

        if (response.ok) {
          window.location.href = "/login";
        } else {
          console.error('Logout gagal');
          window.location.href = "/login";
        }
      } catch (error) {
        console.error('Logout error:', error);
        window.location.href = "/login";
      }
    });
  }
});