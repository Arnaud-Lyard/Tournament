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
