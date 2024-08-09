'use client';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { useDictionary } from '@/providers/dictionary-provider';
import { useErrorHandling } from '@/hooks/useErrorHandling';
import { HttpService } from '@/services';
import { IProfileResponse, IResponse } from '@/types/api';
import { FormEvent, useEffect, useState } from 'react';

export default function Profile({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const http = new HttpService();
  const { errors, message, checkErrors, resetMessages, setMessage } =
    useErrorHandling();
  const dictionary = useDictionary();

  async function handleProfile() {
    try {
      const response = await http
        .service()
        .get<IProfileResponse>(`/users/profile`);
      setUsername(response.data.user.username);
      setEmail(response.data.user.email);
      setNotification(response.data.user.notification);
    } catch (e: any) {}
  }

  useEffect(() => {
    handleProfile();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setAvatar(event.target.files[0]);
    }
  };

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState<File | null>(null);
  const [notification, setNotification] = useState<boolean>();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', username);
    formData.append('notification', notification ? 'true' : 'false');
    if (avatar) {
      formData.append('file', avatar);
    }
    try {
      const response = await http
        .service()
        .push<IResponse, any>(`users/update`, formData, undefined, true);
      if (response.status === 'success') {
        setMessage(response.message);
      }
    } catch (e: any) {
      checkErrors(e.response.data);
    }
    resetMessages();
  };

  return (
    <form method="post" onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="space-y-12 sm:space-y-16">
        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            {dictionary.profile.titleOne}
          </h2>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
            {dictionary.profile.titleOneDescription}
          </p>

          <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                {dictionary.profile.formLabelOne}
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:max-w-md sm:text-sm sm:leading-6"
                  required={true}
                  defaultValue={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-center sm:gap-4 sm:py-6">
              <label
                htmlFor="avatar"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                {dictionary.profile.formLabelTwo}
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <div className="flex items-center gap-x-3">
                  <UserCircleIcon
                    className="h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />
                  <button
                    type="button"
                    className="rounded-md bg-white px-2.5 py-1.5 text-sm  text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    <input
                      id="avatar"
                      type="file"
                      name="file"
                      onChange={handleFileChange}
                    ></input>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            {dictionary.profile.titleTwo}
          </h2>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
            {dictionary.profile.titleTwoDescription}
          </p>

          <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                {dictionary.profile.formLabelThree}
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-cyan-600 sm:max-w-md">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    disabled={true}
                    value={email}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            {dictionary.profile.titleThree}
          </h2>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
            {dictionary.profile.titleThreeDescription}
          </p>

          <div className="mt-10 space-y-10 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
            <fieldset>
              <legend className="sr-only">Push Notifications</legend>
              <div className="sm:grid sm:grid-cols-3 sm:items-baseline sm:gap-4 sm:py-6">
                <div
                  className="text-sm font-semibold leading-6 text-gray-900"
                  aria-hidden="true"
                >
                  {dictionary.profile.formLabelFour}
                </div>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <div className="max-w-lg">
                    <p className="text-sm leading-6 text-gray-600">
                      {dictionary.profile.formLabelFourDescription}
                    </p>
                    <div className="mt-6 space-y-6">
                      <div className="flex items-center gap-x-3">
                        <input
                          id="true"
                          name="true"
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-cyan-600 focus:ring-cyan-600"
                          checked={notification === true}
                          onChange={() => setNotification(true)}
                        />
                        <label
                          htmlFor="true"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          {dictionary.profile.formLabelFourOptions.optionOne}
                        </label>
                      </div>
                      <div className="flex items-center gap-x-3">
                        <input
                          id="false"
                          name="false"
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-cyan-600 focus:ring-cyan-600"
                          checked={notification === false}
                          onChange={() => setNotification(false)}
                        />
                        <label
                          htmlFor="false"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          {dictionary.profile.formLabelFourOptions.optionTwo}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </div>

      {errors.length > 0 &&
        errors.map((error: string, index) => (
          <p key={index} className="text-red-700">
            {error}
          </p>
        ))}
      {message !== '' && <p className="text-green-700">{message}</p>}

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          {dictionary.buttons.cancel}
        </button>
        <button
          type="submit"
          className="inline-flex justify-center rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
        >
          {dictionary.buttons.submit}
        </button>
      </div>
    </form>
  );
}
