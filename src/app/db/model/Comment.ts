import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection";

class Comment extends Model {
  postId: number | undefined;
  userId: number | undefined;
  parentCommentId: number | undefined;
}

Comment.init(
  {
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    upvote: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    parentCommentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Comment",
    tableName: "comment",
  },
);

export default Comment;
