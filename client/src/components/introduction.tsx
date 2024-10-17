import { CheckIcon } from '@/components/check-icon';
import { Container } from '@/components/container';

export function Introduction({ params }: { params: { lang: string } }) {
  return (
    <section
      id="introduction"
      aria-label="Introduction"
      className="pb-16 pt-20 sm:pb-20 md:pt-36 lg:py-32"
    >
      <Container className="text-lg tracking-tight text-slate-700">
        <p className="font-display text-4xl font-bold tracking-tight text-slate-900">
          {params.lang === 'fr'
            ? 'Comprendre le besoin pour proposer une solution sur mesure.'
            : 'Understand the need to propose a tailor-made solution.'}
        </p>
        <p className="mt-4">
          {params.lang === 'fr'
            ? "Avant d'être développeur, je croyais que le métier consistait à écrire du code toute la journée. Mais en réalité, ce n'est qu'une partie du travail, il faut aussi comprendre les besoins pour proposer des solutions adaptées."
            : 'Before being a developer, I thought the job was about writing code all day. But in reality, this is only part of the work, it is also necessary to understand the needs in order to propose adapted solutions.'}
        </p>
        <p className="mt-4">
          {params.lang === 'fr'
            ? "C'est pourquoi je prends le temps de discuter avec vous."
            : "That's why I'm taking the time to chat with you."}
        </p>
        <p className="mt-4">
          {params.lang === 'fr'
            ? "Je vous accompagne de la définition de votre besoin jusqu'au développment de votre projet."
            : 'I support you from the definition of your needs until the development of your project.'}
        </p>
        <ul role="list" className="mt-8 space-y-3">
          {params.lang === 'fr'
            ? [
                'Poser les bonnes questions',
                'Comprendre les enjeux',
                'Proposer des solutions adaptées',
                'Anticiper les évolutions futures',
                'Assurer la maintenance',
              ].map((feature) => (
                <li key={feature} className="flex">
                  <CheckIcon className="h-8 w-8 flex-none fill-cyan-500" />
                  <span className="ml-4">{feature}</span>
                </li>
              ))
            : [
                'Ask the right questions',
                'Understand the issues',
                'Propose suitable solutions',
                'Anticipate future developments',
                'Ensure maintenance',
              ].map((feature) => (
                <li key={feature} className="flex">
                  <CheckIcon className="h-8 w-8 flex-none fill-cyan-500" />
                  <span className="ml-4">{feature}</span>
                </li>
              ))}
        </ul>
        <p className="mt-8">
          {params.lang === 'fr'
            ? 'Une solution sur mesure, c’est une solution qui vous ressemble.'
            : 'A tailor-made solution is a solution that suits you.'}
        </p>
      </Container>
    </section>
  );
}
