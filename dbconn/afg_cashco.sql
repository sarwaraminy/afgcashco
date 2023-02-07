-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Feb 07, 2023 at 10:58 AM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `afg_cashco`
--

-- --------------------------------------------------------

--
-- Table structure for table `afgpbrands`
--

CREATE TABLE IF NOT EXISTS `afgpbrands` (
  `BRAND_ID` int(1) NOT NULL,
  `BRAND_NAME` varchar(255) COLLATE latin1_bin NOT NULL,
  PRIMARY KEY (`BRAND_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

-- --------------------------------------------------------

--
-- Table structure for table `afgpcategories`
--

CREATE TABLE IF NOT EXISTS `afgpcategories` (
  `CATEGORY_ID` int(1) NOT NULL,
  `CATEGORY_NAME` varchar(255) COLLATE latin1_bin NOT NULL,
  PRIMARY KEY (`CATEGORY_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

-- --------------------------------------------------------

--
-- Table structure for table `afgproducts`
--

CREATE TABLE IF NOT EXISTS `afgproducts` (
  `product_id` int(1) NOT NULL DEFAULT '0',
  `product_name` varchar(255) COLLATE latin1_bin NOT NULL,
  `brand_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `model_year` smallint(6) NOT NULL,
  `list_price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`product_id`),
  KEY `category_id` (`category_id`),
  KEY `brand_id` (`brand_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

-- --------------------------------------------------------

--
-- Table structure for table `afgpstocks`
--

CREATE TABLE IF NOT EXISTS `afgpstocks` (
  `store_id` int(11) NOT NULL DEFAULT '0',
  `product_id` int(11) NOT NULL DEFAULT '0',
  `quantity` int(11) DEFAULT NULL,
  PRIMARY KEY (`store_id`,`product_id`),
  KEY `product_id` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

-- --------------------------------------------------------

--
-- Table structure for table `afgscustomers`
--

CREATE TABLE IF NOT EXISTS `afgscustomers` (
  `customer_id` int(1) NOT NULL,
  `first_name` varchar(255) COLLATE latin1_bin NOT NULL,
  `last_name` varchar(255) COLLATE latin1_bin NOT NULL,
  `phone` varchar(25) COLLATE latin1_bin DEFAULT NULL,
  `email` varchar(255) COLLATE latin1_bin NOT NULL,
  `street` varchar(255) COLLATE latin1_bin DEFAULT NULL,
  `city` varchar(50) COLLATE latin1_bin DEFAULT NULL,
  `state` varchar(25) COLLATE latin1_bin DEFAULT NULL,
  `zip_code` varchar(5) COLLATE latin1_bin DEFAULT NULL,
  PRIMARY KEY (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

-- --------------------------------------------------------

--
-- Table structure for table `afgsorders`
--

CREATE TABLE IF NOT EXISTS `afgsorders` (
  `order_id` int(1) NOT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `order_status` tinyint(4) NOT NULL,
  `order_date` date NOT NULL,
  `required_date` date NOT NULL,
  `shipped_date` date DEFAULT NULL,
  `store_id` int(11) NOT NULL,
  `staff_id` int(11) NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `customer_id` (`customer_id`),
  KEY `store_id` (`store_id`),
  KEY `staff_id` (`staff_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

-- --------------------------------------------------------

--
-- Table structure for table `afgsorder_items`
--

CREATE TABLE IF NOT EXISTS `afgsorder_items` (
  `order_id` int(11) NOT NULL DEFAULT '0',
  `item_id` int(11) NOT NULL DEFAULT '0',
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `list_price` decimal(10,2) NOT NULL,
  `discount` decimal(4,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`order_id`,`item_id`),
  KEY `product_id` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

-- --------------------------------------------------------

--
-- Table structure for table `afgsstaffs`
--

CREATE TABLE IF NOT EXISTS `afgsstaffs` (
  `staff_id` int(1) NOT NULL,
  `first_name` varchar(50) COLLATE latin1_bin NOT NULL,
  `last_name` varchar(50) COLLATE latin1_bin NOT NULL,
  `email` varchar(255) COLLATE latin1_bin NOT NULL,
  `phone` varchar(25) COLLATE latin1_bin DEFAULT NULL,
  `active` tinyint(4) NOT NULL,
  `store_id` int(11) NOT NULL,
  `manager_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`staff_id`),
  UNIQUE KEY `email` (`email`),
  KEY `store_id` (`store_id`),
  KEY `manager_id` (`manager_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

-- --------------------------------------------------------

--
-- Table structure for table `afgsstores`
--

CREATE TABLE IF NOT EXISTS `afgsstores` (
  `store_id` int(1) NOT NULL,
  `store_name` varchar(255) COLLATE latin1_bin NOT NULL,
  `phone` varchar(25) COLLATE latin1_bin DEFAULT NULL,
  `email` varchar(255) COLLATE latin1_bin DEFAULT NULL,
  `street` varchar(255) COLLATE latin1_bin DEFAULT NULL,
  `city` varchar(255) COLLATE latin1_bin DEFAULT NULL,
  `state` varchar(10) COLLATE latin1_bin DEFAULT NULL,
  `zip_code` varchar(5) COLLATE latin1_bin DEFAULT NULL,
  PRIMARY KEY (`store_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

-- --------------------------------------------------------

--
-- Table structure for table `afguser`
--

CREATE TABLE IF NOT EXISTS `afguser` (
  `USER_ID` varchar(30) COLLATE latin1_bin NOT NULL,
  `USER_PASS` varchar(30) COLLATE latin1_bin NOT NULL,
  `FIRST_NAME` varchar(30) COLLATE latin1_bin NOT NULL,
  `LAST_NAME` varchar(30) COLLATE latin1_bin NOT NULL,
  `BTYPE` varchar(80) COLLATE latin1_bin NOT NULL,
  `NUM_LOCATION` varchar(20) COLLATE latin1_bin NOT NULL,
  `ESTIMATED_A_TURNOVER` varchar(20) COLLATE latin1_bin NOT NULL,
  `COUNTRY` varchar(30) COLLATE latin1_bin NOT NULL,
  `TRADING_CURRENCY` varchar(10) COLLATE latin1_bin NOT NULL,
  PRIMARY KEY (`USER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

--
-- Dumping data for table `afguser`
--

INSERT INTO `afguser` (`USER_ID`, `USER_PASS`, `FIRST_NAME`, `LAST_NAME`, `BTYPE`, `NUM_LOCATION`, `ESTIMATED_A_TURNOVER`, `COUNTRY`, `TRADING_CURRENCY`) VALUES
('admin@gmail.com', '123456', 'admin', 'admin', 'Adult', '1', '1', 'Afghanistan', 'AFN');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `afgproducts`
--
ALTER TABLE `afgproducts`
  ADD CONSTRAINT `afgproducts_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `afgpcategories` (`CATEGORY_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `afgproducts_ibfk_2` FOREIGN KEY (`brand_id`) REFERENCES `afgpbrands` (`BRAND_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `afgpstocks`
--
ALTER TABLE `afgpstocks`
  ADD CONSTRAINT `afgpstocks_ibfk_1` FOREIGN KEY (`store_id`) REFERENCES `afgsstores` (`store_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `afgpstocks_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `afgproducts` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `afgsorders`
--
ALTER TABLE `afgsorders`
  ADD CONSTRAINT `afgsorders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `afgscustomers` (`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `afgsorders_ibfk_2` FOREIGN KEY (`store_id`) REFERENCES `afgsstores` (`store_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `afgsorders_ibfk_3` FOREIGN KEY (`staff_id`) REFERENCES `afgsstaffs` (`staff_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `afgsorder_items`
--
ALTER TABLE `afgsorder_items`
  ADD CONSTRAINT `afgsorder_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `afgsorders` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `afgsorder_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `afgproducts` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `afgsstaffs`
--
ALTER TABLE `afgsstaffs`
  ADD CONSTRAINT `afgsstaffs_ibfk_1` FOREIGN KEY (`store_id`) REFERENCES `afgsstores` (`store_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `afgsstaffs_ibfk_2` FOREIGN KEY (`manager_id`) REFERENCES `afgsstaffs` (`staff_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
