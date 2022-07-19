const API_KEY = "api_key=35daf987b2cfb67f2d6317f5f49891ee";
const BASE_URL = "https://api.themoviedb.org/3";
const LAN_ES = "&language=es-ES";
const IMG_URL = "https://image.tmdb.org/t/p/original";

var main = document.getElementsByTagName("main")[0];

var url = location.href;
var id = url.split("=")[1];

var urlPersona = BASE_URL + "/person/" + id + "?" + API_KEY + LAN_ES;
var urlApariciones = BASE_URL + "/person/" + id + "/combined_credits?" + API_KEY + LAN_ES;

// INFORMACIÓN DE LA PERSONA
fetch(urlPersona)
    .then(function (resp) {
        if (resp.ok) {
            resp.json()
                .then(function (data) {
                    crearPersona(data);
                })
                .catch(function (er) {
                    console.error(er);
                });
        }
    })
    .catch(function (er) {
        console.error("ERROR: " + er);
    });

// APARICIONES
setTimeout(function () {
    fetch(urlApariciones)
        .then(function (resp) {
            if (resp.ok) {
                resp.json()
                    .then(function (data) {
                        creaApariciones(data);
                    })
                    .catch(function (er) {
                        console.error(er);
                    });
            }
        })
        .catch(function (er) {
            console.error("ERROR: " + er);
        });
}, 500);


function crearPersona(data) {

    let principal = document.createElement("div");
    principal.id = "divPrincipal";

    let divImgInfo = document.createElement("div");
    divImgInfo.className = "d-md-flex";

    let divPoster = document.createElement("div");
    divPoster.style.width = "30%";
    divPoster.style.minWidth = "30%";
    divPoster.style.marginRight = "5%";
    let poster = document.createElement("img");
    poster.style.width = "100%";
    poster.src = IMG_URL + data.profile_path;
    divPoster.appendChild(poster);
    divImgInfo.appendChild(divPoster);

    let divInfo = document.createElement("div");
    divInfo.className = "mt-3";

    let nombre = document.createElement("h3");
    nombre.innerHTML = data.name;
    divInfo.appendChild(nombre);

    let divInfoPers = document.createElement("div");

    let infoPers = document.createElement("span");
    if (data.birthday != null && data.deathday == null)
        infoPers.innerHTML = "Nació el " + fechaMysqlANormal(data.birthday) + " (" + calcularEdad(data.birthday) + " años)" + " en " + data.place_of_birth + ".<br>";
    else if (data.birthday != null && data.deathday != null)
        infoPers.innerHTML = "Nacido el " + fechaMysqlANormal(data.birthday) + " en " + data.place_of_birth + ".<br>";
    divInfoPers.appendChild(infoPers);
    divInfo.appendChild(divInfoPers);

    if (data.deathday != null) {
        let fallecimiento = document.createElement("span");
        fallecimiento.innerHTML = "Fallecido el " + fechaMysqlANormal(data.deathday) + ".<br>";
        divInfoPers.appendChild(fallecimiento);
    }

    let trabajo = document.createElement("span");
    trabajo.style.fontWeight = "bold";
    if (data.known_for_department == "Directing" && data.gender == 2)
        trabajo.innerHTML = "Director.";
    else if (data.known_for_department == "Directing" && data.gender == 1)
        trabajo.innerHTML = "Directora.";
    else if (data.known_for_department == "Acting" && data.gender == 2)
        trabajo.innerHTML = "Actor.";
    else if (data.known_for_department == "Acting" && data.gender == 1)
        trabajo.innerHTML = "Actriz.";
    divInfoPers.appendChild(trabajo);

    let biografia = document.createElement("label");
    biografia.className = "mt-5";
    biografia.style.textAlign = "justify";
    biografia.style.marginRight = "5%";
    biografia.style.fontSize = "0.88rem";
    biografia.innerHTML = data.biography;
    divInfo.appendChild(biografia);

    divImgInfo.appendChild(divInfo);
    principal.appendChild(divImgInfo);
    main.appendChild(principal);
}

function creaApariciones(data) {

    if (data.cast.length > 0) {
        creaNodosAparece("APARECE EN", data.cast);
    }

    if (data.crew.length > 0) {
        creaNodosAparece("COMO EQUIPO TÉCNICO", data.crew);
    }
}

function creaNodosAparece(titulo, data) {

    let apaEn = document.createElement("h3");
    apaEn.innerHTML = titulo;
    apaEn.className = "mt-5";
    main.appendChild(apaEn);

    let divCast = document.createElement("div");
    divCast.className = "d-flex mt-3";
    divCast.style.overflow = "hidden";
    divCast.style.overflowX = "scroll";

    let hash = {};
    let array = data.filter(o => hash[o.id] ? false : hash[o.id] = true);
    array.sort(((a, b) => b.popularity - a.popularity));

    for (let i = 0; i < array.length; i++) {

        let divPeli = document.createElement("div");
        divPeli.className = "text-center";
        divPeli.style.cursor = "pointer";
        divPeli.onclick = function () {
            if (array[i].media_type == "movie")
                window.open("/inicial/mostrarInfo?movie&" + array[i].id, "_self");
            else
                window.open("/inicial/mostrarInfo?tv&" + array[i].id, "_self");
        }

        if (i > 0)
            divPeli.style.marginLeft = "3%";

        divCast.appendChild(divPeli);

        let divFoto = document.createElement("div");
        let foto = document.createElement("img");
        if (array[i].poster_path != null) {
            foto.src = IMG_URL + array[i].poster_path;
            foto.style.width = "90px";
            foto.style.height = "140px";
        } else {
            foto.src = "../imagenes/noimage.png";
            foto.style.width = "100px";
            foto.style.height = "140px";
        }
        divFoto.appendChild(foto);
        divPeli.appendChild(divFoto);

        let nombre = document.createElement("h6");
        if (array[i].media_type == "movie")
            nombre.innerHTML = array[i].title;
        else
            nombre.innerHTML = array[i].name;
        nombre.className = "mt-2";
        nombre.style.fontWeight = "bold";
        divPeli.appendChild(nombre);

        let trabajo = document.createElement("span");
        trabajo.style.color = "grey";
        if (titulo == "APARECE EN")
            trabajo.innerHTML = array[i].character;
        else
            trabajo.innerHTML = array[i].job;
        divPeli.appendChild(trabajo);
    }

    main.appendChild(divCast);
}

function fechaMysqlANormal(fecha) {

    var separada = fecha.split("-");
    let año = separada[0];
    let mes = separada[1];
    let dia = separada[2];

    return dia + "/" + mes + "/" + año;
}

function calcularEdad(fecha) {
    var hoy = new Date();
    var cumpleanos = new Date(fecha);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }

    return edad;
}