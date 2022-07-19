<?php

class Login extends CActiveRecord
{
    protected function fijarNombre()
    {
        return 'login';
    }

    protected function fijarAtributos()
    {
        return array(
            "nick", "contrasenia",
        );
    }

    protected function fijarDescripciones()
    {
        return array(
            "nick" => "Usuario",
            "contrasenia" => "Contraseña"
        );
    }

    protected function fijarRestricciones()
    {
        return
            array(
                array(
                    "ATRI" => "nick, contrasenia",
                    "TIPO" => "REQUERIDO",
                    "MENSAJE" => "Usuario y contraseña no pueden estar vacíos."
                ),
                array(
                    "ATRI" => "nick",
                    "TIPO" => "CADENA",
                    "TAMANIO" => 20,
                    "MENSAJE" => "El usuario no puede tener más de 40 caracteres."
                ),
                array(
                    "ATRI" => "contrasenia",
                    "TIPO" => "CADENA",
                    "TAMANIO" => 20,
                    "MENSAJE" => "La contraseña no puede tener más de 30 caracteres."
                ),
                array(
                    "ATRI" => "contrasenia",
                    "TIPO" => "FUNCION",
                    "FUNCION" => "compruebaContrasenia"
                )
            );
    }

    protected function afterCreate()
    {
        $this->nick = "";
        $this->contrasenia = "";
    }


    public function compruebaContrasenia()
    {
        if (Sistema::app()->ACL()) {
            if (Sistema::app()->ACL()->esValido($this->nick, $this->contrasenia)) {
                // son correctos
            } else {
                $this->setError("contrasenia", "Usuario o contraseña incorrectos");
            }
        } else {
            $this->setError("contrasenia", "Usuario o contraseña incorrectos");
        }
    }

    public function autenticar()
    {
        $usuario = Sistema::app()->ACL()->getCodUsuario($this->nick);
        Sistema::app()->Acceso()->registrarUsuario(
            $this->nick,
            Sistema::app()->ACL()->getNombre($usuario),
            Sistema::app()->ACL()->getPermisos($usuario)
        );
        return true;
    }
}
