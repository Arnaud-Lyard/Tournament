import { NextFunction, Request, Response } from 'express';
import { getUserInformations } from '../../utils/getUserInformations';
import { IUser } from '../../types/user';
import {
  AddCommentInput,
  AddPostInput,
  AddResponseInput,
  EditPostInput,
  GetCommentInput,
  GetPostInput,
  PublishPostInput,
} from '../schema/post.schema';
import {
  addComment,
  addPost,
  addResponse,
  changePostStatus,
  checkIfPostExist,
  editPost,
  getAllPosts,
  getComment,
  getNewComment,
  getNewPosts,
  getPost,
  getPostBySlug,
  getPublishPosts,
  resetNewComment,
  resetNewPosts,
} from '../service/post.service';
import { AddCategoryInput } from '../schema/post.schema';
import { addCategory } from '../service/post.service';
import { getAllCategories } from '../service/post.service';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import AppError from '../../utils/appError';

export const addPostHandler = async (
  req: Request<{}, {}, AddPostInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = (await getUserInformations(req, next)) as IUser;

    await addPost({
      user,
      frenchContent: req.body.frenchContent,
      englishContent: req.body.englishContent,
      categoryIds: req.body.categoryIds,
      frenchTitle: req.body.frenchTitle,
      englishTitle: req.body.englishTitle,
      frenchDescription: req.body.frenchDescription,
      englishDescription: req.body.englishDescription,
      slug: req.body.slug,
      image: req.file,
    });

    const message = req.language === 'fr' ? "Ajout de l'article" : 'Blog added';
    res.status(200).json({
      status: 'success',
      message,
    });
  } catch (err: any) {
    next(err);
  }
};

export const addCategoryHandler = async (
  req: Request<{}, {}, AddCategoryInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    await addCategory({
      name: req.body.categoryName,
    });

    const message =
      req.language === 'fr' ? 'Ajout de la catégorie' : 'Category added';
    res.status(200).json({
      status: 'success',
      message,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getCategoriesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await getAllCategories();

    res.status(200).json({
      status: 'success',
      data: {
        categories,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const getPostsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const posts = await getAllPosts();

    res.status(200).json({
      status: 'success',
      datas: {
        posts,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const getPublishPostHandler = async (
  req: Request<PublishPostInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const postExist = await checkIfPostExist(req.params.id);

    if (!postExist) {
      const message =
        req.language === 'fr' ? 'Article introuvable' : 'Post not found';
      return res.status(404).json({
        status: 'fail',
        message,
      });
    }

    await changePostStatus({
      id: req.params.id,
      status: 'published',
    });

    const message = req.language === 'fr' ? 'Article publié' : 'Post published';
    res.status(200).json({
      status: 'success',
      message,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getDisablePostHandler = async (
  req: Request<PublishPostInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const postExist = await checkIfPostExist(req.params.id);

    if (!postExist) {
      const message =
        req.language === 'fr' ? 'Article introuvable' : 'Post not found';
      return res.status(404).json({
        status: 'fail',
        message,
      });
    }

    await changePostStatus({
      id: req.params.id,
      status: 'disabled',
    });

    const message =
      req.language === 'fr' ? 'Article désactivé' : 'Post disabled';
    res.status(200).json({
      status: 'success',
      message,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getPostHandler = async (
  req: Request<GetPostInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const post = await getPost(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        post,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const editPostHandler = async (
  req: Request<EditPostInput['params'], {}, EditPostInput['body']>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = (await getUserInformations(req, next)) as IUser;

    await editPost({
      user,
      id: req.params.id,
      frenchContent: req.body.frenchContent,
      englishContent: req.body.englishContent,
      categoryIds: req.body.categoryIds,
      frenchTitle: req.body.frenchTitle,
      englishTitle: req.body.englishTitle,
      frenchDescription: req.body.frenchDescription,
      englishDescription: req.body.englishDescription,
      slug: req.body.slug,
      image: req.file,
    });

    const message = req.language === 'fr' ? 'Article modifié' : 'Post edited';
    res.status(200).json({
      status: 'success',
      message,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getPublishPostsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const posts = await getPublishPosts();

    res.status(200).json({
      status: 'success',
      datas: {
        posts,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const getPostBySlugHandler = async (
  req: Request<{ slug: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const post = await getPostBySlug(req.params.slug);

    res.status(200).json({
      status: 'success',
      data: {
        post,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const addImageHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const uploadDirectory = path.join(__dirname, '../../../public/uploads');

    if (!fs.existsSync(uploadDirectory)) {
      fs.mkdirSync(uploadDirectory, { recursive: true });
    }

    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, uploadDirectory);
      },
      filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
      },
    });

    const upload = multer({
      storage: storage,
      limits: { fileSize: 5 * 1024 * 1024 },
    }).single('upload');
    upload(req, res, (err: any) => {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return next(
            new AppError(400, 'File size is too large. Maximum size is 5MB.')
          );
        } else {
          return next(
            new AppError(500, 'An unknown error occurred during file upload.')
          );
        }
      } else if (err) {
        return next(
          new AppError(500, 'An unknown error occurred during file upload.')
        );
      }
      res.status(200).json({
        url: process.env.SERVER_URL + '/uploads/' + req.file!.filename,
      });
    });
  } catch (err: any) {
    next(err);
  }
};

export const getNotificationHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = (await getUserInformations(req, next)) as IUser;
    const posts = await getNewPosts({ user });
    const comments = await getNewComment({ user });

    res.status(200).json({
      status: 'success',
      data: {
        posts,
        comments,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export async function getResetNotificationHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = (await getUserInformations(req, next)) as IUser;
    await resetNewPosts({ user });
    await resetNewComment({ user });

    res.status(200).json({
      status: 'success',
      message: 'Notifications reset',
    });
  } catch (err: any) {
    next(err);
  }
}

export const addCommentHandler = async (
  req: Request<{}, {}, AddCommentInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = (await getUserInformations(req, next)) as IUser;
    await addComment({
      user,
      postId: req.body.postId,
      comment: req.body.comment,
    });
    const message =
      req.language === 'fr' ? 'Commentaire ajouté' : 'Comment added';
    res.status(200).json({
      status: 'success',
      message,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getCommentHandler = async (
  req: Request<GetCommentInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const comments = await getComment(req.params.postId);

    res.status(200).json({
      status: 'success',
      data: {
        comments,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const addResponseHandler = async (
  req: Request<AddResponseInput['params'], {}, AddResponseInput['body']>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = (await getUserInformations(req, next)) as IUser;

    await addResponse({
      user,
      postId: req.params.postid,
      comment: req.body.comment,
      parentId: req.body.parentId,
    });

    const message =
      req.language === 'fr' ? 'Réponse ajoutée' : 'Response added';
    res.status(200).json({
      status: 'success',
      message,
    });
  } catch (err: any) {
    next(err);
  }
};
