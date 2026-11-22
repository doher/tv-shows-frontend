import { Button } from "~/ui-kit/Button/Button";
import { ShowGrid } from "../components/ShowGrid/ShowGrid";
import styles from "./Favorites.module.css";
import { FavoriteToast } from "./FavoriteToast/FavoriteToast";
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
        {isOpen &&
          list.status === "ready" &&
          (list.shows.length > 0 ? (
            <ShowGrid
              label="Избранные сериалы"
              shows={list.shows}
              favoriteActions={favoriteActions}
              cardRef={cardRef}
            />
          ) : (
            <p className={styles.message}>В избранном пока нет сериалов.</p>
          ))}
      </div>
      <FavoriteToast notice={notice} />
    </div>
  );
};
