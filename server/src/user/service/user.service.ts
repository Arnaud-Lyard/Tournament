import { Prisma, PrismaClient, User } from '@prisma/client';
import { IUser } from '../../types/user';
import AppError from '../../utils/appError';
import { signJwt } from '../../utils/jwt';
import { IUserUpdateDto, UserDto } from '../dto/user.dto';
import { UserRepository } from '../repository/user.repository';
import { File } from '../../types/file';
import { removeExistingImages } from '../../utils/removeExistingImages';
export const createUser = async (user: UserDto) => {
  return await UserRepository.createUser(user);
};

export async function switchVerificationCode({
  userId,
  verificationCode,
}: {
  userId: string;
  verificationCode: string | null;
}) {
  return await UserRepository.switchVerificationCode({
    userId,
    verificationCode,
  });
}

export async function checkIfEmailExist(email: string): Promise<User | null> {
  return await UserRepository.findByEmail(email);
}

export const signTokens = async (user: Prisma.UserCreateInput) => {
  const access_token = signJwt(
    { sub: user.id },
    {
      expiresIn: `${process.env.ACCESS_TOKEN_EXPIRES_IN}m`,
    }
  );

  return { access_token };
};

export async function findUniqueUser(userId: string): Promise<IUser | null> {
  return await UserRepository.findByUserId(userId);
}

export async function findByEmail(email: string): Promise<User | null> {
  return await UserRepository.findByEmail(email);
}

export async function findUserByVerificationCode(
  verificationCode: string
): Promise<User | null> {
  return await UserRepository.findUserByVerificationCode(verificationCode);
}

export async function verifyUser(userId: string) {
  return await UserRepository.verifyUser(userId);
}

export async function updateResetPasswordToken({
  userId,
  passwordResetToken,
  passwordResetAt,
}: {
  userId: string;
  passwordResetToken: string | null;
  passwordResetAt: Date | null;
}) {
  return await UserRepository.updateResetPasswordToken({
    userId,
    passwordResetToken,
    passwordResetAt,
  });
}

export async function findUserByPasswordResetToken({
  passwordResetToken,
}: {
  passwordResetToken: string;
}) {
  return await UserRepository.findUserByPasswordResetToken(passwordResetToken);
}

export async function updateUserPassword({
  userId,
  hashedPassword,
  passwordResetToken,
  passwordResetAt,
}: {
  userId: string;
  hashedPassword: string;
  passwordResetToken: null;
  passwordResetAt: null;
}) {
  return await UserRepository.updateUserPassword({
    userId,
    hashedPassword,
    passwordResetToken,
    passwordResetAt,
  });
}

export async function updateUser({
  user,
  username,
  notification,
  avatar,
}: {
  user: IUser;
  username: string;
  notification: boolean;
  avatar: File | undefined;
}) {
  const userUpdate: IUserUpdateDto = {
    id: user.id,
    username,
    notification,
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
      await removeExistingImages({
        filename: userHasImage!.avatar,
        environment: process.env.NODE_ENV,
      });
    }
    await UserRepository.updateUser(userUpdate);
  } catch (err: any) {
    throw new AppError(400, 'Erreur lors de la mise à jour du profil.');
  }
}

export async function getUserInformations(userId: string) {
  return await UserRepository.getUserInformations(userId);
}

export async function disabledEmail(userId: string) {
  return await UserRepository.disabledEmail(userId);
}
