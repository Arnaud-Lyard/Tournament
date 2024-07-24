'use client';

import dynamic from 'next/dynamic';
import {useState} from "react";
import {useDictionary} from '@/providers/dictionary-provider';
import {ICreateBlogPayload, ICreateBlogResponse} from "@/types/api";
import {HttpService} from "@/services";
import {useErrorHandling} from "@/hooks/useErrorHandling";

const CustomEditor = dynamic(() => import( '@/components/custom-editor' ), {ssr: false});

export default function AddBlog() {
  const [blogDatas, setBlogDatas] = useState<string | undefined>();
  const dictionary = useDictionary();
  const http = new HttpService();
  const {errors, message, checkErrors, resetMessages, setMessage} =
      useErrorHandling();
  const handleSubmit = async () => {
    if (!blogDatas) {
      return;
    }
    try {
      const response = await http
          .service()
          .push<ICreateBlogResponse, ICreateBlogPayload>(`blogs/create`, {datas: blogDatas});
      if (response.status === 'success') {
        setMessage(response.message);
      }
    } catch (e: any) {
      checkErrors(e.response.data);
    }
    resetMessages();
  }
  return (
      <div className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-dark">
            Blog
          </h1>
          <div className="my-5">
            <CustomEditor
                setBlogDatas={setBlogDatas}
                blogDatas='Nouvel article'
            />
          </div>
          <div>
            <button
                onClick={() => handleSubmit()}
                className="inline-flex justify-center rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
            >
              {dictionary.buttons.submit}
            </button>
          </div>
        </div>
      </div>
  );
}
