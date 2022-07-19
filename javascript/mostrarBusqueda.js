let url = location.href;
var aux = url.split("?")[1];
let query = url.split("=")[1];

var pagPeli = 1,
    pagSerie = 1,
    pagPersona = 1;
var ultimaPeli, ultimaSerie, ultimaPersona;

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


/** --------------------------------- VARIABLES API TMDB --------------------------------- */
const API_KEY = "api_key=35daf987b2cfb67f2d6317f5f49891ee";
const BASE_URL = "https://api.themoviedb.org/3";
const LAN_ES = "&language=es-ES";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

var urlSearch = BASE_URL + "/search/multi?" + API_KEY + LAN_ES + "&" + aux + "&page=";
var urlSearchMovie = BASE_URL + "/search/movie?" + API_KEY + LAN_ES + "&" + aux + "&page=";
var urlSearchTV = BASE_URL + "/search/tv?" + API_KEY + LAN_ES + "&" + aux + "&page=";
var urlSearchPerson = BASE_URL + "/search/person?" + API_KEY + LAN_ES + "&" + aux + "&page=";

var main = document.getElementsByTagName("main")[0];
var inputBuscar = document.getElementById("inputBuscar");
var contPeli = 0,
    contSerie = 0,
    contPersona = 0;


/** --------------------------------- IR ARRIBA --------------------------------- */
let divIrArriba = document.createElement("div");
divIrArriba.className = "fixed-bottom";
var linkIrArriba = document.createElement("a");
linkIrArriba.innerHTML = "Ir arriba";
linkIrArriba.className = "position-absolute bottom-0 end-0 me-3 p-2 rounded-top";
linkIrArriba.style.backgroundColor = "#55ACEE";
linkIrArriba.style.color = "white";
linkIrArriba.style.cursor = "pointer";
linkIrArriba.onclick = function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}
divIrArriba.appendChild(linkIrArriba);
main.appendChild(divIrArriba);


/** --------------------------------- OBSERVADOR PELÍCULAS --------------------------------- */
let obsPelis = new IntersectionObserver((entradas, observador) => {

    entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
            pagPeli++;
            buscaPeliculas();
        }
    });
}, {
    rootMargin: '0px 0px 0px 0px',
    threshold: 1.0
});
/** --------------------------------- OBSERVADOR SERIES --------------------------------- */
let obsSeries = new IntersectionObserver((entradas, observador) => {

    entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
            pagSerie++;
            buscaSeries();
        }
    });
}, {
    rootMargin: '0px 0px 0px 0px',
    threshold: 1.0
});
/** --------------------------------- OBSERVADOR PERSONAS --------------------------------- */
let obsPersonas = new IntersectionObserver((entradas, observador) => {

    entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
            pagPersona++;
            buscaPersonas();
        }
    });
}, {
    rootMargin: '0px 0px 0px 0px',
    threshold: 1.0
});


// CREAR LOS BOTONES CON LAS BÚSQUEDAS
let divInicial = document.createElement("div");

let divBotones = document.createElement("div");
divBotones.className = "d-flex justify-content-center";

let numPelis = document.createElement("span");
numPelis.style.backgroundColor = "#55ACEE";
numPelis.style.color = "white";
numPelis.style.padding = "4%";
numPelis.style.borderRadius = "10px";
numPelis.style.fontSize = "0.6rem";
numPelis.style.marginLeft = "12%";
let botPelis = document.createElement("button");
botPelis.className = "btn btn-outline-primary d-flex justify-content-center align-items-center";
botPelis.innerHTML = "Películas";
botPelis.autofocus = true;
botPelis.appendChild(numPelis);
botPelis.onclick = function () {
    pagPeli = 1;
    while (divInicial.firstChild) {
        divInicial.removeChild(divInicial.lastChild);
    }

    buscaPeliculas();
}
divBotones.appendChild(botPelis);

let numSeries = document.createElement("span");
numSeries.style.backgroundColor = "#55ACEE";
numSeries.style.color = "white";
numSeries.style.padding = "4%";
numSeries.style.borderRadius = "10px";
numSeries.style.fontSize = "0.6rem";
numSeries.style.marginLeft = "12%";
let botSeries = document.createElement("button");
botSeries.className = "btn btn-outline-primary d-flex justify-content-center align-items-center";
botSeries.innerHTML = "Series";
botSeries.appendChild(numSeries);
botSeries.onclick = function () {
    pagSerie = 1;
    while (divInicial.firstChild)
        divInicial.removeChild(divInicial.lastChild);

    buscaSeries();
}
divBotones.appendChild(botSeries);

