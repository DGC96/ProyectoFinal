const API_KEY = "api_key=35daf987b2cfb67f2d6317f5f49891ee";
const BASE_URL = "https://api.themoviedb.org/3";
const LAN_ES = "&language=es-ES";
const IMG_URL = "https://image.tmdb.org/t/p/original";

var main = document.getElementsByTagName("main")[0];

var url = location.href;
var aux = url.split("?")[1];
var final = aux.split("&");

var urlPeli = BASE_URL + "/movie/" + final[1] + "?" + API_KEY + LAN_ES;
var urlTV = BASE_URL + "/tv/" + final[1] + "?" + API_KEY + LAN_ES;


/** --------------------------------- MODO NOCHE --------------------------------- */
var checkmodoOscuroPeli = document.getElementsByClassName("form-check-input")[0];

if (localStorage.getItem("modoNoche") == "activado") {
    document.body.style.backgroundColor = "black";
    document.body.style.color = "white";
}

checkmodoOscuroPeli.onclick = function () {

    if (checkmodoOscuroPeli.checked) {
        localStorage.setItem("modoNoche", "activado");
        location.reload();
    } else {
        localStorage.setItem("modoNoche", "desactivado");
        location.reload();
    }
}

if (final[0] == "movie") {
    fetch(urlPeli)
        .then(function (resp) {
            if (resp.ok) {
                resp.json()
                    .then(function (data) {
                        crearInfo(data);
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
    fetch(urlTV)
        .then(function (resp) {
            if (resp.ok) {
                resp.json()
                    .then(function (data) {
                        crearInfo(data);
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

setTimeout(function () {
    fetch("/datos/dameCriticasPorPeli", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: final[1]
            })
        })
        .then(function (resp) {
            if (resp.ok) {
                resp.json()
                    .then(function (data) {
                        creaCriticas(data);
                    })
                    .catch(function (er) {
                        console.error(er);
                    });
            }
        })
        .catch(function (er) {
            console.error("ERROR: " + er);
        });
}, 1000)


function crearInfo(data) {

    let principal = document.createElement("div");
    principal.className = "rounded-4";
    principal.id = "divPrincipal";
    principal.style.background = "linear-gradient(rgba(0,0,0,.8),rgba(0,0,0,.8)),url(" + IMG_URL + data.backdrop_path + ")";
    principal.style.backgroundRepeat = "no-repeat";
    principal.style.backgroundSize = "cover";

    let divImgInfo = document.createElement("div");
    divImgInfo.className = "d-md-flex";

    let divPoster = document.createElement("div");
    divPoster.className = "d-flex align-items-center mx-4 my-4";
    divPoster.style.width = "50%";
    divPoster.style.minWidth = "30%";
    let poster = document.createElement("img");
    poster.className = "rounded-4";
    poster.style.width = "100%";
    poster.src = IMG_URL + data.poster_path;
    divPoster.appendChild(poster);
    divImgInfo.appendChild(divPoster);

    let divInfo = document.createElement("div");
    divInfo.style.color = "white";
    divInfo.className = "mt-4";

    let titulo = document.createElement("h3");
    if (data.release_date != undefined)
        titulo.innerHTML = data.title + " (" + data.release_date.split("-")[0] + ")";
    else if (data.first_air_date != undefined)
        titulo.innerHTML = data.name + " (" + data.first_air_date.split("-")[0] + ")";
    divInfo.appendChild(titulo);

    let divInfoDurGen = document.createElement("div");

    let infoDurGen = document.createElement("span");
    if (data.release_date != undefined)
        infoDurGen.innerHTML = fechaMysqlANormal(data.release_date) + " - ";
    else if (data.first_air_date != undefined)
        infoDurGen.innerHTML = fechaMysqlANormal(data.first_air_date) + " - ";

    for (let i = 0; i < data.genres.length; i++) {
        if (i == data.genres.length - 1)
            infoDurGen.innerHTML += data.genres[i].name;
        else
            infoDurGen.innerHTML += data.genres[i].name + ", ";
    }
    if (data.runtime != undefined)
        infoDurGen.innerHTML += " - " + minutosATiempo(data.runtime);
    else if (data.number_of_seasons != undefined) {
        if (data.number_of_seasons == 1)
            infoDurGen.innerHTML += " - " + data.number_of_seasons + " temporada. " + data.number_of_episodes + " episodios.";
        else
            infoDurGen.innerHTML += " - " + data.number_of_seasons + " temporadas. " + data.number_of_episodes + " episodios.";
    }

    divInfoDurGen.appendChild(infoDurGen);
    divInfo.appendChild(divInfoDurGen);

    let divPuntPrin = document.createElement("div");
    divPuntPrin.className = "d-flex justify-content-evenly";

    let divPunt = document.createElement("div");
    divPunt.className = "d-flex flex-column text-center mt-5 w-25 align-items-center justify-content-center";
    divPuntPrin.appendChild(divPunt);

    let rate = document.createElement("h3");
    fetch("/datos/mediaVotos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: final[1]
            })
        })
        .then(function (resp) {
            if (resp.ok) {
                resp.json()
                    .then(function (data) {
                        rate.innerHTML = data;
                    })
                    .catch(function (er) {
                        console.error(er);
                    });
            }
        })
        .catch(function (er) {
            console.error("ERROR: " + er);
        });
    rate.style.backgroundColor = "black";
    rate.style.padding = "10%";
    rate.style.borderRadius = "10px";
    divPunt.appendChild(rate);

    let numVotos = document.createElement("span");
    fetch("/datos/cuentaVotos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: final[1]
            })
        })
        .then(function (resp) {
            if (resp.ok) {
                resp.json()
                    .then(function (data) {
                        numVotos.innerHTML = data + " votos";
                    })
                    .catch(function (er) {
                        console.error(er);
                    });
            }
        })
        .catch(function (er) {
            console.error("ERROR: " + er);
        });
    divPunt.appendChild(numVotos);

    let divMiPunt = document.createElement("div");
    divMiPunt.className = "d-flex flex-column text-center mt-5 w-25 align-items-center justify-content-center";

    let spanPunt = document.createElement("span");
    spanPunt.innerHTML = "Tu voto";
    divMiPunt.appendChild(spanPunt);

    let selectPunt = document.createElement("select");
    selectPunt.className = "form-select";
    selectPunt.onchange = function () {

        fetch("/datos/cambiarPunt", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    punt: selectPunt.options[selectPunt.selectedIndex].value.split("-")[0].trim(),
                    id: final[1],
                    tipo: final[0]
                })
            })
            .then(function (resp) {
                if (resp.ok) {
                    resp.text()
                        .then(function (data) {
                            location.reload();
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
    let optionArray = ["No vista", "10 - Excelente", "9 - Muy buena", "8 - Notable", "7 - Buena", "6 - Interesante", "5 - Pasable",
        "4 - Regular", "3 - Floja", "2 - Mala", "1 - Muy mala"
    ];

    fetch("/datos/primerSelect", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: final[1]
            })
        })
        .then(function (resp) {
            if (resp.ok) {
                resp.json()
                    .then(function (data) {

                        if (data != "error") {
                            for (let i = 0; i < optionArray.length; i++) {
                                let option = document.createElement("option");
                                if (data != "") {
                                    if (optionArray[i].split("-")[0].trim() == data[0].puntuacion)
                                        option.selected = "selected";
                                }
                                option.value = optionArray[i];
                                option.innerHTML = optionArray[i];
                                selectPunt.appendChild(option);
                            }
                            divMiPunt.appendChild(selectPunt);

                            let fechaPunt = document.createElement("span");
                            fechaPunt.className = "mt-1";
                            if (data != "") {
                                if (data[0].fecha_puntuacion != "0000-00-00")
                                    fechaPunt.innerHTML = fechaMysqlANormal(data[0].fecha_puntuacion);
                            }
                            divMiPunt.appendChild(fechaPunt);
                            divPuntPrin.appendChild(divMiPunt);
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
    divInfo.appendChild(divPuntPrin);

    let sinopsis = document.createElement("p");
    sinopsis.className = "mt-5";
    sinopsis.style.textAlign = "justify";
    sinopsis.style.marginRight = "5%";
    sinopsis.innerHTML = data.overview;
    divInfo.appendChild(sinopsis);

    let presupuesto = document.createElement("label");
    presupuesto.className = "mt-5";
    let ingresos = document.createElement("span");
    let logoCanal = document.createElement("img");
    if (data.budget != undefined) {
        presupuesto.innerHTML = "Presupuesto: $" + convertirNumero(data.budget);
        ingresos.innerHTML = "<br>Ingresos: $" + convertirNumero(data.revenue);
        divInfo.appendChild(presupuesto);
        divInfo.appendChild(ingresos);
    } else if (data.networks != undefined && data.networks.length > 0) {
        presupuesto.innerHTML = "Canal:";
        logoCanal.src = IMG_URL + data.networks[0].logo_path;
        logoCanal.style.backgroundColor = "white";
        logoCanal.style.width = "10%";
        logoCanal.style.padding = "1%";
        logoCanal.style.borderRadius = "10px";
        logoCanal.style.marginBottom = "3%";
        divInfo.appendChild(presupuesto);
        divInfo.appendChild(document.createElement("br"));
        divInfo.appendChild(logoCanal);
    }

    fetch("/datos/primerSelect", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: final[1]
            })
        })
        .then(function (resp) {
            if (resp.ok) {
                resp.json()
                    .then(function (data) {

                        if (data[0]?.titulo_critica == "" || data == "") {
                            let spanCritica = document.createElement("p");
                            spanCritica.className = "mt-5 mb-3";
                            let linkCritica = document.createElement("a");

                            if (final[0] == "tv") {
                                spanCritica.innerHTML = "Aún no has escrito una crítica para esta serie. Escribe una ";
                                linkCritica.innerHTML = "aquí.";
                                linkCritica.href = "/inicial/critica?tv&" + final[1];
                            } else if (final[0] == "movie") {
                                spanCritica.innerHTML = "Aún no has escrito una crítica para esta película. Escribe una ";
                                linkCritica.innerHTML = "aquí.";
                                linkCritica.href = "/inicial/critica?movie&" + final[1];
                            }
                            spanCritica.appendChild(linkCritica);
                            divInfo.appendChild(document.createElement("br"));
                            divInfo.appendChild(spanCritica);
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

    let divListasPr = document.createElement("div");
    divListasPr.className = "d-flex justify-content-around mt-5 mb-4";

    let divListas = document.createElement("div");
    divListas.className = "d-flex flex-wrap justify-content-center w-50";
    divListasPr.appendChild(divListas);

    let spanListas = document.createElement("span");
    spanListas.innerHTML = "¿Quieres añadirla a una de tus listas?";

    let selectListas = document.createElement("select");
    selectListas.className = "form-select";
    selectListas.onchange = function () {
        fetch("/datos/peliALista", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    titulo: selectListas.options[selectListas.selectedIndex].value.trim(),
                    id: final[1],
                    tipo: final[0]
                })
            })
            .then(function (resp) {
                if (resp.ok) {
                    resp.json()
                        .then(function (data) {
                            if (data == "exito") {
                                location.reload();
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
    }
    let optionLista = document.createElement("option");
    optionLista.value = "-";
    optionLista.innerHTML = "Selecciona una lista...";
    optionLista.selected = "selected";
    optionLista.disabled = true;
    selectListas.appendChild(optionLista);

    fetch("/datos/filtrarListas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: final[1]
            })
        })
        .then(function (resp) {
            if (resp.ok) {
                resp.json()
                    .then(function (data) {
                        if (data != "error") {
                            divListas.appendChild(spanListas);
                            divListas.appendChild(selectListas);

                            for (let i = 0; i < data.length; i++) {
                                let option = document.createElement("option");
                                option.value = data[i].titulo;
                                option.innerHTML = data[i].titulo;
                                selectListas.appendChild(option);
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

    fetch("/datos/compruebaPeliLista", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: final[1]
            })
        })
        .then(function (resp) {
            if (resp.ok) {
                resp.json()
                    .then(function (data) {
                        if (data != "error") {
                            let spanListaSele = document.createElement("span");
                            spanListaSele.innerHTML = "Añadida a:<br>";
                            for (let i = 0; i < data.length; i++) {
                                spanListaSele.innerHTML += "&emsp;- " + data[i].titulo;
                                let linkVer = document.createElement("a");
                                linkVer.href = "/inicial/detallesLista?" + data[i].titulo;
                                let ver = document.createElement("i");
                                ver.className = "bi bi-eye ms-1";
                                linkVer.appendChild(ver);
                                spanListaSele.appendChild(linkVer);
                                spanListaSele.innerHTML += "<br>";
                            }
                            divListasPr.appendChild(spanListaSele);
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

    divInfo.appendChild(divListasPr);
    divImgInfo.appendChild(divInfo);
    principal.appendChild(divImgInfo);
    main.appendChild(principal);
}

function creaCriticas(data) {

    data.sort((a, b) => new Date(b.fecha_critica) - new Date(a.fecha_critica));

    for (let i = 0; i < data.length; i++) {

        if (data[i].titulo_critica != "") {

            let divP = document.createElement("div");
            divP.className = "shadow p-3 mb-5 mt-5 bg-body rounded position-relative w-100";
            main.appendChild(divP);

            let divDatos = document.createElement("div");
            divDatos.className = "d-flex flex-column";
            let nick = document.createElement("h5");
            nick.className = "mx-4 mt-4";
            nick.style.fontWeight = "bold";
            nick.innerHTML = data[i].usuario;
            divDatos.appendChild(nick);

            let fecha = document.createElement("span");
            fecha.className = "mx-4";
            fecha.innerHTML = fechaMysqlANormal(data[i].fecha_critica);
            fecha.style.color = "grey";
            fecha.style.fontSize = "0.8rem";
            divDatos.appendChild(fecha);
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
}

function minutosATiempo(minutos) {
    const leyenda = (numero, palabra, plural) => numero === 0 || numero > 1 ? `${numero} ${palabra}${plural || "s"}` : `${numero} ${palabra}`;
    const MINUTOS_POR_HORA = 60,
        HORAS_POR_DIA = 24,
        DIAS_POR_SEMANA = 7,
        DIAS_POR_MES = 30,
        MESES_POR_ANIO = 12;
    if (minutos < MINUTOS_POR_HORA) return leyenda(minutos, "minuto");
    let horas = Math.floor(minutos / MINUTOS_POR_HORA),
        minutosSobrantes = minutos % MINUTOS_POR_HORA;
    if (horas < HORAS_POR_DIA) return leyenda(horas, "hora") + (minutosSobrantes > 0 ? ", " + minutosATiempo(minutosSobrantes) : "");
    let dias = Math.floor(horas / HORAS_POR_DIA);
    minutosSobrantes = minutos % (MINUTOS_POR_HORA * HORAS_POR_DIA);
    if (dias < DIAS_POR_SEMANA) return leyenda(dias, "día") + (minutosSobrantes > 0 ? ", " + minutosATiempo(minutosSobrantes) : "");
    let semanas = Math.floor(horas / (HORAS_POR_DIA * DIAS_POR_SEMANA));
    minutosSobrantes = minutos % (MINUTOS_POR_HORA * HORAS_POR_DIA * DIAS_POR_SEMANA);
    if (dias < DIAS_POR_MES) return leyenda(semanas, "semana") + (minutosSobrantes > 0 ? ", " + minutosATiempo(minutosSobrantes) : "");
    let meses = Math.floor(horas / (HORAS_POR_DIA * DIAS_POR_MES));
    minutosSobrantes = minutos % (MINUTOS_POR_HORA * HORAS_POR_DIA * DIAS_POR_MES);
    if (meses < MESES_POR_ANIO) return leyenda(meses, "mes", "es") + (minutosSobrantes > 0 ? ", " + minutosATiempo(minutosSobrantes) : "");
    let anios = Math.floor(horas / (HORAS_POR_DIA * DIAS_POR_MES * MESES_POR_ANIO));
    minutosSobrantes = minutos % (MINUTOS_POR_HORA * HORAS_POR_DIA * DIAS_POR_MES * MESES_POR_ANIO);
    return leyenda(anios, "año") + (minutosSobrantes > 0 ? ", " + minutosATiempo(minutosSobrantes) : "");
};

function convertirNumero(numero) {
    let nnumero = numero + "";
    var op = nnumero.split("").reverse();
    var new1 = "";
    for (i = 0; i < op.length; i++) {
        if (i % 3 == 0 && i != 0)
            new1 = "." + new1;
        new1 = op[i] + new1;
    }
    return new1;
}

function fechaMysqlANormal(fecha) {

    var separada = fecha.split("-");
    let año = separada[0];
    let mes = separada[1];
    let dia = separada[2];

    return dia + "/" + mes + "/" + año;
}