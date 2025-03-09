import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { sendErrorResponse } from "../utils/sendErrorResponse";
import User, { validateAuth, validateUser } from "../models/User";

class UserController {
  async auth(req: Request, res: Response): Promise<any> {
    try {
      const { error } = validateAuth(req.body);
      if (error) {
        return sendErrorResponse(res, 422, error.details[0].message);
      }
      const user = await User.findOne({
        where: {
          email: req.body.email,
        },
      });
      console.log("User Query Result:", user);
      if (!user) {
        return sendErrorResponse(res, 401, "Incorrect email or password.");
      }
      const isSuccess = await bcrypt.compare(req.body.password, user.password);
      if (!isSuccess) {
        return sendErrorResponse(res, 401, "Incorrect email or password.");
      }
      const token = user.generateAuthToken();
      res
        .status(200)
        .header("moneymate-auth-token", token)
        .header("Access-Control-Expose-Headers", "moneymate-auth-token")
        .send({ message: "Login successfull.", token: token, id: user.id });
    } catch (err) {
      console.log(err);
      return sendErrorResponse(res, 500, "Internal server error.");
    }
  }

  async create(req: Request, res: Response): Promise<any> {
    try {
      const { error } = validateUser(req.body);
      if (error) {
        return sendErrorResponse(res, 422, error.details[0].message);
      }
      const email = await User.findOne({
        where: {
          email: req.body.email,
        },
      });
      if (email) {
        return sendErrorResponse(res, 409, "The user with this email exists.");
      }
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });
      const token = user.generateAuthToken();
      return res.status(200).send({
        message: "User created successfully.",
        user: user,
        token: token,
      });
    } catch (err) {
      console.log(err);
      sendErrorResponse(res, 500, "Internal server error.");
    }
  }
  async update(req: Request, res: Response): Promise<any> {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return sendErrorResponse(res, 404, "User not found.");
      }
      const { error } = validateUser(req.body);
      if (error) {
        return sendErrorResponse(res, 422, error.details[0].message);
      }
      await user.update({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      return res.status(200).send({ message: "Updated user successfully." });
    } catch (err) {
      console.log(err);
    }
  }
  async delete(req: Request, res: Response): Promise<any> {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return sendErrorResponse(res, 404, "User not found.");
      }
      await user.destroy();
      return res.status(200).send({ message: "Deleted user successfully." });
    } catch (err) {
      console.log(err);
      return sendErrorResponse(res, 500, "Internal server error.");
    }
  }
  async get(req: Request, res: Response): Promise<any> {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return sendErrorResponse(res, 404, "User not found.");
      }
      return res.status(200).send(user);
    } catch (err) {
      console.log(err);
      return sendErrorResponse(res, 500, "Internal server error.");
    }
  }
  async getAll(req: Request, res: Response): Promise<any> {
    try {
      const users = await User.findAll();
      if (!users) {
        return sendErrorResponse(res, 404, "Users not found.");
      }
      return res.status(200).send(users);
    } catch (err) {
      console.log(err);
      return sendErrorResponse(res, 500, "Internal server error.");
    }
  }
}
export default new UserController();
