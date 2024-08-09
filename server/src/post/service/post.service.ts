import { IUser } from '../../types/user';
import { PostRepository } from '../repository/post.repository';
import { File } from '../../types/file';
import { PostStatusEnumType } from '@prisma/client';

export async function addPost({
  user,
  frenchContent,
  englishContent,
  frenchTitle,
  englishTitle,
  categoryIds,
  image,
}: {
  user: IUser;
  frenchContent: string;
  englishContent: string;
  frenchTitle: string;
  englishTitle: string;
  categoryIds: string[];
  image: File | undefined;
}) {
  return await PostRepository.create({
    user,
    frenchContent,
    englishContent,
    frenchTitle,
    englishTitle,
    categoryIds,
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

export async function checkIfPostExist(id: string) {
  return await PostRepository.getPostById(id);
}

export async function changePostStatus({
  id,
  status,
}: {
  id: string;
  status: PostStatusEnumType;
}) {
  return await PostRepository.changeStatusByPostId({
    id,
    status,
  });
}

export async function getPost(id: string) {
  return await PostRepository.getPostById(id);
}
