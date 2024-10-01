import { Hero } from '@/components/hero';
import type { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: { slug: string; lang: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Metadata {
  return {
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_APP_URL}/${params.lang}`,
    },
  };
}

export default function Home({ params }: { params: { lang: string } }) {
  return (
    <div className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Hero params={{ lang: params.lang }} />
      </div>
    </div>
  );
}
