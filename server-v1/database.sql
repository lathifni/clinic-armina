-- Active: 1725710397025@@127.0.0.1@3306@klinik_armina
CREATE TABLE users (
    username VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NUll,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    PRIMARY KEY (username)
);

CREATE TABLE layanan_kategori (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE layanan (
    id INT NOT NULL AUTO_INCREMENT,
    layanan_kategori_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    image VARCHAR(100) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY fk_layanan_kategori_layanan (layanan_kategori_id) REFERENCES layanan_kategori (id)
);