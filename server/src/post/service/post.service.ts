import { IUser } from '../../types/user';
import { PostRepository } from '../repository/post.repository';
import { File } from '../../types/file';
import { PostStatusEnumType } from '@prisma/client';
import { IPostUpdateDto } from '../dto/post.dto';
import AppError from '../../utils/appError';
import { UserRepository } from '../../user/repository/user.repository';
import { removeResizedImages } from '../../utils/removeImage';
import {
  EditPostInput,
  GetPostInput,
  PublishPostInput,
} from '../schema/post.schema';
import { NextFunction, Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import { promisify } from 'util';

export const postService = {
  addPost: async ({
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
    image: File | undefined;
  }) => {
    try {
      const users = await UserRepository.findAll();
      return await PostRepository.create({
        user,
        frenchContent,
        englishContent,
        frenchDescription,
        englishDescription,
        frenchTitle,
        englishTitle,
        slug,
        categoryIds,
        image: image!.filename,
        users,
      });
    } catch (err: any) {
      throw new AppError(400, 'Error while creating post.');
    }
  },

  addCategory: async ({ name }: { name: string }) => {
    return await PostRepository.createCategory({
      name,
    });
  },

  getAllCategories: async () => {
    return await PostRepository.getAllCategories();
  },

  getAllPosts: async () => {
    return await PostRepository.getAllPosts();
  },

  checkIfPostExist: async (id: string) => {
    return await PostRepository.getPostById(id);
  },

  changePostStatus: async ({
    req,
    status,
  }: {
    req: Request<PublishPostInput>;
    status: PostStatusEnumType;
  }) => {
    try {
      const postExist = await postService.checkIfPostExist(req.params.id);

      if (!postExist) {
        throw new AppError(404, 'Post not found.');
      }
      return await PostRepository.changeStatusByPostId({
        id: postExist.id,
        status,
      });
    } catch (err: any) {
      throw new AppError(400, 'Error while updating post.');
    }
  },

  getPost: async (req: Request<GetPostInput>) => {
    return await PostRepository.getPostById(req.params.id);
  },

  editPost: async ({
    user,
    req,
  }: {
    user: IUser;
    req: Request<EditPostInput['params'], {}, EditPostInput['body']>;
  }) => {
    const postUpdate: IPostUpdateDto = {
      id: req.params.id,
      frenchContent: req.body.frenchContent,
      englishContent: req.body.englishContent,
      frenchTitle: req.body.frenchTitle,
      englishTitle: req.body.englishTitle,
      frenchDescription: req.body.frenchDescription,
      englishDescription: req.body.englishDescription,
      slug: req.body.slug,
      categoryIds: req.body.categoryIds,
      image: null,
    };
    const fileAttached = req.file;
    try {
      const postHasImage = await PostRepository.findByPostId(postUpdate.id);

      if (!postHasImage) {
        throw new AppError(404, 'Post not found.');
      }

      if (!fileAttached && postHasImage.image) {
        postUpdate.image = postHasImage.image;
      }

      if (fileAttached && postHasImage.image) {
        postUpdate.image = fileAttached.filename;
        await removeResizedImages({
          filename: postHasImage.image,
          environment: process.env.NODE_ENV!,
        });
      }
      await PostRepository.updatePost(postUpdate);
    } catch (err: any) {
      throw new AppError(400, 'Error while updating post.');
    }
  },

  getPublishPosts: async () => {
    return await PostRepository.getPublishPosts();
  },

  getPostBySlug: async (req: Request<{ slug: string }>) => {
    return await PostRepository.getPostBySlug(req.params.slug);
  },

  getNewPosts: async ({ user }: { user: IUser }) => {
    return await PostRepository.getNewPosts({ user });
  },

  resetNewPosts: async ({ user }: { user: IUser }) => {
    const posts = await PostRepository.findAll();
    return await PostRepository.resetNewPosts({ posts, user });
  },

  addComment: async ({ user, req }: { user: IUser; req: Request }) => {
    return await PostRepository.addComment({
      user,
      postId: req.body.postId,
      comment: req.body.comment,
    });
  },

  getComment: async (req: Request) => {
    return await PostRepository.getComment(req.params.postId);
  },

  addResponse: async ({ user, req }: { user: IUser; req: Request }) => {
    return await PostRepository.addResponse({
      user,
      postId: req.params.postid,
      comment: req.body.comment,
      parentId: req.body.parentId,
    });
  },

  getNewComment: async ({ user }: { user: IUser }) => {
    return await PostRepository.getNewComment({ user });
  },

  resetNewComment: async ({ user }: { user: IUser }) => {
    return await PostRepository.resetNewComment({ user });
  },

  uploadImage: async (req: Request, res: Response, next: NextFunction) => {
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
    const uploadAsync = promisify(upload);

    try {
      await uploadAsync(req, res);

      if (!req.file) {
        return next(new AppError(400, 'No file uploaded.'));
      }

      res.status(200).json({
        filename: req.file.filename,
        url: process.env.SERVER_URL + '/uploads/' + req.file.filename,
      });
    } catch (err: any) {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return next(
            new AppError(400, 'File size is too large. Maximum size is 5MB.')
          );
        }
      }
      return next(
        new AppError(500, 'An unknown error occurred during file upload.')
      );
    }
  },
};
