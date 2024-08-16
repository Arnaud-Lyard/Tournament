export interface IPostUpdateDto {
  id: string;
  frenchContent: string;
  englishContent: string;
  frenchTitle: string;
  englishTitle: string;
  categoryIds: string[];
  image: string | null;
}
