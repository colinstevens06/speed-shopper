USE speed_shopperDB;

INSERT INTO Addresses (addressLineOne, addressLineTwo, city, state, zip)
VALUES ("3779 Boston St", "", "Baltimore", "MD", 21224);

INSERT INTO GroceryStores (name, addressId)
VALUES ("Harris Teeter", 1);

INSERT INTO Categories (name)
VALUES ("Dairy");

INSERT INTO GroceryItems (name, categoryID)
VALUES ("Milk", 1);

select * from grocerystores;