var main = document.getElementsByTagName("main")[0];

fetch("/datos/misListas")
    .then(function (resp) {
        if (resp.ok) {
            resp.json()
                .then(function (data) {
                    console.log(data);
                    let divP = document.createElement("div");
                    divP.className = "d-flex justify-content-evenly";

                    for (let i = 0; i < data.length; i++) {
                        let divDatos = document.createElement("div");
                        divDatos.className = "card";
                        divDatos.style.cursor = "pointer";
                        divDatos.onclick = function () {
                            window.open("/inicial/detallesLista?" + data[i].titulo, "_self");
                        }
                        let img = document.createElement("img");
                        img.src = data[i].imagen;
                        divDatos.appendChild(img);

                        let divTitulo = document.createElement("div");
                        divTitulo.className = "descriptions d-flex flex-column align-items-center justify-content-center";
                        let titulo = document.createElement("span");
                        titulo.innerHTML = data[i].titulo;
                        divTitulo.appendChild(titulo);
                        divDatos.appendChild(divTitulo);

                        let botonBorrar = document.createElement("button");
                        botonBorrar.className = "btn btn-danger-outline mt-2";
                        botonBorrar.innerHTML = "<i class='bi bi-trash'></i>"
                        botonBorrar.title = "Eliminar de la lista";
                        botonBorrar.onclick = function () {

                            divDatos.onclick = "";

                            let obj = {
                                titulo: data[i].titulo
                            }

                            Swal.fire({
                                title: '¡Cuidado!',
                                text: "¿Seguro que quieres borrar esta lista?",
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#d33',
                                cancelButtonColor: '#3085d6',
                                confirmButtonText: 'Si, seguro',
                                cancelButtonText: "Mejor no"
                            }).then((result) => {
                                if (result.isConfirmed) {

                                    fetch("/datos/borrarLista", {
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
                                                            'Borrada correctamente.',
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
                        divTitulo.appendChild(botonBorrar);

                        divP.appendChild(divDatos);
                    }

                    main.appendChild(divP);
                })
                .catch(function (er) {
                    console.error(er);
                });
        }
    })
    .catch(function (er) {
        console.error("ERROR: " + er);
    });