import { Address, PrismaClient } from "@prisma/client";

export const useAddressController = () => {
  const prisma = new PrismaClient();

  const createAddress = async (address: Address) => {
    const newAddress = await prisma.address.create({
      data: {
        addressLineOne: address.addressLineOne,
        city: address.city,
        state: address.state,
        zip: address.zip,
      },
    });
    return newAddress;
  };

  const updateAddress = async (id: number, address: Address) => {
    const newAddress = await prisma.address.update({
      where: {
        id: id,
      },
      data: {
        addressLineOne: address.addressLineOne,
        city: address.city,
        state: address.state,
        zip: address.zip,
      },
    });
    return newAddress;
  };

  const findAddress = async (id: number) => {
    const address = await prisma.address.findUnique({
      where: {
        id: id,
      },
    });

    return address;
  };

  /**
   * GET all addresses
   */
  const findManyAddresses = async () => {
    const addresses = await prisma.address.findMany();
    return addresses;
  };

  return { createAddress, findAddress, findManyAddresses, updateAddress };
};
