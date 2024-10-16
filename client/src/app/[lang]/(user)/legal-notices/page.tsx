import { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: { slug: string; lang: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
export function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Metadata {
  return {
    robots: 'noindex nofollow',
  };
}

export default function LegalNotices({ params }: { params: { lang: string } }) {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold tracking-tight text-dark mb-5">
        {params.lang === 'fr' ? 'Mentions légales' : 'Legal Notices'}
      </h1>
      <h2 className="text-xl font-bold tracking-tight text-dark mb-5">
        {params.lang === 'fr'
          ? '1. Informations Générales'
          : '1. General Information'}
      </h2>
      <ul>
        <li className="text-dark">
          {params.lang === 'fr'
            ? 'Nom du site : Prochainweb'
            : 'Website Name: Prochainweb'}
        </li>
        <li className="text-dark">
          {params.lang === 'fr'
            ? 'Adresse web : www.prochainweb.com'
            : 'Web Address: www.prochainweb.com'}
        </li>
        <li className="text-dark">
          {params.lang === 'fr'
            ? 'Propriétaire et directeur de la publication : Arnaud Lyard'
            : 'Owner and Publication Director: Arnaud Lyard'}
        </li>
        <li className="text-dark">
          {params.lang === 'fr'
            ? 'Contact : arnaud@prochainweb.com'
            : 'Contact: arnaud@prochainweb.com'}
        </li>
      </ul>

      <h2 className="text-xl font-bold tracking-tight text-dark mb-5 mt-5">
        {params.lang === 'fr' ? '2. Hébergement' : '2. Hosting'}
      </h2>
      <ul>
        <li className="text-dark">
          {params.lang === 'fr'
            ? 'Hébergeur : Contabo GmbH'
            : 'Host: Contabo GmbH'}
        </li>
        <li className="text-dark">
          {params.lang === 'fr'
            ? 'Adresse : Aschauer Straße 32a, Allemagne'
            : 'Address: Aschauer Straße 32a, Germany'}
        </li>
        <li className="text-dark">
          {params.lang === 'fr'
            ? 'Site web : https://contabo.com'
            : 'Website: https://contabo.com'}
        </li>
        <li className="text-dark">
          {params.lang === 'fr'
            ? 'Téléphone : +49 89 356471771'
            : 'Phone: +49 89 356471771'}
        </li>
      </ul>

      <h2 className="text-xl font-bold tracking-tight text-dark mb-5 mt-5">
        {params.lang === 'fr' ? '3. Responsabilité' : '3. Liability'}
      </h2>
      <p>
        {params.lang === 'fr'
          ? "Prochainweb s'efforce d'assurer l'exactitude des informations diffusées sur le site. Toutefois, Prochainweb ne peut être tenu responsable des erreurs ou omissions présentes sur le site. L'utilisateur reconnaît utiliser ces informations sous sa responsabilité exclusive."
          : 'Prochainweb strives to ensure the accuracy of the information published on the website. However, Prochainweb cannot be held responsible for any errors or omissions on the site. The user acknowledges using this information at their own risk.'}
      </p>
    </div>
  );
}
