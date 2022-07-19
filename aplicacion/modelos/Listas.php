<?php
class Listas extends CActiveRecord
{

    protected function fijarNombre()
    {
        return 'listas';
    }

    protected function fijarTabla()
    {
        return "listas";
    }

    protected function fijarId()
    {
        return "id_lista";
    }


    protected function fijarAtributos()
    {
        return array(
            "id_lista",
            "titulo",
            "imagen",
            "usuario",
            "id_pelicula",
            "tipo"
        );
    }

    protected function fijarDescripciones()
    {
        return array(
            "id_lista" => "ID Lista",
            "titulo" => "Título",
            "imagen" => "Imagen",
            "usuario" => "Usuario",
            "id_pelicula" => "ID Película",
            "tipo" => "Tipo"
        );
    }

    protected function fijarRestricciones()
    {
        return array(
            array(
                "ATRI" => "id_lista, titulo, imagen, usuario, id_pelicula, tipo",
                "TIPO" => "REQUERIDO"
            ),
            array(
                "ATRI" => "id_lista, id_pelicula",
                "TIPO" => "ENTERO"
            ),
            array(
                "ATRI" => "titulo",
                "TIPO" => "CADENA",
                "TAMANIO" => 50
            ),
            array(
                "ATRI" => "usuario",
                "TIPO" => "CADENA",
                "TAMANIO" => 40
            ),
            array(
                "ATRI" => "tipo",
                "TIPO" => "CADENA",
                "TAMANIO" => 10
            )
        );
    }

    protected function afterCreate()
    {
        $this->id_lista = "";
        $this->titulo = "";
        $this->imagen = "";
        $this->usuario = "";
        $this->id_pelicula = "";
        $this->tipo = "";
    }

    protected function fijarSentenciaInsert()
    {
        $titulo = CGeneral::addSlashes($this->titulo);
        $imagen = CGeneral::addSlashes($this->imagen);
        $usuario = CGeneral::addSlashes($this->usuario);
        $id_pelicula = CGeneral::addSlashes($this->id_pelicula);
        $tipo = CGeneral::addSlashes($this->tipo);

        $insert = "insert into listas (titulo, imagen, usuario, id_pelicula, tipo)" .
            " values ('$titulo', '$imagen', '$usuario', '$id_pelicula', '$tipo')";

        return $insert;
    }

    protected function fijarSentenciaUpdate()
    {
        $id = $this->id_lista;
        $titulo = CGeneral::addSlashes($this->titulo);
        $imagen = CGeneral::addSlashes($this->imagen);
        $usuario = CGeneral::addSlashes($this->usuario);
        $id_pelicula = CGeneral::addSlashes($this->id_pelicula);
        $tipo = CGeneral::addSlashes($this->tipo);

        $sentencia = "update listas set 
        titulo='$titulo', " .
            "imagen='$imagen', " .
            "usuario='$usuario', " .
            "id_pelicula='$id_pelicula', " .
            "tipo='$tipo' " .
            "      where id_lista=$id";

        return $sentencia;
    }
}
