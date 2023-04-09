DROP DATABASE IF EXISTS speed_shopperDB;

CREATE DATABASE speed_shopperDB;

USE speed_shopperDB;

CREATE TABLE Addresses (
    id INT NOT NULL AUTO_INCREMENT,
    addressLineOne VARCHAR(100) NOT NULL UNIQUE,
    addressLineTwo VARCHAR(100) NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(2) NOT NULL,
    zip INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE GroceryStores (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NULL,
    addressId INT NOT NULL UNIQUE,
    PRIMARY KEY (id),
    FOREIGN KEY (addressId)
        REFERENCES Addresses (id)
);

CREATE TABLE Categories (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    PRIMARY KEY (id)
);

CREATE TABLE GroceryItems (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    categoryID INT NOT NULL,
    FOREIGN KEY (categoryID)
        REFERENCES Categories (id),
    PRIMARY KEY (id)
);



