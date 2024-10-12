import { User, Post } from '@prisma/client';
import prisma from '../../prisma/client';
import { IUserInformations, IUser } from './user.type';
import { IUpdateDto, ICreateDto } from './user.dto';

export interface IUserRepository {
  createUser(user: ICreateDto): Promise<User>;
  switchVerificationCode({
    userId,
    verificationCode,
  }: {
    userId: string;
    verificationCode: string | null;
  }): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findUserByVerificationCode(verificationCode: string): Promise<User | null>;
  verifyUser(userId: string): Promise<User>;
  updateResetPasswordToken({
    userId,
    passwordResetToken,
    passwordResetAt,
  }: {
    userId: string;
    passwordResetToken: string | null;
    passwordResetAt: Date | null;
  }): Promise<User>;
  findUserByPasswordResetToken(
    passwordResetToken: string
  ): Promise<User | null>;
  updateUserPassword({
    userId,
    hashedPassword,
    passwordResetToken,
    passwordResetAt,
  }: {
    userId: string;
    hashedPassword: string;
    passwordResetToken: null;
    passwordResetAt: null;
  }): Promise<User>;
  findByUserId(userId: string): Promise<IUser | null>;
  updateUser(userUpdate: IUpdateDto): Promise<User>;
  getUserInformations(userId: string): Promise<IUserInformations | null>;
  disabledEmail(userId: string): Promise<User>;
  findAll(): Promise<User[]>;
  associateUserToAllPosts({
    userId,
    posts,
  }: {
    userId: string;
    posts: Post[];
  }): Promise<User>;
}

export class UserRepository implements IUserRepository {
  async createUser(user: ICreateDto): Promise<User> {
    return await prisma.user.create({
      data: user,
    });
  }

  async switchVerificationCode({
    userId,
    verificationCode,
  }: {
    userId: string;
    verificationCode: string | null;
  }): Promise<User> {
    return await prisma.user.update({
      where: { id: userId },
      data: { verificationCode },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findFirst({
      where: { email },
    });
  }

  async findUserByVerificationCode(
    verificationCode: string
  ): Promise<User | null> {
    return await prisma.user.findFirst({
      where: { verificationCode },
    });
  }

  async verifyUser(userId: string): Promise<User> {
    return await prisma.user.update({
      where: { id: userId },
      data: { verified: true, verificationCode: null },
    });
  }

  async updateResetPasswordToken({
    userId,
    passwordResetToken,
    passwordResetAt,
  }: {
    userId: string;
    passwordResetToken: string | null;
    passwordResetAt: Date | null;
  }): Promise<User> {
    return await prisma.user.update({
      where: { id: userId },
      data: { passwordResetToken, passwordResetAt },
    });
  }

  async findUserByPasswordResetToken(
    passwordResetToken: string
  ): Promise<User | null> {
    return await prisma.user.findFirst({
      where: { passwordResetToken, passwordResetAt: { gt: new Date() } },
    });
  }

  async updateUserPassword({
    userId,
    hashedPassword,
    passwordResetToken,
    passwordResetAt,
  }: {
    userId: string;
    hashedPassword: string;
    passwordResetToken: null;
    passwordResetAt: null;
  }): Promise<User> {
    return await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword, passwordResetToken, passwordResetAt },
    });
  }

  async findByUserId(userId: string): Promise<IUser | null> {
    const user = await prisma.user.findFirst({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        email: true,
        notification: true,
        avatar: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return user;
  }

  async updateUser(userUpdate: IUpdateDto): Promise<User> {
    const { id, username, notification, avatar } = userUpdate;
    return await prisma.user.update({
      where: { id },
      data: { username, notification, avatar },
    });
  }

  async getUserInformations(userId: string): Promise<IUserInformations | null> {
    return await prisma.user.findFirst({
      where: { id: userId },
      select: {
        role: true,
        username: true,
        avatar: true,
        notification: true,
      },
    });
  }

  async disabledEmail(userId: string): Promise<User> {
    return await prisma.user.update({
      where: { id: userId },
      data: { mailSubscription: false },
    });
  }

  async findAll(): Promise<User[]> {
    return await prisma.user.findMany();
  }

  async associateUserToAllPosts({
    userId,
    posts,
  }: {
    userId: string;
    posts: Post[];
  }) {
    return await prisma.user.update({
      where: { id: userId },
      data: {
        postsOnUsers: {
          create: posts.map((post) => ({
            post: { connect: { id: post.id } },
          })),
        },
      },
    });
  }
}
