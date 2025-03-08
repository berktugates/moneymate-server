import { Request, Response } from "express";
import { sendErrorResponse } from "../utils/sendErrorResponse";
import Income, { validateIncome } from "../models/Income";

class IncomeController {
  async create(req: Request, res: Response) {
    try {
      const { error } = validateIncome(req.body);
      if (error) {
        return sendErrorResponse(res, 422, error.details[0].message);
      }
      const income = await Income.create({
        userId: req.user.id,
        amount: req.body.amount,
        description: req.body.description || null,
      });
      return res
        .status(200)
        .send({ message: "Create income successfully.", income: income });
    } catch (err) {
      console.log(err);
      return sendErrorResponse(res, 500, "Internal server error.");
    }
  }
  async update(req: Request, res: Response) {
    try {
      const income = await Income.findOne({
        where: {
          id: req.params.id,
          userId: req.user.id,
        },
      });
      if (!income) {
        return sendErrorResponse(res, 404, "Income not found.");
      }
      const { error } = validateIncome(req.body);
      if (error) {
        return sendErrorResponse(res, 422, error.details[0].message);
      }
      await income.update({
        amount: req.body.amount,
        description: req.body.description || null,
      });
      return res
        .status(200)
        .send({ message: "Update income successfully.", income: income });
    } catch (err) {
      console.log(err);
      return sendErrorResponse(res, 500, "Internal server error.");
    }
  }
  async delete(req: Request, res: Response) {
    try {
      const income = await Income.findOne({
        where: {
          id: req.params.id,
          userId: req.user.id,
        },
      });
      if (!income) {
        return sendErrorResponse(res, 404, "Income not found.");
      }
      await income.destroy();
      return res.status(200).send({ message: "Deleted income successfully." });
    } catch (err) {
      console.log(err);
      return sendErrorResponse(res, 500, "Internal server error.");
    }
  }
  async get(req: Request, res: Response) {
    try {
      const income = await Income.findOne({
        where: {
          id: req.params.id,
          userId: req.user.id,
        },
      });
      if (!income) {
        return sendErrorResponse(res, 404, "Income not found.");
      }
      return res.status(200).send(income);
    } catch (err) {
      console.log(err);
      return sendErrorResponse(res, 500, "Internal server error.");
    }
  }
  async getAll(req: Request, res: Response) {
    try {
      const incomes = await Income.findAll({
        where: {
          userId: req.user.id,
        },
      });
      if (!incomes) {
        return sendErrorResponse(res, 404, "Incomes not found.");
      }
      return res.status(200).send(incomes);
    } catch (err) {
      console.log(err);
      return sendErrorResponse(res, 500, "Internal server error.");
    }
  }
}
export default new IncomeController();
