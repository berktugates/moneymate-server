import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import User from "./User";
import Category from "./Category";

interface ISpending {
  id: number;
  userId: number;
  categoryId: number;
  amount: number;
  description: string;
}

class Spending extends Model<ISpending> implements ISpending {
  public id!: number;
  public userId!: number;
  public categoryId!: number;
  public amount!: number;
  public description!: string;
}

Spending.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Category,
        key: "id",
      },
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "spending",
    timestamps: true,
  }
);
export default Spending;
