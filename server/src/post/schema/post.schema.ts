import { boolean, object, string, TypeOf, z } from 'zod';

export const addPostSchema = object({
  body: object({
    datas: string({}),
  }),
});

export const addCategorySchema = object({
  body: object({
    categoryName: string({
      required_error: 'Category name is required',
    }).min(1, 'You must provide a category name'),
  }),
});

export type AddPostInput = TypeOf<typeof addPostSchema>['body'];
export type AddCategoryInput = TypeOf<typeof addCategorySchema>['body'];