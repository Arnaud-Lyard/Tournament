export interface IUser {
  id: number;
  pseudo: string;
  email: string;
  role: IRoleEnumType;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
}

export type IRoleEnumType = 'user' | 'admin';
