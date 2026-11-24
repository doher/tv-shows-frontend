import { Button } from "~/ui-kit/Button/Button";
import styles from "./FavoritesTrigger.module.css";
import type { FavoritesTriggerProps } from "./types";

export const FavoritesTrigger = ({
  ref,
  count,
  isOpen,
  panelId,
  onOpen,
}: FavoritesTriggerProps) => (
  <Button
    className={styles.toggle}
    ref={ref}
    aria-haspopup="dialog"
    aria-expanded={isOpen}
    aria-controls={panelId}
    onClick={onOpen}
  >
    <span className={styles.star} aria-hidden="true">
      ★
    </span>
    Избранное
    {count !== null && <span className={styles.count}>{count}</span>}
  </Button>
);
