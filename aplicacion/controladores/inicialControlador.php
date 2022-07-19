<?php

class inicialControlador extends CControlador
{
	public function accionIndex()
	{
		$this->dibujaVista("index", array(), "dePelicula");
	}

	public function accionMostrarInfo()
	{
		$this->dibujaVista("mostrarInfo", array(), "Mostrar información");
	}

	public function accionMostrarPersona()
	{
		$this->dibujaVista("mostrarPersona", array(), "Información persona");
	}

	public function accionMostrarBusqueda()
	{
		$this->dibujaVista("mostrarBusqueda", array(), "Búsqueda");
	}

	public function accionCritica()
	{
		$this->dibujaVista("critica", array(), "Crítica");
	}

	public function accionMostrarCriticas()
	{
		$this->dibujaVista("mostrarCriticas", array(), "Mostrar críticas");
	}

	public function accionMisCriticas()
	{
		$this->dibujaVista("misCriticas", array(), "Mis críticas");
	}

	public function accionUsuarios()
	{
		$this->dibujaVista("usuarios", array(), "Usuarios");
	}

	public function accionMisListas()
	{
		$this->dibujaVista("misListas", array(), "Mis listas");
	}

	public function accionNuevaLista()
	{
		$this->dibujaVista("nuevaLista", array(), "Nueva lista");
	}

	public function accionDetallesLista()
	{
		$this->dibujaVista("detallesLista", array(), "Detalles de la lista");
	}
}
