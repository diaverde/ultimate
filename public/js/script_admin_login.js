function validar_datos_admin() {
    const user = document.getElementById("adminName").value;
    const password = document.getElementById("adminPwd").value;

    const message = document.getElementById("login-message");

    if (user == '') {
        message.textContent = "Ingrese usuario";
    } else if (password == '') {
        message.textContent = "Ingrese contraseña";
    } else {
        const loginData = {
            user: user,
            password: password
        };
        fetch('http://localhost:3000/login', {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(loginData)
        }).then(function(res){
            console.log(res);
            return res.text();
        }).then(function(data){
            console.log(data);
            if (data === 'Usuario no existe' || data === 'Contraseña incorrecta') {
                message.textContent = data;
            } else if (data === 'Bienvenido') {
                window.location.href = "admin_info.html";
            } else {
                message.textContent = "Módulo no disponible. Intente más tarde.";
            }
        }).catch(function(err){
            console.log(err)
        });
    }
}

// --------------------------

document.getElementById("enter").addEventListener("click", validar_datos_admin);