const API_KEY = "api_key=35daf987b2cfb67f2d6317f5f49891ee";
const BASE_URL = "https://api.themoviedb.org/3";
const LAN_ES = "&language=es-ES";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

var main = document.getElementsByTagName("main")[0];
var titulo = location.href.split("?")[1];

fetch("/datos/detallesLista", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            titulo: decodeURIComponent(titulo)
        })
    })
    .then(function (resp) {
        if (resp.ok) {
            resp.json()
                .then(function (data) {

                    let tituloLista = document.createElement("h1");
                    tituloLista.className = "text-center";
                    tituloLista.innerHTML = data[0].titulo;
                    main.appendChild(tituloLista);

                    let imagenLista = document.createElement("img");
                    imagenLista.className = "w-25 mt-3 d-block m-auto";
                    imagenLista.src = data[0].imagen;
                    main.appendChild(imagenLista);

                    let wrapper = document.createElement("div");
                    wrapper.className = "wrapper d-flex flex-wrap justify-content-center mt-5";

                    for (let i = 1; i < data.length; i++) {
                        if (data[i].tipo == "movie") {
                            fetch(BASE_URL + "/movie/" + data[i].id_pelicula + "?" + API_KEY + LAN_ES)
                                .then(function (resp) {
                                    if (resp.ok) {
                                        resp.json()
                                            .then(function (dataPeli) {
                                                creaElementos(data[i], dataPeli, wrapper);
                                            })
                                            .catch(function (er) {
                                                console.error("ERROR: " + er);
                                            });
                                    }
                                })
                                .catch(function (er) {
                                    console.error(er);
                                });
                        } else {
                            fetch(BASE_URL + "/tv/" + data[i].id_pelicula + "?" + API_KEY + LAN_ES)
                                .then(function (resp) {
                                    if (resp.ok) {
                                        resp.json()
                                            .then(function (dataSerie) {
                                                creaElementos(data[i], dataSerie, wrapper);
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
                })
                .catch(function (er) {
                    console.error(er);
                });
        }
    })
    .catch(function (er) {
        console.error("ERROR: " + er);
    });


function creaElementos(bdData, data, wrapper) {
    let card = document.createElement("div");
    card.className = "card";
    card.style.cursor = "pointer";
    card.onclick = function () {
        if (data.title != undefined)
            window.open("/inicial/mostrarInfo?movie&" + data.id, "_self");
        else
            window.open("/inicial/mostrarInfo?tv&" + data.id, "_self");
    }
    wrapper.appendChild(card);

    let poster = document.createElement("img");
    poster.className = "rounded";
    poster.src = IMG_URL + data.poster_path;
    card.appendChild(poster);

    let divDes = document.createElement("div");
    divDes.className = "descriptions d-flex flex-column align-items-center justify-content-center";
    card.appendChild(divDes);

    let titulo = document.createElement("span");
    titulo.innerHTML = (data.title != undefined) ? data.title : data.name;
    divDes.appendChild(titulo);

    let botonBorrar = document.createElement("button");
    botonBorrar.className = "btn btn-danger-outline mt-2";
    botonBorrar.innerHTML = "<i class='bi bi-trash'></i>"
    botonBorrar.title = "Eliminar de la lista";
    botonBorrar.onclick = function () {

        card.onclick = "";

        let obj = {
            id: bdData.id_lista
        }

        Swal.fire({
            title: '¡Cuidado!',
            text: "¿Seguro que la quieres borrar de esta lista?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Si, seguro',
            cancelButtonText: "Mejor no"
        }).then((result) => {
            if (result.isConfirmed) {

                fetch("/datos/borrarPeliDeLista", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(obj)
                    })
                    .then(function (resp) {
                        if (resp.ok) {
                            resp.text()
                                .then(function (data) {

                                    Swal.fire(
                                        '¡Borrado!',
                                        'Borrada correctamente de esta lista.',
                                        'success'
                                    ).then(function () {
                                        location.reload();
                                    });

                                })
                                .catch(function (er) {
                                    console.error(er);
                                });
                        }
                    })
                    .catch(function (er) {
                        console.error("ERROR: " + er);
                    });
            } else {
                card.onclick = function () {
                    if (data.title != undefined)
                        window.open("/inicial/mostrarInfo?movie&" + data.id, "_self");
                    else
                        window.open("/inicial/mostrarInfo?tv&" + data.id, "_self");
                }
            }
        })
    }
    divDes.appendChild(botonBorrar);

    let divPunt = document.createElement("div");
    divPunt.id = "divPunt";
    divPunt.className = "position-absolute top-0 start-100 translate-middle text-center";
    divPunt.style.width = "38px";
    let puntuacion = document.createElement("label");
    puntuacion.id = "nota";
    fetch("/datos/mediaVotos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: data.id
            })
        })
        .then(function (resp) {
            if (resp.ok) {
                resp.json()
                    .then(function (data) {
                        if (data == "0")
                            puntuacion.innerHTML = "-";
                        else
                            puntuacion.innerHTML = data;
                    })
                    .catch(function (er) {
                        console.error(er);
                    });
            }
        })
        .catch(function (er) {
            console.error("ERROR: " + er);
        });
    puntuacion.className = "border border-primary border-2 rounded-circle";
    divPunt.appendChild(puntuacion);
    card.appendChild(divPunt);

    main.appendChild(wrapper);
}