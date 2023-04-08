import { GroceryStoreName, PrismaClient } from "@prisma/client";

export const useGroceryStoreNameController = () => {
  const prisma = new PrismaClient();

  /**
   * POST
   * @param name string - ie Harris Teeter
   * @returns
   */
  const createGroceryStoreName = async (name: string) => {
    const newGroceryStoreName = await prisma.groceryStoreName.create({
      data: {
        name: name,
      },
    });

    return newGroceryStoreName;
  };

  /**
   * PUT
   * @param id number - unique id
   * @param name string - ie Harris Teeter
   * @returns
   */
  const updateGroceryStoreName = async (id: number, name: string) => {
    const newGroceryStoreName = await prisma.groceryStoreName.update({
      where: {
        id: id,
      },
      data: {
        name: name,
      },
    });

    return newGroceryStoreName;
  };

  /**
   * GET unique groceryStoreName
   * @param name string - Harris Teeter
   * @returns GroceryStoreName
   */
  const findGroceryStoreName = async (name: string) => {
    const groceryStoreName = await prisma.groceryStoreName.findUnique({
      where: {
        name: name,
      },
    });

    return groceryStoreName;
  };

  /**
   * GET allGroceryStoreNames
   */
  const findManyGroceryStoreNames = async () => {
    const allGroceryStoreNames = await prisma.groceryStoreName.findMany();
    return allGroceryStoreNames;
  };

  return {
    createGroceryStoreName,
    findGroceryStoreName,
    findManyGroceryStoreNames,
    updateGroceryStoreName,
  };
};
