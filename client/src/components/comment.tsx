'use client';
import { useErrorHandling } from '@/hooks/useErrorHandling';
import { HttpService } from '@/services';
import {
  ICreateCommentPayload,
  ICreateCommentResponse,
  IGetCommentResponse,
  IResponse,
} from '@/types/api';
import { ICommentUser } from '@/types/models';
import Image from 'next/image';
import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';
import { useUser } from '@/contexts/userContext';

export default function Comment({
  params,
}: {
  params: { postId: string; lang: string };
}) {
  const [comment, setComment] = useState('');
  const [submittedComment, setSubmittedComment] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [comments, setComments] = useState<ICommentUser[]>([]);
  const [responseVisible, setResponseVisible] = useState('');
  const [response, setResponse] = useState('');
  const { isLoggedIn } = useUser();

  const http = new HttpService();
  const { errors, message, checkErrors, resetMessages, setMessage } =
    useErrorHandling();

  const handleCommentSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formJSON: any = Object.fromEntries(formData.entries());

    try {
      const response = await http
        .service()
        .push<ICreateCommentResponse, ICreateCommentPayload>(`posts/comment/`, {
          postId: params.postId,
          comment: formJSON.comment,
        });
      if (response.status === 'success') {
        setMessage(response.message);
        setComment('');
        await handleComment();
      }
    } catch (e: any) {
      checkErrors(e.response.data);
    }
    resetMessages();
  };

  async function handleComment() {
    try {
      const response = await http
        .service()
        .get<IGetCommentResponse>(`/posts/comment/${params.postId}`);
      setComments(response.data.comments);
    } catch (e: any) { }
  }
  useEffect(() => {
    handleComment();
  }, []);

  const handleResponseSubmit = async (
    commentId: string,
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const formJSON: any = Object.fromEntries(formData.entries());

      const response = await http
        .service()
        .push<ICreateCommentResponse, ICreateCommentPayload>(
          `posts/response/${params.postId}`,
          {
            comment: formJSON.response,
            parentId: commentId,
          }
        );

      if (response.status === 'success') {
        setMessage(response.message);
        setResponse('');
        setResponseVisible('');
        await handleComment();
      }
    } catch (e: any) {
      checkErrors(e.response.data);
    }
    resetMessages();
  };

  const getResponses = (commentId: string) =>
    comments.filter((comment) => comment.parentId === commentId);

  return (
    <div className="mt-10">
      <h3 id="comment" className="text-xl font-semibold text-gray-900">
        {params.lang === 'fr' ? 'Laissez un commentaire' : 'Leave a comment'}
      </h3>

      <form onSubmit={handleCommentSubmit} className="mt-5">
        <textarea
          id="comment"
          name="comment"
          className="w-full rounded-md border-gray-300 shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm p-3"
          rows={4}
          placeholder={
            params.lang === 'fr'
              ? 'Écrivez votre commentaire ici...'
              : 'Write your comment here...'
          }
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          disabled={!isLoggedIn}
        ></textarea>

        <button
          type="submit"
          className={`${isLoggedIn ? 'hover:bg-cyan-700' : ''
            } mt-3 px-4 py-2 bg-cyan-600 text-white rounded-md`}
          disabled={!isLoggedIn}
        >
          {params.lang === 'fr' ? 'Envoyer le commentaire' : 'Submit Comment'}
        </button>
        {errors.length > 0 &&
          errors.map((error: string, index) => (
            <p key={index} className="text-red-700">
              {error}
            </p>
          ))}
        {message !== '' && <p className="text-green-700">{message}</p>}
        {!isLoggedIn ? (
          <>
            <Link className="ml-2 text-cyan-600" href="/authentication">
              {params.lang === 'fr' ? 'Connectez-vous' : 'Log in'}
            </Link>
            {params.lang === 'fr'
              ? ' pour laisser un commentaire'
              : ' to leave a comment'}
          </>
        ) : null}
      </form>
      {comments.length > 0 && (
        <div className="mt-5">
          {comments
            .filter((comment) => comment.parentId === null)
            .map((comment) => (
              <div key={comment.id} className="mt-5">
                <div className=" border border-gray-200 rounded-md p-2">
                  <div className="flex">
                    <Image
                      width={32}
                      height={32}
                      alt="user avatar"
                      src={`${process.env.NEXT_PUBLIC_UPLOADS_URL}/${comment.user.avatar}`}
                    ></Image>
                    <p className="text-gray-800 ml-2">
                      {comment.user.username}
                    </p>
                  </div>
                  <p className="text-gray-500">{comment.content}</p>
                </div>
                {isLoggedIn ? (
                  <div
                    className="flex p-1 hover:cursor-pointer"
                    onClick={() => setResponseVisible(comment.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                      />
                    </svg>
                    <span className="ml-1">
                      {params.lang === 'fr' ? 'Répondre' : 'Reply'}
                    </span>
                  </div>
                ) : (
                  ''
                )}

                {getResponses(comment.id).length > 0 && (
                  <div className="ml-5 mt-5">
                    {getResponses(comment.id).map((response) => (
                      <div key={response.id} className="mt-3 border-l-2 pl-3">
                        <div className="flex">
                          <Image
                            width={32}
                            height={32}
                            alt="user avatar"
                            src={`${process.env.NEXT_PUBLIC_UPLOADS_URL}/${response.user.avatar}`}
                          />
                          <p className="text-gray-800 ml-2">
                            {response.user.username}
                          </p>
                        </div>
                        <p className="text-gray-500">{response.content}</p>
                      </div>
                    ))}
                  </div>
                )}

                {responseVisible === comment.id ? (
                  <form
                    onSubmit={(e) => handleResponseSubmit(comment.id, e)}
                    className="mt-5"
                  >
                    <textarea
                      id="response"
                      name="response"
                      className="w-full rounded-md border-gray-300 shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm p-3"
                      rows={4}
                      placeholder={
                        params.lang === 'fr'
                          ? 'Écrivez votre commentaire ici...'
                          : 'Write your comment here...'
                      }
                      value={response}
                      onChange={(e) => setResponse(e.target.value)}
                      required
                      disabled={!isLoggedIn}
                    ></textarea>

                    <button
                      type="submit"
                      className={`${isLoggedIn ? 'hover:bg-cyan-700' : ''
                        } mt-3 px-4 py-2 bg-cyan-600 text-white rounded-md`}
                      disabled={!isLoggedIn}
                    >
                      {params.lang === 'fr'
                        ? 'Envoyer le commentaire'
                        : 'Submit Comment'}
                    </button>
                  </form>
                ) : (
                  ''
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
