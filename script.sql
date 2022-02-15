SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

-- --------------------------------------------------------

CREATE TABLE `articles` (
  `id` int(11) NOT NULL,
  `externalId` varchar(500) NOT NULL,
  `importDate` datetime NOT NULL,
  `title` text NOT NULL,
  `description` text NOT NULL,
  `publicationDate` datetime NOT NULL,
  `link` text NOT NULL,
  `mainPicture` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

CREATE TABLE `imports` (
  `id` int(11) NOT NULL,
  `importDate` datetime NOT NULL,
  `rawContent` mediumtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-----------------------------------------

ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `imports`
  ADD PRIMARY KEY (`id`);

----------------------------------------

ALTER TABLE `articles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `imports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;
