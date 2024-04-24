export interface UserDto {
  pseudo: string;
  email: string;
  password: string;
  verificationCode?: string | null;
}

export interface IUserUpdateDto {
  id: string;
  pseudo: string;
  email: string;
}
