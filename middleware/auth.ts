import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Request tipini genişletiyoruz
declare global {
  namespace Express {
    interface Request {
      user: any;
    }
  }
}

const authMiddleware = (req: Request, res: Response, next: NextFunction):any => {
  const token = req.header("Authorization-MoneyMate");

  if (!token) {
    return res.status(401).send({ message: "No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(400).send({ message: "Invalid token." });
  }
};

export default authMiddleware;
