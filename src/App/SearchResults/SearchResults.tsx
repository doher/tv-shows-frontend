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
    const { view, heading, feedback } = usePresenter();
    if (view.status === "idle") {
      return null;
    }

    const { first, last, total } = view.resultRange;

    return (
      <section className={styles.root} aria-labelledby="results-title">
        <div className={styles.heading}>
          <h2 id="results-title" ref={heading} tabIndex={-1}>
            Результаты
          </h2>
          <p className={styles.count} role="status">
            {total > 0 && `${first}–${last} из ${total}`}
          </p>
        </div>

        {feedback !== null && <SearchFeedback {...feedback} />}

        {total > 0 && (
          <>
            <GenreFilters
              genres={view.genres}
              selectedGenre={view.selectedGenre}
            />
            <ShowGrid
              label="Найденные сериалы"
              shows={view.shows}
              favoriteActions={favoriteActions}
            />
          </>
        )}

        <footer className={styles.footer}>
          <Pagination page={view.page} pageCount={view.pageCount} />
          <a href="https://www.tvmaze.com/" target="_blank" rel="noreferrer">
            Данные TVmaze <span aria-hidden="true">↗</span>
          </a>
        </footer>
      </section>
    );
  },
);
