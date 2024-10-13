import { ResolvingMetadata, type Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';

import { Container } from '@/components/container';
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from '@/components/SocialIcons';
import portraitImage from '~/public/assets/images/Arnaud.jpg';

type Props = {
  params: { slug: string; lang: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

function SocialLink({
  className,
  href,
  children,
  icon: Icon,
}: {
  className?: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        target="_blank"
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-cyan-500 dark:text-zinc-200 dark:hover:text-cyan-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-cyan-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  );
}

function MailIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  );
}

export function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Metadata {
  return {
    title:
      params.lang === 'fr'
        ? `A propos de moi | Prochainweb`
        : `About me | Prochainweb`,
    description:
      params.lang === 'fr'
        ? 'A propos de Arnaud Lyard, développeur web fullstack.'
        : 'About Arnaud Lyard, fullstack web developer.',
    openGraph: {
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_UPLOADS_URL}/arnaud.jpeg`,
          width: 1200,
          height: 630,
          alt: params.lang === 'fr' ? 'Arnaud' : 'Arnaud',
        },
      ],
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_APP_URL}/${params.lang}/about`,
    },
  };
}

export default function About({ params }: { params: { lang: string } }) {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <Image
              src={portraitImage}
              alt="Arnaud"
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
            />
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            {params.lang === 'fr'
              ? "Je suis Arnaud Lyard. J'habite à Ambutrix en région Lyonnaise."
              : 'I am Arnaud Lyard. I live in Ambutrix in the Lyon region.'}
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <p>
              {params.lang === 'fr'
                ? "Internet devient accessible au grand public en 1994 et c'est à cette époque que j'ai commancé à utliser l'informatique sur l'ordinateur de mes parents. J'ai créé mon premier site web en 2002 pendant mon stage de 3ème. J'ai ensuite continué à apprendre le développement web en autodidacte notamment à travers le site du zéro."
                : "The Internet became accessible to the general public in 1994 and it was at that time that I started using computers on my parents' computer. I created my first website in 2002 during my 3rd year internship. I then continued to learn web development on my own, particularly through the zero site."}
            </p>
            <p>
              {params.lang === 'fr'
                ? "J'ai assemblé mon premier ordinateur en 2004 qui fonctionne encore aujourd'hui comme serveur sur une distribution Linux. Mon entourage savait que je m'intéressais à l'informatique et lorsqu'un ami avait un problème avec son ordinateur, il me demandait souvent de le dépanner."
                : 'I assembled my first computer in 2004 which still runs today as a server on a Linux distribution. Those around me knew that I was interested in computers and when a friend had a problem with his computer, he often asked me to help him out.'}
            </p>
            <p>
              {params.lang === 'fr'
                ? "Aujourd'hui, je suis développeur web fullstack, j'ai travaillé sur des projets de sites web, de boutiques en ligne et d'applications web. J'ai également travaillé sur des projets de développement de logiciels pour des entreprises."
                : 'Today, I am a fullstack web developer, I have worked on website projects, online stores and web applications. I have also worked on software development projects for companies.'}
            </p>
          </div>
        </div>
        <div className="lg:pl-20">
          <ul role="list">
            <SocialLink
              href="https://github.com/Arnaud-Lyard"
              icon={GitHubIcon}
              className="mt-4"
            >
              {params.lang === 'fr' ? 'Suivre sur GitHub' : 'Follow on GitHub'}
            </SocialLink>
            <SocialLink
              href="https://www.linkedin.com/in/arnaud-lyard/"
              icon={LinkedInIcon}
              className="mt-4"
            >
              {params.lang === 'fr'
                ? 'Suivre sur LinkedIn'
                : 'Follow on LinkedIn'}
            </SocialLink>
            <SocialLink
              href="mailto:arnaud@prochainweb.com"
              icon={MailIcon}
              className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
            >
              arnaud@prochainweb.com
            </SocialLink>
          </ul>
        </div>
      </div>
    </Container>
  );
}
