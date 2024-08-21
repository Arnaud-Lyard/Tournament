export interface IPostUpdateDto {
  id: string;
  frenchContent: string;
  englishContent: string;
  frenchTitle: string;
  englishTitle: string;
  frenchDescription: string;
  englishDescription: string;
  slug: string;
  categoryIds: string[];
  image: string | null;
}
