/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Post";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "GroceryStore" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "addressId" INTEGER NOT NULL,
    "storeName" TEXT NOT NULL,
    CONSTRAINT "GroceryStore_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "GroceryStore_storeName_fkey" FOREIGN KEY ("storeName") REFERENCES "GroceryStoreName" ("name") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GroceryStoreName" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Address" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "addressLineOne" TEXT NOT NULL,
    "addressLineTwo" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "GroceryItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "GroceryItemCategory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Aisle" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "groceryStoreId" INTEGER NOT NULL,
    CONSTRAINT "Aisle_groceryStoreId_fkey" FOREIGN KEY ("groceryStoreId") REFERENCES "GroceryStore" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_GroceryItemToGroceryItemCategory" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_GroceryItemToGroceryItemCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "GroceryItem" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_GroceryItemToGroceryItemCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "GroceryItemCategory" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_AisleToGroceryItemCategory" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_AisleToGroceryItemCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "Aisle" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_AisleToGroceryItemCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "GroceryItemCategory" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_AisleToGroceryItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_AisleToGroceryItem_A_fkey" FOREIGN KEY ("A") REFERENCES "Aisle" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_AisleToGroceryItem_B_fkey" FOREIGN KEY ("B") REFERENCES "GroceryItem" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "GroceryStore_addressId_key" ON "GroceryStore"("addressId");

-- CreateIndex
CREATE UNIQUE INDEX "GroceryStoreName_name_key" ON "GroceryStoreName"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Address_addressLineOne_key" ON "Address"("addressLineOne");

-- CreateIndex
CREATE UNIQUE INDEX "GroceryItem_name_key" ON "GroceryItem"("name");

-- CreateIndex
CREATE UNIQUE INDEX "GroceryItemCategory_name_key" ON "GroceryItemCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_GroceryItemToGroceryItemCategory_AB_unique" ON "_GroceryItemToGroceryItemCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_GroceryItemToGroceryItemCategory_B_index" ON "_GroceryItemToGroceryItemCategory"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AisleToGroceryItemCategory_AB_unique" ON "_AisleToGroceryItemCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_AisleToGroceryItemCategory_B_index" ON "_AisleToGroceryItemCategory"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AisleToGroceryItem_AB_unique" ON "_AisleToGroceryItem"("A", "B");

-- CreateIndex
CREATE INDEX "_AisleToGroceryItem_B_index" ON "_AisleToGroceryItem"("B");
