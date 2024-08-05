import { array, boolean, object, string, TypeOf, z } from 'zod';

export const addPostSchema = object({
  body: object({
    frenchContent: string({
      required_error: 'Post can not be empty.',
    }).min(1, 'You must provide a post.'),
    englishContent: string({
      required_error: 'Post can not be empty.',
    }).min(1, 'You must provide a post.'),
    categoryIds: string().array().nonempty('You must chose a category.'),
    frenchTitle: string({
      required_error: 'Title can not be empty',
    }).min(1, 'You must provide a title'),
    englishTitle: string({
      required_error: 'Title can not be empty',
    }).min(1, 'You must provide a title'),
  }),
});

export const addCategorySchema = object({
  body: object({
    categoryName: string({
      required_error: 'Category name is required.',
    }).min(1, 'You must provide a category name.'),
  }),
});

export const publishPostSchema = object({
  params: object({
    id: string({
      required_error: 'Post id is required.',
    }),
  }),
});

export const disablePostSchema = object({
  params: object({
    id: string({
      required_error: 'Post id is required.',
    }),
  }),
});

export type AddPostInput = TypeOf<typeof addPostSchema>['body'];
export type AddCategoryInput = TypeOf<typeof addCategorySchema>['body'];

export type PublishPostInput = TypeOf<typeof publishPostSchema>['params'];
export type DisablePostInput = TypeOf<typeof disablePostSchema>['params'];
