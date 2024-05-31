export interface UserDto {
  username: string;
  email: string;
  password: string;
  verificationCode?: string | null;
  langage: 'en' | 'fr';
}

export interface IUserUpdateDto {
  id: string;
  username: string;
  email: string;
}
