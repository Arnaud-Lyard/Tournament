import { HttpService } from '@/services';
import { IGetPostsResponse } from '@/types/api';
import { IPostCategoryUser } from '@/types/models';
import moment from 'moment';
import { Metadata, ResolvingMetadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  params: { slug: string; lang: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Metadata {
  return {
    title:
      params.lang === 'fr'
        ? `Liste des articles | Prochainweb`
        : `Articles list | Prochainweb`,
    description:
      params.lang === 'fr'
        ? 'Enrichir ses connaissances en découvrant les articles de Prochainweb.'
        : 'Enrich your knowledge by discovering Prochainweb articles.',
    openGraph: {
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_UPLOADS_URL}/blog-banner.jpeg`,
          width: 1200,
          height: 630,
          alt: params.lang === 'fr' ? 'Liste des articles' : 'Articles list',
        },
      ],
    },
  };
}

export default async function Post({ params }: { params: { lang: string } }) {
  const http = new HttpService();
  const defaultLogo = 'user.png';

  const response = await http
    .service()
    .get<IGetPostsResponse>(`/posts/publish`);

  const posts: IPostCategoryUser[] = response.datas.posts.map((post) => ({
    ...post,
    createdAt: moment(post.createdAt).format('L'),
    image: `${process.env.NEXT_PUBLIC_UPLOADS_URL}/${post.image}`,
    user: {
      username: post.user.username,
      avatar: post.user.avatar
        ? `${process.env.NEXT_PUBLIC_UPLOADS_URL}/${post.user.avatar}`
        : `${process.env.NEXT_PUBLIC_UPLOADS_URL}/${defaultLogo}`,
    },
  }));

  return (
    <div className="grid grid-cols-1 gap-10 py-10 sm:grid-cols-1 sm:gap-5 sm:py-10 md:gap-10">
      {posts.map((post) => (
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
                {post.categories.map((category) => (
                  <span
                    key={category.category.id}
                    className="px-2 py-1 text-xs text-gray-400 rounded-md border border-gray-400"
                  >
                    {category.category.name}
                  </span>
                ))}
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
      ))}
    </div>
  );
}
