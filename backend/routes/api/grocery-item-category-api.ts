import { useGroceryItemCategoryController } from "../../controllers/grocery-item-category-controller";
import { Express, Request, Response } from "express";

export const useGroceryItemCategoryApi = (app: Express) => {
  const {
    createGroceryItemCategory,
    findGroceryItemCategory,
    findManyGroceryItemCategories,
    updateGroceryItemCategory,
  } = useGroceryItemCategoryController();

  const baseUrl = "/api/grocery-item-categories";

  /**
   * Get groceryStoreName by ID
   * @returns null if not found
   */
  const getGroceryItemCategory = () => {
    return app.get(`${baseUrl}/:id`, async (req: Request, res: Response) => {
      const address = await findGroceryItemCategory(parseInt(req.params.id));
      res.send(address);
    });
  };

  /**
   * GET all addresses
   * @returns array addresses
   */
  const getAllGroceryItemCategories = () => {
    return app.get(`${baseUrl}`, async (req: Request, res: Response) => {
      const allGroceryItemCategories = await findManyGroceryItemCategories();
      res.send(allGroceryItemCategories);
    });
  };

  /**
   * Post will include a name - ie Produce
   */
  const postGroceryItemCategory = () => {
    return app.post(`${baseUrl}`, async (req: Request, res: Response) => {
      const name = req.body.name;
      try {
        const newGroceryItemCategory = await createGroceryItemCategory(name);
        res.send(newGroceryItemCategory);
      } catch (error) {
        console.log(error);
      }
    });
  };

  /**
   * Post will include a name - ie Produce
   */
  const putGroceryItemCategory = () => {
    return app.put(`${baseUrl}/:id`, async (req: Request, res: Response) => {
      const id = parseInt(req.params.id);
      const name = req.body.name;

      const updatedGroceryItemCategory = await updateGroceryItemCategory(
        id,
        name
      );

      res.send(updatedGroceryItemCategory);
    });
  };

  getAllGroceryItemCategories();
  getGroceryItemCategory();
  putGroceryItemCategory();

  return {
    getAllGroceryItemCategories,
    getGroceryItemCategory,
    postGroceryItemCategory,
  };
};
