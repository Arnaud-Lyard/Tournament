import { boolean, object, string, TypeOf, z } from 'zod';

export const updateUserSchema = object({
  body: object({
    username: string({}),
    notification: string({}),
  }),
});

export type UpdateUserInput = TypeOf<typeof updateUserSchema>['body'];
