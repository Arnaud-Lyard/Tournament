import { object, string, TypeOf } from 'zod';

export const updateUserSchema = object({
  body: object({
    username: string({}),
    notification: string({}),
  }),
});

export const unsubscribeUserSchema = object({
  params: object({
    id: string({}),
  }),
});

export type UpdateUserInput = TypeOf<typeof updateUserSchema>['body'];
export type UnsubscribeUserInput = TypeOf<
  typeof unsubscribeUserSchema
>['params'];
