import { Aisle, PrismaClient } from "@prisma/client";

// findGroceryStore
export const useGroceryStoreControllers = () => {
  const prisma = new PrismaClient();

  const findGroceryStore = async (id: number) => {
    console.log(id);
    const groceryStore = await prisma.groceryStore.findUnique({
      where: {
        id: id,
      },
      include: {
        address: true,
        aisles: {
          include: {
            categories: true,
            items: true,
          },
        },
      },
    });
    console.log(groceryStore);
    return groceryStore;
  };

  /**
   * POST
   * @param addressId
   * @param storeName
   * @returns
   */
  const createGroceryStore = async (addressId: number, storeName: string) => {
    const groceryStore = await prisma.groceryStore.create({
      data: {
        addressId: addressId,
        storeName: storeName,
      },
    });
    return groceryStore;
  };

  /**
   * GET allGroceryStores
   */
  const findManyGroceryStores = async () => {
    const allGroceryStores = await prisma.groceryStore.findMany();
    return allGroceryStores;
  };

  const updateGroceryStore = async (
    groceryStoreId: number,
    aisles: Aisle[],
    storeName: string,
    addressId: number
  ) => {
    const updatedGroceryStore = await prisma.groceryStore.update({
      where: {
        id: groceryStoreId,
      },
      data: {
        aisles: aisles,
        storeName: storeName,
        addressId: addressId,
      },
      select: {
        aisles: true,
      },
    });
    // update the nameId
    // update the aisles
    // update addressId
  };

  return { createGroceryStore, findGroceryStore, findManyGroceryStores };
};
