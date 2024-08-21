'use client';

import { useDictionary } from '@/providers/dictionary-provider';
import { HttpService } from '@/services';
import { IGetPostsResponse } from '@/types/api';
import { IPostCategoryUser } from '@/types/models';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Post({ params }: { params: { lang: string } }) {
  const dictionary = useDictionary();
  const router = useRouter();
  const http = new HttpService();
  const [posts, setPosts] = useState<IPostCategoryUser[]>([]);
  const defaultLogo = 'user.png';

  async function handlePosts() {
    try {
      const response = await http
        .service()
        .get<IGetPostsResponse>(`/posts/publish`);
      setPosts(
        response.datas.posts.map((post) => ({
          ...post,
          createdAt: moment(post.createdAt).format('L'),
          image: `${process.env.NEXT_PUBLIC_UPLOADS_URL}/${post.image}`,
          user: {
            username: post.user.username,
            avatar: post.user.avatar
              ? `${process.env.NEXT_PUBLIC_UPLOADS_URL}/${post.user.avatar}`
              : `${process.env.NEXT_PUBLIC_UPLOADS_URL}/${defaultLogo}`,
          },
        }))
      );
    } catch (e: any) {}
  }
  useEffect(() => {
    handlePosts();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-10 py-10 sm:grid-cols-1 sm:gap-5 sm:py-10 md:gap-10">
      {posts.map((post) => {
        return (
          <article className="mx-auto w-full max-w-screen-lg" key={post.id}>
            <Link
              className="group flex flex-col items-center gap-5 md:flex-row md:gap-10"
              href={`/post/${post.slug}`}
            >
              <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-gray-800/40 md:aspect-square md:max-w-[300px]">
                <Image
                  alt={
                    params.lang === 'fr' ? post.frenchTitle : post.englishTitle
                  }
                  src={post.image}
                  width={400}
                  height={400}
                  priority={true}
                  className="w-full h-full object-contain transition duration-500 ease-in-out sm:group-hover:scale-105"
                />
              </div>
              <div className="w-full">
                <div className="flex flex-wrap gap-2">
                  {post.categories.map((category) => {
                    return (
                      <span
                        key={category.category.id}
                        className="px-2 py-1 text-xs text-gray-400 rounded-md border border-gray-400"
                      >
                        {category.category.name}
                      </span>
                    );
                  })}
                </div>
                <h2 className="text-balance font-sans text-2xl font-semibold sm:text-3xl">
                  {params.lang === 'fr' ? post.frenchTitle : post.englishTitle}
                </h2>
                <div className="max-w-xl pt-5 leading-relaxed text-gray-400">
                  {params.lang === 'fr'
                    ? post.frenchDescription
                    : post.englishDescription}
                </div>
                <div className="mt-5 flex items-center gap-2 text-gray-600">
                  <div className="flex items-center justify-center overflow-hidden rounded-full">
                    <Image
                      alt={post.user.username}
                      src={post.user.avatar as string}
                      width={40}
                      height={40}
                    />
                  </div>
                  <span>{post.user.username}</span>
                </div>
              </div>
            </Link>
          </article>
        );
      })}
    </div>
  );
}
