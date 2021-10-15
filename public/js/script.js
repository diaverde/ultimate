function validar_nombre(nombre) {
    let result = false;
    const letters = /^[A-Z a-z]+$/;
    //const letters = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g;
    const capLetters = /^[A-Z]+$/;
    if (nombre.match(letters)) {
        result = true;
    }
    return result;
}

function validar_edad(edad) {
    let result = false;
    if (!isNaN(Number(edad)) && Number(edad)>6) {
        result = true;
    }
    return result;
}

function validar_correo(correo) {
    let result = false;
    console.log(correo);
    const letters = /^\S+@\S+\.\S+$/;
    if (correo.match(letters)) {
        result = true;
    }
    return result;
}

function validar_datos() {
    const nombre = document.getElementById("name").value;
    const edad = document.getElementById("age").value;
    const correo = document.getElementById("email").value;
    const comentarios = document.getElementById("comments").value;
    
    let result = validar_nombre(nombre);
    if (!result) {
        alert("Nombre no es válido");
    } else {
        result = validar_edad(edad);
        if (!result) {
            alert("Edad no es válida");
        } else {
            result = validar_correo(correo);
            if (!result) {
                alert("Correo electrónico no es válido");
            }
        }
    }
    
    if (result) {
        const newMember = {
            name: nombre.trim(),
            age: Number(edad),
            email: correo.trim(),
            comments: comentarios.trim()
        }
        alert(`Usuario registrado con los siguientes datos:
            Nombre: ${newMember.name}
            Edad: ${newMember.age}
            Correo electrónico: ${newMember.email}
            Comentarios: ${newMember.comments}`);
        location.reload();
    }
}

// --------------------------

document.getElementById("enviar").addEventListener("click", validar_datos);

/*
module.exports.validar_nombre_usuario = validar_nombre_usuario;
module.exports.validar_edad_usuario = validar_edad_usuario;
module.exports.validar_contrasena = validar_contrasena;

module.exports.registros = registros;
module.exports.OrdenarArreglo = OrdenarArreglo;
module.exports.agregarRegistro = agregarRegistro;
*/