# speed-shopper

 <!-- Speed Shopper notes -->

- User can copy an aisle
  - Each aisle is unique to a store in the DB, but the user interface will allow the user to copy an aisle from another store and add it to a grocery store... and it'll write to the DB as a POST because it'll be a new aisl

## User Flow - CONTENT CREATION

- First Screen

  - General Info (POST GROCERY STORE)
  - Address - created postGroceryStore
  - GroceryStoreName - created postGroceryStore

- Second Screen: What are you shopping for?

  - Create GroceryItem (POST GROCERY ITEM) - Select Category ... Create if createGroceryItem

- Third Screen: Where are those items
  - Should have 3-5 Rows Ready With Data For Users to Choose From
  -
  - Create Aisles (POST)
    Select Categories will populate with items

## Admin View - CONTENT MANAGEMENT

- 3 Pages
  - Grocery Store (Add/Edit) (GETALL/GET/POST/PUT)
    - Grocery Store
    - Grocery Store Name
    - Address
  - Grocery Item (Add/Edit) (GETALL/GET/POST/PUT)
    - Item
    - Category
  - Aisle (Add/Edit) (GETALL/GET/POST/PUT)
    - Aisle

## DB Plan

### GroceryStore Model

- to-Address is 1-to-1
- to-Aisles is one-to-many, Aisle-to-GroceryStore is 1-to-1
- to-Name is many-to-one, because many grocery stores can have same name

### GroceryStoreName Model

- to-groceryStores is one-to-many, because one name is used by many stores

### Address Model

- to-GroceryStore is 1-to-1

### GroceryItem

- to-Category is many-to-many, because each item (cheddar cheese) can have multiple categories (dairy, cheese) and a category (cheese) can have multiple items (cheddar cheese, monteray jack)
- to-Aisle is many-to-many, because many groceryItem can be in many aisles

### GroceryItemCategory

- to-GroceryItem is many-to-many because a a category (cheese) can have multiple items (cheddar cheese, monteray jack) and each item (cheddar cheese) can have multiple categories (dairy, cheese)
- to-Aisle is many-to-many, because many GroceryItemCategory can belong to many aisle

### Aisle

- toGroceryItemCategory is many-to-many
- toGroceryItems is many-to-many
- toGroceryStore is many-to-one because many Aisles can belong to only one GroceryStore - can copy an aisle and asign to different store
