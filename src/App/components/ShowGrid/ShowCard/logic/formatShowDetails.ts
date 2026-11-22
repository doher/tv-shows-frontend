import type { Show } from "~/App/types";

const PREMIERE_YEAR_LENGTH = 4;
const MAX_VISIBLE_GENRES = 2;
const RATING_DECIMAL_PLACES = 1;

export const formatShowDetails = ({ premiered, genres, rating }: Show) => {
  const year = premiered?.slice(0, PREMIERE_YEAR_LENGTH);
  const visibleGenres = genres.slice(0, MAX_VISIBLE_GENRES).join(" / ");

  return {
    metadata: [year, visibleGenres].filter(Boolean).join(" · "),
    rating: rating.average?.toFixed(RATING_DECIMAL_PLACES),
  };
};
