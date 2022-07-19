const API_KEY = "api_key=35daf987b2cfb67f2d6317f5f49891ee";
const BASE_URL = "https://api.themoviedb.org/3";
const LAN_ES = "&language=es-ES";
const IMG_URL = "https://image.tmdb.org/t/p/original";

var id = 0;
var main = document.getElementsByTagName("main")[0];

/** --------------------------------- MODO NOCHE --------------------------------- */
var checkmodoOscuroPeli = document.getElementsByClassName("form-check-input")[0];

checkmodoOscuroPeli.onclick = function () {

    if (checkmodoOscuroPeli.checked) {
        localStorage.setItem("modoNoche", "activado");
        location.reload();
    } else {
        localStorage.setItem("modoNoche", "desactivado");
        location.reload();
    }
}

fetch("/datos/misCriticas")
    .then(function (resp) {
        if (resp.ok) {
            resp.json()
                .then(function (data) {

                    if (data == "") {
                        
                        let h1 = document.createElement("h1");
                        h1.innerHTML = "¡Aún no has escrito ninguna crítica!";
                        h1.className = "text-center";
                        main.appendChild(h1);

                    } else {

                        for (let i = 0; i < data.length; i++) {

                            let divP = document.createElement("div");
                            divP.className = "shadow p-3 mb-5 mt-5 bg-body rounded position-relative w-100";
                            main.appendChild(divP);

                            let divDatos = document.createElement("div");
                            divDatos.className = "d-flex";

                            let poster = document.createElement("img");
                            poster.className = "rounded mx-4 mt-4";
                            poster.style.width = "100px";
                            poster.style.height = "150px";
                            poster.style.cursor = "pointer";
                            poster.onclick = function () {
                                if (data[i].tipo == "movie")
                                    window.open("/inicial/mostrarInfo?movie&" + data[i].id_pelicula, "_self");
                                else
                                    window.open("/inicial/mostrarInfo?tv&" + data[i].id_pelicula, "_self");
                            }
                            divDatos.appendChild(poster);

                            let tit = document.createElement("h3");
                            tit.className = "mx-2 mt-5";
                            divDatos.appendChild(tit);

                            let divOp = document.createElement("div");
                            divOp.className = "mt-4 d-flex position-absolute top-0 start-50 translate-middle-x";

                            let linkMod = document.createElement("a");
                            let modificar = document.createElement("i");
                            modificar.className = "bi bi-pencil-square";
                            linkMod.appendChild(modificar);
                            divOp.appendChild(linkMod);

                            let linkBorrar = document.createElement("a");
                            linkBorrar.href = "javascript:void(0)";
                            linkBorrar.onclick = function () {

                                let obj = {
                                    id: data[i].id_pelicula
                                }

                                Swal.fire({
                                    title: '¡Cuidado!',
                                    text: "Una vez aceptes, la crítica se borrará permanentemente.",
                                    icon: 'warning',
                                    showCancelButton: true,
                                    confirmButtonColor: '#d33',
                                    cancelButtonColor: '#3085d6',
                                    confirmButtonText: 'Borrar permanentemente',
                                    cancelButtonText: "Mejor no"
                                }).then((result) => {
                                    if (result.isConfirmed) {

                                        fetch("/datos/borrarCritica", {
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
                                                                '¡Borrada!',
                                                                'La crítica ha sido borrada permanentemente.',
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
                                    }
                                })
                            }
                            let borrar = document.createElement("i");
                            borrar.className = "bi bi-x-square ms-2";
                            linkBorrar.appendChild(borrar);
                            divOp.appendChild(linkBorrar);
                            divP.appendChild(divOp);

                            if (data[i].tipo == "movie") {
                                fetch(BASE_URL + "/movie/" + data[i].id_pelicula + "?" + API_KEY + LAN_ES)
                                    .then(function (resp) {
                                        if (resp.ok) {
                                            resp.json()
                                                .then(function (data) {
                                                    poster.src = IMG_URL + data.poster_path;
                                                    tit.innerHTML = data.title;
                                                    linkMod.href = "/inicial/critica?movie&" + data.id + "&editar";
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
                                fetch(BASE_URL + "/tv/" + data[i].id_pelicula + "?" + API_KEY + LAN_ES)
                                    .then(function (resp) {
                                        if (resp.ok) {
                                            resp.json()
                                                .then(function (data) {
                                                    poster.src = IMG_URL + data.poster_path;
                                                    tit.innerHTML = data.name;
                                                    linkMod.href = "/inicial/critica?tv&" + data.id + "&editar";
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

                            divP.appendChild(divDatos);

                            let divPunt = document.createElement("div");
                            if (data[i].puntuacion == "0")
                                divPunt.innerHTML = "-";
                            else
                                divPunt.innerHTML = data[i].puntuacion;
                            divPunt.style.color = "white";
                            divPunt.style.width = "50px";
                            divPunt.style.backgroundColor = "red";
                            divPunt.style.padding = "10px";
                            divPunt.style.borderRadius = "100%";
                            divP.style.fontSize = "1.2rem";
                            divPunt.className = "position-absolute top-0 end-0 mx-4 mt-4 d-flex justify-content-center";
                            divP.appendChild(divPunt);

                            let titulo = document.createElement("h3");
                            titulo.className = "mx-4 mt-5";
                            titulo.style.fontWeight = "bold";
                            titulo.innerHTML = data[i].titulo_critica;
                            divP.appendChild(titulo);

                            let divCuerpo = document.createElement("div");
                            divCuerpo.className = "ms-4 mt-2";
                            divCuerpo.style.display = "-webkit-box";
                            divCuerpo.style.webkitLineClamp = 2;
                            divCuerpo.style.webkitBoxOrient = "vertical";
                            divCuerpo.style.overflow = "hidden";
                            divCuerpo.style.textOverflow = "ellipsis";
                            divP.appendChild(divCuerpo);
                            let cuerpo = document.createElement("p");
                            cuerpo.innerText = data[i].cuerpo_critica;
                            divCuerpo.appendChild(cuerpo);
                            let botonLeerMas = document.createElement("button");
                            botonLeerMas.className = "ms-4 btn btn-info";
                            botonLeerMas.innerHTML = "Leer más...";
                            botonLeerMas.onclick = function () {
                                if (divCuerpo.style.display == "-webkit-box") {
                                    divCuerpo.style.display = "block";
                                    botonLeerMas.innerHTML = "Leer menos...";
                                } else if (divCuerpo.style.display == "block") {
                                    divCuerpo.style.display = "-webkit-box";
                                    divCuerpo.style.webkitLineClamp = 2;
                                    divCuerpo.style.webkitBoxOrient = "vertical";
                                    divCuerpo.style.overflow = "hidden";
                                    divCuerpo.style.textOverflow = "ellipsis";
                                    botonLeerMas.innerHTML = "Leer más...";
                                }
                            }
                            if (divCuerpo.offsetHeight < divCuerpo.scrollHeight ||
                                divCuerpo.offsetWidth < divCuerpo.scrollWidth) {
                                divP.appendChild(botonLeerMas);
                            }

                            if (localStorage.getItem("modoNoche") == "activado") {
                                divP.className = "shadow p-3 mb-5 mt-5 rounded position-relative w-100 bg-dark text-white";
                            }
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


function fechaMysqlANormal(fecha) {

    var separada = fecha.split("-");
    let año = separada[0];
    let mes = separada[1];
    let dia = separada[2];

    return dia + "/" + mes + "/" + año;
}