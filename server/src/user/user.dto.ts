export interface ICreateDto {
  username: string;
  email: string;
  password: string;
  verificationCode?: string | null;
}

export interface IUpdateDto {
  id: string;
  username: string;
  notification: boolean;
  avatar: string | null;
}
