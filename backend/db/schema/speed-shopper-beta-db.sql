/* command line */
-- DROP DATABASE [IF EXISTS] SpeedShopperBetaDb;
-- CREATE DATABASE SpeedShopperBetaDb;

-- USE SpeedShopperBetaDb;

CREATE TABLE GroceryStoreNames  (
  groceryStoreNameId SERIAL PRIMARY KEY,
  "name" VARCHAR(100) NOT NULL,
  updatedAt TIMESTAMP NOT NULL,
  updateBy VARCHAR(100) NOT NULL,
  UNIQUE ("name")
);

CREATE TABLE Address (
    addressId SERIAL PRIMARY KEY,
    addressLineOne VARCHAR(100) NOT NULL,
    addressLineTwo VARCHAR(100),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(50) not NULL,
    zip INT,
    updatedAt TIMESTAMP NOT NULL,
    updateBy VARCHAR(100) NOT NULL,
    UNIQUE(addressLineOne, city, state)
);

CREATE TABLE GroceryStore (
  groceryStoreId SERIAL PRIMARY KEY,
  addressId INT NOT NULL REFERENCES addresses(addressId),
  groceryStoreNameId INT NOT NULL REFERENCES groceryStoreNames(groceryStoreNameId),
  updatedAt TIMESTAMP NOT NULL,
  updateBy VARCHAR(100) NOT NULL
);

CREATE TABLE GroceryItem (
    groceryItemId SERIAL PRIMARY KEY,
    "name" VARCHAR(100) NOT NULL,
    updatedAt TIMESTAMP NOT NULL,
    updateBy VARCHAR(100) NOT NULL,
    UNIQUE("name")
);

CREATE TABLE GroceryItemCategory (
    groceryItemCategoryId SERIAL PRIMARY KEY,
    "name" VARCHAR(100) NOT NULL,
    updatedAt TIMESTAMP NOT NULL,
    updateBy VARCHAR(100) NOT NULL,
    UNIQUE("name")
);

CREATE TABLE Aisle (
    aisleId SERIAL PRIMARY KEY,
    "name" VARCHAR(100) NOT NULL,
    aisleOrder INT NOT NULL,
    groceryStoreId INT NOT NULL REFERENCES groceryStores(groceryStoreId) ON DELETE RESTRICT ON UPDATE CASCADE,
    updatedAt TIMESTAMP NOT NULL,
    updateBy VARCHAR(100) NOT NULL
);

CREATE TABLE Aisles_GroceryItem (
    aisleId INT NOT NULL REFERENCES aisles(aisleId),
    groceryItemId INT NOT NULL REFERENCES groceryItems(groceryItemId),
    PRIMARY KEY(aisleId, groceryItemId)
);

CREATE TABLE Aisle_GroceryItemCategory (
    aisleId INT NOT NULL REFERENCES aisles(aisleId),
    groceryItemCategoryId INT NOT NULL REFERENCES groceryItemCategories(groceryItemCategoryId),
    PRIMARY KEY(aisleId, groceryItemCategoryId)
);

CREATE TABLE GroceryItem_GroceryItemCategories (
    groceryItemId INT NOT NULL REFERENCES groceryItems(groceryItemId) ON DELETE CASCADE ON UPDATE CASCADE,
    groceryItemCategoryId INT NOT NULL REFERENCES groceryItemCategories(groceryItemCategoryId) ON DELETE CASCADE ON UPDATE CASCADE,
    updatedAt TIMESTAMP with time zone NOT NULL,
    createdAt TIMESTAMP with time zone NOT NULL,
    updateBy VARCHAR(100) NOT NULL,
    PRIMARY KEY(groceryItemId, groceryItemCategoryId)
);

