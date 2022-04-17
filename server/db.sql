-- create user
CREATE USER IF NOT EXISTS `[USERNAME` IDENTIFIED BY `[PASSWORD]`;
-- grant db access
GRANT ALL PRIVILEGES ON `project`.* TO `[USERNAME]` @`%`;
-- create db
CREATE DATABASE `project`;
-- create table
CREATE TABLE IF NOT EXISTS `student` (
    `srn` varchar(255),
    `name` varchar(255) NOT NULL,
    \ `course` varchar(255) NOT NULL,
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
-- create stats table with srn FOREIGN KEY
CREATE TABLE IF NOT EXISTS `stats` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `srn` varchar(255) NOT NULL,
    `ref_string` varchar(255) NOT NULL,
    `proc_count` int(11) NOT NULL,
    `ram_size` int(11) NOT NULL,
    `page_size` int(11) NOT NULL,
    `frame_count` int(11) NOT NULL,
    `page_count` int(11) NOT NULL,
    `fifo_hits` int(11) NOT NULL,
    `fifo_misses` int(11) NOT NULL,
    `lru_hits` int(11) NOT NULL,
    `lru_misses` int(11) NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`srn`) REFERENCES `student`(`srn`)
);
-- show stats
SELECT *
FROM `stats`;
-- insert stats
INSERT INTO `stats` (
        `srn`,
        `ref_string`,
        `proc_count`,
        `ram_size`,
        `page_size`,
        `frame_count`,
        `page_count`,
        `fifo_hits`,
        `fifo_misses`,
        `lru_hits`,
        `lru_misses`
    ) VALUES (
        '[SRN]',
        '[REF_STRING]',
        '[PROC_COUNT]',
        '[RAM_SIZE]',
        '[PAGE_SIZE]',
        '[FRAME_COUNT]',
        '[PAGE_COUNT]',
        '[FIFO_HITS]',
        '[FIFO_MISSES]',
        '[LRU_HITS]',
        '[LRU_MISSES]'
    ); 
-- delete stats
DELETE FROM `stats`
WHERE `srn` = '[SRN]';
-- delete all stats
DELETE FROM `stats`;
-- drop db
DROP DATABASE `project`;