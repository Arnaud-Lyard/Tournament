import { IUser } from '../../types/user';
import prisma from '../../../prisma/client';
import { Category, Post } from '@prisma/client';
import { File } from '../../types/file';
import { PostStatusEnumType } from '@prisma/client';

export class PostRepository {
  static async create({
    user,
    frenchContent,
    englishContent,
    frenchTitle,
    englishTitle,
    categoryIds,
    image,
  }: {
    user: IUser;
    frenchContent: string;
    englishContent: string;
    frenchTitle: string;
    englishTitle: string;
    categoryIds: string[];
    image: string;
  }): Promise<Post> {
    return await prisma.post.create({
      data: {
        frenchTitle,
        englishTitle,
        frenchContent,
        englishContent,
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

  static async getPostById(id: string): Promise<Post | null> {
    return await prisma.post.findUnique({
      where: {
        id,
      },
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

  static async changeStatusByPostId({
    id,
    status,
  }: {
    id: string;
    status: PostStatusEnumType;
  }): Promise<Post> {
    return await prisma.post.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
  }
}
