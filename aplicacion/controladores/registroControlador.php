<?php

class registroControlador extends CControlador
{
    public function accionRegistro()
    {
        $registro = new DatosRegistro();

        //nombre del modelo = nombre del array por post
        $nombre = $registro->getNombre();
        if (isset($_POST[$nombre])) {

            //asigno los valores del formulario al objeto
            $registro->setValores($_POST[$nombre]);
            $registro->fecha_nacimiento = CGeneral::fechaMysqlANormal($registro->fecha_nacimiento);

            //comprobar datos
            if ($registro->validar()) {

                $registro->guardar();

                Sistema::app()->irAPagina(array(
                    "inicial",
                    "index"
                ));
                return;
            } else { //no es valido, vuelvo a mostrar los valores
                $this->dibujaVista("pedirDatos", ["registro" => $registro], "Registro");
                exit;
            }
        }

        $this->dibujaVista("pedirDatos", ["registro" => $registro], "Registro");
    }

    public function accionLogin()
    {
        $login = new Login();

        $nombre = $login->getNombre();
        if (isset($_POST[$nombre])) {
            $login->setValores($_POST[$nombre]);

            if ($login->validar()) {
                if ($login->autenticar()) {
                    $pagina = [];
                    if (Sistema::App()->Sesion()->haySesion()) {
                        $pagina = $_SESSION["pagina"];
                    }

                    Sistema::app()->irAPagina($pagina);
                    return;
                } else {
                    $login->setError("contrasenia", "Nombre de usuario o contraseña errónea");
                }
            } else {
                $this->dibujaVista("login", ["login" => $login], "Login");
                exit;
            }
        }


        $this->dibujaVista("Login", ["login" => $login], "Login");
    }

    public function accionLogout()
    {
        Sistema::app()->Acceso()->quitarRegistroUsuario();
        Sistema::app()->irAPagina([]);
    }
}
