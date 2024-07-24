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

export interface IBlog {
  id: string;
  title: string;
  content: string;
  status: IStatusEnumType;
  creationDate: Date;
  updatedDate: Date;
}

export type IStatusEnumType = 'published' | 'in progress' | 'disabled';