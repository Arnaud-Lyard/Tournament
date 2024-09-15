export interface IUser {
  id: string;
  username: string;
  email: string;
  role?: IRoleEnumType | null;
  notification: boolean;
  avatar: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export type IRoleEnumType = 'user' | 'admin';

export interface IPost {
  id: string;
  frenchTitle: string;
  englishTitle: string;
  frenchDescription: string;
  englishDescription: string;
  frenchContent: string;
  englishContent: string;
  slug: string;
  authorId: string;
  status: IStatusEnumType;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export type IStatusEnumType = 'published' | 'draft' | 'disabled';

export interface ICategory {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IComment {
  id: string;
  content: string;
  postId: string;
  userId: string;
  parentId: string | null;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPostCategoryUser extends IPost {
  categories: { category: ICategory }[];
  user: {
    username: IUser['username'];
    avatar: IUser['avatar'];
  };
}

export interface ICommentUser extends IComment {
  user: {
    username: IUser['username'];
    avatar: IUser['avatar'];
  };
}

export interface ICommentPost extends IComment {
  post: {
    slug: IPost['slug'];
  };
  user: {
    username: IUser['username'];
  };
}
