import { ICategory, IPost, IPostCategoryUser, IUser } from '../models';

export interface IResponse {
  status: string;
  message: string;
  data: {
    isConnect: boolean;
    informations: {
      role: string;
      username: string;
      avatar: string;
      email: string;
    };
  };
}

export interface IProfileResponse {
  status: string;
  data: {
    user: IUser;
  };
}

export interface IError {
  status: string;
  errors?: IErrorDtoInfos[];
  message?: string;
}

export interface IErrorDtoInfos {
  code: string;
  minimum?: number;
  type?: string;
  inclusive?: boolean;
  exact?: boolean;
  message: string;
  path: string[];
}

export interface ICreatePostResponse {
  status: string;
  message: string;
}

export interface ICreateCategoryResponse {
  status: string;
  message: string;
}

export interface ICreateDatasPayload {
  [k: string]: FormDataEntryValue;
}

export interface IGetCategoryResponse {
  status: string;
  data: {
    categories: ICategory[];
  };
}

export interface IGetPostsResponse {
  status: string;
  datas: {
    posts: IPostCategoryUser[];
  };
}

export interface IPublishedPostResponse {
  status: string;
  message: string;
}

export interface IPublishedPostPayload {
  postId: string;
}

export interface IDisabledPostResponse {
  status: string;
  message: string;
}

export interface IDisabledPostPayload {
  postId: string;
}

export interface IGetPostResponse {
  status: string;
  data: {
    post: IPostCategoryUser;
  };
}
