-- MySQL dump 10.13  Distrib 9.3.0, for Linux (x86_64)
--
-- Host: localhost    Database: mydb
-- ------------------------------------------------------
-- Server version	9.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `associates`
--

DROP TABLE IF EXISTS `associates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `associates` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `friend_id` int DEFAULT NULL,
  `association_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id_fk_idx` (`user_id`),
  KEY `friend_id_fk_idx` (`friend_id`),
  CONSTRAINT `associates_friend_id_fk` FOREIGN KEY (`friend_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `associates_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `associates`
--

LOCK TABLES `associates` WRITE;
/*!40000 ALTER TABLE `associates` DISABLE KEYS */;
INSERT INTO `associates` VALUES (3,20,21,'2026-01-23 17:50:14'),(4,21,20,'2026-01-23 17:50:14');
/*!40000 ALTER TABLE `associates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `associationrequests`
--

DROP TABLE IF EXISTS `associationrequests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `associationrequests` (
  `id` int NOT NULL AUTO_INCREMENT,
  `requestor_id` int DEFAULT NULL,
  `requestee_id` int DEFAULT NULL,
  `date_sent` datetime DEFAULT NULL,
  `date_answered` datetime DEFAULT NULL,
  `request_status` tinyint DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `requestor_id_fk_idx` (`requestor_id`),
  KEY `requestee_id_fk_idx` (`requestee_id`),
  CONSTRAINT `requestee_id_fk` FOREIGN KEY (`requestee_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `requestor_id_fk` FOREIGN KEY (`requestor_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `associationrequests`
--

LOCK TABLES `associationrequests` WRITE;
/*!40000 ALTER TABLE `associationrequests` DISABLE KEYS */;
INSERT INTO `associationrequests` VALUES (1,20,21,'2026-01-19 17:17:53','2026-01-19 17:42:38',-1),(2,20,21,'2026-01-20 17:09:28','2026-01-20 17:16:56',2),(10,21,20,'2026-01-20 17:38:22','2026-01-20 17:38:43',1),(11,20,21,'2026-01-23 17:49:04','2026-01-23 17:50:13',1);
/*!40000 ALTER TABLE `associationrequests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `boostedproperties`
--

DROP TABLE IF EXISTS `boostedproperties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `boostedproperties` (
  `id` int NOT NULL AUTO_INCREMENT,
  `property_id` int NOT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `property_id_fk_idx` (`property_id`),
  CONSTRAINT `boosted_property_id_fk` FOREIGN KEY (`property_id`) REFERENCES `properties` (`property_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `boostedproperties`
--

LOCK TABLES `boostedproperties` WRITE;
/*!40000 ALTER TABLE `boostedproperties` DISABLE KEYS */;
/*!40000 ALTER TABLE `boostedproperties` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deletedproperties`
--

DROP TABLE IF EXISTS `deletedproperties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `deletedproperties` (
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deletedproperties`
--

LOCK TABLES `deletedproperties` WRITE;
/*!40000 ALTER TABLE `deletedproperties` DISABLE KEYS */;
/*!40000 ALTER TABLE `deletedproperties` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enterpriseassociates`
--

DROP TABLE IF EXISTS `enterpriseassociates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enterpriseassociates` (
  `associate_id` int NOT NULL,
  `enterprise_id` int NOT NULL,
  PRIMARY KEY (`associate_id`,`enterprise_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enterpriseassociates`
--

LOCK TABLES `enterpriseassociates` WRITE;
/*!40000 ALTER TABLE `enterpriseassociates` DISABLE KEYS */;
/*!40000 ALTER TABLE `enterpriseassociates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favourites`
--

DROP TABLE IF EXISTS `favourites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favourites` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `property_id` int DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id_fk_idx` (`user_id`),
  KEY `property_id_fk_idx` (`property_id`),
  CONSTRAINT `favourite_property_id_fk` FOREIGN KEY (`property_id`) REFERENCES `properties` (`property_id`),
  CONSTRAINT `favourite_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favourites`
--

LOCK TABLES `favourites` WRITE;
/*!40000 ALTER TABLE `favourites` DISABLE KEYS */;
INSERT INTO `favourites` VALUES (9,21,6,'2026-02-02 17:42:53'),(10,21,4,'2026-02-02 17:51:06'),(14,20,8,'2026-02-23 01:24:38');
/*!40000 ALTER TABLE `favourites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `locationaccess`
--

DROP TABLE IF EXISTS `locationaccess`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `locationaccess` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `regional_unit` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id_fk_idx` (`user_id`),
  CONSTRAINT `location_access_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `locationaccess`
--

LOCK TABLES `locationaccess` WRITE;
/*!40000 ALTER TABLE `locationaccess` DISABLE KEYS */;
/*!40000 ALTER TABLE `locationaccess` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `notification_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `title` varchar(60) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `sent_date` datetime DEFAULT NULL,
  `recieved_date` datetime DEFAULT NULL,
  PRIMARY KEY (`notification_id`),
  KEY `user_id_fk_idx` (`user_id`),
  CONSTRAINT `notification_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profilestatistics`
--

DROP TABLE IF EXISTS `profilestatistics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profilestatistics` (
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profilestatistics`
--

LOCK TABLES `profilestatistics` WRITE;
/*!40000 ALTER TABLE `profilestatistics` DISABLE KEYS */;
/*!40000 ALTER TABLE `profilestatistics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `properties`
--

DROP TABLE IF EXISTS `properties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `properties` (
  `property_id` int NOT NULL AUTO_INCREMENT,
  `property_type` varchar(45) DEFAULT NULL,
  `construction_date` int DEFAULT NULL,
  `rental` tinyint DEFAULT NULL,
  `kaek` int DEFAULT NULL,
  `property_address` varchar(60) DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  `region` varchar(45) DEFAULT NULL,
  `regional_unit` varchar(45) DEFAULT NULL,
  `municipality` varchar(45) DEFAULT NULL,
  `last_update` datetime NOT NULL,
  `upload_date` datetime NOT NULL,
  `square_meters` int DEFAULT NULL,
  `price` int DEFAULT NULL,
  `floor` tinyint DEFAULT NULL,
  `elevator` tinyint DEFAULT NULL,
  `beds` tinyint DEFAULT NULL,
  `baths` tinyint DEFAULT NULL,
  `parking_space` tinyint DEFAULT NULL,
  `property_state` varchar(45) DEFAULT NULL,
  `balcony` tinyint DEFAULT NULL,
  `balcony_square_meters` int DEFAULT NULL,
  `property_orientation` varchar(60) DEFAULT NULL,
  `heating_type` varchar(45) DEFAULT NULL,
  `heating_means` varchar(45) DEFAULT NULL,
  `energy_class` varchar(45) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `visibility` varchar(45) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `property_owner_name` varchar(45) DEFAULT NULL,
  `property_owner_phone` varchar(10) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `hero_image` varchar(255) DEFAULT '/property-default.png',
  `neighborhood` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`property_id`),
  KEY `user_id_FK_idx` (`user_id`),
  CONSTRAINT `properties_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `properties`
--

LOCK TABLES `properties` WRITE;
/*!40000 ALTER TABLE `properties` DISABLE KEYS */;
INSERT INTO `properties` VALUES (4,'Monokatoikia',0,0,0,'','Greece','','','','2026-02-03 12:04:36','2025-12-18 17:31:07',0,0,0,1,0,0,0,'',0,0,'','','','','','Region',20,'','','','/20_PropertyImages/4_Property/18-12-2025-17:31:7-house-inside.jpg',NULL),(5,'Appartment',0,1,0,'','Greece','','','','2026-01-30 17:27:57','2025-12-22 17:52:39',0,0,3,0,2,1,0,'',0,0,'','','','','This is a property description to test the details panel. Hello people, buy me!!!','Associates',20,'','','','/20_PropertyImages/5_Property/22-12-2025-17:52:39-house-outside.jpg','ampliani'),(6,'Appartment',1926,0,0,'Patroklou','Greece','','','','2026-01-29 17:36:59','2025-12-28 21:18:42',65,50000,2,1,1,2,0,'Like New',1,100,'South','Central Heating','Heating diesel','A','','Associates',20,'test name','','Lamia','/20_PropertyImages/6_Property/28-12-2025-21:18:42-b2b logo.jpg',NULL),(7,'Storage Unit',0,1,0,'','Greece','Sterea Ellada','Fthiotida','Lamia','2026-02-08 17:10:07','2026-01-14 16:58:48',0,5000,0,0,0,0,0,'',0,0,'','','','','','Private',20,'','','Lamia','/property-default.png',''),(8,'Appartment',0,1,0,'','Greece','','','','2026-01-29 17:49:34','2026-01-25 17:16:45',0,0,0,0,0,0,0,'',0,0,'','','','','','Associates',21,'','','','/21_PropertyImages/8_Property/25-1-2026-17:16:45-b2b logo.jpg','');
/*!40000 ALTER TABLE `properties` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `propertiesstatistics`
--

DROP TABLE IF EXISTS `propertiesstatistics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `propertiesstatistics` (
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `propertiesstatistics`
--

LOCK TABLES `propertiesstatistics` WRITE;
/*!40000 ALTER TABLE `propertiesstatistics` DISABLE KEYS */;
/*!40000 ALTER TABLE `propertiesstatistics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `propertyimages`
--

DROP TABLE IF EXISTS `propertyimages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `propertyimages` (
  `image_id` int NOT NULL AUTO_INCREMENT,
  `property_id` int DEFAULT NULL,
  `image_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`image_id`),
  KEY `property_id` (`property_id`),
  CONSTRAINT `propertyimages_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `properties` (`property_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `propertyimages`
--

LOCK TABLES `propertyimages` WRITE;
/*!40000 ALTER TABLE `propertyimages` DISABLE KEYS */;
INSERT INTO `propertyimages` VALUES (3,4,'/20_PropertyImages/4_Property/18-12-2025-17:31:7-house-inside.jpg'),(4,4,'/20_PropertyImages/4_Property/18-12-2025-17:31:7-house-outside.jpg'),(5,5,'/20_PropertyImages/5_Property/22-12-2025-17:52:39-house-outside.jpg'),(6,6,'/20_PropertyImages/6_Property/28-12-2025-21:18:42-b2b logo.jpg'),(7,6,'/20_PropertyImages/6_Property/28-12-2025-21:18:42-house-inside.jpg'),(8,6,'/20_PropertyImages/6_Property/28-12-2025-21:18:42-house-outside.jpg'),(9,6,'/20_PropertyImages/6_Property/28-12-2025-21:18:42-skyrim.jpg'),(10,6,'/20_PropertyImages/6_Property/28-12-2025-21:18:42-skyrim 2.jpg'),(11,6,'/20_PropertyImages/6_Property/28-12-2025-21:18:42-skyrim 2.jpg'),(12,6,'/20_PropertyImages/6_Property/28-12-2025-21:18:42-skyrim.jpg'),(13,8,'/21_PropertyImages/8_Property/25-1-2026-17:16:45-b2b logo.jpg'),(14,8,'/21_PropertyImages/8_Property/25-1-2026-17:16:45-skyrim 2.jpg'),(15,8,'/21_PropertyImages/8_Property/25-1-2026-17:16:45-vkats.jpg'),(16,8,'/21_PropertyImages/8_Property/25-1-2026-17:16:45-house-inside.jpg'),(17,8,'/21_PropertyImages/8_Property/25-1-2026-17:16:45-house-outside.jpg'),(18,8,'/21_PropertyImages/8_Property/25-1-2026-17:16:45-skyrim.jpg');
/*!40000 ALTER TABLE `propertyimages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registrationrequests`
--

DROP TABLE IF EXISTS `registrationrequests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `registrationrequests` (
  `request_id` int NOT NULL AUTO_INCREMENT,
  `request_date` datetime DEFAULT NULL,
  `status` tinyint DEFAULT NULL,
  `approver_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`request_id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`),
  KEY `admin_user_id_fk_idx` (`approver_id`),
  CONSTRAINT `admin_user_id_fk` FOREIGN KEY (`approver_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `registration_requestor_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registrationrequests`
--

LOCK TABLES `registrationrequests` WRITE;
/*!40000 ALTER TABLE `registrationrequests` DISABLE KEYS */;
INSERT INTO `registrationrequests` VALUES (14,'2025-12-18 15:46:52',1,20,20),(15,'2026-01-14 16:17:30',1,20,21);
/*!40000 ALTER TABLE `registrationrequests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `role_id` int NOT NULL,
  `role_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (-3,'DeclinedRegistrationRequest'),(-2,'RestrictedUser'),(-1,'NoPlanUser'),(0,'ApprovalPendingUser'),(1,'BasicUser'),(2,'StandardUser'),(3,'UnlimitedUser'),(4,'EnterpriseUser'),(5,'EntAssociateUser'),(10,'Admin'),(69,'SuperAdmin');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `savedsearches`
--

DROP TABLE IF EXISTS `savedsearches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `savedsearches` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `search` json DEFAULT NULL,
  `priority` int DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id_fk_idx` (`user_id`),
  CONSTRAINT `saved_search_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `savedsearches`
--

LOCK TABLES `savedsearches` WRITE;
/*!40000 ALTER TABLE `savedsearches` DISABLE KEYS */;
/*!40000 ALTER TABLE `savedsearches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `selectivevisibility`
--

DROP TABLE IF EXISTS `selectivevisibility`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `selectivevisibility` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `property_id` int DEFAULT NULL,
  `associate_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id_fk_idx` (`user_id`),
  KEY `associate_id_fk_idx` (`associate_id`),
  KEY `property_id_fk_idx` (`property_id`),
  CONSTRAINT `visibility_associate_id_fk` FOREIGN KEY (`associate_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `visibility_property_id_fk` FOREIGN KEY (`property_id`) REFERENCES `properties` (`property_id`),
  CONSTRAINT `visibility_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `selectivevisibility`
--

LOCK TABLES `selectivevisibility` WRITE;
/*!40000 ALTER TABLE `selectivevisibility` DISABLE KEYS */;
/*!40000 ALTER TABLE `selectivevisibility` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subscriptions`
--

DROP TABLE IF EXISTS `subscriptions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subscriptions` (
  `sub_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `sub_plan` varchar(25) DEFAULT NULL,
  `sub_start` datetime NOT NULL,
  `sub_end` datetime NOT NULL,
  PRIMARY KEY (`sub_id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`),
  CONSTRAINT `user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subscriptions`
--

LOCK TABLES `subscriptions` WRITE;
/*!40000 ALTER TABLE `subscriptions` DISABLE KEYS */;
/*!40000 ALTER TABLE `subscriptions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `topproperties`
--

DROP TABLE IF EXISTS `topproperties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `topproperties` (
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `topproperties`
--

LOCK TABLES `topproperties` WRITE;
/*!40000 ALTER TABLE `topproperties` DISABLE KEYS */;
/*!40000 ALTER TABLE `topproperties` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `topusers`
--

DROP TABLE IF EXISTS `topusers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `topusers` (
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `topusers`
--

LOCK TABLES `topusers` WRITE;
/*!40000 ALTER TABLE `topusers` DISABLE KEYS */;
/*!40000 ALTER TABLE `topusers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `surname` varchar(45) DEFAULT NULL,
  `business_name` varchar(45) DEFAULT NULL,
  `AFM` varchar(9) DEFAULT NULL,
  `area_of_operation` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `phone_landline` varchar(10) DEFAULT NULL,
  `phone_mobile` varchar(10) DEFAULT NULL,
  `role` int DEFAULT NULL,
  `username` varchar(45) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `profile_image` varchar(50) DEFAULT 'profile-default.png',
  PRIMARY KEY (`user_id`),
  KEY `user_role_fk_idx` (`role`),
  CONSTRAINT `user_role_fk` FOREIGN KEY (`role`) REFERENCES `roles` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (20,'Dimitris','Kourkoutas','testBusiness','123456789','Lamia','dimitriskourkoutas@yahoo.gr','2231032225','6945980123',69,'dimikourk','$2b$12$9amyzZBOuwJtwwsh.C1aT.WPVJtZ8GAu9qDkq0o7FfEpJ5b7EMJBy','/20-profile-skyrim.jpg'),(21,'Vaggelis','Katsavrias','Wellliving','123456789','Lamia','vkats@gmail.com','2231032225','6945980123',1,'vkats','$2b$12$ekXewgQC9DIRhhovLD3NOu/DnKfiDtrvIyBXJzCaytRVahrl2uzN.','vkats.jpg');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'mydb'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-10-17 18:03:46
