const API_KEY = "api_key=35daf987b2cfb67f2d6317f5f49891ee";
const BASE_URL = "https://api.themoviedb.org/3";
const LAN_ES = "&language=es-ES";
const TRENDING_MOVIE_WEEK = BASE_URL + "/trending/movie/week?" + API_KEY + LAN_ES;
const TRENDING_TV_WEEK = BASE_URL + "/trending/tv/week?" + API_KEY + LAN_ES;
const IMG_URL = "https://image.tmdb.org/t/p/w500";

var main = document.getElementsByTagName("main")[0];

getTrending(TRENDING_MOVIE_WEEK, "PELÍCULAS");
setTimeout(function () {
    getTrending(TRENDING_TV_WEEK, "SERIES");
}, 500);


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

function getTrending(url, string) {

    fetch(url)
        .then(resp => resp.json())
        .then(data => {

            let h1Titulo = document.createElement("h2");
            h1Titulo.innerHTML = string + " MÁS POPULARES DE LA SEMANA";
            h1Titulo.className = "mt-3 ms-4 text-center fw-bold shadow-sm p-3 mb-5 bg-body rounded text-black";
            if (localStorage.getItem("modoNoche") == "activado") {
                h1Titulo.className = "mt-3 ms-4 text-center fw-bold shadow-sm p-3 mb-5 bg-dark rounded text-white";
            }
            main.appendChild(h1Titulo);

            let wrapper = document.createElement("div");
            wrapper.className = "wrapper d-flex flex-wrap justify-content-center";

            for (let i = 0; i < data.results.length; i++) {

                let card = document.createElement("div");
                card.className = "card";
                card.style.cursor = "pointer";
                card.onclick = function () {
                    if (data.results[i].media_type == "movie")
                        window.open("/inicial/mostrarInfo?movie&" + data.results[i].id, "_self");
                    else
                        window.open("/inicial/mostrarInfo?tv&" + data.results[i].id, "_self");
                }
                wrapper.appendChild(card);

                let poster = document.createElement("img");
                poster.className = "rounded";
                poster.src = IMG_URL + data.results[i].poster_path;
                card.appendChild(poster);

                let divDes = document.createElement("div");
                divDes.className = "descriptions d-flex align-items-center justify-content-center";
                card.appendChild(divDes);

                let titulo = document.createElement("span");
                titulo.innerHTML = (data.results[i].media_type == "movie") ? data.results[i].title : data.results[i].name;
                divDes.appendChild(titulo);

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
                            id: data.results[i].id
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

        })

}