import { Button } from "~/ui-kit/Button/Button";
import { Toast } from "~/ui-kit/Toast/Toast";
import { ShowGrid } from "../components/ShowGrid/ShowGrid";
import styles from "./Favorites.module.css";
import { usePresenter } from "./logic/usePresenter";
import type { FavoritesProps } from "./types";

export const Favorites = (props: FavoritesProps) => {
  const { list, notice, favoriteActions } = props;
  const {
    count,
    loadFailed,
    isOpen,
    cardRef,
    panelId,
    retry,
    toggleOpen,
    trigger,
  } = usePresenter(props);
  const visibleShows = isOpen && list.status === "ready" ? list.shows : null;

  return (
    <div className={styles.root}>
      <Button
        className={styles.toggle}
        ref={trigger}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={toggleOpen}
      >
        <span aria-hidden="true">★</span> Избранное
        {count !== null && ` (${count})`}
      </Button>
      <div className={styles.panel} id={panelId} hidden={!isOpen}>
        {isOpen && list.status === "loading" && (
          <p className={styles.message} role="status">
            Загружаем избранное…
          </p>
        )}
        {isOpen && loadFailed && (
          <div className={styles.feedback}>
            <p className={styles.message} role="alert">
              Не удалось загрузить избранное.
            </p>
            <Button className="kadr-button-compact" onClick={retry}>
              Повторить
            </Button>
          </div>
        )}
        {visibleShows && visibleShows.length > 0 && (
          <ShowGrid
            label="Избранные сериалы"
            shows={visibleShows}
            favoriteActions={favoriteActions}
            cardRef={cardRef}
          />
        )}
        {visibleShows?.length === 0 && (
          <p className={styles.message}>В избранном пока нет сериалов.</p>
        )}
      </div>
      <Toast notice={notice} />
    </div>
  );
};
