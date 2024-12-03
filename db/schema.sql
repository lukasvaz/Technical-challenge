CREATE DATABASE IF NOT EXISTS technical_challenge;
USE technical_challenge ;
DROP table  if exists Product;
DROP table  if exists Sales;
DROP table  if exists Restocks;
DROP table  if exists Inventory;

DROP trigger if exists update_inventory_after_restock;
DROP trigger if exists update_inventory_after_sale;

CREATE TABLE IF NOT EXISTS Products (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    price INT UNSIGNED NOT NULL
);

CREATE TABLE IF NOT EXISTS Sales (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_product BIGINT UNSIGNED NOT NULL,
    quantity INT NOT NULL,
    _date TIMESTAMP NOT NULL,
    FOREIGN KEY (id_product) REFERENCES Products(id)
);

CREATE TABLE IF NOT EXISTS Restocks (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_product BIGINT UNSIGNED NOT NULL,
    quantity INT NOT NULL,
    _date TIMESTAMP NOT NULL,
    FOREIGN KEY (id_product) REFERENCES Products(id)
);

CREATE TABLE IF NOT EXISTS Inventory (
    id_product BIGINT UNSIGNED PRIMARY KEY,
    quantity INT NOT NULL CHECK (quantity >= 0),
    _date TIMESTAMP NOT NULL,
    FOREIGN KEY (id_product) REFERENCES Products(id)
);

DELIMITER //

CREATE TRIGGER update_inventory_after_sale
AFTER INSERT ON Sales
FOR EACH ROW
BEGIN
    UPDATE Inventory
    SET quantity = quantity - NEW.quantity, _date = NEW._date
    WHERE id_product = NEW.id_product;
END //

CREATE TRIGGER update_inventory_after_restock
AFTER INSERT ON Restocks
FOR EACH ROW
BEGIN
    INSERT INTO Inventory (id_product, quantity, _date)
    VALUES (NEW.id_product, NEW.quantity, NEW._date)
    ON DUPLICATE KEY UPDATE
    quantity = quantity + NEW.quantity, _date = NEW._date;
END //

DELIMITER ;
