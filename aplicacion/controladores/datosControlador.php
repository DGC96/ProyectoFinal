<?php

class datosControlador extends CControlador
{
    public function accionPrimerSelect()
    {
        if (Sistema::app()->Acceso()->hayUsuario()) {
            $criticas = new Criticas();
            $array = $criticas->buscarTodos();
            $final = [];

            $recibido = file_get_contents('php://input');
            $json = json_decode($recibido);

            foreach ($array as $key => $value) {
                if (Sistema::app()->Acceso()->getNick() == $value["usuario"] && $json->id == $value["id_pelicula"])
                    array_push($final, $array[$key]);
            }
            echo json_encode($final);
        } else
            echo json_encode("error");
    }

    public function accionCuentaVotos()
    {
        $criticas = new Criticas();
        $recibido = file_get_contents('php://input');
        $json = json_decode($recibido);

        $array = $criticas->buscarTodos(array(
            "where" => "id_pelicula = " . "'" . $json->id . "'"
        ));

        $aux = [];

        if (!empty($array)) {
            foreach ($array as $key => $value) {
                if ($value["puntuacion"] == "0")
                    unset($array[$key]);

                array_push($aux, $value["puntuacion"]);
            }

            echo count($array);
        } else {
            echo "0";
        }
    }

    public function accionMediaVotos()
    {
        $criticas = new Criticas();
        $recibido = file_get_contents('php://input');
        $json = json_decode($recibido);

        $array = $criticas->buscarTodos(array(
            "where" => "id_pelicula = " . "'" . $json->id . "'"
        ));

        $aux = [];
        $suma = 0;

        if (!empty($array)) {
            foreach ($array as $key => $value) {
                array_push($aux, $value["puntuacion"]);
            }

            foreach ($aux as $key => $value) {
                if ($value == "0")
                    unset($aux[$key]);

                $suma += $value;
            }

            if ($suma != 0) {
                $total = $suma / count($aux);
                echo round($total, 1, PHP_ROUND_HALF_UP);
            } else
                echo "0";
        } else {
            echo "0";
        }
    }

    public function accionCambiarPunt()
    {
        if (Sistema::app()->Acceso()->hayUsuario()) {
            $criticas = new Criticas();
            $recibido = file_get_contents('php://input');
            $json = json_decode($recibido);

            $aux = $criticas->buscarPor(array(
                "where" => "usuario = " . "'" . Sistema::app()->Acceso()->getNick() . "' and id_pelicula = " . "'" . $json->id . "'"
            ));

            if ($aux) {
                //asigno los valores del formulario al objeto
                if ($json->punt == "No vista") {
                    $criticas->puntuacion = "0";
                    $criticas->fecha_puntuacion = "0000-00-00";
                } else {
                    $criticas->puntuacion = $json->punt;
                    $criticas->fecha_puntuacion = date("Y-m-d");
                }
                $criticas->guardar();
            } else {
                $criticas->puntuacion = $json->punt;
                $criticas->fecha_puntuacion = date("Y-m-d");
                $criticas->usuario = Sistema::app()->Acceso()->getNick();
                $criticas->id_pelicula = $json->id;
                $criticas->tipo = $json->tipo;
                $criticas->guardar();
            }
        }
    }

    public function accionCambiarCritica()
    {
        if (Sistema::app()->Acceso()->hayUsuario()) {
            $criticas = new Criticas();
            $recibido = file_get_contents('php://input');
            $json = json_decode($recibido);

            $aux = $criticas->buscarPor(array(
                "where" => "usuario = " . "'" . Sistema::app()->Acceso()->getNick() . "' and id_pelicula = " . "'" . $json->id . "'"
            ));

            if ($aux) {
                //asigno los valores del formulario al objeto
                $criticas->titulo_critica = $json->titulo;
                $criticas->cuerpo_critica = $json->cuerpo;
                $criticas->fecha_critica = date("Y-m-d");
                $criticas->guardar();
            } else {
                $criticas->titulo_critica = $json->titulo;
                $criticas->cuerpo_critica = $json->cuerpo;
                $criticas->fecha_critica = date("Y-m-d");
                $criticas->usuario = Sistema::app()->Acceso()->getNick();
                $criticas->id_pelicula = $json->id;
                $criticas->tipo = $json->tipo;
                $criticas->guardar();
            }
        }
    }

