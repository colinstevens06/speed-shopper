import { useAisleController } from "../../controllers/aisle-controller";
import { Express, Request, Response } from "express";

export const useAisleApi = (app: Express) => {
  const { createAisle, findAisle, findManyAisles, updateAisle } =
    useAisleController();

  const baseUrl = "/api/aisles";
  /**
   * Get groceryStoreName by ID
   * @returns null if not found
   */
  const getAisle = () => {
    return app.get(`${baseUrl}/:name`, async (req: Request, res: Response) => {
      const address = await findAisle(req.params.name);
      res.send(address);
    });
  };

  /**
   * GET all addresses
   * @returns array addresses
   */
  const getAllAisles = () => {
    return app.get(`${baseUrl}`, async (req: Request, res: Response) => {
      const aisles = await findManyAisles();
      res.send(aisles);
    });
  };

  /**
   * Post will include a name
   */
  const postAisle = () => {
    return app.post(`${baseUrl}`, async (req: Request, res: Response) => {
      const name = req.body.name;
      try {
        const newAisle = await createAisle(name);
        res.send(newAisle);
      } catch (error) {
        console.log(error);
      }
    });
  };

  /**
   * PUT will include a name
   */
  const putAisle = () => {
    return app.put(`${baseUrl}/:id`, async (req: Request, res: Response) => {
      const id = parseInt(req.params.id);
      const name = req.body.name;
      const updatedAisle = await updateAisle(id, name);
      res.send(updatedAisle);
    });
  };

  // Call them so they get added to API
  getAisle();
  getAllAisles();
  putAisle();

  return { getAisle, getAllAisles, postAisle };
};
