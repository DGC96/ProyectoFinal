<?php
	header("HTTP/1.1 $numError $mensaje");
	header("Status: $numError $mensaje");
	
	?>
<!DOCTYPE html>
<html lang="es">
	<head>
		<meta charset="utf-8"/>
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>ERROR</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width; initial-scale=1.0">
		<link rel="stylesheet" type="text/css" href="/estilos/style.css" />
		<link rel="icon" type="image/png" href="/imagenes/favicon.png" />
		
	</head>
	<body>
		<div id="todo">	
			<header>
				<div class="logo">
					<a href="/index.php"><img src="/imagenes/logo.png" width="50px" height="50px"/></a>
				</div>
				<div class="titulo">
				    <a href="/index.php"><h1>PROYECTO FRAMEWORK</h1></a>
				</div>
			</header><!-- #header -->
			
			<div class="contenido">
				<nav>
	        	</nav>
	        	
	        	<article>
	        		<br />
	        		<br />
	        		Se ha producido el error  <?php echo $mensaje;?>
	        		<br />
	        		<br />
	 			</article><!-- #content -->
			
			</div>
		    <footer>
			    <h2>Copyright: <?php echo Sistema::app()->autor." ".Sistema::app()->direccion;?></h2>
		    </footer><!-- #footer -->
				
		</div><!-- #wrapper -->	
	</body>		
</html>
	