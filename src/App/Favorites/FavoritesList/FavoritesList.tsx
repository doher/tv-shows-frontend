import { ShowGrid } from "~/App/components/ShowGrid/ShowGrid";
import { Button } from "~/ui-kit/Button/Button";
import styles from "./FavoritesList.module.css";
import type { FavoritesListProps } from "./types";

export const FavoritesList = ({
  isLoading,
  loadFailed,
  shows,
  canRestore,
  favoriteActions,
  cardRef,
  onRetry,
}: FavoritesListProps) => (
  <div className={styles.body}>
    {isLoading && (
      <p className={styles.message} role="status">
        Загружаем избранное…
      </p>
    )}
    {loadFailed && (
      <div className={styles.feedback}>
        <p className={styles.message} role="alert">
          Не удалось загрузить избранное.
        </p>
        <Button className="kadr-button-compact" onClick={onRetry}>
          Повторить
        </Button>
      </div>
    )}
    {shows && shows.length > 0 && (
      <ShowGrid
        label="Избранные сериалы"
        shows={shows}
        favoriteActions={favoriteActions}
        cardRef={cardRef}
      />
    )}
    {canRestore && (
      <p className={styles.message}>
        Нажмите на пустую звезду, чтобы вернуть сериал.
      </p>
    )}
    {shows?.length === 0 && (
      <p className={styles.message}>В избранном пока нет сериалов.</p>
    )}
  </div>
);
