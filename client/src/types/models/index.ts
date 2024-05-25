export interface IUser {
  id: string;
  pseudo: string;
  email: string;
  role?: IRoleEnumType | null;
  notification: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type IRoleEnumType = 'user' | 'admin';
