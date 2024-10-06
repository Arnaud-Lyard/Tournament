import { Prisma } from '@prisma/client';
import { NextFunction, Request } from 'express';
import { PostRepository } from '../../post/repository/post.repository';
import { IUser, IUserInformations } from '../../types/user';
import AppError from '../../utils/appError';
import { signJwt, verifyJwt } from '../../utils/jwt';
import { removeImage } from '../../utils/removeImage';
import { IUserUpdateDto, UserDto } from '../dto/user.dto';
import { UserRepository } from '../repository/user.repository';
import { UnsubscribeUserInput, UpdateUserInput } from '../schema/user.schema';

export const userService = {
  createUser: async (user: UserDto) => {
    return await UserRepository.createUser(user);
  },

  switchVerificationCode: async ({
    userId,
    verificationCode,
  }: {
    userId: string;
    verificationCode: string | null;
  }) => {
    return await UserRepository.switchVerificationCode({
      userId,
      verificationCode,
    });
  },

  checkIfEmailExist: async (email: string) => {
    return await UserRepository.findByEmail(email);
  },

  findUniqueUser: async (userId: string): Promise<IUser | null> => {
    return await UserRepository.findByUserId(userId);
  },

  findByEmail: async (email: string) => {
    return await UserRepository.findByEmail(email);
  },

  findUserByVerificationCode: async (verificationCode: string) => {
    return await UserRepository.findUserByVerificationCode(verificationCode);
  },

  verifyUser: async (userId: string) => {
    return await UserRepository.verifyUser(userId);
  },

  updateResetPasswordToken: async ({
    userId,
    passwordResetToken,
    passwordResetAt,
  }: {
    userId: string;
    passwordResetToken: string | null;
    passwordResetAt: Date | null;
  }) => {
    return await UserRepository.updateResetPasswordToken({
      userId,
      passwordResetToken,
      passwordResetAt,
    });
  },

  findUserByPasswordResetToken: async ({
    passwordResetToken,
  }: {
    passwordResetToken: string;
  }) => {
    return await UserRepository.findUserByPasswordResetToken(
      passwordResetToken
    );
  },

  updateUserPassword: async ({
    userId,
    hashedPassword,
    passwordResetToken,
    passwordResetAt,
  }: {
    userId: string;
    hashedPassword: string;
    passwordResetToken: null;
    passwordResetAt: null;
  }) => {
    return await UserRepository.updateUserPassword({
      userId,
      hashedPassword,
      passwordResetToken,
      passwordResetAt,
    });
  },

  updateUser: async ({
    user,
    req,
  }: {
    user: IUser;
    req: Request<{}, {}, UpdateUserInput>;
  }) => {
    const { username, notification } = req.body;
    const avatar = req.file;
    const userUpdate: IUserUpdateDto = {
      id: user.id,
      username,
      notification: notification === 'true' ? true : false,
      avatar: null,
    };
    try {
      const userHasImage = await UserRepository.findByUserId(user.id);

      if (!avatar && !userHasImage!.avatar) {
        userUpdate.avatar = user.avatar;
      }

      if (!avatar && userHasImage!.avatar) {
        userUpdate.avatar = userHasImage!.avatar;
      }

      if (avatar && !userHasImage!.avatar) {
        userUpdate.avatar = avatar.filename;
      }

      if (avatar && userHasImage!.avatar) {
        userUpdate.avatar = avatar.filename;
        if (userHasImage!.avatar !== 'user.png') {
          await removeImage({
            filename: userHasImage!.avatar,
            environment: process.env.NODE_ENV,
          });
        }
      }
      await UserRepository.updateUser(userUpdate);
    } catch (err: any) {
      throw new AppError(400, 'Erreur lors de la mise à jour du profil.');
    }
  },

  getUserInformations: async (userId: string) => {
    return await UserRepository.getUserInformations(userId);
  },

  disabledEmail: async (userId: string) => {
    return await UserRepository.disabledEmail(userId);
  },

  associateUserToAllPosts: async (userId: string) => {
    try {
      const posts = await PostRepository.findAll();
      await UserRepository.associateUserToAllPosts({ userId, posts });
    } catch (err: any) {
      throw new AppError(400, 'Erreur lors de l association des posts.');
    }
  },

  getUserInformationsByToken: async (
    access_token: string | null
  ): Promise<IUserInformations | null> => {
    // Avoid error if no access token
    if (!access_token) return null;

    // Validate the access token
    const decoded = verifyJwt<{ sub: string }>(access_token);
    if (!decoded) return null;

    // Check if the user still exist
    const user = await userService.findUniqueUser(decoded.sub);
    if (!user) return null;

    const userInfos = await userService.getUserInformations(user.id);
    return userInfos;
  },

  signTokens: async (user: Prisma.UserCreateInput) => {
    const access_token = signJwt(
      { sub: user.id },
      {
        expiresIn: `${process.env.ACCESS_TOKEN_EXPIRES_IN}m`,
      }
    );

    return { access_token };
  },

  unSubscribeUser: async (
    req: Request<UnsubscribeUserInput>,
    next: NextFunction
  ) => {
    try {
      const user = await userService.findUniqueUser(req.params.id);
      if (!user) {
        return next(
          new AppError(
            404,
            req.language === 'fr' ? 'Utilisateur non trouvé' : 'User not found'
          )
        );
      }
      await userService.disabledEmail(user.id);
    } catch (err: any) {
      next(err);
    }
  },
};
