-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 20, 2020 at 03:14 PM
-- Server version: 5.7.30-0ubuntu0.18.04.1
-- PHP Version: 7.2.24-0ubuntu0.18.04.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `voucher_manager`
--

-- --------------------------------------------------------

--
-- Table structure for table `vouchers`
--

CREATE TABLE `vouchers` (
  `id` bigint(20) NOT NULL,
  `email` varchar(191) NOT NULL,
  `code` varchar(15) NOT NULL,
  `pin` varchar(191) NOT NULL,
  `amount` decimal(10,2) NOT NULL DEFAULT '0.00',
  `status` enum('active','expired') NOT NULL DEFAULT 'active',
  `counter` int(10) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `vouchers`
--

INSERT INTO `vouchers` (`id`, `email`, `code`, `pin`, `amount`, `status`, `counter`, `created_at`) VALUES
(1, 'umarkhan.shakeel@gmail.com', 'VCDLewM8FN7Ds', 'CvbRc', '1000.00', 'active', 4, '2020-05-19 16:15:41'),
(3, 'shakir@marmeto.com', 'VCDEURgPI7Yb3', 'ab88512a6d3b702a781c212cc49ccc00', '1000.00', 'active', 1, '2020-05-20 09:32:36');

-- --------------------------------------------------------

--
-- Table structure for table `voucher_transactions`
--

CREATE TABLE `voucher_transactions` (
  `id` bigint(20) NOT NULL,
  `voucher_id` bigint(20) NOT NULL,
  `redemption_amount` decimal(10,2) NOT NULL DEFAULT '0.00',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `voucher_transactions`
--

INSERT INTO `voucher_transactions` (`id`, `voucher_id`, `redemption_amount`, `created_at`) VALUES
(1, 1, '100.00', '2020-05-19 18:41:41'),
(2, 1, '400.00', '2020-05-19 18:56:06'),
(3, 1, '500.00', '2020-05-19 18:39:04'),
(4, 1, '100.00', '2020-05-19 18:49:04'),
(5, 1, '0.00', '2020-05-19 18:37:14'),
(6, 3, '100.00', '2020-05-20 09:38:34');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `vouchers`
--
ALTER TABLE `vouchers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `voucher_transactions`
--
ALTER TABLE `voucher_transactions`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `vouchers`
--
ALTER TABLE `vouchers`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `voucher_transactions`
--
ALTER TABLE `voucher_transactions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
