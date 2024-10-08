import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection";

class User extends Model {
  username: string | undefined;
  id: unknown;
}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "user",
  },
);

export default User;