    public function accionDameCriticasPorPeli()
    {
        $criticas = new Criticas();
        $array = $criticas->buscarTodos();
        $final = [];

        $recibido = file_get_contents('php://input');
        $json = json_decode($recibido);

        foreach ($array as $key => $value) {
            if ($json->id == $value["id_pelicula"])
                array_push($final, $array[$key]);
        }
        echo json_encode($final);
    }

    public function accionMisCriticas()
    {
        $criticas = new Criticas();
        $array = $criticas->buscarTodos();
        $final = [];

        foreach ($array as $key => $value) {
            if (Sistema::app()->Acceso()->getNick() == $value["usuario"] && $value["titulo_critica"] != "")
                array_push($final, $array[$key]);
        }
        echo json_encode($final);
    }

    public function accionBorrarCritica()
    {
        $criticas = new Criticas();
        $recibido = file_get_contents('php://input');
        $json = json_decode($recibido);

        $aux = $criticas->buscarPor(array(
            "where" => "usuario = " . "'" . Sistema::app()->Acceso()->getNick() . "' and id_pelicula = " . "'" . $json->id . "'"
        ));

        if ($aux) {
            $criticas->titulo_critica = "";
            $criticas->cuerpo_critica = "";
            $criticas->fecha_critica = "";
            $criticas->guardar();
        }
    }

    public function accionUsuarios()
    {
        $datosRegistro = new DatosRegistro();
        $array = $datosRegistro->buscarTodos();

        echo json_encode($array);
    }

    public function accionBorrarUsuario()
    {
        $usuario = new DatosRegistro();
        $recibido = file_get_contents('php://input');
        $json = json_decode($recibido);

        $aux = $usuario->buscarPor(array(
            "where" => "cod_acl_usuario = " . "'" . $json->id . "'"
        ));

        if ($aux) {
            $deleteUsu = "DELETE FROM acl_usuarios WHERE cod_acl_usuario = " . $json->id;
            $deleteCrit = "DELETE FROM criticas WHERE usuario = " . "'" . $usuario->nick . "'";

            $usuario->ejecutarSentencia($deleteCrit);
            $usuario->ejecutarSentencia($deleteUsu);
        }
    }

    public function accionSelectUsuario()
    {
        $usuario = new DatosRegistro();
        $recibido = file_get_contents('php://input');
        $json = json_decode($recibido);
        $arrayUsu = [];

        $usuario->buscarPorId($json->id);

        array_push($arrayUsu, [
            "cod_acl_usuario" => $usuario->cod_acl_usuario,
            "nombre" => $usuario->nombre,
            "apellidos" => $usuario->apellidos,
            "fecha_nacimiento" => $usuario->fecha_nacimiento,
            "email" => $usuario->email,
            "nick" => $usuario->nick,
            "contrasenia" => $usuario->contrasenia
        ]);

        echo json_encode($arrayUsu);
    }

    public function accionModificarUsuario()
    {
        $usuario = new DatosRegistro();
        $recibido = file_get_contents('php://input');
        $json = json_decode($recibido);

        $aux = $usuario->buscarPorId($json->id);

        if ($aux) {
            $usuario->nombre = $json->nombre;
            $usuario->apellidos = $json->apellidos;
            $usuario->fecha_nacimiento = $json->fecha_nacimiento;
            $usuario->email = $json->email;
            $usuario->nick = $json->nick;
            $usuario->contrasenia = $json->contrasenia;
            $usuario->guardar();
        }
    }

    public function accionMisListas()
    {
        if (Sistema::app()->Acceso()->hayUsuario()) {
            $lista = new Listas();

            $array = $lista->buscarTodos(array(
                "where" => "usuario = '" . Sistema::app()->Acceso()->getNick() . "' and id_pelicula = 0"
            ));

            if (!empty($array))
                echo json_encode($array);
        } else
            echo json_encode("error");
    }

