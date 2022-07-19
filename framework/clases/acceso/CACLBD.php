<?php

class CACLBD extends CACLBase
{

    private $_conex;
    private $_hayConexion;
    private $_prefijo = '';


    public function __construct($servidor, $usuario, $contra, $bd)
    {
        $this->_hayConexion = true;
        $this->_conex = new CBaseDatos($servidor, $usuario, $contra, $bd);
        if (!$this->_conex || $this->_conex->error() <> 0)
            $this->_hayConexion = false;
    }

    //Funciones de roles
    public function anadirRole($nombre, $permisos = [])
    {
        if (!$this->_hayConexion)
            return false;

        $nombre = substr(mb_strtolower($nombre), 0, 30);

        if ($this->existeNombreRole($nombre))
            return false;

        for ($cont = 1; $cont <= 10; $cont++) {
            if (isset($permisos[$cont])) {
                $aPermisos[$cont] = (bool)$permisos[$cont] ? '1' : '0';
            } else {
                $aPermisos[$cont] = '0';
            }
        }

        $nombre = CGeneral::addSlashes($nombre);

        $sentencia = "insert into acl_roles (" .
            "     nombre, " .
            "    perm1, perm2" .
            "       ) values (" .
            "     '$nombre', " .
            "    {$aPermisos[1]}, {$aPermisos[2]}," .
            "          )";
        $resultado = $this->_conex->crearConsulta($sentencia);
        return $resultado == true;
    }

    private function existeNombreRole($role)
    {
        if (!$this->_hayConexion)
            return false;

        $sentencia = "select * from acl_roles where nombre='$role'";
        $resultado = $this->_conex->crearConsulta($sentencia);
        if ($resultado->error())
            return false;

        $fila = $resultado->fila();

        return ($fila != false);
    }
    public function getCodRole($nombre)
    {
        if (!$this->_hayConexion)
            return false;
        $nombre = substr(mb_strtolower($nombre), 0, 30);

        if (!$this->existeNombreRole($nombre))
            return false;

        $nombre = CGeneral::addSlashes($nombre);

        $consulta = "SELECT cod_acl_role from acl_roles where nombre = '$nombre'";

        $resul = $this->_conex->crearConsulta($consulta)->fila();

        return (is_null($resul) ? false : $resul["cod_acl_role"]);
    }

    public function existeRole($codRole)
    {
        if (!$this->_hayConexion)
            return false;



        $consulta = "SELECT * from acl_roles " .
            "      where cod_acl_role = '$codRole'";

        $resul = $this->_conex->crearConsulta($consulta)->fila();

        if (is_null($resul))
            return false;

        return true;
    }

    public function getPermisosRole($codRole)
    {
        if (!$this->_hayConexion)
            return false;

        if (!$this->existeRole($codRole))
            return false;

        $consulta = "SELECT `perm1`, `perm2` " .
            "     FROM `acl_roles` " .
            "     WHERE cod_roles = $codRole";


        $resul = $this->_conex->crearConsulta($consulta)->fila();
        $perm = [];
        for ($cont = 1; $cont < 11; $cont++)
            $perm[$cont] = $resul[$cont - 1];

        return ($perm);
    }


    //Funciones de usuario
    public function anadirUsuario($nombre, $apellidos, $nick, $contrasena, $codRole)
    {
        if (!$this->_hayConexion)
            return false;

        if (!$this->existeRole($codRole))
            return false;

        $nick = mb_strtolower($nick);

        if ($this->existeUsuario($nick))
            return false;

        $contrasena = CGeneral::addSlashes($this->_prefijo . $contrasena);
        $nombre = CGeneral::addSlashes(substr($nombre, 0, 50));
        $nick = CGeneral::addSlashes(substr($nick, 0, 50));


        $consulta = "INSERT INTO  acl_usuarios (" .
            "       nombre,apellidos,nick,contrasenia,cod_acl_rol,borrado" .
            "    ) VALUES (" .
            "       '$nombre', '$apellidos', '$nick', '$contrasena', $codRole,false)";
        return $this->_conex->crearConsulta($consulta);
    }

    public function getCodUsuario($nick)
    {
        if (!$this->_hayConexion)
            return false;

        $nick = mb_strtolower($nick);

        $consulta = "SELECT cod_acl_usuario FROM acl_usuarios " .
            "        WHERE nick = '$nick'";

        $resul = $this->_conex->crearConsulta($consulta)->fila();

        return (is_null($resul) ? false : $resul["cod_acl_usuario"]);
    }

    public function existeUsuario($nick)
    {
        if ($this->getCodUsuario($nick) !== false)
            return true;

        return false;
    }

    public function esValido($nick, $contrasena)
    {
        if (!$this->_hayConexion)
            return false;

        if (!$this->existeUsuario($nick))
            return false;

        $nick = mb_strtolower($nick);
        $contrasena = CGeneral::addSlashes($this->_prefijo . $contrasena);
        $nick = CGeneral::addSlashes(substr($nick, 0, 50));

        $consulta = "SELECT * FROM acl_usuarios " .
            "WHERE nick = '$nick' " .
            "       and contrasenia = '$contrasena'";

        $resul = $this->_conex->crearConsulta($consulta)->fila();

        if (is_null($resul))
            return false;

        return true;
    }


