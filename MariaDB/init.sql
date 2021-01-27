DROP DATABASE IF EXISTS `it_rss_feed`;


CREATE DATABASE `it_rss_feed` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;


USE it_rss_feed;


DROP TABLE IF EXISTS `utilisateur`;
CREATE TABLE `utilisateur` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `identifiant` VARCHAR(255),
  `motdepasse` VARCHAR(255),
  PRIMARY KEY `pk_id`(`id`)
) ENGINE = InnoDB;


DROP TABLE IF EXISTS `flux`;
CREATE TABLE `flux` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nom` VARCHAR(255),
  `url` VARCHAR(255),
  PRIMARY KEY `pk_id`(`id`)
) ENGINE = InnoDB;


DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `titre` VARCHAR(255),
  `description` TEXT,
  `date` DATETIME,
  PRIMARY KEY `pk_id`(`id`)
) ENGINE = InnoDB;


DROP TABLE IF EXISTS `utilisateur_flux`;
CREATE TABLE `utilisateur_flux` (
  `id_utilisateur` INT UNSIGNED,
  `id_flux` INT UNSIGNED,
  PRIMARY KEY (`id_utilisateur`, `id_flux`),
  CONSTRAINT `fk_utilisateur_flux_utilisateur`
    FOREIGN KEY (`id_utilisateur`)
    REFERENCES `utilisateur` (`id`)
    ON DELETE CASCADE
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_utilisateur_flux_flux`
    FOREIGN KEY (`id_flux`)
    REFERENCES `flux` (`id`)
    ON DELETE CASCADE
    ON UPDATE RESTRICT  
) ENGINE = InnoDB;


DROP TABLE IF EXISTS `utilisateur_article`;
CREATE TABLE `utilisateur_article` (
  `id_utilisateur` INT UNSIGNED,
  `id_article` INT UNSIGNED,
  PRIMARY KEY (`id_utilisateur`, `id_article`),
  CONSTRAINT `fk_utilisateur_article_utilisateur`
    FOREIGN KEY (`id_utilisateur`)
    REFERENCES `utilisateur` (`id`)
    ON DELETE CASCADE
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_utilisateur_article_article`
    FOREIGN KEY (`id_article`)
    REFERENCES `article` (`id`)
    ON DELETE CASCADE
    ON UPDATE RESTRICT
) ENGINE = InnoDB;

