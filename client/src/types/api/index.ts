import {IBlog, IUser} from '../models';

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
      username: string;
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

export interface ICreateBlogResponse {
  status: string;
  message: string;
}

export interface ICreateBlogPayload {
  datas: string;
}

export interface ICreateCategoryResponse {
  status: string;
  message: string;
}

export interface ICreateCategoryPayload {
  categoryName: string;
}