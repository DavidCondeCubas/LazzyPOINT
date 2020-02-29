-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-12-2017 a las 13:27:29
-- Versión del servidor: 10.1.28-MariaDB
-- Versión de PHP: 7.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `facebluf`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `amigos`
--

CREATE TABLE `amigos` (
  `user1` varchar(250) NOT NULL,
  `user2` varchar(250) NOT NULL,
  `estado` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `amigos`
--

INSERT INTO `amigos` (`user1`, `user2`, `estado`) VALUES
('david@ucm.es', 'user', 'SI'),
('juanPerez@gmail.com', 'pruebaget', 'SI'),
('juanPerez@gmail.com', 'user', 'SI'),
('pruebaFoto', 'user', 'SI'),
('pruebaget', 'juanPerez@gmail.com', 'SI'),
('pruebaget', 'pruebaFoto', 'NO'),
('pruebaget', 'user', 'SI'),
('user', 'david@ucm.es', 'SI'),
('user', 'juanPerez@gmail.com', 'SI'),
('user', 'pruebaFoto', 'SI'),
('user', 'pruebaget', 'SI');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fotosusuarios`
--

CREATE TABLE `fotosusuarios` (
  `descripcion` varchar(250) NOT NULL,
  `email` varchar(100) NOT NULL,
  `fotoUsuarios` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `fotosusuarios`
--

INSERT INTO `fotosusuarios` (`descripcion`, `email`, `fotoUsuarios`) VALUES
('foto1', 'user', 'f387dd1cd9e1adf2c7fb315666a8b8bc'),
('foto2', 'user', '31d1336d84245714a27f6f61a8a303e9'),
('foto3', 'user', 'a17b603812d2fb88a1bb12d96c886278'),
('foto4', 'user', 'b8890d2ffe580fc1cd8f0b79cb730d35'),
('foto5', 'user', 'e1e6fe4abd7b4fd6ad6c047adcd75bcf'),
('otraFoto', 'user', '33ba7c934a4ff954433b16492cd5e9c0'),
('prueba222', 'pruebaget', 'fd788ab1d976dab5c296689341de6082'),
('fotoux', 'user', 'd6d3ce384b91c250587b8abd5af6817b'),
('animal buho', 'david@ucm.es', 'c1c4801c3b50632f1ba76ce783526e13');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `preguntas`
--

CREATE TABLE `preguntas` (
  `askEmail` varchar(100) NOT NULL,
  `id` int(100) NOT NULL,
  `pregunta` varchar(250) NOT NULL,
  `respuestas` varchar(250) NOT NULL,
  `respuestaCorrecta` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `puntos`
--

CREATE TABLE `puntos` (
  `email` varchar(100) NOT NULL,
  `puntos` int(100) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('8YlHJJEpqahWweXa6AeGlT4OXYNJVdQk', 1513600004, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"usuario\":{\"email\":\"USER\",\"nombCompl\":\"elefante\",\"sexo\":\"hombre\",\"fecha\":\"2017-11-22T23:00:00.000Z\",\"foto\":\"955fc5cd63d1e8786e3d99437a68c69d\",\"puntos\":12},\"datosBD\":[{\"email\":\"user\",\"password\":\"user\",\"nombreCompleto\":\"elefante\",\"sexo\":\"hombre\",\"fechaNacimiento\":\"2017-11-22T23:00:00.000Z\",\"foto\":\"955fc5cd63d1e8786e3d99437a68c69d\",\"puntos\":12,\"descripcion\":\"foto1\",\"fotoUsuarios\":\"f387dd1cd9e1adf2c7fb315666a8b8bc\"},{\"email\":\"user\",\"password\":\"user\",\"nombreCompleto\":\"elefante\",\"sexo\":\"hombre\",\"fechaNacimiento\":\"2017-11-22T23:00:00.000Z\",\"foto\":\"955fc5cd63d1e8786e3d99437a68c69d\",\"puntos\":12,\"descripcion\":\"foto2\",\"fotoUsuarios\":\"31d1336d84245714a27f6f61a8a303e9\"},{\"email\":\"user\",\"password\":\"user\",\"nombreCompleto\":\"elefante\",\"sexo\":\"hombre\",\"fechaNacimiento\":\"2017-11-22T23:00:00.000Z\",\"foto\":\"955fc5cd63d1e8786e3d99437a68c69d\",\"puntos\":12,\"descripcion\":\"foto3\",\"fotoUsuarios\":\"a17b603812d2fb88a1bb12d96c886278\"},{\"email\":\"user\",\"password\":\"user\",\"nombreCompleto\":\"elefante\",\"sexo\":\"hombre\",\"fechaNacimiento\":\"2017-11-22T23:00:00.000Z\",\"foto\":\"955fc5cd63d1e8786e3d99437a68c69d\",\"puntos\":12,\"descripcion\":\"foto4\",\"fotoUsuarios\":\"b8890d2ffe580fc1cd8f0b79cb730d35\"},{\"email\":\"user\",\"password\":\"user\",\"nombreCompleto\":\"elefante\",\"sexo\":\"hombre\",\"fechaNacimiento\":\"2017-11-22T23:00:00.000Z\",\"foto\":\"955fc5cd63d1e8786e3d99437a68c69d\",\"puntos\":12,\"descripcion\":\"foto5\",\"fotoUsuarios\":\"e1e6fe4abd7b4fd6ad6c047adcd75bcf\"},{\"email\":\"user\",\"password\":\"user\",\"nombreCompleto\":\"elefante\",\"sexo\":\"hombre\",\"fechaNacimiento\":\"2017-11-22T23:00:00.000Z\",\"foto\":\"955fc5cd63d1e8786e3d99437a68c69d\",\"puntos\":12,\"descripcion\":\"otraFoto\",\"fotoUsuarios\":\"33ba7c934a4ff954433b16492cd5e9c0\"},{\"email\":\"user\",\"password\":\"user\",\"nombreCompleto\":\"elefante\",\"sexo\":\"hombre\",\"fechaNacimiento\":\"2017-11-22T23:00:00.000Z\",\"foto\":\"955fc5cd63d1e8786e3d99437a68c69d\",\"puntos\":12,\"descripcion\":\"fotoux\",\"fotoUsuarios\":\"d6d3ce384b91c250587b8abd5af6817b\"}]}'),
('EeXG9d6_RKcQctw8PgsHAaxPWkEghsnZ', 1513542921, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"usuario\":{\"email\":\"user\",\"nombCompl\":\"La \\\"Mayumi\\\" \",\"sexo\":\"mujer\",\"fecha\":\"2017-11-24T23:00:00.000Z\",\"foto\":\"44c263d6a5e2e09d4daa6fffc40b2baf\",\"puntos\":12}}'),
('HBaKt4ikPrdocqwPmRyWIClzFOplqc4I', 1513480326, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"usuario\":{\"email\":\"pruebaget\",\"nombCompl\":\"nombre get\",\"sexo\":\"mujer\",\"fecha\":\"0000-00-00\",\"foto\":\"54116424d63fb22dca767d78b85d3537\",\"puntos\":0}}');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `nombreCompleto` varchar(250) NOT NULL,
  `sexo` varchar(20) NOT NULL,
  `fechaNacimiento` date NOT NULL,
  `foto` varchar(100) DEFAULT NULL,
  `puntos` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='usuarios' ROW_FORMAT=COMPACT;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`email`, `password`, `nombreCompleto`, `sexo`, `fechaNacimiento`, `foto`, `puntos`) VALUES
('1', '', '', '', '0000-00-00', '', 0),
('213123213', '213', '123', 'otro', '1991-02-12', NULL, 0),
('22222', '222', '2222', 'mujer', '0000-00-00', NULL, 0),
('234', '234', '234', 'hombre', '0000-00-00', NULL, 0),
('312', '123', '213', 'hombre', '0000-00-00', NULL, 0),
('324234111', '234', '243', 'hombre', '0000-00-00', NULL, 0),
('324234324', '234', '234324', 'hombre', '0000-00-00', NULL, 0),
('david@ucm.es', 'david', 'David Conde', 'hombre', '1991-02-25', '0c64f31cc6932019bbb62eacbed95083', 0),
('dsf', 'sdfsd', 'dsfsdf', 'hombre', '0000-00-00', '0cff4729c46b3613a84a72e7cf58fb18', 0),
('dsfsdf', 'ds', 'dsf', 'mujer', '0000-00-00', 'C:UsersycondDesktopPractica 1srcuploads\070d491593b1cc3dba0ff8fd930c351c', 0),
('juanPerez@gmail.com', 'juan', 'Juan Perez Valdivia', 'hombre', '0000-00-00', 'de352242628cdb69a724849ee4e02048', 0),
('nuevoGG', 'sdf', 'sdf', 'hombre', '0000-00-00', 'b1fd98fa5742afb0c416fe4517567a8c', 0),
('nuevoGGsd', 'sdf', 'sdf', 'hombre', '0000-00-00', '090f0ebbfbc51e36d35b2dabf4981997', 0),
('probandoFecha', 'xdfs', 'fecha probada', 'hombre', '1991-02-25', '160d8a4f98554a59862e88fab65aeaf7', 0),
('prueba', '', '', '', '0000-00-00', '', 0),
('prueba1', 'pass', 'undefined', 'mujer', '0000-00-00', '', 0),
('prueba222', 'user', 'nombre completo prueba1', 'hombre', '0000-00-00', '690e9bfa1bf52a19af9e92d9dcb72b91', 0),
('pruebaFoto', 'foto', 'foto foto', 'mujer', '0000-00-00', '6789ab496a1074ff03f6c15d0b294a53', 0),
('pruebaget', 'getget', 'nombre get', 'mujer', '0000-00-00', '54116424d63fb22dca767d78b85d3537', 0),
('pruebaSinFoto@hotmail.com', 'pruebaSinFoto', 'prueba sin Foto nombre', 'mujer', '0000-00-00', NULL, 0),
('pruebavalidad', 'dfds', 'fafdsf', 'hombre', '0000-00-00', 'b8febc2e1d7e30fda8e169004ef0b41b', 0),
('ruteado', 'ruteado', 'root ado', 'hombre', '0000-00-00', NULL, 0),
('sdfsd', 'dsf', 'sdf', 'hombre', '0000-00-00', NULL, 0),
('sergio@ucm.es', 'sergio', 'sergio arroyo galan', 'hombre', '0000-00-00', '7a182aae5fd92ab2abebfe7b2142bcab', 0),
('ttt', 'tt', 'tt', 'hombre', '0000-00-00', NULL, 0),
('user', 'user', 'elefante', 'hombre', '2017-11-23', '955fc5cd63d1e8786e3d99437a68c69d', 12),
('user2', 'user2', 'undefined', 'hombre', '0000-00-00', NULL, 0),
('user3', 'user3', 'undefined', 'mujer', '0000-00-00', NULL, 0),
('user4', 'user4', 'undefined', 'hombre', '0000-00-00', NULL, 0),
('usuarioNuevo', 'usuarioNuevo', 'usuario Nuevo espacio', 'mujer', '0000-00-00', NULL, 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `amigos`
--
ALTER TABLE `amigos`
  ADD PRIMARY KEY (`user1`,`user2`),
  ADD KEY `user2` (`user2`);

--
-- Indices de la tabla `fotosusuarios`
--
ALTER TABLE `fotosusuarios`
  ADD KEY `email` (`email`);

--
-- Indices de la tabla `preguntas`
--
ALTER TABLE `preguntas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `email` (`askEmail`);

--
-- Indices de la tabla `puntos`
--
ALTER TABLE `puntos`
  ADD PRIMARY KEY (`email`);

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `preguntas`
--
ALTER TABLE `preguntas`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `amigos`
--
ALTER TABLE `amigos`
  ADD CONSTRAINT `amigos_ibfk_1` FOREIGN KEY (`user1`) REFERENCES `users` (`email`),
  ADD CONSTRAINT `amigos_ibfk_2` FOREIGN KEY (`user2`) REFERENCES `users` (`email`);

--
-- Filtros para la tabla `fotosusuarios`
--
ALTER TABLE `fotosusuarios`
  ADD CONSTRAINT `fotosusuarios_ibfk_1` FOREIGN KEY (`email`) REFERENCES `users` (`email`);

--
-- Filtros para la tabla `preguntas`
--
ALTER TABLE `preguntas`
  ADD CONSTRAINT `preguntas_ibfk_1` FOREIGN KEY (`askEmail`) REFERENCES `users` (`email`);

--
-- Filtros para la tabla `puntos`
--
ALTER TABLE `puntos`
  ADD CONSTRAINT `puntos_ibfk_1` FOREIGN KEY (`email`) REFERENCES `users` (`email`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
