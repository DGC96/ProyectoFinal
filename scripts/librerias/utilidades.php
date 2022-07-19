<?php 

function fechaAMysql($fecha)
{
    $partes=explode("/",$fecha);
    if (count($partes)!=3)
        return "";
        return $partes[2]."-".$partes[1]."-".$partes[0];
}

function fechaDeMysql($fecha)
{
    $partes=explode("-",$fecha);
    if (count($partes)!=3)
        return "";
        
        return $partes[2]."/".$partes[1]."/".$partes[0];
        
}

function generarCadenaAleatoria($longitud=10)
{
    $permitted_chars_japc = '0123456789abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    
    $random_string0="";
    for ($contc_jacp = 0; $contc_jacp < $longitud; $contc_jacp++)
    {
        $pos=mt_rand(0,strlen($permitted_chars_japc)-1);
        $random_string0.=mb_substr($permitted_chars_japc,$pos,1);
    }
    
    return $random_string0;
    
    
}