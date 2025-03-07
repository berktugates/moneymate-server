import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import Joi from "joi";

interface ICategory {
  id?: number;
  name: string;
}

class Category extends Model<ICategory> implements ICategory {
  public id!: number;
  public name!: string;
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
  });
  return schema.validate(category);
}

export default Category;
