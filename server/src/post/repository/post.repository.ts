import { IUser } from '../../types/user';
import prisma from '../../../prisma/client';
import { Category, Post } from '@prisma/client';
import { File } from '../../types/file';
import { PostStatusEnumType } from '@prisma/client';
import { IPostUpdateDto } from '../dto/post.dto';

export class PostRepository {
  static async create({
    user,
    frenchContent,
    englishContent,
    frenchTitle,
    englishTitle,
    frenchDescription,
    englishDescription,
    slug,
    categoryIds,
    image,
  }: {
    user: IUser;
    frenchContent: string;
    englishContent: string;
    frenchTitle: string;
    englishTitle: string;
    frenchDescription: string;
    englishDescription: string;
    slug: string;
    categoryIds: string[];
    image: string;
  }): Promise<Post> {
    return await prisma.post.create({
      data: {
        frenchTitle,
        englishTitle,
        frenchDescription,
        englishDescription,
        slug,
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

  static async findByPostId(id: string): Promise<Post | null> {
    return await prisma.post.findUnique({
      where: {
        id,
      },
    });
  }

  static async updatePost(postUpdate: IPostUpdateDto) {
    const {
      id,
      frenchContent,
      englishContent,
      frenchTitle,
      englishTitle,
      frenchDescription,
      englishDescription,
      slug,
      image,
      categoryIds,
    } = postUpdate;
    return await prisma.post.update({
      where: {
        id,
      },
      data: {
        frenchContent,
        englishContent,
        frenchTitle,
        englishTitle,
        frenchDescription,
        englishDescription,
        slug,
        categories: {
          deleteMany: {},
          create: categoryIds.map((categoryId) => ({
            category: { connect: { id: categoryId } },
          })),
        },
        image: image || undefined,
      },
    });
  }

  static async getPublishPosts(): Promise<Post[] | null> {
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
            avatar: true,
          },
        },
      },
      where: {
        status: PostStatusEnumType.published,
      },
    });
  }
  static async getPostBySlug(slug: string): Promise<Post | null> {
    return await prisma.post.findFirst({
      where: {
        slug,
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
            avatar: true,
          },
        },
      },
    });
  }
}
