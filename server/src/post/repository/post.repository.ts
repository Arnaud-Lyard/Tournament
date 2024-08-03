import { IUser } from '../../types/user';
import prisma from '../../../prisma/client';
import { Category, Post } from '@prisma/client';
import { File } from '../../types/file';

export class PostRepository {
  static async create({
    user,
    content,
    categoryIds,
    title,
    image,
  }: {
    user: IUser;
    content: string;
    categoryIds: string[];
    title: string;
    image: string;
  }): Promise<Post> {
    return await prisma.post.create({
      data: {
        title,
        content,
        image,
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

  static async getAllPosts(): Promise<Post[]> {
    return await prisma.post.findMany({
      include: {
        categories: {
          select: {
            category: true,
          },
        },
        user: {
          select: {
            username: true,
          },
        },
      },
    });
  }
}
