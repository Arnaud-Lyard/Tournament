export interface UserDto {
  pseudo: string;
  email: string;
  password: string;
  verificationCode?: string | null;
  langage: 'en' | 'fr';
}

export interface IUserUpdateDto {
  id: string;
  pseudo: string;
  email: string;
}
