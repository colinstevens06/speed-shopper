import { PrismaClient } from "@prisma/client";
export const useGroceryItemController = () => {
  const prisma = new PrismaClient();

  /**
   * GET single aisle by id
   * @param id number - 1
   */
  const findGroceryItem = async (id: number) => {
    const groceryItem = await prisma.groceryItem.findUnique({
      where: {
        id: id,
      },
    });

    return groceryItem;
  };

  /**
   * POST
   * @param name string - Harris Teeter
   */
  const createGroceryItem = async (name: string) => {
    const groceryItem = await prisma.groceryItem.create({
      data: {
        name: name,
      },
    });

    return groceryItem;
  };

  /**
   * PUT
   * @param id number - unique id
   * @param name string - Harris Teeter
   */
  const updateGroceryItem = async (id: number, name: string) => {
    const groceryItem = await prisma.groceryItem.update({
      where: {
        id: id,
      },
      data: {
        name: name,
      },
    });

    return groceryItem;
  };

  /**
   * GET allGroceryItems
   */
  const findManyGroceryItems = async () => {
    const allGroceryItems = await prisma.groceryItem.findMany();
    return allGroceryItems;
  };

  return {
    createGroceryItem,
    findGroceryItem,
    findManyGroceryItems,
    updateGroceryItem,
  };
};
