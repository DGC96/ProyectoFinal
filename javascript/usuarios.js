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

fetch("/datos/usuarios")
    .then(function (resp) {
        if (resp.ok) {
            resp.json()
                .then(function (data) {
                    
                    let tabla = document.createElement("table");
                    tabla.className = "table text-center table-hover";

                    let thead = document.createElement("thead");
                    thead.className = "table-info";
                    let tr0 = document.createElement("tr");
                    let th10 = document.createElement("th");
                    th10.style.fontWeight = "bold";
                    th10.innerHTML = "NOMBRE";
                    tr0.appendChild(th10);
                    let th20 = document.createElement("th");
                    th20.style.fontWeight = "bold";
                    th20.innerHTML = "APELLIDOS";
                    tr0.appendChild(th20);
                    let th30 = document.createElement("th");
                    th30.style.fontWeight = "bold";
                    th30.innerHTML = "FECHA DE NACIMIENTO";
                    tr0.appendChild(th30);
                    let th40 = document.createElement("th");
                    th40.style.fontWeight = "bold";
                    th40.innerHTML = "EMAIL";
                    tr0.appendChild(th40);
                    let th50 = document.createElement("th");
                    th50.style.fontWeight = "bold";
                    th50.innerHTML = "NICK";
                    tr0.appendChild(th50);
                    let th60 = document.createElement("th");
                    th60.style.fontWeight = "bold";
                    th60.innerHTML = "CONTRASEÑA";
                    tr0.appendChild(th60);
                    let th70 = document.createElement("th");
                    th70.style.fontWeight = "bold";
                    th70.innerHTML = "OPERACIONES";
                    tr0.appendChild(th70);
                    thead.appendChild(tr0);
                    tabla.appendChild(thead);

                    let tbody = document.createElement("tbody");

                    for (let i = 0; i < data.length; i++) {
                        let tr = document.createElement("tr");
                        let td1 = document.createElement("td");
                        td1.innerHTML = data[i].nombre;
                        tr.appendChild(td1);
                        let td2 = document.createElement("td");
                        td2.innerHTML = data[i].apellidos;
                        tr.appendChild(td2);
                        let td3 = document.createElement("td");
                        td3.innerHTML = fechaMysqlANormal(data[i].fecha_nacimiento);
                        tr.appendChild(td3);
                        let td4 = document.createElement("td");
                        td4.innerHTML = data[i].email;
                        tr.appendChild(td4);
                        let td5 = document.createElement("td");
                        td5.innerHTML = data[i].nick;
                        tr.appendChild(td5);
                        let td6 = document.createElement("td");
                        td6.innerHTML = data[i].contrasenia;
                        tr.appendChild(td6);
                        let td7 = document.createElement("td");
                        let linkMod = document.createElement("a");
                        linkMod.href = "javascript:void(0)";
                        linkMod.onclick = function () {
                            linkMod.href = "/registro/registro?editar=" + data[i].cod_acl_usuario;
                        }
                        td7.appendChild(linkMod);
                        let mod = document.createElement("i");
                        mod.className = "bi bi-file-earmark-person-fill";
                        linkMod.appendChild(mod);
                        let linkBorrar = document.createElement("a");
                        linkBorrar.href = "javascript:void(0)";
                        linkBorrar.onclick = function () {

                            let obj = {
                                id: data[i].cod_acl_usuario
                            }

                            Swal.fire({
                                title: '¡Cuidado!',
                                text: "Una vez aceptes, el usuario junto con sus puntuaciones y críticas se borrarán permanentemente.",
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#d33',
                                cancelButtonColor: '#3085d6',
                                confirmButtonText: 'Borrar permanentemente',
                                cancelButtonText: "Mejor no"
                            }).then((result) => {
                                if (result.isConfirmed) {

                                    fetch("/datos/borrarUsuario", {
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
                                                            'El usuario ha sido borrado permanentemente.',
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
                        td7.appendChild(linkBorrar);
                        let borrar = document.createElement("i");
                        borrar.className = "bi bi-person-x-fill ms-3";
                        linkBorrar.appendChild(borrar);
                        tr.appendChild(td7);
                        tbody.appendChild(tr);
                    }
                    tabla.appendChild(tbody);

                    if (localStorage.getItem("modoNoche") == "activado") {
                        tabla.className = "table text-center table-hover table-dark";
                    }

                    main.appendChild(tabla);
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