let numPersonas = document.createElement("span");
numPersonas.style.backgroundColor = "#55ACEE";
numPersonas.style.color = "white";
numPersonas.style.padding = "4%";
numPersonas.style.borderRadius = "20px";
numPersonas.style.fontSize = "0.6rem";
numPersonas.style.marginLeft = "12%";
let botPersonas = document.createElement("button");
botPersonas.className = "btn btn-outline-primary d-flex justify-content-center align-items-center";
botPersonas.innerHTML = "Personas";
botPersonas.appendChild(numPersonas);
botPersonas.onclick = function () {
    pagPersona = 1;
    while (divInicial.firstChild)
        divInicial.removeChild(divInicial.lastChild);

    buscaPersonas();
}
divBotones.appendChild(botPersonas);

main.appendChild(divBotones);

while (divInicial.firstChild)
    divInicial.removeChild(divInicial.lastChild);

main.appendChild(divInicial);


fetch(urlSearch + "1")
    .then(function (resp) {
        if (resp.ok) {
            resp.json()
                .then(function (data) {

                    for (let i = 1; i <= data.total_pages; i++) {

                        fetch(urlSearch + i)
                            .then(function (resp) {
                                if (resp.ok) {
                                    resp.json()
                                        .then(function (data2) {
                                            for (let j = 0; j < data2.results.length; j++) {
                                                if (data2.results[j].media_type == "movie")
                                                    contPeli++;
                                                if (data2.results[j].media_type == "tv")
                                                    contSerie++;
                                                if (data2.results[j].media_type == "person")
                                                    contPersona++;
                                            }
                                            numPelis.innerHTML = contPeli;
                                            numSeries.innerHTML = contSerie;
                                            numPersonas.innerHTML = contPersona;
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
                .catch(function (er) {
                    console.error(er);
                });
        }
    })
    .catch(function (er) {
        console.error("ERROR: " + er);
    });


buscaPeliculas();

function buscaPeliculas() {
    fetch(urlSearchMovie + pagPeli)
        .then(function (resp) {
            if (resp.ok) {
                resp.json()
                    .then(function (data) {

                        data.results.sort((o1, o2) => {
                            if (o1.popularity > o2.popularity) {
                                return -1;
                            } else if (o1.popularity < o2.popularity) {
                                return 1;
                            } else {
                                return 0;
                            }
                        });

                        for (let i = 0; i < data.results.length; i++)
                            divInicial.appendChild(creaBusqueda(data.results[i], "pelicula"));

                        if (pagPeli < 1000) {
                            if (ultimaPeli) {
                                obsPelis.unobserve(ultimaPeli);
                            }

                            const peliculasEnPantalla = document.querySelectorAll('.contenido');
                            ultimaPeli = peliculasEnPantalla[peliculasEnPantalla.length - 1];
                            obsPelis.observe(ultimaPeli);
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

function buscaSeries() {
    fetch(urlSearchTV + pagSerie)
        .then(function (resp) {
            if (resp.ok) {
                resp.json()
                    .then(function (data) {

                        data.results.sort((o1, o2) => {
                            if (o1.popularity > o2.popularity) {
                                return -1;
                            } else if (o1.popularity < o2.popularity) {
                                return 1;
                            } else {
                                return 0;
                            }
                        });

                        for (let i = 0; i < data.results.length; i++)
                            divInicial.appendChild(creaBusqueda(data.results[i], "serie"));

                        if (pagSerie < 1000) {
                            if (ultimaSerie) {
                                obsSeries.unobserve(ultimaSerie);
                            }

                            const seriesEnPantalla = document.querySelectorAll('.contenido');
                            ultimaSerie = seriesEnPantalla[seriesEnPantalla.length - 1];
                            obsSeries.observe(ultimaSerie);
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

function buscaPersonas() {
    fetch(urlSearchPerson + pagPersona)
        .then(function (resp) {
            if (resp.ok) {
                resp.json()
                    .then(function (data) {

                        data.results.sort((o1, o2) => {
                            if (o1.popularity > o2.popularity) {
                                return -1;
                            } else if (o1.popularity < o2.popularity) {
                                return 1;
                            } else {
                                return 0;
                            }
                        });

                        for (let i = 0; i < data.results.length; i++)
                            divInicial.appendChild(creaBusqueda(data.results[i], "persona"));

                        if (pagPersona < 1000) {
                            if (ultimaPersona) {
                                obsPersonas.unobserve(ultimaPersona);
                            }

                            const personasEnPantalla = document.querySelectorAll('.contenido');
                            ultimaPersona = personasEnPantalla[personasEnPantalla.length - 1];
                            obsPersonas.observe(ultimaPersona);
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


function creaBusqueda(results, string) {

    let divPrin = document.createElement("div");
    fadeIn(divPrin);
    divPrin.className = "d-flex w-100 mt-4 border border-2 rounded contenido shadow-sm bg-body";
    divPrin.style.height = "154px";
    divPrin.style.cursor = "pointer";
    divPrin.onclick = function () {
        if (string == "pelicula")
            window.open("/inicial/mostrarInfo?movie&" + results.id, "_self");
        else if (string == "serie")
            window.open("/inicial/mostrarInfo?tv&" + results.id, "_self");
        else if (string == "persona")
            window.open("/inicial/mostrarPersona?id=" + results.id, "_self");
    }

    let poster = document.createElement("img");
    poster.className = "rounded-start";
    poster.style.width = "100px";
    poster.style.height = "150px";
    poster.style.marginRight = "2%";
    if (string == "pelicula" || string == "serie") {
        if (results.poster_path != null)
            poster.src = IMG_URL + results.poster_path;
        else
            poster.src = "/imagenes/noimage.png";
    } else if (string == "persona") {
        if (results.profile_path != null)
            poster.src = IMG_URL + results.profile_path;
        else
            poster.src = "/imagenes/usuario.png";
    }
    divPrin.appendChild(poster);

    let divInfo = document.createElement("div");
    divInfo.style.color = "white";

    let titulo = document.createElement("h5");
    titulo.className = "mt-3 titulo";
    if (string == "pelicula")
        titulo.innerHTML = results.title;
    else if (string == "serie" || string == "persona")
        titulo.innerHTML = results.name;
    titulo.style.color = "black";
    titulo.style.margin = 0;
    divInfo.appendChild(titulo);

    let salida = document.createElement("span");
    if (results.release_date != "" && results.release_date != undefined) {
        if (string == "pelicula") {
            salida.innerHTML = new Intl.DateTimeFormat('es-ES', {
                dateStyle: 'full'
            }).format(new Date(results.release_date));
        } else if (string == "serie") {
            salida.innerHTML = new Intl.DateTimeFormat('es-ES', {
                dateStyle: 'full'
            }).format(new Date(results.first_air_date));
        }
    } else if (string == "persona") {
        salida.innerHTML = results.known_for_department;
    }
    salida.style.color = "grey";
    divInfo.appendChild(salida);

    let divSinopsis = document.createElement("p");
    if (string == "pelicula" || string == "serie")
        divSinopsis.innerHTML = results.overview;
    divSinopsis.className = "mt-4 divSinopsis";
    divSinopsis.id = "divSinopsis";
    divSinopsis.style.color = "black";
    divSinopsis.style.display = "-webkit-box";
    divSinopsis.style.webkitLineClamp = 2;
    divSinopsis.style.webkitBoxOrient = "vertical";
    divSinopsis.style.overflow = "hidden";
    divSinopsis.style.textOverflow = "ellipsis";
    divInfo.appendChild(divSinopsis);
    divPrin.appendChild(divInfo);

    if (localStorage.getItem("modoNoche") == "activado") {
        checkmodoOscuroPeli.checked = true;
        document.body.style.backgroundColor = "black";
        document.body.style.color = "white";
        footer.className = "bg-dark text-center text-white mt-4";
        divPrin.className = "d-flex w-100 mt-4 border border-2 rounded contenido bg-dark text-white";
        titulo.className = "mt-3 text-white";
        divSinopsis.className = "mt-4 text-white";
    }

    return divPrin;
}

// ** FADE OUT FUNCTION **
function fadeOut(el) {
    el.style.opacity = 1;
    (function fade() {
        if ((el.style.opacity -= .1) < 0) {
            el.style.display = "none";
        } else {
            requestAnimationFrame(fade);
        }
    })();
};

// ** FADE IN FUNCTION **
function fadeIn(el, display) {
    el.style.opacity = 0;
    el.style.display = display || "block";
    (function fade() {
        var val = parseFloat(el.style.opacity);
        if (!((val += .1) > 1)) {
            el.style.opacity = val;
            requestAnimationFrame(fade);
        }
    })();
};