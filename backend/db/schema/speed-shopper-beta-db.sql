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
  UNIQUE (addressId, groceryStoreNameId)
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

CREATE TABLE Users (
  userId SERIAL PRIMARY KEY,
  clerkUserId VARCHAR(255) NOT NULL,
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  isAdmin BOOLEAN NOT NULL,
  updateBy VARCHAR(100) NOT NULL,
  updatedAt TIMESTAMP with time zone NOT NULL,
  createdAt TIMESTAMP with time zone NOT NULL,
  UNIQUE (clerkUserId)
)

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

create TABLE if not exists users_groceryStores (
    groceryStoreId int not null REFERENCes grocerystores(grocerystoreid)  ON DELETE CASCADE ON UPDATE CASCADE,
    userId int not null REFERENCES users(userid) on delete cascade on update cascade,
    updatedAt TIMESTAMP with time zone NOT NULL,
    createdAt TIMESTAMP with time zone NOT NULL,
    updateBy VARCHAR(100) NOT NULL,
    Primary key (groceryStoreId, userid)
)

CREATE TABLE if not exists shoppingLists (
  shoppingListId  SERIAL PRIMARY KEY,
  "name" VARCHAR(100) NOT NULL,
  updatedAt TIMESTAMP NOT NULL,
  updateBy VARCHAR(100) NOT NULL,
  userId INT NOT NULL REFERENCES users(userId) ON DELETE RESTRICT ON UPDATE CASCADE
)

CREATE TABLE IF NOT EXISTS shoppingLists_groceryItems (
  shoppingListId INT NOT NULL REFERENCES shoppingLists(shoppingListId) ON DELETE CASCADE ON UPDATE CASCADE,
  groceryItemId INT NOT NULL REFERENCES groceryItems(groceryItemId) ON DELETE CASCADE ON UPDATE CASCADE,
      updatedAt TIMESTAMP with time zone NOT NULL,
    createdAt TIMESTAMP with time zone NOT NULL,
    updateBy VARCHAR(100) NOT NULL,
    PRIMARY KEY (shoppingListId, groceryItemId)
)