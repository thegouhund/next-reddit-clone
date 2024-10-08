import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection";

class Comment extends Model {}

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
    hooks: {
      afterCreate: async (comment) => {
        await sequelize.query(
          `UPDATE post SET commentCount = commentCount + 1 WHERE id = ${comment.postId}`,
        );
      },
      afterDestroy: async (comment) => {
        await sequelize.query(
          `UPDATE post SET commentCount = commentCount - 1 WHERE id = ${comment.postId}`,
        );
      },
    },
  },
);

export default Comment;
