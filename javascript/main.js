var inputBuscar = document.getElementById("inputBuscar");
var buscar = document.getElementById("buscar");
var main = document.getElementsByTagName("main")[0];
var footer = document.getElementsByTagName("footer")[0];
var logo = document.getElementById("logo");
var labelModoOscuro = document.getElementById("labelModoOscuro");


/** --------------------------------- BÚSQUEDA --------------------------------- */
buscar.onclick = function () {
    window.open("/inicial/mostrarBusqueda?query=" + inputBuscar.value, "_self");
}


/** --------------------------------- MODO OSCURO --------------------------------- */
var checkmodoOscuroPeli = document.getElementsByClassName("form-check-input")[0];

if (localStorage.getItem("modoNoche") == "activado") {
    checkmodoOscuroPeli.checked = true;
    document.body.style.backgroundColor = "black";
    document.body.style.color = "white";
    footer.className = "bg-dark text-center text-white mt-4";
    logo.src = "/imagenes/logoblanco.png";
}

checkmodoOscuroPeli.onclick = function () {

    if (checkmodoOscuroPeli.checked) {
        localStorage.setItem("modoNoche", "activado");
        document.body.style.backgroundColor = "black";
        document.body.style.color = "white";
        footer.className = "bg-dark text-center text-white mt-4";
        logo.src = "/imagenes/logoblanco.png";
    } else {
        localStorage.setItem("modoNoche", "desactivado");
        document.body.style.backgroundColor = "white";
        document.body.style.color = "black";
        footer.className = "bg-light text-center text-white mt-4";
        logo.src = "/imagenes/logo.png";
    }
}