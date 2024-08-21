import type { MetadataRoute } from 'next';
import { HttpService } from '@/services';
import { IGetPostsResponse } from '@/types/api';

const http = new HttpService();

async function handlePosts() {
  return http.service().get<IGetPostsResponse>(`/posts/publish`);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const {
    datas: { posts },
  } = await handlePosts();

  const postEntries = posts.map((post) => ({
    url: `${process.env.NEXT_PUBLIC_APP_URL}/post/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    alternates: {
      languages: {
        fr: `${process.env.NEXT_PUBLIC_APP_URL}/fr/post/${post.slug}`,
        en: `${process.env.NEXT_PUBLIC_APP_URL}/en/post/${post.slug}`,
      },
    },
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: process.env.NEXT_PUBLIC_APP_URL!,
      lastModified: new Date(),
      alternates: {
        languages: {
          fr: `${process.env.NEXT_PUBLIC_APP_URL!}/fr`,
          en: `${process.env.NEXT_PUBLIC_APP_URL!}/en`,
        },
      },
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${process.env.NEXT_PUBLIC_APP_URL}/post`,
      lastModified: new Date(),
      alternates: {
        languages: {
          fr: `${process.env.NEXT_PUBLIC_APP_URL!}/fr/post`,
          en: `${process.env.NEXT_PUBLIC_APP_URL!}/en/post`,
        },
      },
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...postEntries,
  ];
}
