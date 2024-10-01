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
export default function PrivacyPolicy({
  params,
}: {
  params: { lang: string };
}) {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-dark mb-5">
        {params.lang === 'fr'
          ? 'Politique de confidentialité'
          : 'Privacy Policy'}
      </h1>
      <h2 className="text-xl font-bold tracking-tight text-dark mb-5">
        {params.lang === 'fr'
          ? '1. Collecte des Données Personnelles'
          : '1. Collection of Personal Data'}
      </h2>
      <p>
        {params.lang === 'fr'
          ? 'Sur le site Prochainweb, les données personnelles collectées sont les suivantes :'
          : 'On the Prochainweb website, the personal data collected is as follows:'}
      </p>
      <ul>
        <li className="text-dark">
          {params.lang === 'fr'
            ? "Adresse e-mail : demandée pour l'enregistrement et la connexion."
            : 'Email address: required for registration and login.'}
        </li>
        <li className="text-dark">
          {params.lang === 'fr'
            ? "Nom d'utilisateur : demandé lors de l'inscription."
            : 'Username: required during registration.'}
        </li>
      </ul>
      <p>
        {params.lang === 'fr'
          ? "Ces données sont collectées pour permettre la création de comptes utilisateurs, la confirmation d'inscription et la connexion à l'espace personnel."
          : 'This data is collected to enable the creation of user accounts, confirmation of registration, and login to the personal space.'}
      </p>
      <h2 className="text-xl font-bold tracking-tight text-dark mb-5 mt-5">
        {params.lang === 'fr'
          ? '2. Utilisation des Données Personnelles'
          : '2. Use of Personal Data'}
      </h2>
      <p>
        {params.lang === 'fr'
          ? 'Les données personnelles collectées sur Prochainweb sont utilisées uniquement à des fins de gestion des comptes utilisateurs et de communication (e-mails de confirmation, notifications).'
          : 'The personal data collected on Prochainweb is used solely for user account management and communication (confirmation emails, notifications).'}
      </p>
      <h2 className="text-xl font-bold tracking-tight text-dark mb-5 mt-5">
        {params.lang === 'fr'
          ? '3. Conservation des Données'
          : '3. Data Retention'}
      </h2>
      <p>
        {params.lang === 'fr'
          ? "Les données personnelles (adresse e-mail et nom d'utilisateur) sont conservées de manière indéfinie, tant que l'utilisateur ne demande pas la suppression de son compte."
          : 'Personal data (email address and username) is retained indefinitely, as long as the user does not request the deletion of their account.'}
      </p>
      <h2 className="text-xl font-bold tracking-tight text-dark mb-5 mt-5">
        {params.lang === 'fr' ? '4. Droits des Utilisateurs' : '4. User Rights'}
      </h2>
      <p>
        {params.lang === 'fr'
          ? 'Conformément au RGPD, les utilisateurs de Prochainweb disposent des droits suivants concernant leurs données personnelles :'
          : 'In accordance with the GDPR, Prochainweb users have the following rights regarding their personal data:'}
      </p>
      <ul>
        <li className="text-dark">
          {params.lang === 'fr'
            ? "Droit d'accès : vous pouvez demander une copie des données personnelles que nous détenons à votre sujet."
            : 'Right of access: you can request a copy of the personal data we hold about you.'}
        </li>
        <li className="text-dark">
          {params.lang === 'fr'
            ? 'Droit de rectification : vous pouvez demander la correction des données personnelles inexactes ou incomplètes.'
            : 'Right to rectification: you can request the correction of inaccurate or incomplete personal data.'}
        </li>
        <li className="text-dark">
          {params.lang === 'fr'
            ? "Droit à l'effacement : vous pouvez demander la suppression de votre compte et de vos données personnelles en nous contactant à l'adresse suivante : arnaud@prochainweb.com."
            : 'Right to erasure: you can request the deletion of your account and personal data by contacting us at the following address: arnaud@prochainweb.com.'}
        </li>
        <li className="text-dark">
          {params.lang === 'fr'
            ? "Droit d'opposition : vous pouvez vous opposer à l'utilisation de vos données personnelles dans certains cas."
            : 'Right to object: you can object to the use of your personal data in certain cases.'}
        </li>
      </ul>
      <h2 className="text-xl font-bold tracking-tight text-dark mb-5 mt-5">
        {params.lang === 'fr'
          ? '5. Utilisation des Cookies'
          : '5. Use of Cookies'}
      </h2>
      <p>
        {params.lang === 'fr'
          ? 'Le site Prochainweb utilise des cookies pour la connexion des utilisateurs. Ces cookies sont nécessaires au bon fonctionnement du site et ne sont pas utilisés à des fins publicitaires.'
          : 'The Prochainweb website uses cookies for user login. These cookies are necessary for the proper functioning of the site and are not used for advertising purposes.'}
      </p>
      <h2 className="text-xl font-bold tracking-tight text-dark mb-5 mt-5">
        {params.lang === 'fr'
          ? '6. Modifications de la Politique de Confidentialité'
          : '6. Changes to the Privacy Policy'}
      </h2>
      <p>
        {params.lang === 'fr'
          ? "Prochainweb se réserve le droit de modifier la présente politique de confidentialité à tout moment. Les utilisateurs seront informés de tout changement important via l'adresse e-mail fournie lors de l'inscription."
          : 'Prochainweb reserves the right to modify this privacy policy at any time. Users will be informed of any significant changes via the email address provided during registration.'}
      </p>
    </div>
  );
}
