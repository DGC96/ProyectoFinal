var url = location.href.split("?");
if (url[1] != undefined)
    var urlEd = url[1].split("=");

var nombre = document.getElementById("nombre");
var apellidos = document.getElementById("apellidos");
var fecha_nacimiento = document.getElementById("fecha_nacimiento");
var email = document.getElementById("email");
var nick = document.getElementById("nick");
var contrasenia = document.getElementById("contrasenia");
var confirmar_contrasenia = document.getElementById("confirmar_contrasenia");
var registrate = document.getElementById("registrate");

var main = document.getElementsByTagName("main")[0];
var section = document.getElementsByTagName("section")[0];
var form = document.getElementsByTagName("section")[0].getElementsByTagName("form")[0];

if (document.getElementById("errores") != undefined)
    document.getElementById("errores").remove();

if (url[1] != undefined) {
    if (urlEd[0] == "editar") {
        fetch("/datos/selectUsuario", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: urlEd[1]
                })
            })
            .then(function (resp) {
                if (resp.ok) {
                    resp.json()
                        .then(function (data) {
                            form.method = "";
                            form.action = "/inicial/usuarios";
                            nombre.value = data[0].nombre;
                            apellidos.value = data[0].apellidos;
                            fecha_nacimiento.value = data[0].fecha_nacimiento;
                            email.value = data[0].email;
                            nick.value = data[0].nick;
                            contrasenia.value = data[0].contrasenia;
                            confirmar_contrasenia.value = data[0].contrasenia;
                            registrate.remove();
                            let botonMod = document.createElement("button");
                            botonMod.className = "btn btn-warning btn-block mb-4 mt-3";
                            botonMod.innerHTML = "Modificar";
                            botonMod.onclick = function () {
                                if (contrasenia.value == confirmar_contrasenia.value) {
                                    if (document.getElementById("errores") != undefined)
                                        document.getElementById("errores").remove();

                                    fetch("/datos/modificarUsuario", {
                                            method: "POST",
                                            headers: {
                                                "Content-Type": "application/json",
                                            },
                                            body: JSON.stringify({
                                                id: urlEd[1],
                                                nombre: nombre.value,
                                                apellidos: apellidos.value,
                                                fecha_nacimiento: fecha_nacimiento.value,
                                                email: email.value,
                                                nick: nick.value,
                                                contrasenia: contrasenia.value
                                            })
                                        })
                                        .then(function (resp) {
                                            if (resp.ok) {
                                                resp.json()
                                                    .then(function (data) {
                                                        location.href = "/inicial/usuarios";
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
                                    let errores = document.createElement("p");
                                    errores.style.color = "red";
                                    errores.innerHTML = "Las contraseñas no coinciden";
                                    errores.id = "errores";
                                    errores.className = "mt-3 text-center";
                                    form.insertBefore(errores, nombre);
                                    return false;
                                }
                            }
                            form.appendChild(botonMod);
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