import { Hero } from '@/components/hero';
import { Testimonial } from '@/components/testimonial';
import type { Metadata, ResolvingMetadata } from 'next';
import MariePierre from '~/public/assets/images/marie-pierre.png';

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
    <>
      <Hero params={{ lang: params.lang }} />
      <Testimonial
        id="testimonial-from-Marie-Pierre"
        author={{
          name: 'Marie-Pierre',
          role: 'Propriétaire du gîte des Echudes',
          image: MariePierre,
        }}
      >
        <p>
          “ Arnaud Lyard a vraiment pris le temps de définir notre besoin afin
          de nous proposer une architecture de site personnalisée. Nous lui
          avons fourni les photos et nous sommes restés en contact tout au long
          du projet. Nous le recommandons ”
        </p>
      </Testimonial>
    </>
  );
}
