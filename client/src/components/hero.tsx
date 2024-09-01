import Image from 'next/image';

import { Button } from '@/components/button';
import { GridPattern } from '@/components/grid-pattern';
import { StarRating } from '@/components/star-rating';
import coverImage from '~/public/assets/images/cover.png';

function Testimonial({ params }: { params: { lang: string } }) {
  return (
    <figure className="relative mx-auto max-w-md text-center lg:mx-0 lg:text-left">
      <div className="flex justify-center text-cyan-600 lg:justify-start">
        <StarRating />
      </div>
      <blockquote className="mt-2">
        <p className="font-display text-xl font-medium text-slate-900">
          “This method of designing icons is genius. I wish I had known this
          method a lot sooner.”
        </p>
      </blockquote>
      <figcaption className="mt-2 text-sm text-slate-500">
        <strong className="font-semibold text-cyan-600 before:content-['—_']">
          Stacey Solomon
        </strong>
        , Founder at Retail Park
      </figcaption>
    </figure>
  );
}

export function Hero({ params }: { params: { lang: string } }) {
  return (
    <div className="overflow-hidden bg-slate-100 lg:bg-transparent lg:px-5">
      <div className="mx-auto grid max-w-6xl grid-cols-1 grid-rows-[auto_1fr] gap-y-16 pt-16 md:pt-20 lg:grid-cols-12 lg:gap-y-20 lg:px-3 lg:pb-36 lg:pt-20 xl:py-32">
        <div className="relative flex items-end lg:col-span-5 lg:row-span-2">
          <div className="absolute -bottom-12 -top-20 left-0 right-1/2 z-10 rounded-br-6xl bg-cyan-600 text-white/10 md:bottom-8 lg:-inset-y-32 lg:left-[-100vw] lg:right-full lg:-mr-40">
            <GridPattern
              x="100%"
              y="100%"
              patternTransform="translate(112 64)"
            />
          </div>
          <div className="relative z-10 mx-auto flex w-64 rounded-xl md:w-80 lg:w-auto">
            <Image className="w-full" src={coverImage} alt="" priority />
          </div>
        </div>
        <div className="relative px-4 sm:px-6 lg:col-span-7 lg:pb-14 lg:pl-16 lg:pr-0 xl:pl-20">
          <div className="hidden lg:absolute lg:-top-32 lg:bottom-0 lg:left-[-100vw] lg:right-[-100vw] lg:block lg:bg-slate-100" />
          {/* <Testimonial params={{ lang: params.lang }} /> */}
        </div>
        <div className="bg-white pt-16 lg:col-span-7 lg:bg-transparent lg:pl-16 lg:pt-0 xl:pl-20">
          <div className="mx-auto px-4 sm:px-6 md:max-w-2xl md:px-4 lg:px-0">
            <h1 className="font-display text-3xl font-extrabold text-slate-900 sm:text-5xl">
              {params.lang === 'fr'
                ? 'Plateforme de veille technologique'
                : 'Technology watch platform'}
            </h1>
            <p className="mt-4 text-2xl sm:text-3xl text-slate-600">
              {params.lang === 'fr'
                ? 'Un seul endroit pour suivre les dernières tendances technologiques.'
                : 'One place to follow the latest technology trends.'}
            </p>
            <div className="mt-8 flex gap-4">
              <Button href="/post" color="cyan">
                {params.lang === 'fr' ? 'Voir les articles' : 'View articles'}
              </Button>
              {/* <Button href="#pricing" variant="outline" color="cyan">
                Buy book
              </Button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
