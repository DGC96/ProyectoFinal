<?php

$this->textoHead = CHTML::scriptFichero("/javascript/misListas.js", array("defer" => "defer"));

echo CHTML::link(
    "Crear nueva lista",
    "/inicial/nuevaLista",
    array(
        "class" => "d-flex justify-content-center mb-5"
    ));
