<?php

class CCaja extends CWidget
{

    private $_contenido = "";
    private $_titulo = "";
    private $_atributosHTML = [];

    public function __construct($titulo, $contenido = "", $atributosHTML = array())
    {
        $this->_titulo = $titulo;
        $this->_contenido = $contenido;
        if (!isset($atributosHTML["class"]))
            $atributosHTML["class"] = "caja";

        $this->_atributosHTML = $atributosHTML;
    }

    public function dibujaApertura()
    {
        $id = CHTML::generaID();
        $cadena = CHTML::dibujaEtiqueta(
            "div",
            $this->_atributosHTML,
            "",
            false
        );
        $cadena .= CHTML::dibujaEtiqueta(
            "div",
            [
                "class" => "cuerpo",
                "id" => $id
            ],
            $this->_contenido,
            false
        );


        return $cadena;
    }

    public function dibujaFin()
    {
        $cadena = CHTML::dibujaEtiquetaCierre("div") .
            CHTML::dibujaEtiquetaCierre("div");
        return $cadena;
    }

    public function dibujate()
    {
        return $this->dibujaApertura() . $this->dibujaFin();
    }

    public static function requisitos()
    {
        $cadena = <<<FIN
             function abreCaja(nombre)
             {
                 let ele=document.getElementById(nombre);
                 if (ele.style.display=="none")
                        ele.style.display="block";
                      else
                        ele.style.display="none"; 
                 return false;
             }       

FIN;

        return CHTML::script($cadena);
    }
}
