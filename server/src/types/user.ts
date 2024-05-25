import { RoleEnumType } from '@prisma/client';

export interface IUser {
  id: string;
  pseudo: string;
  email: string;
  role?: RoleEnumType | null;
  notification: boolean | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserInformations {
  role: RoleEnumType | null;
  pseudo: string;
}
