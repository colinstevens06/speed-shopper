import { useGroceryStoreControllers } from "../../controllers/grocery-store-controller";
import {
  useAddressController,
  useGroceryStoreNameController,
} from "../../controllers/index";
import { Address, Aisle, GroceryStoreName } from "@prisma/client";
import { Express, Request, Response } from "express";

export const useGroceryStoreApi = (app: Express) => {
  const { createGroceryStore, findGroceryStore, findManyGroceryStores } =
    useGroceryStoreControllers();
  const { createAddress, findAddress } = useAddressController();
  const { createGroceryStoreName, findGroceryStoreName } =
    useGroceryStoreNameController();

  const baseUrl = "/api/grocery-stores";

  /**
   * Get grocery story by ID
   */
  const getGroceryStore = () => {
    return app.get(`${baseUrl}/:id`, async (req: Request, res: Response) => {
      const idToFind = parseInt(req.params.id);
      const groceryStore = await findGroceryStore(idToFind);

      res.send(groceryStore);
    });
  };

  /**
   * GET all addresses
   * @returns array addresses
   */
  const getAllGroceryStores = () => {
    return app.get(`${baseUrl}`, async (req: Request, res: Response) => {
      const allGroceryStores = await findManyGroceryStores();
      res.send(allGroceryStores);
    });
  };

  /**
   * Post will include address and name
   */
  const postGroceryStore = () => {
    return app.post(`${baseUrl}`, async (req: Request, res: Response) => {
      const address: Address = req.body.address;
      let newAddress: Address = address;
      const name: string = req.body.name;
      let newName: GroceryStoreName;

      const addressExists = await findAddress(address.id); // TODO: this needs to check by name

      if (!addressExists) {
        // Create address if one does not exist
        newAddress = await createAddress(address);
      } else {
        // return that the address already exists ... and UI should send them to a list of stores ... and they can add one to their favorites
        res.send("Address already exists."); // TODO: enhance error handling
      }

      const nameExists = await findGroceryStoreName(name);

      if (!nameExists) {
        newName = await createGroceryStoreName(name);
      } else {
        newName = nameExists;
      }

      // Address and GroceryStoreName built
      // Continue to build grocery store
      try {
        const newStore = await createGroceryStore(newAddress.id, newName.name);
        res.send(newStore);
      } catch (err) {
        res.send("An error occurred."); // TODO: enhance error handling
      }
    });
  };

  const putGroceryStore = () => {
    return app.put(`${baseUrl}/:id`, async (req: Request, res: Response) => {
      const id = req.params.id;
      const address: Address = req.body.address;
      let newAddress: Address = address;
      const name: string = req.body.name;
      let newName: GroceryStoreName;
      const aisles: Aisle[] = req.body.ailes;
      let newAisles: Aisle[];
    });
  };

  getAllGroceryStores();
  getGroceryStore();

  return { getAllGroceryStores, getGroceryStore, postGroceryStore };
};
