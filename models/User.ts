import { Model, DataTypes, Sequelize } from "sequelize";
import sequelize from "../config/database";
import Joi from "joi";
import jwt from "jsonwebtoken";

// user modelin özelliklerini tanımlayan interface tanımla
interface IUser {
  id?: number;
  name?: string;
  email: string;
  password: string;
  createdAt?:Date;
  updatedAt?:Date;
}

//user modelini oluştur
class User extends Model<IUser> implements IUser {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public createdAt!:Date;
  public updatedAt!:Date;

  public generateAuthToken(): string {
    if (!process.env.JWT_SECRET_KEY) {
      throw new Error('JWT_SECRET_KEY is not defined in environment variables');
    }
    
    const token = jwt.sign(
      { id: this.id, email: this.email },
      process.env.JWT_SECRET_KEY
    );
    return token;
  }
}

// model şemasını tanımla
User.init(
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull:false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull:false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
  },
  {
    sequelize,
    tableName: "user",
    timestamps: true,
  }
);

export function validateUser(user: IUser) {
  const schema = Joi.object({
    name: Joi.string().required().min(1),
    email: Joi.string().email().required(),
    password: Joi.string()
      .min(8)
      .pattern(new RegExp("^(?=.*[A-Z])"))
      .pattern(new RegExp("^(?=.*[a-z])"))
      .pattern(new RegExp("^(?=.*\\d)"))
      .pattern(new RegExp("^(?=.*[!@#$%^&*])"))
      .pattern(new RegExp("^\\S+$"))
      .required()
      .messages({
        "string.pattern.base":
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
        "string.min": "Password must be at least 8 characters long.",
        "string.max": "Password cannot exceed 64 characters.",
        "string.empty": "Password is required.",
      }),
  });
  return schema.validate(user);
}
 export function validateAuth(user:IUser){
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })
  return schema.validate(user);
 }

export default User;
