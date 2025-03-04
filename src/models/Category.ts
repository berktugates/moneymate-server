import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

interface ICategory {
  id: number;
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
export default Category;
