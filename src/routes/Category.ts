import { Response, Router, Request } from "express";
import { sendErrorResponse } from "../utils/sendErrorResponse";
import Category, { validateCategory } from "../models/Category";

const router = Router();

router.delete("/api/categories/:id", async (req: Request, res: Response) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return sendErrorResponse(res, 404, "Category not found.");
    }
    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res
      .status(200)
      .send({
        message: "Category deleted successfully.",
        deleted: category,
        amount: deletedCategory,
      });
  } catch (err) {
    console.log(err);
    return sendErrorResponse(res, 500, "Internal server error.");
  }
});

router.put("/api/categories/:id", async (req: Request, res: Response) => {
  try {
    let category = await Category.findByPk(req.params.id);
    if (!category) {
      return sendErrorResponse(res, 404, "Category not found.");
    }
    const { error } = validateCategory(req.body);
    if (error) {
      return sendErrorResponse(res, 422, error.details[0].message);
    }
    await category.update({
      name: req.body.name,
    });
    return res.status(200).send(category);
  } catch (err) {
    console.log(err);
    return sendErrorResponse(res, 500, "Internal server error.");
  }
});

router.post("/api/categories", async (req: Request, res: Response) => {
  try {
    const { error } = validateCategory(req.body);
    if (error) {
      return sendErrorResponse(res, 422, error.details[0].message);
    }
    const category = await Category.create({ name: req.body.name });
    return res.status(201).send(category);
  } catch (err) {
    console.log(err);
    return sendErrorResponse(res, 500, "Internal server error.");
  }
});

router.get("/api/categories/:id", async (req: Request, res: Response) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return sendErrorResponse(res, 404, "Category not found.");
    }
    return res.status(200).send(category);
  } catch (err) {
    console.log(err);
    sendErrorResponse(res, 500, "Internal server error");
  }
});

router.get("/api/categories", async (req: Request, res: Response) => {
  try {
    const categories = await Category.findAll();
    if (!categories) {
      return sendErrorResponse(res, 404, "Categories not found.");
    }
    return res.status(200).send(categories);
  } catch (err) {
    console.log(err);
    sendErrorResponse(res, 500, "Internal server error.");
  }
});

export default router;
