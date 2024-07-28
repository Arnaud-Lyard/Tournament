import { IUser } from '../../types/user';
import prisma from '../../../prisma/client';
import { Category, Post } from '@prisma/client';

export class PostRepository {
  static async create({
    user,
    content,
    categoryIds,
    title,
  }: {
    user: IUser;
    content: string;
    categoryIds: string[];
    title: string;
  }): Promise<Post> {
    return await prisma.post.create({
      data: {
        title,
        content,
        user: {
          connect: {
            id: user.id,
          },
        },
        categories: {
          create: categoryIds.map((categoryId) => ({
            category: { connect: { id: categoryId } },
          })),
        },
      },
      include: {
        categories: true,
      },
    });
  }

  static async createCategory({ name }: { name: string }): Promise<Category> {
    return await prisma.category.create({
      data: {
        name,
      },
    });
  }

  static async getAllCategories(): Promise<Category[]> {
    return await prisma.category.findMany();
  }
}
