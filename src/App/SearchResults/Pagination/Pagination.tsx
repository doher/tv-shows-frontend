import { Button } from "~/ui-kit/Button/Button";
import { usePresenter } from "./logic/usePresenter";
import styles from "./Pagination.module.css";
import type { PaginationProps } from "./types";

export const Pagination = (props: PaginationProps) => {
  const { page, pageCount, onPageChange } = props;
  const {
    currentPageButton,
    handleArrowBlur,
    hasPagination,
    canGoBack,
    canGoForward,
    goBack,
    goForward,
    selectPage,
  } = usePresenter(props);

  if (!hasPagination) {
    return null;
  }

  return (
    <nav className={styles.pages} aria-label="Страницы результатов">
      <Button
        className={styles.button}
        aria-label="Назад"
        aria-disabled={!onPageChange || undefined}
        disabled={!canGoBack}
        onBlur={handleArrowBlur}
        onClick={goBack}
      >
        ‹
      </Button>
      {Array.from({ length: pageCount }, (_, index) => {
        const number = index + 1;
        const isCurrent = number === page;

        return (
          <Button
            className={styles.button}
            key={number}
            ref={isCurrent ? currentPageButton : undefined}
            aria-label={`Страница ${number}`}
            aria-disabled={!onPageChange || undefined}
            aria-current={isCurrent ? "page" : undefined}
            onClick={selectPage(number)}
          >
            {number}
          </Button>
        );
      })}
      <Button
        className={styles.button}
        aria-label="Вперёд"
        aria-disabled={!onPageChange || undefined}
        disabled={!canGoForward}
        onBlur={handleArrowBlur}
        onClick={goForward}
      >
        ›
      </Button>
    </nav>
  );
};
