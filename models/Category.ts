import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import Joi from "joi";

interface ICategory {
  id?: number;
  name: string;
  userId: number;
}

class Category extends Model<ICategory> implements ICategory {
  public id!: number;
  public name!: string;
  public userId!: number;
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "category",
    timestamps: true,
  }
);

export function validateCategory(category: ICategory) {
  const schema = Joi.object({
    name: Joi.string().required(),
    userId: Joi.number().required(),
  });
  return schema.validate(category);
}

export default Category;
