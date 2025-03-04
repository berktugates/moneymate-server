import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

// user modelin özelliklerini tanımlayan interface tanımla
interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
}

//user modelini oluştur
class User extends Model<IUser> implements IUser {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
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
      unique:true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "user",
    timestamps: true,
  }
);

export default User;
