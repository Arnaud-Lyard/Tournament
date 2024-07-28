import { IUser } from '../../types/user';
import { PostRepository } from '../repository/post.repository';

export async function addBlog({
  user,
  content,
  categoryIds,
  title,
}: {
  user: IUser;
  content: string;
  categoryIds: string[];
  title: string;
}) {
  return await PostRepository.create({
    user,
    content,
    categoryIds,
    title,
  });
}

export async function addCategory({ name }: { name: string }) {
  return await PostRepository.createCategory({
    name,
  });
}

export async function getAllCategories() {
  return await PostRepository.getAllCategories();
}
