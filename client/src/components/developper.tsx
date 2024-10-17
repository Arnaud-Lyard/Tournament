import Image from 'next/image';

import { GridPattern } from '@/components/grid-pattern';
import developperImage from '~/public/assets/images/Arnaud.jpg';
import { Button } from './button';

export function Developper({ params }: { params: { lang: string } }) {
  return (
    <section
      id="developper"
      aria-labelledby="developper-title"
      className="relative scroll-mt-14 pb-3 pt-8 sm:scroll-mt-32 sm:pb-16 sm:pt-10 lg:pt-16"
    >
      <div className="absolute inset-x-0 bottom-0 top-1/2 text-slate-900/10 [mask-image:linear-gradient(transparent,white)]">
        <GridPattern x="50%" y="100%" />
      </div>
      <div className="relative mx-auto max-w-5xl pt-16 sm:px-6">
        <div className="bg-slate-50 pt-px sm:rounded-6xl">
          <div className="relative mx-auto -mt-16 h-44 w-44 overflow-hidden rounded-full bg-slate-200 md:float-right md:h-64 md:w-64 md:[shape-outside:circle(40%)] lg:mr-20 lg:h-72 lg:w-72">
            <Image
              className="absolute inset-0 h-full w-full object-cover"
              src={developperImage}
              alt="Arnaud développeur"
              sizes="(min-width: 1024px) 18rem, (min-width: 768px) 16rem, 11rem"
            />
          </div>
          <div className="px-4 py-10 sm:px-10 sm:py-16 md:py-20 lg:px-20 lg:py-32">
            <p className="mt-8 font-display text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
              <span className="block text-cyan-600">Arnaud Lyard –</span>
              {params.lang === 'fr'
                ? 'Bonjour, je suis le développeur de Prochainweb.'
                : 'Hello, I am the developer of Prochainweb.'}
            </p>
            <p className="mt-4 text-lg tracking-tight text-slate-700">
              {params.lang === 'fr'
                ? `J'ai commencé à développer des sites web statiques puis dynamiques. Aujourd'hui je propose des solutions sur mesure pour les entreprises et les particuliers.`
                : `I started developing static and dynamic websites. Today I offer tailor-made solutions for businesses and individuals.`}
            </p>
            <p className="mt-8">
              <Button href="/about" color="cyan">
                {params.lang === 'fr' ? 'Mon histoire' : 'My story'}
              </Button>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
