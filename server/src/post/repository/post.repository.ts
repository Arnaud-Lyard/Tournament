import {IUser} from "../../types/user";
import prisma from '../../../prisma/client';
import { Post } from '@prisma/client';

export class PostRepository {
  static async create({
    user,
    content,
  }: {
    user: IUser;
    content: string;
  }): Promise<Post> {
    return await prisma.post.create({
      data: {
        title: 'titre',
        content,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });
  }

  static async createCategory({
        user,
        name,
      }: {
    user: IUser;
    name: string;
  }): Promise<Category> {
    return await prisma.category.create({
      data: {
        name,
      },
    });
  }
}