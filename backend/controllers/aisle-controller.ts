import { PrismaClient } from "@prisma/client";
export const useAisleController = () => {
  const prisma = new PrismaClient();

  /**
   * GET single aisle by id
   */
  const findAisle = async (id: string) => {
    const idNum = parseInt(id);

    const aisle = await prisma.aisle.findUnique({
      where: {
        id: idNum,
      },
    });

    return aisle;
  };

  /**
   * POST
   */
  const createAisle = async (name: string) => {
    const produce = await prisma.groceryItemCategory.create({
      data: {
        name: name,
      },
    });

    return produce;
  };

  /**
   * PUT
   */
  const updateAisle = async (id: number, name: string) => {
    const produce = await prisma.groceryItemCategory.update({
      where: {
        id: id,
      },
      data: {
        name: name,
      },
    });

    return produce;
  };

  /**
   * GET all aisles
   */
  const findManyAisles = async () => {
    const aisles = await prisma.groceryItemCategory.findMany();
    return aisles;
  };

  return { createAisle, findAisle, findManyAisles, updateAisle };
};
