import { HttpService } from '@/services';
import { IGetPostResponse } from '@/types/api';
import moment from 'moment';
import 'moment/locale/fr';
import Image from 'next/image';
import type { Metadata, ResolvingMetadata } from 'next';

const http = new HttpService();
type Props = {
  params: { slug: string; lang: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug;
  const post = await http.service().get<IGetPostResponse>(`posts/slug/${slug}`);

  return {
    title:
      params.lang === 'fr'
        ? `${post.data.post.frenchTitle} | Prochainweb`
        : `${post.data.post.englishTitle} | Prochainweb`,
    description:
      params.lang === 'fr'
        ? post.data.post.frenchDescription
        : post.data.post.englishDescription,
    openGraph: {
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_UPLOADS_URL}/${post.data.post.image}`,
          width: 400,
          height: 400,
          alt:
            params.lang === 'fr'
              ? post.data.post.frenchTitle
              : post.data.post.englishTitle,
        },
      ],
    },
  };
}

export default async function PostDetail({
  params,
}: {
  params: { slug: string; lang: string };
}) {
  const http = new HttpService();

  const response = await http
    .service()
    .get<IGetPostResponse>(`posts/slug/${params.slug}`);
  const title =
    params.lang === 'fr'
      ? response.data.post.frenchTitle
      : response.data.post.englishTitle;
  const description =
    params.lang === 'fr'
      ? response.data.post.frenchDescription
      : response.data.post.englishDescription;
  const postDatas =
    params.lang === 'fr'
      ? response.data.post.frenchContent
      : response.data.post.englishContent;
  const categories = response.data.post.categories.map((category) => {
    return category.category;
  });
  const image = `${process.env.NEXT_PUBLIC_UPLOADS_URL}/${response.data.post.image}`;
  const publishedAt = moment(response.data.post.createdAt)
    .locale(params.lang)
    .format('L');
  const updatedAt = moment(response.data.post.updatedAt)
    .locale(params.lang)
    .format('L');

  return (
    <div className="px-3 py-16 lg:px-5">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-5">
            {title}
          </h1>
          <h2 className="text-2xl text-gray-700 mb-2">{description}</h2>
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => {
              return (
                <span
                  key={category.id}
                  className="px-2 py-1 text-xs text-gray-400 rounded-md border border-gray-400"
                >
                  {category.name}
                </span>
              );
            })}
          </div>

          <Image
            src={image}
            alt={title}
            width={200}
            height={200}
            priority={true}
            className="object-contain mx-auto mt-4 mb-4"
          />

          <p className="text-gray-400">
            {params.lang === 'fr'
              ? `Publié le  ${publishedAt}, dernière mise à jour le ${updatedAt}`
              : `Published on ${publishedAt}, last updated on ${updatedAt}`}
          </p>
        </div>

        <div className="mt-5">
          <div
            dangerouslySetInnerHTML={{ __html: postDatas }}
            className="ck-content"
          ></div>
        </div>
      </div>
    </div>
  );
}
