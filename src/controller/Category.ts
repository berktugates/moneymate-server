import { Request, Response } from "express";
import Category, { validateCategory } from "../models/Category";
import { sendErrorResponse } from "../utils/sendErrorResponse";

class CategoryController {
  async create(req: Request, res: Response) {
    try {
      const { error } = validateCategory(req.body);
      if (error) {
        return sendErrorResponse(res, 422, error.details[0].message);
      }
      const category = await Category.create({
        name: req.body.name,
        userId: req.user.id,
      });
      return res
        .status(200)
        .send({
          message: "Category created successfully.",
          category: category,
        });
    } catch (err) {
      console.log(err);
      return sendErrorResponse(res, 500, "Internal server error.");
    }
  }
  async update(req: Request, res: Response) {
    try {
      const category = await Category.findOne({
        where: {
          id: req.params.id,
          userId: req.user.id,
        },
      });
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
      return res.status(200).send({
        message: "Category updated successfully.",
        category: category,
      });
    } catch (err) {
      console.log(err);
      return sendErrorResponse(res, 500, "Internal server error.");
    }
  }
  async delete(req: Request, res: Response) {
    try {
      const category = await Category.findOne({
        where: {
          id: req.params.id,
          userId: req.user.id,
        },
      });
      if (!category) {
        return sendErrorResponse(res, 404, "Category not found.");
      }
      await category.destroy();
      return res
        .status(200)
        .send({ message: "Category deleted successfully." });
    } catch (err) {
      console.log(err);
      return sendErrorResponse(res, 500, "Internal server error.");
    }
  }
  async get(req: Request, res: Response) {
    try {
      const category = await Category.findOne({
        where: {
          id: req.params.id,
          userId: req.user.id,
        },
      });
      if (!category) {
        return sendErrorResponse(res, 404, "Category not found.");
      }
      return res.status(200).send(category);
    } catch (err) {
      console.log(err);
      return sendErrorResponse(res, 500, "Internal server error.");
    }
  }
  async getAll(req: Request, res: Response) {
    try {
      const categories = await Category.findAll({
        where: {
          userId: req.user.id,
        },
      });
      if (!categories) {
        return sendErrorResponse(res, 404, "Categories not found.");
      }
      return res.status(200).send(categories);
    } catch (err) {
      console.log(err);
      return sendErrorResponse(res, 500, "Internal server error.");
    }
  }
}

export default new CategoryController();
