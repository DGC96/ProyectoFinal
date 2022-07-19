<?php

namespace validacion1;

/**
 * @param int $var entero comprendido entre $max y $min, devolverá $defecto en caso de no cumplir las condiciones
 * @param integer $min valor mínimo de $var 
 * @param integer $max valor máximo de $var
 * @param integer $defecto valor por defecto
 * @return boolean true|false dependiendo de si cumple las condiciones
 */
function validaEntero(&$var, $min, $max, $defecto)
{
    if (is_integer($var) && ($var >= $min && $var <= $max)) {
        return true;
    } else {
        $var = $defecto;
        return false;
    }
}

/**
 * @param float $var real comprendido entre $max y $min, devolverá $defecto en caso de no cumplir las condiciones
 * @param float $min valor mínimo de $var 
 * @param float $max valor máximo de $var
 * @param float $defecto valor por defecto
 * @return boolean true|false dependiendo de si cumple las condiciones
 */
function validaReal(&$var, $min, $max, $defecto)
{
    if (is_float($var) && ($var > $min && $var < $max)) {
        return true;
    } else {
        $var = $defecto;
        return false;
    }
}
/**
 * @param string $var fecha formato dd/mm/yy, devolverá $defecto en caso de no ser correcta
 * @param string $defecto valor por defecto
 * @return boolean true|false si es correcta o no 
 */
function  validaFecha(&$var, $defecto)
{
    $fecha = [];
    $expresion = "/^([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{4})$/";

    if (!preg_match($expresion, $var, $fecha)) {
        return false;
    }

    if (strlen($fecha[1]) == 1) {
        $fecha[1] = str_pad($fecha[1], 2, "0", STR_PAD_LEFT);
    }

    if (strlen($fecha[2]) == 1) {
        $fecha[2] = str_pad($fecha[2], 2, "0", STR_PAD_LEFT);
    }

    $var = "$fecha[1]/$fecha[2]/$fecha[3]";

    if (checkdate(intval($fecha[2]), intval($fecha[1]), intval($fecha[3]))) {
        return true;
    } else {
        $var = $defecto;
        return false;
    }
}

/**
 * @param string $var hora formato hh:mm:ss, devolverá $defecto en caso de no ser correcta
 * @param string $defecto valor por defecto
 * @return boolean true|false si es correcta o no 
 */

function  validaHora(&$var, $defecto)
{

    $hora = [];
    $expresion = "/^([0-2]{1}[0-9]{1}):([0-5]{1}[0-9]{1}):([0-5]{1}[0-9]{1})$/";

    if (!preg_match($expresion, $var, $hora)) {
        $var = $defecto;
        return false;
    }

    if (intval($hora[1]) > 23) {
        $var = $defecto;
        return false;
    } else {
        return true;
    }
}

/**
 * @param string $var email formato aaaaa@bbbb.ccc , devolverá defecto si no es correcto
 * @param string $defecto valor por defecto
 * @return boolean true|false si es correcto o no 
 */
function  validaEmail(&$var, $defecto)
{

    $expresion = "/^[a-z0-9-á-ú]+@[a-z0-9]+\.[a-z]+$/i";

    if (preg_match($expresion, $var)) {
        return true;
    } else {
        $var = $defecto;
        return false;
    }
}
/**
 * @param string $var cadena de longitud maxima $longitud , devolverá defecto si no es correcto
 * @param integer $longitud que es la longitud máxima de $var
 * @param string $defecto valor por defecto
 * @return boolean true|false si es correcta o no 
 */

function  validaCadena(&$var, $longitud, $defecto)
{

    if (strlen($var) <= $longitud) {
        return true;
    } else {
        $var = $defecto;
        return false;
    }
}

/**
 * @param string $var expresión que debe cumplir con $expresion, devolverá defecto si no es correcto
 * @param string $expresion mediante la cual se filtra $var
 * @param string $defecto valor por defecto
 * @return boolean true|false si es correcta o no 
 */
function  validaExpresion(&$var, $expresion, $defecto)
{

    if (preg_match($expresion, $var)) {
        return true;
    } else {
        $var = $defecto;
        return false;
    }
}

/**
 * @param string $var que debe estar dentro del array $posibles , devolverá defecto si no está
 *@param array $posibles que contiene los valores posibles
 * @return boolean true|false si está o no
 */

function  validaRango($var,  $posibles)
{

    if (in_array($var, $posibles)) {
        return true;
    }
    return false;
}
