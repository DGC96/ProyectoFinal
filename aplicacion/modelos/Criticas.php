<?php
class Criticas extends CActiveRecord
{

    protected function fijarNombre()
    {
        return 'criticas';
    }

    protected function fijarTabla()
    {
        return "criticas";
    }

    protected function fijarId()
    {
        return "id_critica";
    }


    protected function fijarAtributos()
    {
        return array(
            "id_critica",
            "id_pelicula",
            "tipo",
            "usuario",
            "fecha_puntuacion",
            "puntuacion",
            "fecha_critica",
            "titulo_critica",
            "cuerpo_critica"
        );
    }

    protected function fijarDescripciones()
    {
        return array(
            "id_critica" => "ID Crítica",
            "id_pelicula" => "ID Película",
            "tipo" => "Tipo",
            "usuario" => "Usuario",
            "fecha_puntuacion" => "Fecha puntuación",
            "puntuacion" => "Puntuación",
            "fecha_critica" => "Fecha crítica",
            "titulo_critica" => "Título",
            "cuerpo_critica" => "Cuerpo"
        );
    }

    protected function fijarRestricciones()
    {
        return array(
            array(
                "ATRI" => "id_critica, id_pelicula, tipo, usuario, fecha_puntuacion, puntuacion, fecha_critica, titulo_critica, cuerpo_critica",
                "TIPO" => "REQUERIDO"
            ),
            array(
                "ATRI" => "id_critica, id_pelicula, puntuacion",
                "TIPO" => "ENTERO"
            ),
            array(
                "ATRI" => "usuario",
                "TIPO" => "CADENA",
                "TAMANIO" => 40
            ),
            array(
                "ATRI" => "titulo_critica",
                "TIPO" => "CADENA",
                "TAMANIO" => 50
            ),
            array(
                "ATRI" => "tipo",
                "TIPO" => "CADENA",
                "TAMANIO" => 10
            ),
            array(
                "ATRI" => "fecha_critica",
                "TIPO" => "FECHA"
            ),
            array(
                "ATRI" => "fecha_puntuacion",
                "TIPO" => "FECHA"
            )
        );
    }

    protected function afterCreate()
    {
        $this->id_critica = "";
        $this->id_pelicula = "";
        $this->tipo = "";
        $this->usuario = "";
        $this->fecha_puntuacion = "";
        $this->puntuacion = "";
        $this->fecha_critica = "";
        $this->titulo_critica = "";
        $this->cuerpo_critica = "";
    }

    protected function fijarSentenciaInsert()
    {
        $id_pelicula = CGeneral::addSlashes($this->id_pelicula);
        $tipo = CGeneral::addSlashes($this->tipo);
        $usuario = CGeneral::addSlashes($this->usuario);
        $fecha_puntuacion = CGeneral::addSlashes($this->fecha_puntuacion);
        $puntuacion = CGeneral::addSlashes($this->puntuacion);
        $fecha_critica = CGeneral::addSlashes($this->fecha_critica);
        $titulo_critica = CGeneral::addSlashes($this->titulo_critica);
        $cuerpo_critica = CGeneral::addSlashes($this->cuerpo_critica);

        $insert = "insert into criticas (id_pelicula, tipo, usuario, fecha_puntuacion, puntuacion, fecha_critica, titulo_critica, cuerpo_critica)" .
            " values ('$id_pelicula', '$tipo', '$usuario', '$fecha_puntuacion', '$puntuacion', '$fecha_critica', '$titulo_critica', '$cuerpo_critica')";

        return $insert;
    }

    protected function fijarSentenciaUpdate()
    {
        $id = $this->id_critica;
        $id_pelicula = CGeneral::addSlashes($this->id_pelicula);
        $tipo = CGeneral::addSlashes($this->tipo);
        $usuario = CGeneral::addSlashes($this->usuario);
        $fecha_puntuacion = CGeneral::addSlashes($this->fecha_puntuacion);
        $puntuacion = CGeneral::addSlashes($this->puntuacion);
        $fecha_critica = CGeneral::addSlashes($this->fecha_critica);
        $titulo_critica = CGeneral::addSlashes($this->titulo_critica);
        $cuerpo_critica = CGeneral::addSlashes($this->cuerpo_critica);

        $sentencia = "update criticas set 
        id_pelicula='$id_pelicula', " .
            "tipo='$tipo', " .
            "usuario='$usuario', " .
            "fecha_puntuacion='$fecha_puntuacion', " .
            "puntuacion='$puntuacion', " .
            "fecha_critica='$fecha_critica', " .
            "titulo_critica='$titulo_critica', " .
            "cuerpo_critica='$cuerpo_critica' " .
            "      where id_critica=$id";

        return $sentencia;
    }
}
