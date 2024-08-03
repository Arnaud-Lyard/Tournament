import { IUser } from '../../types/user';
import { PostRepository } from '../repository/post.repository';
import { File } from '../../types/file';

export async function addPost({
  user,
  content,
  categoryIds,
  title,
  image,
}: {
  user: IUser;
  content: string;
  categoryIds: string[];
  title: string;
  image: File | undefined;
}) {
  return await PostRepository.create({
    user,
    content,
    categoryIds,
    title,
    image: image!.filename,
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

export async function getAllPosts() {
  return await PostRepository.getAllPosts();
}