    //Getters
    public function getPermiso($codUsuario, $numero)
    {

        $resul = $this->getPermisos($codUsuario);

        if ($resul === false)
            return false;

        return $resul[$numero] == 1;
    }

    public function getPermisos($codUsuario)
    {
        if (!$this->_hayConexion)
            return false;

        $codUsuario = intval($codUsuario);
        $consulta = "SELECT perm1, perm2 " .
            "    FROM cons_acl_usuarios WHERE cod_acl_usuario = $codUsuario";

        $resul = $this->_conex->crearConsulta($consulta)->fila();
        $resul1 = [];
        foreach ($resul as $indice => $valor) {
            $resul1[substr($indice, 4, 2)] = $valor;
        }
        if (is_null($resul1))
            return false;

        return $resul1;
    }

    public function getNombre($codUsuario)
    {
        if (!$this->_hayConexion)
            return false;

        $codUsuario = intval($codUsuario);

        $consulta = "SELECT nombre FROM cons_acl_usuarios " .
            "    WHERE cod_acl_usuario = $codUsuario";

        $resul = $this->_conex->crearConsulta($consulta)->fila();

        if (is_null($resul))
            return false;

        return $resul["nombre"];
    }

    public function getBorrado($codUsuario)
    {
        if (!$this->_hayConexion)
            return false;

        $codUsuario = intval($codUsuario);


        $consulta = "SELECT borrado FROM cons_acl_usuarios " .
            "    WHERE cod_acl_usuario = $codUsuario";

        $resul = $this->_conex->crearConsulta($consulta)->fila();

        if (is_null($resul))
            return false;

        return $resul["borrado"];
    }

    public function getUsuarioRole($codUsuario)
    {
        if (!$this->_hayConexion)
            return false;

        $codUsuario = intval($codUsuario);


        $consulta = "SELECT cod_acl_rol FROM cons_acl_usuarios " .
            "    WHERE cod_acl_usuario = $codUsuario";

        $resul = $this->_conex->crearConsulta($consulta)->fila();

        if (is_null($resul))
            return false;

        return $resul;
    }

    //Setters
    public function setNombre($codUsuario, $nombre)
    {
        if (!$this->_hayConexion)
            return false;

        $codUsuario = intval($codUsuario);

        $nombre = CGeneral::addSlashes(substr($nombre, 0, 50));


        $consulta = "UPDATE acl_usuarios SET nombre = '$nombre' " .
            "    WHERE cod_acl_usuario = '$codUsuario'";
        $this->_conex->crearConsulta($consulta);
        return true;
    }

    public function setContrasenia($codUsuario, $contra)
    {
        if (!$this->_hayConexion)
            return false;

        $codUsuario = intval($codUsuario);
        $contra = CGeneral::addSlashes($this->_prefijo . $contra);


        $consulta = "UPDATE acl_usuarios SET contrasenia = '$contra' " .
            "    WHERE cod_acl_usuario = '$codUsuario'";
        $this->_conex->crearConsulta($consulta);

        return true;
    }

    public function setBorrado($codUsuario, $borrado)
    {
        if (!$this->_hayConexion)
            return false;
        $borrado = $borrado ? "1" : "0";
        $consulta = "UPDATE acl_usuarios SET borrado = '$borrado' " .
            "    WHERE cod_acl_usuario  = '$codUsuario'";
        $this->_conex->crearConsulta($consulta);
        return true;
    }

    public function setUsuarioRole($codUsuario, $rol)
    {
        if (!$this->_hayConexion)
            return false;

        $codUsuario = intval($codUsuario);

        if ($this->existeRole($rol))
            return false;

        $consulta = "UPDATE acl_usuarios SET cod_acl_rol = '$rol' " .
            "     WHERE cod_acl_usuario = '$codUsuario'";
        $this->_conex->crearConsulta($consulta);

        return true;
    }


    //Arrays
    public function dameUsuarios()
    {
        if (!$this->_hayConexion)
            return false;

        $consulta = "SELECT cod_acl_usuario, nick " .
            "      from acl_usuarios " .
            "       ORDER BY cod_acl_usuario";

        $datos = $this->_conex->crearConsulta($consulta);
        $res = [];

        while ($fila = $datos->fila())
            $res[$fila["cod_acl_usuario"]] = $fila["nick"];

        return $res;
    }

    public function dameRoles()
    {
        if (!$this->_hayConexion)
            return false;

        $consulta = "SELECT cod_acl_role, nombre " .
            "      from acl_roles " .
            "       ORDER BY cod_acl_role";

        $datos = $this->_conex->crearConsulta($consulta);
        $res = [];

        while ($fila = $datos->fila())
            $res[$fila["cod_acl_role"]] = $fila["nombre"];

        return $res;
    }
}
