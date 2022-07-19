<?php

abstract class CACLBase {
    
    /*
     * anadirRole($nombre, $permisos=array()). Permite añadir un 
     * nuevo role con el nombre y los permisos indicados. 
     * Los permisos se establecen con un array de hasta 10 elementos. 
     * No es necesario establecer valor para todos los permisos (array(1=>true, 
     * 2=>false….). 
     * 
     * Devuelve true si se ha podido añadir el role y false en caso de que 
     * no (ya existe otro role con el mismo nombre). 
     * 
     * Si no se indica algún permiso, se asignará a false. 
     * El código de role debe ser un entero autonumérico.
     */
    abstract public function anadirRole($nombre, $permisos = array());
    
    
    /*
     * getCodRole($nombre). Devuelve el código de role correspondiente 
     * al $nombre o false si no lo encuentra.
     */
    abstract public function getCodRole($nombre);
    
    
    /*
     * existeRole($codRole). Devuelve true si existe un role 
     * con el código indicado.
     */
    abstract public function existeRole($codRole);
    
    
    /*
     * getPermisosRole($codRole). Devuelve los permisos asignados a un role.
     */
    abstract public function getPermisosRole($codRole);
    
    
    /*
     * anadirUsuario($nombre, $nick, $contrasena, $codRole). 
     * 
     * Añade un nuevo usuario con los datos indicados. 
     * 
     * Devuelve true si lo ha podido crear o falso en caso de error 
     * (Nick repetido, codRole que no existe, etc). 
     * 
     * El Nick debe ser único. Se asignará un código autonumérico único.
     */
    abstract public function anadirUsuario($nombre, $apellidos, $nick, $contrasena, $codRole);
    
    
    /*
     * getCodUsuario($nick): Devuelve el código de usuario 
     * correspondiente a un Nick o false si no lo encuentra.
     */
    abstract public function getCodUsuario($nick);
    
    
    /*
     * existeUsuario($nick). Devuelve true si existe un usuario 
     * con el Nick indicado.
     */
    abstract public function existeUsuario($nick);
    
    
    
    /*
     * esValido($nick, $contrasena): Comprueba dentro de la ACL disponible 
     * si el $nick (usuario) existe y coincide su contraseña. 
     * 
     * Devuelve true si es válido y false en otro caso.
     */
    abstract public function esValido($nick, $contrasena);
    
    
    
    /*
     * getPermiso($codUsuario, $numero). Devuelve si tiene o 
     * no el permiso numero $numero el usuario indicado.
     */
    abstract public function getPermiso($codUsuario, $numero);
    
    
    
    /*
     * getPermisos($codUsuario). Devuelve un array de todos los 
     * permisos que puede tener el usuario
     */
    abstract public function getPermisos($codUsuario);
    
    
    
    /*
     * getNombre($codUsuario). Función que devuelve el nombre 
     * dado un código de usuario.
     */
    abstract public function getNombre($codUsuario);
    
    
    
    /*
     * getBorrado($codUsuario): Función que devuelve si el usuario 
     * (con codigon dado) está borrado o no.
     */
    abstract public function getBorrado($codUsuario);
    
    
    
    
    /*
     * getUsuarioRole($codUsuario). Función que devuelve el código 
     * del role para el usuario indicado.
     */
    abstract public function getUsuarioRole($codUsuario);
    
    
    
    /*
     * setNombre($codUsuario, $nombre). Función que permite cambiar 
     * el $nombre de un usuario identificado por el codigo.
     */
    abstract public function setNombre($codUsuario, $nombre);
    
    
    
    /**
     * setContrasenia($codUsuario,$contra). Función que permite 
     * establecer la contraseña para el usuario identificado por el codigo
     */
    abstract public function setContrasenia($codUsuario, $contra);
    
    
    
    /*
     * setBorrado($codUsuario, $borrado). Función que permite establecer 
     * si el usuario esta borrado o no (1,0)
     */
    abstract public function setBorrado($codUsuario, $borrado);
    
    
    
    /*
     * setUsuarioRole($codUsuario,$role): Función que permite cambiar 
     * el role a un usuario concreto.
     */
    abstract public function setUsuarioRole($codUsuario, $role);
    
    
    /*
     * dameUsuarios(). Esta función devuelve un array asociativo 
     * donde el indice es el código de usuario y el dato es el nick
     */
    abstract public function dameUsuarios();
    
    
    
    /*
     * dameRoles(). Esta función devuelve un array indexado en el 
     * que el índice es el código de role y el valor el nombre.
     */
    abstract public function dameRoles();
    
    
}