import { PrismaClient } from "@prisma/client";
export const useGroceryItemCategoryController = () => {
  const prisma = new PrismaClient();

  /**
   * GET single aisle by id
   * @param id number - 1
   */
  const findGroceryItemCategory = async (id: number) => {
    const groceryItemCategory = await prisma.groceryItemCategory.findUnique({
      where: {
        id: id,
      },
    });

    return groceryItemCategory;
  };

  /**
   * POST
   * @param name string - Harris Teeter
   */
  const createGroceryItemCategory = async (name: string) => {
    const groceryItemCategory = await prisma.groceryItemCategory.create({
      data: {
        name: name,
      },
    });

    return groceryItemCategory;
  };

  /**
   * PUT
   * @param id number - unique id
   * @param name string - Harris Teeter
   */
  const updateGroceryItemCategory = async (id: number, name: string) => {
    const groceryItemCategory = await prisma.groceryItemCategory.update({
      where: {
        id: id,
      },
      data: {
        name: name,
      },
    });

    return groceryItemCategory;
  };

  /**
   * GET allGroceryItemCategories
   */
  const findManyGroceryItemCategories = async () => {
    const allGroceryItemCategories =
      await prisma.groceryItemCategory.findMany();
    return allGroceryItemCategories;
  };

  return {
    createGroceryItemCategory,
    findGroceryItemCategory,
    findManyGroceryItemCategories,
    updateGroceryItemCategory,
  };
};
