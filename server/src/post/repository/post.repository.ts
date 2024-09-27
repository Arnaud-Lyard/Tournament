import { IUser } from '../../types/user';
import prisma from '../../../prisma/client';
import { Category, Post, User } from '@prisma/client';
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
    users,
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
    users: IUser[];
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
        postsOnUsers: {
          create: users.map((user) => ({
            user: { connect: { id: user.id } },
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
      orderBy: {
        createdAt: 'desc',
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
      orderBy: {
        createdAt: 'desc',
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

  static async findAll(): Promise<Post[]> {
    return await prisma.post.findMany();
  }

  static async getNewPosts({ user }: { user: IUser }): Promise<Post[]> {
    return await prisma.post.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 1,
      where: {
        status: PostStatusEnumType.published,
        postsOnUsers: {
          some: {
            isRead: false,
            userId: user.id,
          },
        },
      },
    });
  }

  static async resetNewPosts({ posts, user }: { posts: Post[]; user: IUser }) {
    return await prisma.postsOnUsers.updateMany({
      where: {
        postId: {
          in: posts.map((post) => post.id),
        },
        userId: user.id,
        post: {
          status: PostStatusEnumType.published,
        },
      },
      data: {
        isRead: true,
      },
    });
  }

  static async addComment({
    user,
    postId,
    comment,
  }: {
    user: IUser;
    postId: string;
    comment: string;
  }) {
    return await prisma.comment.create({
      data: {
        content: comment,
        user: {
          connect: {
            id: user.id,
          },
        },
        post: {
          connect: {
            id: postId,
          },
        },
      },
    });
  }

  static async getComment(postId: string) {
    return await prisma.comment.findMany({
      where: {
        postId,
      },
      include: {
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });
  }

  static async addResponse({
    user,
    postId,
    comment,
    parentId,
  }: {
    user: IUser;
    postId: string;
    comment: string;
    parentId: string;
  }) {
    return await prisma.comment.create({
      data: {
        content: comment,
        user: {
          connect: {
            id: user.id,
          },
        },
        post: {
          connect: {
            id: postId,
          },
        },
        parent: {
          connect: {
            id: parentId,
          },
        },
      },
    });
  }

  static async getNewComment({ user }: { user: IUser }) {
    return await prisma.comment.findMany({
      take: 1,
      where: {
        post: {
          user: {
            id: user.id,
          },
        },
        parentId: {
          not: null,
        },
        isRead: false,
      },
      include: {
        post: {
          select: {
            slug: true,
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

  static async resetNewComment({ user }: { user: IUser }) {
    return await prisma.comment.updateMany({
      where: {
        post: {
          user: {
            id: user.id,
          },
        },
        parentId: {
          not: null,
        },
        isRead: false,
      },
      data: {
        isRead: true,
      },
    });
  }
}
