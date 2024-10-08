import { sequelize } from "./connection";
import { Comment, Post, Subbedit, User } from "./model";
// import relation from "@models/index";

const syncAllModel = async () => {
  // relation();
  await sequelize.query("SET FOREIGN_KEY_CHECKS = 0");
  await User.sync({ force: true }); // 1
  await Subbedit.sync({ force: true }); // 2
  await Post.sync({ force: true }); // 3
  await Comment.sync({ force: true }); // 4
  await sequelize.query("SET FOREIGN_KEY_CHECKS = 1");

  // sequelize.sync({ force: true });
};
syncAllModel();
