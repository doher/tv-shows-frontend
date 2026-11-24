import { ShowCard } from "./ShowCard/ShowCard";
import styles from "./ShowGrid.module.css";
import type { ShowGridProps } from "./types";

export const ShowGrid = ({
  label,
  shows,
  favoriteActions,
  cardRef,
}: ShowGridProps) => (
  <ul
    className={styles.grid}
    aria-label={label}
    aria-busy={favoriteActions.isSaving || undefined}
  >
    {shows.map((show) => (
      <ShowCard
        key={show.id}
        ref={cardRef}
        show={show}
        favoriteActions={favoriteActions}
      />
    ))}
  </ul>
);
