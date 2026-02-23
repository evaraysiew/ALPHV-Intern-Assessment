-- ALPHV Internship Assignment Database Export
-- Target: MySQL/PostgreSQL [cite: 40]

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Database: `alphv_assessment`
--
CREATE DATABASE IF NOT EXISTS `alphv_assessment`;
USE `alphv_assessment`;

-- --------------------------------------------------------

--
-- Table structure for table `shapes_data` [cite: 25]
--

CREATE TABLE IF NOT EXISTS `shapes_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `shape` varchar(255) NOT NULL,
  `color` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `shapes_data` (Optional initial data) [cite: 25]
--

INSERT INTO `shapes_data` (`name`, `shape`, `color`, `created_at`) VALUES
('Albert', 'Circle', '#ff0000', '2022-03-26 05:36:15'),
('Edison', 'Square', '#00ff00', '2023-07-12 08:55:41');

COMMIT;