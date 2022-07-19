<?php

echo CHTML::dibujaEtiqueta("section", array("class" => "w-100 p-4 d-flex justify-content-center pb-4"), null, false);

echo CHTML::iniciarForm("", "post", array("style" => "width: 22rem;"));

echo CHTML::modeloText($login, "nick", array(
    "maxlength" => 20,
    "class" => "form-control",
    "id" => "usuario",
    "style" => "margin-left: 0px;",
    "placeholder" => "Usuario"
));
echo CHTML::modeloError($login, "nick");


echo CHTML::modeloPassword($login, "contrasenia", array(
    "maxlength" => 20,
    "class" => "form-control mt-3",
    "id" => "contraseña",
    "required" => "required",
    "placeholder" => "Contraseña"
));
echo CHTML::modeloError($login, "contrasenia");


echo CHTML::campoBotonSubmit("Entrar", array(
    "class" => "btn btn-primary btn-block mb-4 mt-3"
));


echo CHTML::dibujaEtiqueta("div", array("class" => "text-center"), null, false);
echo CHTML::dibujaEtiqueta("p", array(), "¿Aún no te has registrado? ", false);
echo CHTML::link("Regístrate", "/registro/registro", array());
echo CHTML::dibujaEtiquetaCierre("p");
echo CHTML::dibujaEtiquetaCierre("div");

echo CHTML::finalizarForm();

echo CHTML::dibujaEtiquetaCierre("section");

if (isset($correcto))
    echo $correcto;
