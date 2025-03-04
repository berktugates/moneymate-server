import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import User from "./User";

interface IIncome {
  id: number;
  userId: number;
  amount: number;
  description: number;
}

class Income extends Model implements IIncome {
  public id!: number;
  public userId!: number;
  public amount!: number;
  public description!: number;
}

Income.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
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
    tableName: "income",
    timestamps: true,
  }
);
export default Income;
