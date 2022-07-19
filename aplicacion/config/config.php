<?php

$config = array(
	"CONTROLADOR" => array("inicial"),
	"RUTAS_INCLUDE" => array(
		"aplicacion/modelos"
	),
	"URL_AMIGABLES" => true,
	"VARIABLES" => array(
		"autor" => "alumno daw",
		"direccion" => "C/ carrera madre carmen, 12"
	),
	"BD" => array(
		"hay" => true,
		"servidor" => "localhost",
		"usuario" => "root",
		"contra" => "2daw",
		"basedatos" => "peliculas_final"
	),
	"SESION" => array(
		"controlAutomatico" => true
	),
	"ACL" => array(
		"controlAutomatico" => true,
		"servidor" => "localhost",
		"usuario" => "root",
		"contra" => "2daw",
		"basedatos" => "peliculas_final"
	)
);
