import {IUser} from "../../types/user";
import {PostRepository} from "../repository/post.repository";

export async function addBlog({
    user,
    content,
  }: {
  user: IUser;
  content : string;
}) {
  return await PostRepository.create({
    user,
    content,
  });
}

export async function addCategory({
      user,
      name,
    }: {
  user: IUser;
  content : string;
}) {
  return await PostRepository.createCategory({
    user,
    name,
  })
}