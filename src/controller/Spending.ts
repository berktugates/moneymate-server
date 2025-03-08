import { Request, Response } from "express";
import { sendErrorResponse } from "../utils/sendErrorResponse";
import Spending, { validateSpending } from "../models/Spending";

class SpendingController {
  async create(req: Request, res: Response) {
    try {
      const { error } = validateSpending(req.body);
      if (error) {
        return sendErrorResponse(res, 422, error.details[0].message);
      }
      const spending = await Spending.create({
        userId: req.user.id,
        categoryId: req.body.categoryId,
        amount: req.body.amount,
        description: req.body.description || null,
      });
      return res.status(200).send({
        message: "Created spending successfully.",
        spending: spending,
      });
    } catch (err) {
      console.log(err);
      sendErrorResponse(res, 500, "Internal server error.");
    }
  }
  async update(req: Request, res: Response) {
    try {
      const spending = await Spending.findOne({
        where: {
          id: req.params.id,
          userId: req.user.id,
        },
      });
      if (!spending) {
        return sendErrorResponse(res, 404, "Spending not found.");
      }
      const { error } = validateSpending(req.body);
      if (error) {
        return sendErrorResponse(res, 422, error.details[0].message);
      }
      await spending.update({
        categoryId: req.body.categoryId,
        amount: req.body.amount,
        description: req.body.description || null,
      });
      return res
        .status(200)
        .send({ message: "Update spending successfully.", spending: spending });
    } catch (err) {
      console.log(err);
      return sendErrorResponse(res, 500, "Internal server error.");
    }
  }
  async delete(req: Request, res: Response) {
    try {
      const spending = await Spending.findOne({
        where: {
          id: req.params.id,
          userId: req.user.id,
        },
      });
      if (!spending) {
        return sendErrorResponse(res, 404, "Spending not found.");
      }
      await spending.destroy();
      return res
        .status(200)
        .send({ message: "Deleted spending successfully." });
    } catch (err) {
      console.log(err);
      return sendErrorResponse(res, 500, "Internal server error.");
    }
  }
  async get(req: Request, res: Response) {
    try {
      const spending = await Spending.findOne({
        where: {
          id: req.params.id,
          userId: req.user.id,
        },
      });
      if (!spending) {
        return sendErrorResponse(res, 404, "Spending not found.");
      }
      return res.status(200).send(spending);
    } catch (err) {
      console.log(err);
      return sendErrorResponse(res, 500, "Internal server error.");
    }
  }
  async getAll(req: Request, res: Response) {
    try {
      const spendings = await Spending.findAll({
        where: {
          userId: req.user.id,
        },
      });
      if (!spendings) {
        return sendErrorResponse(res, 404, "Spendings not found.");
      }
      return res.status(200).send(spendings);
    } catch (err) {
      console.log(err);
      return sendErrorResponse(res, 500, "Internal server error.");
    }
  }
}
export default new SpendingController();
