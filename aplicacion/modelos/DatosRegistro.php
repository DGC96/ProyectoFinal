<?php
class DatosRegistro extends CActiveRecord
{

    protected function fijarNombre()
    {
        return 'registro';
    }

    protected function fijarAtributos()
    {
        return array(
            "cod_acl_usuario",
            "nombre",
            "apellidos",
            "fecha_nacimiento",
            "email",
            "nick",
            "contrasenia",
            "confirmar_contrasenia"
        );
    }

    protected function fijarTabla()
    {
        return "acl_usuarios";
    }

    protected function fijarId()
    {
        return "cod_acl_usuario";
    }

    protected function fijarDescripciones()
    {
        return array(
            "nombre" => "Nombre",
            "apellidos" => "Apellidos",
            "fecha_nacimiento" => "Fecha de nacimiento",
            "email" => "Email",
            "nick" => "Nick",
            "contrasenia" => "Contraseña",
            "confirmar_contrasenia" => "Confirmar contraseña"
        );
    }

    protected function fijarRestricciones()
    {
        return array(
            array(
                "ATRI" => "nombre, apellidos, fecha_nacimiento, email, nick, contrasenia, confirmar_contrasenia",
                "TIPO" => "REQUERIDO",
                "MENSAJE" => "Todos los campos son obligatorios."
            ),
            array(
                "ATRI" => "nick",
                "TIPO" => "CADENA",
                "TAMANIO" => 40,
                "MENSAJE" => "El nick no puede estar vacío ni superar los 40 caracteres."
            ),
            array(
                "ATRI" => "nick",
                "TIPO" => "FUNCION",
                "FUNCION" => "compruebaNick"
            ),
            array(
                "ATRI" => "nombre",
                "TIPO" => "CADENA",
                "TAMANIO" => 40,
                "MENSAJE" => "El nombre no puede estar vacío ni superar los 40 caracteres."
            ),
            array(
                "ATRI" => "apellidos",
                "TIPO" => "CADENA",
                "TAMANIO" => 40,
                "MENSAJE" => "Los apellidos no pueden estar vacíos ni superar los 40 caracteres."
            ),
            array(
                "ATRI" => "fecha_nacimiento",
                "TIPO" => "FECHA"
            ),
            array(
                "ATRI" => "fecha_nacimiento",
                "TIPO" => "FUNCION",
                "FUNCION" => "validaFecha"
            ),
            array(
                "ATRI" => "contrasenia,confirmar_contrasenia",
                "TIPO" => "CADENA",
                "TAMANIO" => 30
            ),
            array(
                "ATRI" => "contrasenia",
                "TIPO" => "FUNCION",
                "FUNCION" => "validaContrasenia"
            ),
            array(
                "ATRI" => "email",
                "TIPO" => "EMAIL"
            )
        );
    }

    protected function afterCreate()
    {
        $this->nombre = "";
        $this->apellidos = "";
        $this->fecha_nacimiento = "";
        $this->email = "";
        $this->nick = "";
        $this->contrasenia = "";
        $this->confirmar_contrasenia = "";
    }

    public function validaFecha()
    {
        $aux = CGeneral::fechaMysqlANormal($this->fecha_nacimiento);
        $fecha1 = DateTime::createFromFormat("d/m/Y", $aux);
        $fecha2 = DateTime::createFromFormat("d/m/Y", '01/01/1900');
        $fecha3 = new DateTime('now');

        if ($this->fecha_nacimiento == "") {
            $fechaDefecto = new DateTime('now');
            $this->fecha_nacimiento = $fechaDefecto->format('d/m/Y');
        }

        if ($fecha1 < $fecha2) {
            $this->setError("fecha_nacimiento", "La fecha de nacimiento debe ser posterior al 01/01/1900");
        }

        if ($fecha1 > $fecha3) {
            $this->setError("fecha_nacimiento", "La fecha de nacimiento debe ser anterior al día de hoy");
        }
    }

    public function validaContrasenia()
    {
        if ($this->contrasenia !== $this->confirmar_contrasenia)
            $this->setError("confirmar_contrasenia", "Las contraseñas no coinciden");
    }

    protected function fijarSentenciaInsert()
    {
        $nombre = CGeneral::addSlashes($this->nombre);
        $apellidos = CGeneral::addSlashes($this->apellidos);
        $fecha_nacimiento = CGeneral::fechaNormalAMysql($this->fecha_nacimiento);
        $email = CGeneral::addSlashes($this->email);
        $nick = CGeneral::addSlashes($this->nick);
        $contrasenia = CGeneral::addSlashes($this->contrasenia);

        $insert = "insert into acl_usuarios (nombre, apellidos, fecha_nacimiento, email, nick, contrasenia, cod_acl_role)" .
            " values ('$nombre', '$apellidos', '$fecha_nacimiento', '$email', '$nick', '$contrasenia', 1)";

        return $insert;
    }

    protected function fijarSentenciaUpdate()
    {
        $id = $this->cod_acl_usuario;
        $nombre = CGeneral::addSlashes($this->nombre);
        $apellidos = CGeneral::addSlashes($this->apellidos);
        $fecha_nacimiento = CGeneral::fechaNormalAMysql($this->fecha_nacimiento);
        $email = CGeneral::addSlashes($this->email);
        $nick = CGeneral::addSlashes($this->nick);
        $contrasenia = CGeneral::addSlashes($this->contrasenia);

        $sentencia = "update acl_usuarios set 
            nombre='$nombre', " .
            "apellidos='$apellidos', " .
            "fecha_nacimiento='$fecha_nacimiento', " .
            "email='$email', " .
            "nick='$nick', " .
            "contrasenia='$contrasenia' " .
            "      where cod_acl_usuario=$id";

        return $sentencia;
    }

    public function compruebaNick() {
        if (Sistema::app()->ACL()->existeUsuario($this->nick))
            $this->setError("nick", "Este usuario ya existe");
    }
}
