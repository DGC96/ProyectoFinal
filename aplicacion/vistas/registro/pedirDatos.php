<?php

$this->textoHead = CHTML::scriptFichero("/javascript/modUsuario.js", array("defer" => "defer"));

echo CHTML::dibujaEtiqueta("section", array("class" => "w-100 p-4 d-flex justify-content-center pb-4"), null, false);

echo CHTML::iniciarForm("", "post", array("style" => "width: 22rem;"));


echo CHTML::modeloText($registro, "nombre", array(
    "maxlength" => 40,
    "class" => "form-control",
    "id" => "nombre",
    "style" => "margin-left: 0px;",
    "placeholder" => "Nombre",
    "required" => "required"
));
echo CHTML::modeloError($registro, "nombre");


echo CHTML::modeloText($registro, "apellidos", array(
    "maxlength" => 40,
    "class" => "form-control mt-3",
    "id" => "apellidos",
    "style" => "margin-left: 0px;",
    "placeholder" => "Apellidos",
    "required" => "required"
));
echo CHTML::modeloError($registro, "apellidos");


echo CHTML::modeloText($registro, "fecha_nacimiento", array(
    "class" => "form-control mt-3",
    "id" => "fecha_nacimiento",
    "style" => "margin-left: 0px;",
    "placeholder" => "Fecha de nacimiento",
    "required" => "required",
    "onfocus" => "(this.type='date')"
));
echo CHTML::modeloError($registro, "fecha_nacimiento");


echo CHTML::modeloEmail($registro, "email", array(
    "maxlength" => 50,
    "class" => "form-control mt-3",
    "id" => "email",
    "style" => "margin-left: 0px;",
    "placeholder" => "Email",
    "required" => "required"
));
echo CHTML::modeloError($registro, "email");


echo CHTML::modeloText($registro, "nick", array(
    "maxlength" => 40,
    "class" => "form-control mt-3",
    "id" => "nick",
    "style" => "margin-left: 0px;",
    "placeholder" => "Nick",
    "required" => "required"
));
echo CHTML::modeloError($registro, "nick");


echo CHTML::modeloPassword($registro, "contrasenia", array(
    "maxlength" => 30,
    "class" => "form-control mt-3",
    "id" => "contrasenia",
    "style" => "margin-left: 0px;",
    "required" => "required",
    "placeholder" => "Contraseña"
));
echo CHTML::modeloError($registro, "contrasenia");


echo CHTML::modeloPassword($registro, "confirmar_contrasenia", array(
    "maxlength" => 30,
    "class" => "form-control mt-3",
    "id" => "confirmar_contrasenia",
    "style" => "margin-left: 0px;",
    "required" => "required",
    "placeholder" => "Confirmar contraseña"
));
echo CHTML::modeloError($registro, "confirmar_contrasenia");


echo CHTML::campoBotonSubmit("Regístrate", array(
    "class" => "btn btn-primary btn-block mb-4 mt-3",
    "id" => "registrate"
));

echo CHTML::finalizarForm();

echo CHTML::dibujaEtiquetaCierre("section");
