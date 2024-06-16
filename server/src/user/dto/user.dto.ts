export interface UserDto {
  username: string;
  email: string;
  password: string;
  verificationCode?: string | null;
}

export interface IUserUpdateDto {
  id: string;
  username: string;
  notification: boolean;
  avatar: string;
}
