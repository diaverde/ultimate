let fans = [];

function getInfo() {
    fetch('http://localhost:3000/dbinfo')
    .then(function (response) {
        return response.text();
    })
    .then(function (data) {
        console.log(data);
        fans = JSON.parse(data);
        handleFans();
    })
    .catch(function (error) {
        console.log(error);
        handleError();
    });
}

function handleFans() {
    const divs = [];
    fans.forEach((fan,index) => {
        const fanData = document.createElement("div");
        fanData.innerHTML = 
            `<h3>Fan #${index+1}</h3>
            <p>Nombre: ${fan.Name}</p>
            <p>Edad: ${fan.Age}</p>
            <p>Correo electrónico: ${fan.Email}</p>
            <p>Comentarios: ${fan.Comments}</p>`;
        fanData.classList.add("fan-info");
        divs.push(fanData);
    });
    document.querySelector("#cargando").remove();
    const infoFans = document.querySelector("#info-fans");
    divs.forEach(div => infoFans.appendChild(div));
}

function handleError() {
document.querySelector("#cargando").remove();
const errorMesage = document.createElement("p");
errorMesage.textContent = "No se pudo cargar la información. Intente luego.";
const areaMensaje = document.getElementById("mensaje");
areaMensaje.appendChild(errorMesage);
}

// --------------------------

document.addEventListener("DOMContentLoaded", getInfo);