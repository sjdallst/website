# You should only run this SQL script once

CREATE DATABASE IF NOT EXISTS ktp;

CREATE USER 'ktp'@'localhost' IDENTIFIED BY 'dollabillz';
GRANT ALL PRIVILEGES ON ktp.* TO 'ktp'@'localhost';
FLUSH PRIVILEGES;