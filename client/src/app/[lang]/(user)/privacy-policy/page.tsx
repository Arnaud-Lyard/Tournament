'use client';
import { useDictionary } from '@/providers/dictionary-provider';

export default function PrivacyPolicy() {
  const dictionary = useDictionary();
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-dark mb-5">
        {dictionary.privacyPolicy.title}
      </h1>
      <h2 className="text-xl font-bold tracking-tight text-dark mb-5">
        {dictionary.privacyPolicy.titleOne}
      </h2>
      <p>{dictionary.privacyPolicy.textOne}</p>
      <ul>
        <li className="text-dark">{dictionary.privacyPolicy.listOne}</li>
        <li className="text-dark">{dictionary.privacyPolicy.listTwo}</li>
      </ul>
      <p>{dictionary.privacyPolicy.textTwo}</p>
      <h2 className="text-xl font-bold tracking-tight text-dark mb-5 mt-5">
        {dictionary.privacyPolicy.titleTwo}
      </h2>
      <p>{dictionary.privacyPolicy.textFive}</p>
      <h2 className="text-xl font-bold tracking-tight text-dark mb-5 mt-5">
        {dictionary.privacyPolicy.titleThree}
      </h2>
      <p>{dictionary.privacyPolicy.textSix}</p>
      <h2 className="text-xl font-bold tracking-tight text-dark mb-5 mt-5">
        {dictionary.privacyPolicy.titleFour}
      </h2>
      <p>{dictionary.privacyPolicy.textSeven}</p>
      <ul>
        <li className="text-dark">{dictionary.privacyPolicy.listThree}</li>
        <li className="text-dark">{dictionary.privacyPolicy.listFour}</li>
        <li className="text-dark">{dictionary.privacyPolicy.listFive}</li>
        <li className="text-dark">{dictionary.privacyPolicy.listSix}</li>
      </ul>
      <h2 className="text-xl font-bold tracking-tight text-dark mb-5 mt-5">
        {dictionary.privacyPolicy.titleFive}
      </h2>
      <p>{dictionary.privacyPolicy.textEight}</p>
      <h2 className="text-xl font-bold tracking-tight text-dark mb-5 mt-5">
        {dictionary.privacyPolicy.titleSix}
      </h2>
      <p>{dictionary.privacyPolicy.textNine}</p>
    </div>
  );
}
