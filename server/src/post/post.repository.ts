import { Category, Comment, Post, PostStatusEnumType } from '@prisma/client';
import prisma from '../../prisma/client';
import { IUser } from '../user/user.type';
import { IPostUpdateDto } from './post.dto';

export interface IPostRepository {
  create({
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
  }): Promise<Post>;

  createCategory({ name }: { name: string }): Promise<Category>;

  getAllCategories(): Promise<Category[]>;

  getAllPosts(): Promise<Post[]>;

  getPostById(id: string): Promise<Post | null>;

  changeStatusByPostId({
    id,
    status,
  }: {
    id: string;
    status: PostStatusEnumType;
  }): Promise<Post>;

  findByPostId(id: string): Promise<Post | null>;

  updatePost(postUpdate: IPostUpdateDto): Promise<Post>;

  getPublishPosts(): Promise<Post[] | null>;

  getPostBySlug(slug: string): Promise<Post | null>;

  findAll(): Promise<Post[]>;

  getNewPosts({ user }: { user: IUser }): Promise<Post[]>;

  resetNewPosts({ posts, user }: { posts: Post[]; user: IUser }): Promise<void>;

  addComment({
    user,
    postId,
    comment,
  }: {
    user: IUser;
    postId: string;
    comment: string;
  }): Promise<Comment>;

  getComment(postId: string): Promise<Comment[]>;

  addResponse({
    user,
    postId,
    comment,
    parentId,
  }: {
    user: IUser;
    postId: string;
    comment: string;
    parentId: string;
  }): Promise<Comment>;

  getNewComment({ user }: { user: IUser }): Promise<Comment[]>;

  resetNewComment({ user }: { user: IUser }): Promise<void>;
}
export class PostRepository implements IPostRepository {
  async create({
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

  async createCategory({ name }: { name: string }): Promise<Category> {
    return await prisma.category.create({
      data: {
        name,
      },
    });
  }

  async getAllCategories(): Promise<Category[]> {
    return await prisma.category.findMany();
  }

  async getAllPosts(): Promise<Post[]> {
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

  async getPostById(id: string): Promise<Post | null> {
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

  async changeStatusByPostId({
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

  async findByPostId(id: string): Promise<Post | null> {
    return await prisma.post.findUnique({
      where: {
        id,
      },
    });
  }

  async updatePost(postUpdate: IPostUpdateDto) {
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

  async getPublishPosts(): Promise<Post[] | null> {
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
  async getPostBySlug(slug: string): Promise<Post | null> {
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

  async findAll(): Promise<Post[]> {
    return await prisma.post.findMany();
  }

  async getNewPosts({ user }: { user: IUser }): Promise<Post[]> {
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

  async resetNewPosts({
    posts,
    user,
  }: {
    posts: Post[];
    user: IUser;
  }): Promise<void> {
    await prisma.postsOnUsers.updateMany({
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

  async addComment({
    user,
    postId,
    comment,
  }: {
    user: IUser;
    postId: string;
    comment: string;
  }): Promise<Comment> {
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

  async getComment(postId: string): Promise<Comment[]> {
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

  async addResponse({
    user,
    postId,
    comment,
    parentId,
  }: {
    user: IUser;
    postId: string;
    comment: string;
    parentId: string;
  }): Promise<Comment> {
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

  async getNewComment({ user }: { user: IUser }): Promise<Comment[]> {
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

  async resetNewComment({ user }: { user: IUser }): Promise<void> {
    await prisma.comment.updateMany({
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
