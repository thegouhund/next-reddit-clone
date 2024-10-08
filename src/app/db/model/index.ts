import Comment from "./Comment";
import Post from "./Post";
import Subbedit from "./Subbedit";
import User from "./User";

User.hasMany(Post, { foreignKey: { allowNull: false, name: "userId" } });
Post.belongsTo(User, { foreignKey: { allowNull: false, name: "userId" } });

Subbedit.hasMany(Post, {
  foreignKey: { allowNull: false, name: "subbeditId" },
});
Post.belongsTo(Subbedit, {
  foreignKey: { allowNull: false, name: "subbeditId" },
});

User.hasMany(Comment, { foreignKey: { allowNull: false, name: "userId" } });
Post.hasMany(Comment, { foreignKey: { allowNull: false, name: "postId" } });
Comment.belongsTo(User, { foreignKey: { allowNull: false, name: "userId" } });

Comment.belongsTo(Post, { foreignKey: { allowNull: false, name: "postId" } });
Comment.belongsTo(Comment, {
  foreignKey: { allowNull: true, name: "parentCommentId" },
});
Comment.hasMany(Comment, {
  foreignKey: { allowNull: true, name: "parentCommentId" },
});

export { Comment, Post, Subbedit, User };
