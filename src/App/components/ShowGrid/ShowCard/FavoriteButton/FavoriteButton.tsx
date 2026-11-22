import { Button } from "~/ui-kit/Button/Button";
import styles from "./FavoriteButton.module.css";
import type { FavoriteButtonProps } from "./types";

export const FavoriteButton = ({
  name,
  isFavorite,
  canChange,
  onToggle,
}: FavoriteButtonProps) => (
  <Button
    className={styles.button}
    aria-label={`Избранное: ${name}`}
    aria-pressed={isFavorite}
    aria-disabled={!canChange}
    onClick={onToggle}
  >
    <span aria-hidden="true">{isFavorite ? "★" : "☆"}</span>
  </Button>
);
