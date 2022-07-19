<!DOCTYPE html>
<html lang="es">

<head>
	<meta charset="utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<title><?php echo $titulo; ?></title>
	<meta name="description" content="">
	<meta name="viewport" content="width=device-width; initial-scale=1.0">
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@500&display=swap" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="/estilos/style.css" />
	<!-- ICONOS BOOTSTRAP -->
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.3/font/bootstrap-icons.css">
	<!-- Font Awesome -->
	<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
	<!-- MDB -->
	<link href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/4.0.0/mdb.min.css" rel="stylesheet" />
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/4.0.0/mdb.min.js"></script>
	<!-- SWEETALERT2 -->
	<script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
	<!-- BOOTSTRAP -->
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>

	<script src="/javascript/main.js" defer></script>
	<link rel="icon" type="image/png" href="/imagenes/favicon.png" />
	<?php
	if (isset($this->textoHead))
		echo $this->textoHead;
	?>
</head>

<body>
	<nav class="navbar navbar-expand-lg py-2 bg-light sticky-md-top">
		<div class="container">
			<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="navbar-collapse collapse" id="navbarSupportedContent">
				<ul class="navbar-nav me-auto mb-2 mb-lg-0">
					<li class="nav-item"><a href="/inicial/index" class="nav-link link-dark px-2 active" aria-current="page">Inicio</a></li>
					<?php
					if (Sistema::app()->Acceso()->hayUsuario()) {
					?>
						<li class="nav-item"><a href="/inicial/misListas" class="nav-link link-dark px-2">Mis listas</a></li>
						<li class="nav-item"><a href="/inicial/misCriticas" class="nav-link link-dark px-2">Mis críticas</a></li>
					<?php
					}

					if (Sistema::app()->Acceso()->hayUsuario() && Sistema::app()->Acceso()->puedePermiso(2)) {
					?>
						<li class="nav-item"><a href="/inicial/usuarios" class="nav-link link-dark px-2">Usuarios</a></li>
					<?php
					}
					?>
				</ul>
			</div>

			<div class="d-flex justify-content-between align-items-center">
			<i class="bi bi-brightness-high-fill text-dark"></i>
				<div class="form-check form-switch ms-2">
					<input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
				</div>
				<i class="bi bi-moon-fill text-dark me-5"></i>

				<?php
				if (!Sistema::app()->Acceso()->hayUsuario()) {
				?>
					<div class="d-flex">
						<a href="/registro/login" class="nav-link link-dark px-2">Identifícate</a>
						<a href="/registro/registro" class="nav-link link-dark px-2">Regístrate</a>
					</div>
				<?php
				} else {
				?>
					<div class="d-lg-flex">
						<label class="nav-link link-dark px-2">¡Bienvenido, <?php echo Sistema::app()->Acceso()->getNick() ?>!</label>
						<a href="/registro/logout" class="btn btn-danger d-flex align-items-center"><i class="bi bi-box-arrow-right"></i></button></a>
					</div>
				<?php
				}
				?>
			</div>
		</div>
	</nav>

	<div class="container d-md-flex justify-content-between align-items-center">
		<img src="/imagenes/logo.png" alt="logo" id="logo" style="width: 30%; min-width: 20%;">

		<form action="/inicial/mostrarBusqueda?">
			<div class="search-bar">
				<input type="search" name="query" id="inputBuscar" placeholder="Película, serie, persona">
				<button class="search-btn" id="buscar"></button>
			</div>
		</form>
	</div>

	<main class="container">
		<?php echo $contenido ?>
	</main>

	<footer class="bg-light text-center text-white mt-4">
		<!-- Grid container -->
		<div class="container p-3 pb-0">
			<!-- Section: Social media -->
			<section class="mb-4">
				<!-- Twitter -->
				<a style="color: #55acee;" href="https://twitter.com/DiegoGranados96" role="button">
					<i class="fab fa-twitter fa-lg"></i>
				</a>

				<!-- Instagram -->
				<a style="color: #E1306C;" href="https://www.instagram.com/dgc96/" role="button">
					<i class="fab fa-instagram fa-lg"></i>
				</a>

				<!-- Facebook -->
				<a style="color: #1877F2;" href="https://www.facebook.com/diego.grandoscruz/" role="button">
					<i class="fab fa-facebook fa-lg"></i>
				</a>
			</section>
			<!-- Section: Social media -->
		</div>
		<!-- Grid container -->

		<!-- Copyright -->
		<div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2);">
			© 2022 Copyright:
			<a class="text-white" href="#">Diego Granados Cruz</a>
		</div>
		<!-- Copyright -->
	</footer>
</body>

</html>