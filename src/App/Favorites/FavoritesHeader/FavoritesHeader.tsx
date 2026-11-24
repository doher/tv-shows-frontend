import { Button } from "~/ui-kit/Button/Button";
import styles from "./FavoritesHeader.module.css";
import type { FavoritesHeaderProps } from "./types";

export const FavoritesHeader = ({
  titleId,
  closeButtonRef,
}: FavoritesHeaderProps) => (
  <div className={styles.header}>
    <h2 className={styles.title} id={titleId}>
      Избранное
    </h2>
    <form method="dialog">
      <Button
        type="submit"
        className={styles.close}
        ref={closeButtonRef}
        aria-label="Закрыть избранное"
      >
        <span aria-hidden="true">×</span>
      </Button>
    </form>
  </div>
);
