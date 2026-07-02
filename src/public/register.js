async function register(e){
    e.preventDefault();

    const nama = document.getElementById("nama").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;


    if(password !== confirmPassword){
        alert("Password dan konfirmasi password tidak sama");
        return;

    }

    try {
        const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                nama,
                email,
                password,
                confirmPassword
            })

        });

        const data = await response.json();
        if(response.ok){
            alert("Register berhasil");
            window.location.href="/login";


        } else {

            alert(data.message || "Register gagal");

        }

    } catch(error){
        console.log(error);
        alert("Gagal terhubung ke server");
    }

}