import { useGroceryStoreNameController } from "../../controllers/grocery-store-name-controller";
import { GroceryStoreName } from "@prisma/client";
import { Express, Request, Response } from "express";

export const useGroceryStoreNameApi = (app: Express) => {
  const {
    createGroceryStoreName,
    findGroceryStoreName,
    findManyGroceryStoreNames,
    updateGroceryStoreName,
  } = useGroceryStoreNameController();

  const baseUrl = "/api/grocery-store-names";

  /**
   * Get groceryStoreName by ID
   * @returns null if not found
   */
  const getGroceryStoreName = () => {
    return app.get(`${baseUrl}/:name`, async (req: Request, res: Response) => {
      const name = await findGroceryStoreName(req.params.name);
      res.send(name);
    });
  };

  /**
   * GET all addresses
   * @returns array addresses
   */
  const getAllGroceryStoreNames = () => {
    return app.get(`${baseUrl}`, async (req: Request, res: Response) => {
      const allGroceryStoreNames = await findManyGroceryStoreNames();
      res.send(allGroceryStoreNames);
    });
  };

  /**
   * POST will include a name - Harris Teeter
   */
  const postGroceryStoreName = () => {
    return app.post(`${baseUrl}`, async (req: Request, res: Response) => {
      const name = req.body.name;
      let newName: GroceryStoreName;

      const nameExists = await findGroceryStoreName(name);
      if (!nameExists) {
        newName = await createGroceryStoreName(name);
        res.send(newName);
      } else {
        res.send("Name already exists.");
      }
    });
  };

  /**
   * PUT will include a name - Harris Teeter
   */
  const putGroceryStoreName = () => {
    return app.put(`${baseUrl}/:id`, async (req: Request, res: Response) => {
      const id = parseInt(req.params.id);
      const name = req.body.name;

      const updatedGroceryStoreName = await updateGroceryStoreName(id, name);

      res.send(updatedGroceryStoreName);
    });
  };

  getAllGroceryStoreNames();
  getGroceryStoreName();
  putGroceryStoreName();

  return { getAllGroceryStoreNames, getGroceryStoreName, postGroceryStoreName };
};