    public function accionFiltrarListas()
    {
        if (Sistema::app()->Acceso()->hayUsuario()) {
            $lista = new Listas();
            $recibido = file_get_contents('php://input');
            $json = json_decode($recibido);

            $array = $lista->buscarTodos(array(
                "where" => "usuario = '" . Sistema::app()->Acceso()->getNick() . "' and id_pelicula = 0"
            ));

            $aux = $lista->buscarTodos(array(
                "where" => "usuario = '" . Sistema::app()->Acceso()->getNick() . "' and id_pelicula = '" . $json->id . "'"
            ));

            if (!empty($array)) {
                foreach ($array as $key => $value) {
                    foreach ($aux as $key2 => $value2) {
                        if ($aux[$key2]["titulo"] == $value["titulo"])
                            unset($array[$key]);
                    }
                }
                sort($array);
                echo json_encode($array);
            }
        } else
            echo json_encode("error");
    }

    public function accionNuevaLista()
    {
        $lista = new Listas();
        $recibido = file_get_contents('php://input');
        $json = json_decode($recibido);

        $aux = $lista->buscarPor(array(
            "where" => "titulo = " . "'" . $json->titulo . "'" . " and usuario = " . "'" . Sistema::app()->Acceso()->getNick() . "'"
        ));

        if (!$aux) {
            $lista->titulo = $json->titulo;
            $lista->imagen = $json->imagen;
            $lista->usuario = Sistema::app()->Acceso()->getNick();
            $lista->guardar();
            echo json_encode("exito");
        }
    }

    public function accionBorrarLista()
    {
        $lista = new Listas();
        $recibido = file_get_contents('php://input');
        $json = json_decode($recibido);

        $aux = $lista->buscarPor(array(
            "where" => "titulo = " . "'" . $json->titulo . "'" . " and usuario = " . "'" . Sistema::app()->Acceso()->getNick() . "'"
        ));

        if ($aux) {
            $deleteLista = "DELETE FROM listas WHERE titulo = " . "'" . $json->titulo . "'" . " and usuario = " . "'" . Sistema::app()->Acceso()->getNick() . "'";

            $lista->ejecutarSentencia($deleteLista);
        }
    }

    public function accionPeliALista()
    {
        if (Sistema::app()->Acceso()->hayUsuario()) {
            $lista = new Listas();
            $recibido = file_get_contents('php://input');
            $json = json_decode($recibido);

            $lista->titulo = $json->titulo;
            $lista->usuario = Sistema::app()->Acceso()->getNick();
            $lista->id_pelicula = $json->id;
            $lista->tipo = $json->tipo;
            $lista->guardar();
            echo json_encode("exito");
        } else
            echo json_encode("error");
    }

    public function accionCompruebaPeliLista()
    {
        if (Sistema::app()->Acceso()->hayUsuario()) {
            $lista = new Listas();
            $recibido = file_get_contents('php://input');
            $json = json_decode($recibido);

            $array = $lista->buscarTodos(array(
                "where" => "usuario = '"  . Sistema::app()->Acceso()->getNick() . "' and id_pelicula = '" . $json->id . "'"
            ));

            if (!empty($array))
                echo json_encode($array);
            else
                echo json_encode("error");
        } else
            echo json_encode("error");
    }

    public function accionDetallesLista()
    {
        $lista = new Listas();
        $recibido = file_get_contents('php://input');
        $json = json_decode($recibido);

        $array = $lista->buscarTodos(array(
            "where" => "usuario = '"  . Sistema::app()->Acceso()->getNick() . "' and titulo = '" . $json->titulo . "'"
        ));

        if (!empty($array))
            echo json_encode($array);
        else
            echo json_encode("error");
    }

    public function accionBorrarPeliDeLista()
    {
        $lista = new Listas();
        $recibido = file_get_contents('php://input');
        $json = json_decode($recibido);

        $aux = $lista->buscarPor(array(
            "where" => "id_lista = '" . $json->id . "'"
        ));

        if ($aux) {
            $delete = "DELETE FROM listas WHERE id_lista = '" . $json->id . "'";
            $lista->ejecutarSentencia($delete);
            echo json_encode("exito");
        } else
            echo json_encode("error");
    }
}
