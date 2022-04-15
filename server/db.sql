-- create user
CREATE USER IF NOT EXISTS `[USERNAME` IDENTIFIED BY `[PASSWORD]`;
-- grant db access
GRANT ALL PRIVILEGES ON `project`.* TO `[USERNAME]`@`%`;
-- create db
CREATE DATABASE `project`;
-- create table
CREATE TABLE IF NOT EXISTS `student` (
    `srn` varchar(255),
    `name` varchar(255) NOT NULL,\
    `course` varchar(255) NOT NULL,
    `password` varchar(255) NOT NULL,
    PRIMARY KEY (`srn`)
);
-- show records
SELECT *
FROM `student`;
-- insert records
INSERT INTO `student` (`srn`, `name`, `course`, `password`)
VALUES ('[SRN]', '[NAME]', '[COURSE]', '[PASSWORD]');
-- delete records
DELETE FROM `student`
WHERE `srn` = '[SRN]';
-- delete all records
DELETE FROM `student`;