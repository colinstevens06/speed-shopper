import { Aisle, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const main = async () => {
  const deleteEverything = async () => {
    const deleteaisle = await prisma.aisle.deleteMany({});
    const deletegroceryStoreName = await prisma.groceryStoreName.deleteMany({});
    const deletegroceryStore = await prisma.groceryStore.deleteMany({});
    const deletegroceryItem = await prisma.groceryItem.deleteMany({});
    const deletegroceryItemCategory =
      await prisma.groceryItemCategory.deleteMany({});
    const deleteAddress = await prisma.address.deleteMany({});
  };

  const createEverything = async () => {
    const harrisTeeterCantonAddress = await prisma.address.create({
      data: {
        addressLineOne: "3779 Boston St",
        city: "Baltimore",
        state: "MD",
        zip: 21224,
      },
    });
    const harrisTeeterName = await prisma.groceryStoreName.create({
      data: {
        name: "Harris Teeter",
      },
    });
    const harrisTeeterCanton = await prisma.groceryStore.create({
      data: {
        addressId: harrisTeeterCantonAddress.id,
        storeName: harrisTeeterName.name,
      },
    });
    const produce = await prisma.groceryItemCategory.create({
      data: {
        name: "Produce",
      },
    });
    const fruit = await prisma.groceryItemCategory.create({
      data: {
        name: "Fruit",
      },
    });
    const berry = await prisma.groceryItemCategory.create({
      data: {
        name: "Berry",
      },
    });
    const blueberries = await prisma.groceryItem.create({
      data: {
        name: "Blueberries",
        categories: {
          connectOrCreate: [
            {
              create: { ...produce },
              where: {
                id: produce.id,
              },
            },
            {
              create: { name: berry.name },
              where: {
                id: berry.id,
              },
            },
            {
              create: { name: fruit.name },
              where: {
                id: fruit.id,
              },
            },
          ],
        },
      },
    });

    const vegetable = await prisma.groceryItemCategory.create({
      data: {
        name: "Vegetable",
      },
    });

    const broccoli = await prisma.groceryItem.create({
      data: {
        name: "Broccoli",
        categories: {
          connectOrCreate: [
            {
              create: { name: produce.name },
              where: {
                name: produce.name,
              },
            },
            {
              create: { name: vegetable.name },
              where: {
                name: vegetable.name,
              },
            },
          ],
        },
      },
    });

    const aisleProduce = await prisma.aisle.create({
      data: {
        name: "Produce Section",
        categories: {
          connectOrCreate: [
            {
              create: { name: produce.name },
              where: {
                name: produce.name,
              },
            },
            {
              create: { name: vegetable.name },
              where: {
                name: vegetable.name,
              },
            },

            {
              create: { name: berry.name },
              where: {
                name: berry.name,
              },
            },
            {
              create: { name: fruit.name },
              where: {
                name: fruit.name,
              },
            },
          ],
        },
        items: {
          connectOrCreate: [
            {
              create: { ...broccoli },
              where: {
                id: broccoli.id,
              },
            },
            {
              create: { ...blueberries },
              where: {
                id: blueberries.id,
              },
            },
          ],
        },
        groceryStoreId: harrisTeeterCanton.id,
      },
    });

    const harrisTeeterCantonAisleAddition = (aisle: Aisle) => {
      prisma.groceryStore.update({
        where: {
          id: harrisTeeterCanton.id,
        },
        data: {
          aisles: {
            connectOrCreate: [
              {
                create: { ...aisle },
                where: {
                  id: aisle.id,
                },
              },
            ],
          },
        },
      });
    };

    harrisTeeterCantonAisleAddition(aisleProduce);
  };

  console.log("GET all grocery stores");
  try {
    // const allGroceryStores = await prisma.groceryStore.findMany({
    //   include: {
    //     address: true,
    //     aisles: {
    //       include: {
    //         categories: true,
    //       },
    //     },
    //   },
    // });
    const getHarrisTeeter = await prisma.groceryStore.findUnique({
      where: {
        id: 1,
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

    console.log(getHarrisTeeter);
    const getAisles = await prisma.aisle.findUnique({
      where: {
        id: 1,
      },
      include: {
        categories: true,
        items: true,
      },
    });
    console.log("\nAisles");
    console.log(getAisles);

    // const addAisle = await prisma.groceryStore.upsert({
    //   where: {
    //     id: getHarrisTeeter?.id
    //   },
    //   update: {
    //     aisles: {
    //       create: { ...getAisles[0] },
    //     },
    //   },
    //   create: {...getHarrisTeeter, aisles: {
    //     create: { ...getAisles[0] },
    //   },
    //   address: {
    //     create: {getHarrisTeeter[].address}
    //   }

    // },
    // });

    // console.log(getAisles);
    // console.log(getHarrisTeeter.);
  } catch (err) {
    console.log(err);
  }
};
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
