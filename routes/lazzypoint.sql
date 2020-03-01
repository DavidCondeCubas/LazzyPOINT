-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-03-2020 a las 11:23:42
-- Versión del servidor: 10.3.16-MariaDB
-- Versión de PHP: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `lazzypoint`
--
CREATE DATABASE IF NOT EXISTS `lazzypoint` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `lazzypoint`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `photos`
--

DROP TABLE IF EXISTS `photos`;
CREATE TABLE `photos` (
  `ID` int(11) NOT NULL,
  `NAME` varchar(150) NOT NULL,
  `FORMAT` varchar(20) NOT NULL,
  `DATE_CREATION` date NOT NULL,
  `ID_USER` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `presentations`
--

DROP TABLE IF EXISTS `presentations`;
CREATE TABLE `presentations` (
  `ID` int(11) NOT NULL,
  `ID_AUTHOR` int(11) NOT NULL,
  `NAME` varchar(100) NOT NULL,
  `DATE_CREATION` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `ID_ROL` int(11) NOT NULL,
  `NAME` varchar(50) NOT NULL,
  `DESCRIPTION` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `scores_pics`
--

DROP TABLE IF EXISTS `scores_pics`;
CREATE TABLE `scores_pics` (
  `ID_USER` int(11) NOT NULL,
  `ID_PHOTO` int(11) NOT NULL,
  `DATE_LIKE` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `scores_presentations`
--

DROP TABLE IF EXISTS `scores_presentations`;
CREATE TABLE `scores_presentations` (
  `ID_USER` int(11) NOT NULL,
  `ID_PRESENTATION` int(11) NOT NULL,
  `DATE_LIKE` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

DROP TABLE IF EXISTS `sessions`;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `ID` int(11) NOT NULL,
  `NICK` varchar(50) NOT NULL,
  `EMAIL` varchar(150) NOT NULL,
  `PASSWORD` varchar(100) NOT NULL,
  `STATE` int(1) NOT NULL,
  `ID_ROL` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `photos`
--
ALTER TABLE `photos`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `NAME` (`NAME`),
  ADD KEY `ID_USER` (`ID_USER`);

--
-- Indices de la tabla `presentations`
--
ALTER TABLE `presentations`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FK_ID_USER` (`ID_AUTHOR`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`ID_ROL`);

--
-- Indices de la tabla `scores_pics`
--
ALTER TABLE `scores_pics`
  ADD UNIQUE KEY `ID_USER` (`ID_USER`,`ID_PHOTO`),
  ADD KEY `ID_PHOTO` (`ID_PHOTO`);

--
-- Indices de la tabla `scores_presentations`
--
ALTER TABLE `scores_presentations`
  ADD UNIQUE KEY `ID_USER` (`ID_USER`,`ID_PRESENTATION`),
  ADD KEY `ID_PRESENTATION` (`ID_PRESENTATION`);

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `UNIQUE_EMAIL` (`EMAIL`),
  ADD KEY `FK_ID_ROL` (`ID_ROL`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `photos`
--
ALTER TABLE `photos`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `presentations`
--
ALTER TABLE `presentations`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `ID_ROL` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `photos`
--
ALTER TABLE `photos`
  ADD CONSTRAINT `photos_ibfk_1` FOREIGN KEY (`ID_USER`) REFERENCES `users` (`ID`);

--
-- Filtros para la tabla `presentations`
--
ALTER TABLE `presentations`
  ADD CONSTRAINT `FK_ID_USER` FOREIGN KEY (`ID_AUTHOR`) REFERENCES `users` (`ID`);

--
-- Filtros para la tabla `scores_pics`
--
ALTER TABLE `scores_pics`
  ADD CONSTRAINT `scores_pics_ibfk_1` FOREIGN KEY (`ID_PHOTO`) REFERENCES `photos` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `scores_pics_ibfk_2` FOREIGN KEY (`ID_USER`) REFERENCES `users` (`ID`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `scores_presentations`
--
ALTER TABLE `scores_presentations`
  ADD CONSTRAINT `scores_presentations_ibfk_1` FOREIGN KEY (`ID_PRESENTATION`) REFERENCES `presentations` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `scores_presentations_ibfk_2` FOREIGN KEY (`ID_USER`) REFERENCES `users` (`ID`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `FK_ID_ROL` FOREIGN KEY (`ID_ROL`) REFERENCES `roles` (`ID_ROL`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
