import { observer } from "mobx-react-lite";
import { ShowGrid } from "../components/ShowGrid/ShowGrid";
import { GenreFilters } from "./GenreFilters/GenreFilters";
import { usePresenter } from "./logic/usePresenter";
import { Pagination } from "./Pagination/Pagination";
import { SearchFeedback } from "./SearchFeedback/SearchFeedback";
import styles from "./SearchResults.module.css";
import type { SearchResultsProps } from "./types";

export const SearchResults = observer(
  ({ favoriteActions }: SearchResultsProps) => {
    const { search, heading, feedback, isBusy } = usePresenter();
    if (!search) {
      return null;
    }

    const results = search.status === "success" ? search.results : null;
    const range = results?.resultRange;

    return (
      <section
        className={styles.root}
        aria-labelledby="results-title"
        aria-busy={isBusy}
      >
        <div className={styles.heading}>
          <h2 id="results-title" ref={heading} tabIndex={-1}>
            Результаты
          </h2>
          <p className={styles.count} role="status">
            {range &&
              range.total > 0 &&
              `${range.first}–${range.last} из ${range.total}`}
          </p>
        </div>

        {feedback !== null && <SearchFeedback {...feedback} />}

        {results && results.resultRange.total > 0 && (
          <>
            <GenreFilters
              genres={results.genres}
              selectedGenre={results.selectedGenre}
            />
            <ShowGrid
              label="Найденные сериалы"
              shows={results.shows}
              favoriteActions={favoriteActions}
            />
          </>
        )}

        <footer className={styles.footer}>
          {results && (
            <Pagination page={results.page} pageCount={results.pageCount} />
          )}
          <a href="https://www.tvmaze.com/" target="_blank" rel="noreferrer">
            Данные TVmaze <span aria-hidden="true">↗</span>
          </a>
        </footer>
      </section>
    );
  },
);
