var main = document.getElementsByTagName("main")[0];

creaTabla();

function creaTabla() {
    var div = document.createElement("div");
    div.className = "d-flex justify-content-center";
    var errores = document.createElement("p");
    errores.className = "text-center";
    errores.style.color = "red";
    errores.style.fontWeight = "bold";
    main.appendChild(errores);
    var tabla = document.createElement("table");
    tabla.className = "table table-hover w-50";
    div.appendChild(tabla);

    var tbody = document.createElement("tbody");
    tabla.appendChild(tbody);

    var tr1 = document.createElement("tr");
    var th11 = document.createElement("th");
    th11.innerHTML = "Título de la lista";
    tr1.appendChild(th11);
    var td11 = document.createElement("td");
    var tituloLista = document.createElement("input");
    tituloLista.type = "text";
    tituloLista.maxLength = "50";
    td11.appendChild(tituloLista);
    tr1.appendChild(td11);
    tbody.appendChild(tr1);

    var tr2 = document.createElement("tr");
    var th12 = document.createElement("th");
    th12.innerHTML = "Añade una imagen a la lista";
    tr2.appendChild(th12);
    var td12 = document.createElement("td");
    var imagenLista = document.createElement("input");
    imagenLista.type = "text";
    imagenLista.placeholder = "URL";
    td12.appendChild(imagenLista);
    tr2.appendChild(td12);
    tbody.appendChild(tr2);

    var tr3 = document.createElement("tr");
    tr3.className = "text-center";
    var td13 = document.createElement("td");
    td13.colSpan = 2;
    var boton = document.createElement("button");
    boton.className = "btn btn-success";
    boton.innerHTML = "Crear lista";
    boton.onclick = function () {

        if (tituloLista.value == "" || imagenLista.value == "")
            errores.innerHTML = "Los campos son obligatorios.";
        else {
            fetch("/datos/nuevaLista", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        titulo: tituloLista.value,
                        imagen: imagenLista.value
                    })
                })
                .then(function (resp) {
                    if (resp.ok) {
                        resp.json()
                            .then(function (data) {
                                if (data == "exito")
                                    location.href = "/inicial/misListas";
                            })
                            .catch(function (er) {
                                console.error(er);
                            });
                    }
                })
                .catch(function (er) {
                    console.error("ERROR: " + er);
                });
        }
    }
    td13.appendChild(boton);
    tr3.appendChild(td13);
    tbody.appendChild(tr3);

    main.appendChild(div);
}