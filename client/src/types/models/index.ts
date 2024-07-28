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
  title: string;
  content: string;
  author: string;
  status: IStatusEnumType;
  createdAt: Date;
  updatedAt: Date;
}

export type IStatusEnumType = 'published' | 'draft' | 'disabled';

export interface ICategory {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
