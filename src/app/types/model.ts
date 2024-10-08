export interface PostModel {
  id: number;
  title: string;
  body: string;
  User: UserModel;
  Subbedit: SubbeditModel;
  Comments: CommentModel[];
  upvote: number;
  userId?: number;
  subbeditId?: number;
  createdAt: string;
}

export interface SubbeditModel {
  id?: number;
  name: string;
}

export interface UserModel {
  id?: number;
  username: string;
  email: string;
}

export interface CommentModel {
  id?: number;
  body: string;
  upvote: number;
  User: UserModel;
  parentCommentId?: number;
}
