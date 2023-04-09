import { useGroceryItemController } from "../../controllers/grocery-item-controller";
import { Express, Request, Response } from "express";

export const useGroceryItemApi = (app: Express) => {
  const {
    createGroceryItem,
    findGroceryItem,
    findManyGroceryItems,
    updateGroceryItem,
  } = useGroceryItemController();

  const baseUrl = "/api/grocery-items";

  /**
   * Get groceryStoreName by ID
   * @returns null if not found
   */
  const getGroceryItem = () => {
    return app.get(`${baseUrl}/:id`, async (req: Request, res: Response) => {
      const groceryItem = await findGroceryItem(parseInt(req.params.id));
      res.send(groceryItem);
    });
  };

  /**
   * GET all addresses
   * @returns array addresses
   */
  const getAllGroceryItems = () => {
    return app.get(`${baseUrl}`, async (req: Request, res: Response) => {
      const allGroceryItems = await findManyGroceryItems();
      res.send(allGroceryItems);
    });
  };

  /**
   * POST will include a
   */
  const postGroceryItem = () => {
    return app.post(`${baseUrl}`, async (req: Request, res: Response) => {
      const name = req.body.name;
      try {
        const newGroceryItem = createGroceryItem(name);
        res.send(newGroceryItem);
      } catch (error) {
        console.log(error);
      }
    });
  };

  /**
   * POST will include a
   */
  const putGroceryItem = () => {
    return app.put(`${baseUrl}/:id`, async (req: Request, res: Response) => {
      const id = parseInt(req.params.id);
      const name = req.body.name;

      const updatedGroceryItem = await updateGroceryItem(id, name);
      res.send(updatedGroceryItem);
    });
  };

  getAllGroceryItems();
  getGroceryItem();
  putGroceryItem();

  return { getAllGroceryItems, getGroceryItem, postGroceryItem };
};
