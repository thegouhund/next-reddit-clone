import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection";
import { PostModel } from "@/app/types/model";

class Subbedit extends Model {
  username: string | undefined;
  Posts: PostModel | undefined;
}

Subbedit.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "Subbedit",
    tableName: "subbedit",
  },
);

export default Subbedit;
