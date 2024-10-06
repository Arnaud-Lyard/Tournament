import { NextFunction, Request, Response } from 'express';
import { IUser } from '../../types/user';
import AppError from '../../utils/appError';
import { getUserInformations } from '../../utils/getUserInformations';
import { validateToken } from '../../utils/validateToken';
import { UnsubscribeUserInput, UpdateUserInput } from '../schema/user.schema';
import { userService } from '../service/user.service';

export const getUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = (await getUserInformations(req, next)) as IUser;
    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const getMeHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const access_token = validateToken(req);
    const user = await userService.getUserInformationsByToken(access_token);

    res.status(200).json({
      status: 'success',
      data: {
        isConnect: Boolean(user),
        informations: user,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const updateUserHandler = async (
  req: Request<{}, {}, UpdateUserInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = (await getUserInformations(req, next)) as IUser;
    await userService.updateUser({
      user,
      req,
    });

    res.status(200).json({
      status: 'success',
      message: req.language === 'fr' ? 'Profil mis à jour' : 'Profile updated',
    });
  } catch (err: any) {
    next(err);
  }
};

export const getProfileHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = (await getUserInformations(req, next)) as IUser;

    res.status(200).json({
      status: 'success',
      data: { user },
    });
  } catch (err: any) {
    next(err);
  }
};

export const getUnsubscribeHandler = async (
  req: Request<UnsubscribeUserInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    await userService.unSubscribeUser(req, next);

    res.status(200).json({
      status: 'success',
      message:
        req.language === 'fr'
          ? 'Vous avez été désinscrit avec succès'
          : 'You have been successfully unsubscribed',
    });
  } catch (err: any) {
    next(err);
  }
};
