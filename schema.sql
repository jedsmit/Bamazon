DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
item_id INTEGER AUTO_INCREMENT,
product_name VARCHAR (50), 
department_name VARCHAR(50), 
price INT, 
stock_quantity INT,
PRIMARY KEY (item_id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES
("Mighty Bananas", "Produce", 4, 25),
("Sneaky River Snail", "Meat", 10, 40),
("Hearty Radish", "Produce", 8, 15),
("Fire Arrow", "Weapons", 25, 20),
("Ice Arrow", "Weapons", 25, 20),
("Hyrulian Jacket", "Clothing", 100, 5),
("Hot Footed Frog", "Critters", 10, 20),
("Bobgoblin Guts", "Monster Parts", 15, 12),
("Moblin Horn", "Monster Parts", 25, 5),
("Fireproof Lizard", "Critters", 10, 20),
("Iron Shroom", "Produce", 15, 15),
("Mighty Thistle", "Produce", 10, 20),
("Armored Porgy", "Meat", 20, 5),
("Arrows x5", "Weapons", 15, 25),
("Zora Armor", "Clothing", 200, 3);  

