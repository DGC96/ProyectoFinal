-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-06-2022 a las 13:53:16
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `peliculas_final`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `acl_roles`
--

CREATE TABLE `acl_roles` (
  `cod_acl_role` int(11) NOT NULL,
  `nombre` varchar(30) COLLATE utf8_spanish2_ci NOT NULL,
  `perm1` tinyint(1) NOT NULL DEFAULT 0,
  `perm2` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `acl_roles`
--

INSERT INTO `acl_roles` (`cod_acl_role`, `nombre`, `perm1`, `perm2`) VALUES
(1, 'normales', 1, 0),
(2, 'administradores', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `acl_usuarios`
--

CREATE TABLE `acl_usuarios` (
  `cod_acl_usuario` int(11) NOT NULL,
  `nombre` varchar(40) COLLATE utf8_spanish2_ci NOT NULL,
  `apellidos` varchar(40) COLLATE utf8_spanish2_ci NOT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `email` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `nick` varchar(40) COLLATE utf8_spanish2_ci NOT NULL,
  `contrasenia` varchar(32) COLLATE utf8_spanish2_ci NOT NULL,
  `cod_acl_role` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `acl_usuarios`
--

INSERT INTO `acl_usuarios` (`cod_acl_usuario`, `nombre`, `apellidos`, `fecha_nacimiento`, `email`, `nick`, `contrasenia`, `cod_acl_role`) VALUES
(1, 'Diego', 'Granados Cruz', '1996-03-26', 'diegogranados96@gmail.com', 'diego', 'diego', 2),
(6, 'Juanma', 'Villalón Jiménez', '2001-05-12', 'juanmavillalonjimenez@gmail.com', 'juanma', 'juanma', 1),
(7, 'Álvaro', 'Fernandez Caro', '1999-06-21', 'alvarofernandezcaro@gmail.com', 'alvaro', 'alvaro', 1);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `cons_acl_usuarios`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `cons_acl_usuarios` (
`cod_acl_usuario` int(11)
,`nombre` varchar(40)
,`apellidos` varchar(40)
,`fecha_nacimiento` date
,`nick` varchar(40)
,`contrasenia` varchar(32)
,`cod_acl_role` int(11)
,`nombreRol` varchar(30)
,`perm1` tinyint(1)
,`perm2` tinyint(1)
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `criticas`
--

CREATE TABLE `criticas` (
  `id_critica` int(11) NOT NULL,
  `id_pelicula` int(11) NOT NULL,
  `tipo` varchar(10) COLLATE utf8_spanish2_ci NOT NULL,
  `usuario` varchar(40) COLLATE utf8_spanish2_ci NOT NULL,
  `fecha_puntuacion` date NOT NULL,
  `puntuacion` tinyint(4) NOT NULL,
  `fecha_critica` date NOT NULL,
  `titulo_critica` varchar(70) COLLATE utf8_spanish2_ci NOT NULL,
  `cuerpo_critica` text COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `criticas`
--

INSERT INTO `criticas` (`id_critica`, `id_pelicula`, `tipo`, `usuario`, `fecha_puntuacion`, `puntuacion`, `fecha_critica`, `titulo_critica`, `cuerpo_critica`) VALUES
(1, 453395, 'movie', 'diego', '2022-05-24', 9, '0000-00-00', '', ''),
(3, 86831, 'tv', 'diego', '2022-05-24', 8, '2022-05-24', '', ''),
(4, 453395, 'movie', 'juanma', '2022-05-24', 8, '2022-05-24', 'La Dinastía de Marvel', 'La madurez en la que se mueve la saga cinematográfica de Marvel es ya incuestionable. \"Doctor Strange in the Multiverse of Madness\" es la película que constata que la Casa de las Ideas es capaz de alcanzar cotas de excelencia en el mercado de los blockbusters y de los superhéroes -su monopolio- en un gran despliegue de todos los elementos que puede regalar el género. Divertida, alocada y oscura (sí, en el sentido más terrorífico que permite el adjetivo cinematográfico-, la nueva entrega del personaje que interpreta a Benedict Cumberbatch se adentra en la complejidad que solo permiten los cómics.\r\n\r\nMarvel no alcanzaba esa profundidad en el argumento -requiere seguir el hilo y compromiso con todas las historias anteriores- desde Infinity War y Endgame. No es un producto para recién llegados ni para personas ajenas a las dinámicas de los cómics: la profundidad y el recorrido de los personajes rompe el metraje, viene de lejos e irá para largo. Además, su trabajo no es ese, el de venir a explicarte su origen y su pasado en la película número veintitantas. Su trabajo es recorrer aventuras. Y en esto, Sam Raimi, es de los mejores.\r\n\r\nLa nueva entrega del Marvel Cinematic Universe (MCU) conecta directamente con las historias de la línea principal de los Avengers y de la última película de Spider-Man. Raimi -que dirigió las tres obras originales del superhéroe arácnido, con Tobey Maguire como protagonista- se suelta en esta aventura que aproxima, por primera vez, la saga a un tono mucho más terrorífico y oscuro.\r\n\r\nEl director requiere reflejos e implicación por parte del espectador en uno de los guiones más alocados y que van más rápido de todo el MCU. Las sorpresas están aseguradas (muchas de ellas inesperadas, que es de agradecer) y la frescura que requería y necesitaba el conjunto de filmes de superhéroes de Marvel después de las infames historias contemporáneas anteriores a Spider-Man y posteriores a Endgame.\r\n\r\nEs un disfrute permanente para todos aquellos que tienen mínimas nociones del universo de Marvel y una delicia absoluta para quienes logran entender, contextualizar y notar las referencias que provienen de historias de los cómics, pinceladas de Raimi y arrebatos humorísticos, siempre presentes. El coprotagonismo de Elizabeth Olsen con Cumberbatch nos regala una de las mejores parejas -tanto por historia, por profundidad de los personajes como por capacidades interpretativas- de toda la dinastía marveliana.\r\n\r\nLa Bruja Escarlata por fin disfruta de la potencia que pedía el personaje, tomando el relevo de la miniserie de Disney+ donde logró madurez en su recorrido. La Casa de las Ideas nos presenta una novedad, Xochitl Gomez, que es parte imprescindible de la trama, pero a ratos parece un personaje que pasaba por ahí. Que nadie se asuste: cameos, sorpresas y giros de guion los hay (y muchos).\r\n\r\nEs el camino que debe seguir Marvel. Nutrirse de las historias más potentes de los cómics permite a la trama avanzar en un despliegue de recursos visuales y de efectos especiales como ninguna otra saga taquillera puede conseguir hoy en día. \"Doctor Strange en la Multiverse of Madness\" es pura diversión y una nueva fórmula a tener en cuenta por parte de la multinacional. Porque funciona a la perfección.'),
(5, 453395, 'movie', 'alvaro', '2022-05-24', 5, '2022-05-30', 'Doctor emasculado en el multiverso de la integración', 'Que decir, después de que Disney vaya aleccionando, sobre la concepción social cada vez más arraigada; la inclusión forzada reportada por toda las mass Media occidental. No nos queda más que tragar, al igual que con Star Wars.\n\nQuitando el preámbulo, la película le pongo 5 por no verla en septiembre, las críticas positivas que no son pocas, las he estado revisando ¿en que momento se aplaude este guión, producción? Habéis visto la misma película que yo; espero.\n\nPor partes, la co-protagonista América Chaves/z por si ofendo, la actriz, no ha sido gran cosa, su papel es ínfimo limitada al estereotipo de inclusión, recuerdo cuando la chavala recuerda a sus madres \" Mis madres, mis madras\" Si estás leyendo esto, no hace falta que siga ¿verdad?\n\nEl Doctor Strange, ni se define, ni actúa, tiene momentos de chapó y otros en el que mismísimo Jack en el Titanic le diría que es un soñador, que el amor todo lo puede, por recordar la muchacha America en su cazadora tiene un eslogan tipo \" Love is love\".\n\nEl guion atropellado, mira que el director me gusta bastante, en Spider-Man donde se podía trabajar sin ofender a tu amigo y vecinos de\nSpider-Man, pero muy mal enfocado todo, la presentación de la historia no deja deslindar a los personajes, muy poca presentación de la trama, empieza todo en un sin fin de magias, personas de una étnica que pueden más que otras, procurando saber al espectador que madras, vale más que madres y que un efecto especial para agilizar la tarde del jardín de infancia, vale más que un guion, por recordar Soldado de invierno, que eso es una película de Cómic.\n\nPor recapitular.\nAhórrate el dinero, pero si no te queda otra, día del espectador y agarrate los maches/os que vienen curvas.'),
(6, 86831, 'tv', 'alvaro', '2022-05-24', 8, '2022-05-24', 'Muy buena serie', 'Muy buena serie de animación que te hace pensar en el sentido de la vida y de los humanos de una forma que ninguna otra lo sabe hacer.'),
(7, 634649, 'movie', 'diego', '2022-05-26', 10, '0000-00-00', '', ''),
(8, 86831, 'tv', 'juanma', '2022-05-26', 7, '2022-05-26', 'Nueva cosecha', '‘Love, Death + Robots’ es un removedor de conciencias, el ‘Black Mirror’ animado. Y con “animado” no me refiero solo al arte de dar vida a objetos inanimados sino también al tono humorístico o sarcástico que predomina en la mayoría de los cortometrajes.\n\nPor desgracia, la serie de animación, empieza a padecer el mismo síndrome que ‘Black Mirror’. Un comprensible desgaste temporada tras temporada, historias menos inspiradas y sorpresivas, sumado a las ineludibles expectativas que sigue despertando entre los espectadores y que no juegan a su favor. Porque las expectativas son altas y aunque la animación sigue sin decepcionar las ideas empiezan a escasear.\n\nA pesar de todo, ‘Love, Death + Robots’, mantiene el tipo y sigue recopilando proyectos muy especiales y diversos y por ende, constituye uno de los mayores atractivos de la plataforma de streaming.\n\n(sin spoilers pero con referencias varias)\n\n1. Tres robots: estrategia de escape\nEl planeta Tierra como un museo del fracaso. Una nueva lección sobre cómo reírse de uno mismo que nos invita a reflexionar a través de una sátira sobre el ser humano y su \"talento innato\" para la superviviencia. Se conforma con resultar simpática y algo predecible. “Lo teníamos todo para triunfar y aún así fracasamos”.\n\n2. Mal viaje\nUna reinterpretación más oscura de ‘Piratas del Caribe’ cortesía de Lynch, o como la democracia no siempre es la opción más acertada.\n\n3. El propio pulso de la máquina\nLo que empieza como una misión rutinaria en la Luna termina convirtiéndose en ‘Lucy’, de Luc Besson, en el espacio. También me ha recordado al episodio de los Simpson ‘El misterioso viaje de Homer’.\n\n4. La noche de los minimuertos\nEl más divertido aunque menos original en cuanto a narrativa, no es más que una “pequeña” parodia de ‘La noche de los muertos vivientes’ o cualquier otra película sobre zombies. Destaca por su animación tan peculiar (lo llaman efecto Tilt-Shift), una suerte de Sim City macabro, y un ritmo acelerado en todos los sentidos. Tiene algunas escenas inspiradas, como la del Vaticano y el Polo Sur.\n\n5. Equipo mortal\nUna caricatura de las cientos de películas sobre soldados y sus numerosos tópicos. Un chiste tras otro que termina resultando un divertimento vacuo sin más. Los fans de Stallone y Schwarzenegger (‘Predator’) encontrarán aquí muchas referencias a su filmografía.\n\n6. El enjambre\nEn mi opinión, la historia más rica y compleja. Parece que nos han querido contar algo en poco tiempo y de forma apresurada dejando esta historia incompleta y con alguna elipsis importante. Quizás el formato corto no era el que más le convenía, por eso creo que es la única candidata a una secuela que permita expandir su imaginario.\n\n7. Las ratas de Mason\nUna historia sobre empatía. Un planteamiento que ya hemos visto mil y una veces, acerca de una especie que evoluciona y que a priori representa una amenaza para el ser humano pero con la que finalmente (spoiler) conseguimos empatizar y convivir.\n\n8. Sepultados en salas abovedadas\nOtra historia sobre soldados en apuros que se enfrentan a una amenaza mayor y más alienígena si cabe, pero igual de letal. En esta ocasión no hay espacio para el humor, salvo algún chascarrillo, pero la mecánica es la misma. ‘Prometheus’ se alza como el referente más claro dentro de la saga ‘Alien’.\n\n9. Jíbaro\nPartiendo de una fábula que todos conocemos, aprovecha para hacer alarde de una técnica digital abrumadora y un sonido perfecto e hipnótico. No soy un profesional en este ámbito pero me figuro la dificultad que ha significado. El premio a la animación mas hiperrealista se lo lleva indiscutiblemente este cortometraje.\n\nPero no solo es un placer para los sentidos, incluso se permite el lujo de renovar por completo el mito de las sirenas y su canto mágico. Aporta nuevos matices a un relato más que explotado. Lo enriquece con una estética que alude a la cultura indígena y asiática y extrae una moraleja alternativa a la del mito primigenio de origen griego.\n\nEl corto más redondo y el único a la altura del primer volumen.'),
(10, 526896, 'movie', 'diego', '2022-06-02', 7, '0000-00-00', '', ''),
(11, 526896, 'movie', 'juanma', '2022-06-02', 2, '2022-06-02', 'La peor cinta de Marvel hasta la fecha', 'Morbius es hasta el momento la peor película de Marvel, esto se debe especialmente a la falta de personalidad, no hay ningún rasgo que la diferencia de otras cintas de vampiros malas como un guion detestable, una historia ridícula en ciertos aspectos y que muchas veces quiere tocar temas como la moralidad pero que lo hace de una forma tan plana y simplista que la posible reflexión se siente a medias.\nLas actuaciones son en general muy buenas, especialmente la de Jared Leto quien se mete en la cabeza del personaje de una forma tan profunda que hace que el público pueda sentir todo lo que el personaje está viviendo o sufriendo, Matt Smith se nota que disfruto al máximo este proyecto, su interpretación es dinámica, agresiva y sobre todo divertida, hace que el villano se vuelva más interesante de lo que realmente es.\nLos efectos visuales también funcionan muy bien, especialmente los que tienen que ver con la transformación del vampiro en sí y sus poderes, hay una buena combinación entre efectos prácticos y buen CGI.\nComo tal las características que el vampiro presenta en esta película no están tan bien definidas o expuestas, porque muchas veces ni explican porque ha usado ese poder o como se dio cuenta que lo tenía, además todos son presentados de una forma muy conveniente.\nLa escena poscreditos es sin duda, mejor que toda la película, es fascinante, sobre todo porque presenta en solo un corto lo que nos espera para este spiderverse y universo Marvel.\nEn conclusión, Morbius es esa película que apenas se ve, se olvida inmediatamente porque es aburrida, plana, conveniente y sobre todo sin personalidad.'),
(12, 88396, 'tv', 'diego', '2022-06-06', 9, '0000-00-00', '', ''),
(13, 92782, 'tv', 'juanma', '2022-06-06', 8, '2022-06-06', 'prueba', 'Prueba de crítica a una serie'),
(14, 338953, 'movie', 'diego', '2022-06-13', 4, '0000-00-00', '', ''),
(15, 157336, 'movie', 'diego', '2022-06-08', 10, '2022-06-08', 'Impactante, profunda, compleja, emotiva, frenética...', 'Me quedo sin adjetivos para describir \"Interstellar\" la nueva obra de arte del maestro Christopher Nolan y es que el británico hace del celuloide un lienzo, en el cual retrata no solo una aventura espacial de órdago, visualmente insuperable -a la altura de 2001- sino también una epopeya, una montaña rusa de emociones que te hará pasar unas memorables tres horas sentado en la butaca.\n\nEsto es cine, por películas como esta amo el séptimo arte y a ellas les debo estar escribiéndoos ahora mismo. Podrá gustarte más o menos -jamás ha existido una película que agrade a todo espectador, ni existirá- lo que si es seguro es que cuando salgas de la sala sentirás que has visto algo nuevo, fresco y original, no te quedarás indiferente después de verla, te sorprenderá y te hará soñar con la infinidad del universo.\n\nPrefiero no alargarme demasiado porque la película habla por sí misma. Quiero decir, sin entrar en detalles, que el guión es muy completo: te hará reír, llorar, fascinarte e inquietarte, te mostrará al ser humano en su vasta complejidad emocional, el potencial que tenemos y las metas que -de momento- soñamos en alcanzar . Las actuaciones son excelentes, a nadie se le notó fuera de lugar, todos cumplieron perfectamente con su personaje -mención especial para el veterano y legendario Sir Michael Caine que merece el respeto y admiración de todos-. La dirección de Nolan muestra a uno de los mejores y más prolíficos cineastas -sino el que más- del siglo XXI y la banda sonora es, en una palabra, bella. Por favor, véanla y saquen sus propias conclusiones, mientras yo comparto aquí, en nuestro foro, sincera y honestamente las mías.'),
(16, 238, 'movie', 'diego', '2022-06-08', 10, '2022-06-08', 'El lado turbador y romántico de la \'Cosa Nostra\'', 'El efecto que causa en mi \"El padrino\" es increíble, es la potente sensación de estar degustando auténtico cine desde el primer hasta el último instante... muchos hablan sobre que la secuencia de la boda es larga y algo aburrida, y a mi me parece una presentación de personajes descomunal: Desde Don Vito hasta Johnny son definidos y caracterizados de un modo espectacular, nada chirría, todo tiene su significado, ni un sólo actor desentona, ni un sólo encuadre es desacertado... en definitiva, asistimos a un arranque que te deja suspendido en su historia, en su ambientación y en todos aquellos conflictos presentados de forma absolutamente impecable.\n\nLa elegancia y la sinuosidad con que se mueve todo, hacen que cuando llega el auténtico clímax uno esté expectante, palpitante ante esa calma tensa, fría, abrupta, turbia y gradual que se da cita en esos momentos donde todo llega a extremos inhóspitos, donde la venganza permanece como un instinto secundario con tal de proteger y cobijar todo aquello que es propio, que nos acompaña y nos arropa. Y es que, tras un arranque esplendoroso, su desarrollo aun se retuerce más y te envuelve en un relato en el cual los acontecimientos empujan imprevisiblemente a sus protagonistas y les desbordan, les oprimen, les ponen en la punta del iceberg, en una cuerda tensa y fina que, en cualquier momento, podría romperse, temblorosa, y dejarles inmersos en la más absoluta angustia.\n\nLos intérpretes en \"El padrino\" son anulados, no existen, el personaje se desvanece y deja paso a la persona, a personas que te dejan en el borde del abismo, que marcan tu afán por seguir sus pasos, comprender su inquebrantable honestidad hacía todos aquellos seres a los que aman y aprecian, en definitiva, hacía su propia familia, al lado de la cual han medrado, han aprendido y llegado a ser lo que son, y han pulido sus virtudes y desarrollado sus defectos, virtudes y defectos que se destapan una y otra vez, que aparecen sin reparos, impulsivamente, y que te dejan extasiado y en un estado de cautela sepulcral, que te hace enmudecer y observar en el más absoluto silencio cada gesto, cada mirada, cada movimiento con tal de comprender porqué sucede lo que sucede y cuan intensos pueden llegar a ser los sentimientos de cualquier ser humano.\n\nHablar sobre planos, fotografía, movimientos de cámara, encuadres, vestuario y demás sería quedarse en la más absoluta nada tras seres que te dejan encogido en la butaca y sin parpadear ni un sólo momento. Y eso que la banda sonora se te queda grabada, porque por mucho que Vito, Sonny, Michael, Tom o Kay capten tu atención del todo, genialidades como la de Nino Rota nunca pasarían desapercibidas. Jamás.'),
(17, 675353, 'movie', 'diego', '0000-00-00', 0, '0000-00-00', '', ''),
(18, 639933, 'movie', 'diego', '2022-06-09', 9, '0000-00-00', '', ''),
(19, 639933, 'movie', 'alvaro ', '2022-06-09', 5, '2022-06-09', 'kjlkjklsdjflkjslkfjlksjd', 'lkasdjflkajslkfjlksjflkasjdlkfjslkdfjlksdjflkasdjflk\nasdfklajsdlkfajslkfda'),
(20, 414906, 'movie', 'diego', '0000-00-00', 0, '0000-00-00', '', ''),
(21, 92749, 'tv', 'diego', '2022-06-09', 7, '0000-00-00', '', ''),
(22, 1438, 'tv', 'diego', '2022-06-10', 9, '2022-06-10', 'El mundo marcha', 'Sus iniciales títulos de crédito avisan que vamos a ver imágenes residuales de la propia temporada montadas con ritmo y sin aparentes intenciones. “The Wire” funciona como ese mosaico que se nos muestra sobre un mismo tema: diferentes imágenes amoldadas a una versión distinta en cada temporada de la misma canción compuesta y escrita por Tom Waits.\n\nLa serie de David Simon está simplemente tan bien armada que un breve tirón de un hilo estira y tensa a otros tres, que a su vez mueven a otros cinco y así, sucesivamente, alargando toda una pequeña madeja, que cabía en la palma de una mano, hasta abarcar una ciudad completa. “The Wire” es y funciona como suma de elementos orgánicos en pequeñas secuencias que forman un resonante conjunto. Todo está orquestado mediante innumerables personajes secundarios que forman un conjunto coral demoledor. No se puede valorar como partes de un conjunto, como una simple dosis introducida en nuestro cuerpo en dos o tres episodios porque solamente podemos valorarla en un completo abanico y conjunto. Es toda la cadena de distribución al completo. Pura simbiosis de la serie que genera su trama con breves aleteos que se convierten en feroces huracanes.\n\n“The Wire” es una serie grande, monumental y una de las más completas vistas en pantalla pequeña porque ilustra una ciudad al completo. Desde la burocracia política y policial pasando por la que habita en la ley de las calles, comparadas con un tablero de ajedrez, hasta la que forma parte de la educación, un puerto o la de un periódico.\nLa construcción de la secuencia se realiza por breves ecos. Directos y sencillos. Economía en estado puro. La belleza de su construcción de guión oscila sobre un completo conjunto. En su episodio final se cierran tramas incluso circulares, ciclos vitales e instintos de supervivencia. Es la gracia del encanto artístico, de la clase conciliadora sobre fondos y leyendas, de puestos sobre puestos y de magnificencia como una apisonadora.\n\nGenialidad que nos demuestra que la marcha es sueño en vida y las series de televisión captan una breve porción de un camino de miradas, acciones y momentos. Personajes que intentan luchar frente a un mundo hipócrita y se dan cuenta que la hipocresía es una regla y requisito más del sistema. Tal vez el leitmotiv de la serie sea el precio que hay que pagar por sobrevivir intentando ser fiel a principios. Ese es el de ser expulsado del sistema. En un mundo donde mentir es la ley y su motor la injusticia explotando los principios.\nEl mundo marcha porque tiene que marchar y nada puede detenerlo. Si lo observas mucho desde el exterior seguramente veas la ironía y simpleza de un objeto, que ya es difuso, dando vueltas sobre un eje inamovible. Si estás dentro e intentas ir contra su rotación acabarás mareado y vomitando todo lo que llevas dentro. El mundo marcha, míralo desde la excluyente distancia, déjate llevar o acabarás muerto en tus propias nauseas.'),
(23, 507086, 'movie', 'diego', '2022-06-14', 3, '0000-00-00', '', ''),
(24, 648579, 'movie', 'diego', '2022-06-13', 3, '0000-00-00', '', ''),
(25, 361743, 'movie', 'diego', '2022-06-13', 9, '0000-00-00', '', ''),
(26, 705861, 'movie', 'diego', '2022-06-13', 8, '0000-00-00', '', ''),
(27, 81322, 'tv', 'diego', '2022-06-14', 5, '0000-00-00', '', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `listas`
--

CREATE TABLE `listas` (
  `id_lista` int(11) NOT NULL,
  `titulo` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `imagen` text COLLATE utf8_spanish2_ci NOT NULL,
  `usuario` varchar(40) COLLATE utf8_spanish2_ci NOT NULL,
  `id_pelicula` int(11) NOT NULL,
  `tipo` varchar(10) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `listas`
--

INSERT INTO `listas` (`id_lista`, `titulo`, `imagen`, `usuario`, `id_pelicula`, `tipo`) VALUES
(4, 'Lista Marvel', 'https://www.cinemascomics.com/wp-content/uploads/2020/09/logo-marvel-960x720.jpg.webp', 'diego', 0, ''),
(5, 'Películas que quiero ver en 2022', 'https://siempreenmedio.files.wordpress.com/2021/12/numero-encabezado-2022-calendario-trazos-pincel-pintura-color-abstracto-colorido-feliz-ano-nuevo-2022-colores-fondo_87521-3053.jpg', 'diego', 0, ''),
(11, 'Películas que odio', 'https://images.theconversation.com/files/413519/original/file-20210728-17-deurlx.jpg?ixlib=rb-1.1.0&rect=0%2C17%2C5991%2C3574&q=20&auto=format&w=320&fit=clip&dpr=2&usm=12&cs=strip', 'diego', 0, ''),
(41, 'Lista Marvel', '', 'diego', 453395, 'movie'),
(42, 'Lista Marvel', '', 'diego', 92749, 'tv'),
(43, 'Lista Juanma', 'https://www.zonatattoos.com/img/fotos/juanma-81765_a.jpg', 'juanma', 0, ''),
(44, 'Lista Juanma', '', 'juanma', 675353, 'movie'),
(46, 'Lista Juanma', '', 'juanma', 639933, 'movie'),
(47, 'Lista Juanma', '', 'juanma', 92830, 'tv'),
(48, 'Lista Juanma', '', 'juanma', 92782, 'tv'),
(49, 'Lista Marvel', '', 'diego', 634649, 'movie'),
(51, 'Lista Marvel', '', 'diego', 1726, 'movie'),
(52, 'Lista Marvel', '', 'diego', 10138, 'movie'),
(53, 'Películas que quiero ver en 2022', '', 'diego', 507086, 'movie'),
(54, 'Películas que quiero ver en 2022', '', 'diego', 453395, 'movie'),
(57, 'Cosas que quiero ver en junio 2022', 'https://thumbs.dreamstime.com/z/junio-calendario-hoja-vector-ilustraci%C3%B3n-de-p%C3%A1gina-gr%C3%A1fico-vectorial-217459549.jpg', 'alvaro', 0, ''),
(58, 'Cosas que quiero ver en junio 2022', '', 'alvaro', 545611, 'movie'),
(59, 'Cosas que quiero ver en junio 2022', '', 'alvaro', 507086, 'movie'),
(60, 'Cosas que quiero ver en junio 2022', '', 'alvaro', 639933, 'movie'),
(61, 'Cosas que quiero ver en junio 2022', '', 'alvaro', 95171, 'tv'),
(64, 'Películas que quiero ver en 2022', '', 'diego', 338953, 'movie'),
(65, 'Películas que odio', '', 'diego', 338953, 'movie');

-- --------------------------------------------------------

--
-- Estructura para la vista `cons_acl_usuarios`
--
DROP TABLE IF EXISTS `cons_acl_usuarios`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `cons_acl_usuarios`  AS SELECT `au`.`cod_acl_usuario` AS `cod_acl_usuario`, `au`.`nombre` AS `nombre`, `au`.`apellidos` AS `apellidos`, `au`.`fecha_nacimiento` AS `fecha_nacimiento`, `au`.`nick` AS `nick`, `au`.`contrasenia` AS `contrasenia`, `au`.`cod_acl_role` AS `cod_acl_role`, `ar`.`nombre` AS `nombreRol`, `ar`.`perm1` AS `perm1`, `ar`.`perm2` AS `perm2` FROM (`acl_usuarios` `au` join `acl_roles` `ar`) WHERE `au`.`cod_acl_role` = `ar`.`cod_acl_role`;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `acl_roles`
--
ALTER TABLE `acl_roles`
  ADD PRIMARY KEY (`cod_acl_role`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `acl_usuarios`
--
ALTER TABLE `acl_usuarios`
  ADD PRIMARY KEY (`cod_acl_usuario`),
  ADD UNIQUE KEY `nick` (`nick`),
  ADD KEY `fk_usuarios_roles` (`cod_acl_role`);

--
-- Indices de la tabla `criticas`
--
ALTER TABLE `criticas`
  ADD PRIMARY KEY (`id_critica`),
  ADD KEY `fk_usuario` (`usuario`);

--
-- Indices de la tabla `listas`
--
ALTER TABLE `listas`
  ADD PRIMARY KEY (`id_lista`),
  ADD KEY `fk_usuario_2` (`usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `acl_roles`
--
ALTER TABLE `acl_roles`
  MODIFY `cod_acl_role` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `acl_usuarios`
--
ALTER TABLE `acl_usuarios`
  MODIFY `cod_acl_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `criticas`
--
ALTER TABLE `criticas`
  MODIFY `id_critica` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `listas`
--
ALTER TABLE `listas`
  MODIFY `id_lista` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `acl_usuarios`
--
ALTER TABLE `acl_usuarios`
  ADD CONSTRAINT `fk_usuarios_roles` FOREIGN KEY (`cod_acl_role`) REFERENCES `acl_roles` (`cod_acl_role`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `criticas`
--
ALTER TABLE `criticas`
  ADD CONSTRAINT `fk_usuario` FOREIGN KEY (`usuario`) REFERENCES `acl_usuarios` (`nick`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `listas`
--
ALTER TABLE `listas`
  ADD CONSTRAINT `fk_usuario_2` FOREIGN KEY (`usuario`) REFERENCES `acl_usuarios` (`nick`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
