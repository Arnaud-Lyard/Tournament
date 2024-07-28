import { array, boolean, object, string, TypeOf, z } from 'zod';

export const addPostSchema = object({
  body: object({
    post: string({
      required_error: 'Post can not be empty.',
    }).min(1, 'You must provide a article.'),
    categoryIds: string().array().nonempty('You must chose a category.'),
    title: string({
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

export type AddPostInput = TypeOf<typeof addPostSchema>['body'];
export type AddCategoryInput = TypeOf<typeof addCategorySchema>['body'];
