'use client';
import { useDictionary } from '@/providers/dictionary-provider';

export default function LegalNotices() {
  const dictionary = useDictionary();
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-dark mb-5">
        {dictionary.legalNotices.title}
      </h1>
      <h2 className="text-xl font-bold tracking-tight text-dark mb-5">
        {dictionary.legalNotices.titleOne}
      </h2>
      <ul>
        <li className="text-dark">{dictionary.legalNotices.textOne}</li>
        <li className="text-dark">{dictionary.legalNotices.textTwo}</li>
        <li className="text-dark">{dictionary.legalNotices.textThree}</li>
        <li className="text-dark">{dictionary.legalNotices.textFour}</li>
      </ul>

      <h2 className="text-xl font-bold tracking-tight text-dark mb-5 mt-5">
        {dictionary.legalNotices.titleTwo}
      </h2>
      <ul>
        <li className="text-dark">{dictionary.legalNotices.textFive}</li>
        <li className="text-dark">{dictionary.legalNotices.textSix}</li>
        <li className="text-dark">{dictionary.legalNotices.textSeven}</li>
        <li className="text-dark">{dictionary.legalNotices.textEight}</li>
      </ul>

      <h2 className="text-xl font-bold tracking-tight text-dark mb-5 mt-5">
        {dictionary.legalNotices.titleThree}
      </h2>
      <p>{dictionary.legalNotices.textNine}</p>

      <h2 className="text-xl font-bold tracking-tight text-dark mb-5 mt-5">
        {dictionary.legalNotices.titleFour}
      </h2>
      <p>{dictionary.legalNotices.textTen}</p>
    </div>
  );
}
