import { useAddressController } from "../../controllers/address-controller";
import { Express, Request, Response } from "express";
import { Prisma } from "@prisma/client";

export const useAddressApi = (app: Express) => {
  const { createAddress, findAddress, findManyAddresses, updateAddress } =
    useAddressController();

  const baseUrl = "/api/addresses";

  /**
   * Get groceryStoreName by ID
   * @returns null if not found
   */
  const getAddress = () => {
    return app.get(`${baseUrl}/:id`, async (req: Request, res: Response) => {
      const id = req.params.id;
      try {
        const address = await findAddress(parseInt(id));
        if (address) {
          res.send(address);
        } else {
          res.send("Address not found");
        }
      } catch (error) {
        console.log(error);
        res.send("An unexpected error occurred");
      }
    });
  };

  /**
   * GET all addresses
   * @returns array addresses
   */
  const getAllAddresses = () => {
    return app.get(`${baseUrl}`, async (req: Request, res: Response) => {
      const addresses = await findManyAddresses();
      res.send(addresses);
    });
  };

  /**
   * Post will include a name
   */
  const postAddress = () => {
    return app.post(`${baseUrl}`, async (req: Request, res: Response) => {
      const address = req.body.address;

      try {
        const newAddress = await createAddress(address);
        res.send(newAddress);
      } catch (error) {
        console.log(error);
      }
    });
  };

  const putAddress = () => {
    return app.put(`${baseUrl}/:id`, async (req: Request, res: Response) => {
      const id = parseInt(req.params.id);
      const address = req.body.address;

      try {
        const updatedAddress = await updateAddress(id, address);
        res.send(updatedAddress);
      } catch (error) {
        console.log(error);
        res.send(error);
      }
    });
  };

  getAddress();
  getAllAddresses();
  putAddress();

  return { getAddress, getAllAddresses, postAddress };
};
