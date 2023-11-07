-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 07, 2023 at 03:03 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `official-quick-ink-reserve`
--

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

CREATE TABLE `address` (
  `addressID` int(11) NOT NULL,
  `street` varchar(50) NOT NULL,
  `barangay` varchar(50) NOT NULL,
  `city` varchar(50) NOT NULL,
  `postalCode` varchar(5) NOT NULL,
  `userID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `billing`
--

CREATE TABLE `billing` (
  `billingID` int(11) NOT NULL,
  `billingMethod` varchar(50) NOT NULL,
  `paidStatus` tinyint(4) NOT NULL DEFAULT 0,
  `cvv` smallint(6) NOT NULL,
  `orderID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cartdetails`
--

CREATE TABLE `cartdetails` (
  `cartDetails` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `userID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cartservices`
--

CREATE TABLE `cartservices` (
  `cartServicesID` int(11) NOT NULL,
  `cartServicesTotal` decimal(5,2) NOT NULL,
  `submissionID` int(11) NOT NULL,
  `cartDetailsID` int(11) NOT NULL,
  `specServiceID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `genservices`
--

CREATE TABLE `genservices` (
  `genServicesID` int(11) NOT NULL,
  `genServiceName` varchar(50) NOT NULL,
  `genServiceDesc` text NOT NULL,
  `genServiceImageUrl` varchar(255) NOT NULL,
  `featured` enum('true','false') NOT NULL DEFAULT 'false',
  `needsSubmission` enum('true','false') NOT NULL DEFAULT 'true'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `genservices`
--

INSERT INTO `genservices` (`genServicesID`, `genServiceName`, `genServiceDesc`, `genServiceImageUrl`, `featured`, `needsSubmission`) VALUES
(1, 'Poster Printing', 'Poster printing is a process of reproducing digital or physical images on a larger scale for display. It typically involves using high-quality printers and various paper or material options. Posters are commonly used for advertising, promotions, events, and artistic purposes. The printing can be done in various sizes, from small to extra-large, to meet specific needs. Posters often feature eye-catching graphics, text, and designs to convey a message or grab attention.', 'uploads\\1699016332368@poster.jpg', 'true', 'true'),
(4, 'Tarpaulin Printing', 'Tarpaulin printing produces durable, large-format banners suitable for outdoor advertising. These printed tarpaulins are weather-resistant and perfect for promoting events, businesses, and products. Customization options include size, design, and material to meet specific advertising requirements.', 'uploads\\1699174741217@tarp.jpg', 'true', 'true'),
(5, 'ID Printing', 'ID printing offers personalized, secure identification cards for various purposes like access control, employee badges, and student IDs. It provides a professional and efficient way to enhance security and identification within organizations and institutions.', 'uploads\\1699175054776@id print.jpg', 'false', 'true'),
(7, 'Invitation Printing', 'Invitation printing is the process of producing custom-designed and professionally printed invitations for various events and occasions. It allows individuals and businesses to create visually appealing and personalized invitations that set the tone for weddings, parties, and special gatherings.', 'uploads\\1699278514719@invitation.webp', 'true', 'true'),
(8, 'Calling Cards', 'Calling cards, also known as business cards, are small, informative cards that individuals or professionals use to share their contact details and make a memorable first impression. These cards often include the person\'s name, job title, company, and contact information, making networking and communication more efficient.', 'uploads\\1699278607123@calling_c.png', 'false', 'true'),
(9, 'Offset Printing', 'Offset printing is a widely-used printing technique that produces high-quality and consistent prints. It involves transferring ink from a plate to a rubber blanket and then to the printing surface. Offset printing is suitable for large print runs and provides vibrant, sharp, and detailed results.', 'uploads\\1699278693280@offset.webp', 'true', 'true'),
(10, 'UV Coating', 'UV coating is a protective finish applied to printed materials, such as brochures, posters, and packaging, to enhance their appearance and durability. This process involves curing the coating with ultraviolet (UV) light, creating a glossy and attractive finish while safeguarding the printed content from wear and tear.', 'uploads\\1699278770438@uv coating.jpg', 'false', 'true'),
(11, 'Box Making', 'Box making is the manufacturing process of creating customized packaging containers for various products. These boxes come in different shapes and sizes and are essential for branding, protecting items during transit, and enhancing the overall presentation of products.', 'uploads\\1699278925839@box making.webp', 'true', 'true'),
(12, 'Sticker Printing', 'Sticker printing is the production of adhesive labels and decals, often used for branding, product labeling, or decorative purposes. These stickers can be customized with unique designs, colors, and sizes, making them versatile tools for both businesses and personal use.', 'uploads\\1699279035494@sticker.jpg', 'false', 'true'),
(14, 'Xintra Board Printing', 'Xintra board printing involves creating prints on rigid, lightweight PVC foam board sheets known as Xintra boards. These boards are commonly used for indoor and outdoor signage, displays, and point-of-purchase advertising due to their durability and excellent print quality.', 'uploads\\1699337992828@xintra.webp', 'false', 'true'),
(16, 'Flyer Printing', 'Flyer printing is an affordable marketing tool for promoting businesses, events, or products. It allows you to create eye-catching designs and distribute them strategically to reach a wide audience. With customizable options for paper quality, size, colors, and finishes, flyer printing helps you convey your message effectively. It\'s a cost-effective way to generate interest and drive engagement for your business or event.', 'uploads\\1699338383615@flyer.jpg', 'false', 'true'),
(17, 'Brochure Printing', 'Brochure printing involves creating compact, informative booklets to promote businesses or products. They are versatile marketing tools, offering a concise way to share key details and images with your audience. Customizable in design and paper quality, brochures are an affordable and effective marketing solution.', 'uploads\\1699353413723@brochure.jpg', 'false', 'true');

-- --------------------------------------------------------

--
-- Table structure for table `materials`
--

CREATE TABLE `materials` (
  `matID` int(11) NOT NULL,
  `matName` varchar(100) NOT NULL,
  `matSize` varchar(50) NOT NULL,
  `matCount` int(11) NOT NULL,
  `matQty` int(11) NOT NULL,
  `matUnit` varchar(20) NOT NULL,
  `matImageUrl` varchar(255) NOT NULL,
  `color` varchar(50) NOT NULL,
  `description` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `materials`
--

INSERT INTO `materials` (`matID`, `matName`, `matSize`, `matCount`, `matQty`, `matUnit`, `matImageUrl`, `color`, `description`, `createdAt`, `updatedAt`) VALUES
(4, 'Hard Copy Short Bond Paper', '8.5 x 11 inches (Letter Size)', 500, 1500, 'Reams', 'uploads\\1698564792140@hardcopy.webp', 'White', '\"Hard Copy Short Bond Paper\" is a premium brand of bond paper renowned for its exceptional quality and versatility. Designed for a variety of printing and documentation needs, this brand stands out for its reliable performance. With a shorter size, it is ', '2023-10-29 15:33:12', '2023-10-29 15:33:12'),
(5, 'Hard Copy Long Bond Paper', '8.5 x 14 inches (Legal Size)', 500, 1500, 'Reams', 'uploads\\1698564834136@hardcopy.webp', 'White', '\"Hard Copy Long Bond Paper\" is a reliable and versatile brand of bond paper known for its high-quality printing capabilities. It is specifically designed for long documents, making it an excellent choice for various professional and academic applications.', '2023-10-29 15:33:54', '2023-10-29 15:33:54'),
(7, 'Epson 003 Genuine Ink', 'Regular (65mL)', 1, 65, 'Cartridge', 'uploads\\1698580677501@epsonblack.jpg', 'Black', 'Vivid Printing Quality: Instant-drying, water and light resistance. Ultra-High Yield: Print up to 7,500 for colour and 4,500 pages for black. Spill-Free Refilling: Enjoy spill-free refilling with individual bottles which have unique key nozzles that fit o', '2023-10-29 19:57:57', '2023-10-29 19:57:57'),
(17, 'Epson 003 Genuine Ink', 'Regular (65mL)', 1, 65, 'Cartridge', 'uploads\\1699014024635@Epson-C13T00V300-003-Magenta-Ink-Bottle-1.jpg', 'Magenta', 'Bottle Ink Magenta (70ml), Compatible with EPSON Printers (L4150, L4160, L6160, L6170, L6190), Genuine Ink, Use of other products may affect your print quality and could result in printer damage', '2023-11-03 20:20:24', '2023-11-03 20:20:24'),
(18, 'Epson 003 Genuine Ink', 'Regular (65mL)', 1, 65, 'Cartridge', 'uploads\\1699174834617@Epson-C13T00V400-003-Yellow-Ink-Bottle-1.jpg', 'Yellow', 'Epson C13T03Y400 Yellow Genuine Ink Bottle (001)\r\nBottle Ink Yellow (70ml), Compatible with EPSON Printers (L4150, L4160, L6160, L6170, L6190), Genuine Ink, Use of other products may affect your print quality and could result in printer damage', '2023-11-05 17:00:34', '2023-11-05 17:00:34'),
(19, 'Epson 003 Genuine Ink', 'Regular (65mL)', 1, 65, 'Cartridge', 'uploads\\1699276725479@Epson-C13T00V200-003-Cyan-Ink-Bottle-1-280x280.jpg', 'Cyan', 'Take the stress out of printing with the four-colour 103 ink series. It\'s designed to give you a hassle-free, ultra-low-cost and mess-free solution for everyday printing. From one set of ink, you can produce thousands of pages without having to change a c', '2023-11-06 21:18:45', '2023-11-06 21:18:45'),
(20, 'Hard Copy Short Bond Paper A4', '210mm x 297mm (A4 Size)', 500, 1500, 'Reams', 'uploads\\1699339446569@hardcopy.webp', 'White', 'Standard A4-size bond paper measuring 210mm by 297mm. Each ream contains 500 sheets, making it a total of 1500 sheets per box. This high-quality paper is perfect for international documents. Its clean white color ensures a professional appearance for all ', '2023-11-07 14:44:06', '2023-11-07 14:44:06'),
(21, 'Hard Copy Short Bond Paper A5', '148mm x 210mm (A5 Size)', 500, 1500, 'Reams', 'uploads\\1699339502608@hardcopy.webp', 'White', 'Standard A5-size bond paper measuring 148mm by 210mm. Each ream contains 500 sheets, making it a total of 1500 sheets per box. This high-quality paper is perfect for smaller documents. Its clean white color ensures a professional appearance for all your p', '2023-11-07 14:45:02', '2023-11-07 14:45:02');

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `orderID` int(11) NOT NULL,
  `orderGenID` varchar(15) NOT NULL,
  `orderTotal` decimal(7,2) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `deliveryMethod` tinyint(4) DEFAULT 0,
  `cartServicesID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `servicematerials`
--

CREATE TABLE `servicematerials` (
  `serviceMaterialID` int(11) NOT NULL,
  `specServiceID` int(11) NOT NULL,
  `matID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `specservices`
--

CREATE TABLE `specservices` (
  `specServiceID` int(11) NOT NULL,
  `specServiceName` varchar(50) NOT NULL,
  `specServiceDesc` varchar(100) NOT NULL,
  `specServiceImageUrl` varchar(50) NOT NULL,
  `specServiceRate` decimal(5,2) NOT NULL,
  `neededMatCount` int(11) NOT NULL,
  `genServicesID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `submission`
--

CREATE TABLE `submission` (
  `submissionID` int(11) NOT NULL,
  `submissionName` varchar(50) NOT NULL,
  `submissionFileType` varchar(50) NOT NULL,
  `submissionPageCount` int(11) NOT NULL,
  `uploadedAt` date NOT NULL DEFAULT curdate()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `userID` int(11) NOT NULL,
  `userName` varchar(50) NOT NULL,
  `userEmail` varchar(50) NOT NULL,
  `userPassword` varchar(255) NOT NULL,
  `userNumber` varchar(15) DEFAULT NULL,
  `userRole` enum('ADMIN','MEMBER') NOT NULL DEFAULT 'MEMBER',
  `profilePicture` varchar(255) DEFAULT NULL,
  `createdAt` date NOT NULL DEFAULT curdate(),
  `updatedAt` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userID`, `userName`, `userEmail`, `userPassword`, `userNumber`, `userRole`, `profilePicture`, `createdAt`, `updatedAt`) VALUES
(1, 'Mark Mallen Jugalbot', '19104099@usc.edu.ph', '$2b$10$r1UAXCtPhPFNvjzREQWBcOB8RGEbsNU1Kj9MtbG/uGmNlUNlSGTii', '09691946556', 'ADMIN', 'uploads\\1697031228948@pfp.jpg', '0000-00-00', NULL),
(3, 'Hiro', 'hiro@gmail.com', '$2b$10$RFHi83Jn1aBqISsG8qC2GuBW7yf3NNoozETIfRDOaEMtsY8d5sLqO', NULL, 'ADMIN', NULL, '2023-10-29', NULL),
(4, 'Zenno', 'zenno@gmail.com', '$2b$10$TbBAGgtbZnQc3uSZPVR6le5b.xRpiy3lLTXqA4pLUQvhP/fBiFz0S', NULL, 'MEMBER', 'uploads\\1698563077121@page 2.png', '2023-10-29', NULL),
(5, 'Chris', 'belarmino@usc.edu.ph', '$2b$10$7/Gh0pZQrnLgFd1Akag/9.be1z43fAv0WlK6NnyO3jUuwM.H5uc7K', NULL, 'MEMBER', NULL, '2023-11-06', NULL),
(6, 'Hiro', 'hiroGamer@gmail.com', '$2b$10$zEquS2qYNcIkKfpqwwVhTeZb552c1KYdQkePTtST.mCV6bNS/QhyC', NULL, 'MEMBER', NULL, '2023-11-07', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`addressID`),
  ADD KEY `FK_user_TO_address` (`userID`);

--
-- Indexes for table `billing`
--
ALTER TABLE `billing`
  ADD PRIMARY KEY (`billingID`),
  ADD KEY `FK_order_TO_billing` (`orderID`);

--
-- Indexes for table `cartdetails`
--
ALTER TABLE `cartdetails`
  ADD PRIMARY KEY (`cartDetails`),
  ADD KEY `FK_user_TO_cartDetails` (`userID`);

--
-- Indexes for table `cartservices`
--
ALTER TABLE `cartservices`
  ADD PRIMARY KEY (`cartServicesID`),
  ADD KEY `FK_submission_TO_cartServices` (`submissionID`),
  ADD KEY `FK_cartDetails_TO_cartServices` (`cartDetailsID`),
  ADD KEY `FK_specServices_TO_cartServices` (`specServiceID`);

--
-- Indexes for table `genservices`
--
ALTER TABLE `genservices`
  ADD PRIMARY KEY (`genServicesID`);

--
-- Indexes for table `materials`
--
ALTER TABLE `materials`
  ADD PRIMARY KEY (`matID`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`orderID`),
  ADD KEY `FK_cartServices_TO_order` (`cartServicesID`);

--
-- Indexes for table `servicematerials`
--
ALTER TABLE `servicematerials`
  ADD PRIMARY KEY (`serviceMaterialID`),
  ADD KEY `FK_specServices_TO_serviceMaterials` (`specServiceID`),
  ADD KEY `FK_materials_TO_serviceMaterials` (`matID`);

--
-- Indexes for table `specservices`
--
ALTER TABLE `specservices`
  ADD PRIMARY KEY (`specServiceID`),
  ADD KEY `FK_genServices_TO_specServices` (`genServicesID`);

--
-- Indexes for table `submission`
--
ALTER TABLE `submission`
  ADD PRIMARY KEY (`submissionID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `address`
--
ALTER TABLE `address`
  MODIFY `addressID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `billing`
--
ALTER TABLE `billing`
  MODIFY `billingID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cartdetails`
--
ALTER TABLE `cartdetails`
  MODIFY `cartDetails` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cartservices`
--
ALTER TABLE `cartservices`
  MODIFY `cartServicesID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `genservices`
--
ALTER TABLE `genservices`
  MODIFY `genServicesID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `materials`
--
ALTER TABLE `materials`
  MODIFY `matID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `orderID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `servicematerials`
--
ALTER TABLE `servicematerials`
  MODIFY `serviceMaterialID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `specservices`
--
ALTER TABLE `specservices`
  MODIFY `specServiceID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `submission`
--
ALTER TABLE `submission`
  MODIFY `submissionID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `address`
--
ALTER TABLE `address`
  ADD CONSTRAINT `FK_user_TO_address` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`);

--
-- Constraints for table `billing`
--
ALTER TABLE `billing`
  ADD CONSTRAINT `FK_order_TO_billing` FOREIGN KEY (`orderID`) REFERENCES `order` (`orderID`);

--
-- Constraints for table `cartdetails`
--
ALTER TABLE `cartdetails`
  ADD CONSTRAINT `FK_user_TO_cartDetails` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`);

--
-- Constraints for table `cartservices`
--
ALTER TABLE `cartservices`
  ADD CONSTRAINT `FK_cartDetails_TO_cartServices` FOREIGN KEY (`cartDetailsID`) REFERENCES `cartdetails` (`cartDetails`),
  ADD CONSTRAINT `FK_specServices_TO_cartServices` FOREIGN KEY (`specServiceID`) REFERENCES `specservices` (`specServiceID`),
  ADD CONSTRAINT `FK_submission_TO_cartServices` FOREIGN KEY (`submissionID`) REFERENCES `submission` (`submissionID`);

--
-- Constraints for table `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `FK_cartServices_TO_order` FOREIGN KEY (`cartServicesID`) REFERENCES `cartservices` (`cartServicesID`);

--
-- Constraints for table `servicematerials`
--
ALTER TABLE `servicematerials`
  ADD CONSTRAINT `FK_materials_TO_serviceMaterials` FOREIGN KEY (`matID`) REFERENCES `materials` (`matID`),
  ADD CONSTRAINT `FK_specServices_TO_serviceMaterials` FOREIGN KEY (`specServiceID`) REFERENCES `specservices` (`specServiceID`);

--
-- Constraints for table `specservices`
--
ALTER TABLE `specservices`
  ADD CONSTRAINT `FK_genServices_TO_specServices` FOREIGN KEY (`genServicesID`) REFERENCES `genservices` (`genServicesID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
