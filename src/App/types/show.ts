export type Show = {
  id: number;
  name: string;
  url: string;
  genres: string[];
  premiered: string | null;
  image: { medium: string } | null;
  rating: { average: number | null };
};
