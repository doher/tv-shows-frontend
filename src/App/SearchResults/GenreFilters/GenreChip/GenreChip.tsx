import { Button } from "~/ui-kit/Button/Button";
import styles from "./GenreChip.module.css";
import { usePresenter } from "./logic/usePresenter";
import type { GenreChipProps } from "./types";

export const GenreChip = (props: GenreChipProps) => {
  const { genre } = props;
  const { isSelected, selectGenre } = usePresenter(props);

  return (
    <Button
      className={styles.chip}
      lang={genre === null ? undefined : "en"}
      aria-pressed={isSelected}
      aria-disabled={!selectGenre || undefined}
      onClick={selectGenre}
    >
      {genre ?? "Все жанры"}
    </Button>
  );
};
