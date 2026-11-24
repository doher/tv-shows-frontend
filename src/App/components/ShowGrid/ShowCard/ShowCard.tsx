import { FavoriteButton } from "./FavoriteButton/FavoriteButton";
import { usePresenter } from "./logic/usePresenter";
import styles from "./ShowCard.module.css";
import infoStyles from "./ShowCardInfo.module.css";
import type { ShowCardProps } from "./types";

export const ShowCard = (props: ShowCardProps) => {
  const { show, favoriteActions } = props;
  const {
    metadata,
    rating,
    poster,
    handlePosterError,
    isFavorite,
    toggleFavorite,
  } = usePresenter(props);

  return (
    <li className={styles.root} ref={props.ref}>
      <a
        className={styles.card}
        href={show.url}
        target="_blank"
        rel="noreferrer"
      >
        <div className={styles.art}>
          {poster ? (
            <img
              className={styles.poster}
              src={poster}
              alt=""
              onError={handlePosterError}
            />
          ) : (
            <span className={styles.sun} aria-hidden="true" />
          )}
          {rating && (
            <span className={styles.rating}>
              <span className={styles.star} aria-hidden="true">
                ★
              </span>
              <span className={styles.visuallyHidden}>Рейтинг </span>
              {rating}
              <span className={styles.visuallyHidden}> из 10</span>
            </span>
          )}
        </div>
        <div className={infoStyles.info}>
          <h3 className={infoStyles.title} title={show.name}>
            {show.name}
          </h3>
          {metadata && (
            <p className={infoStyles.metadata} title={metadata}>
              {metadata}
            </p>
          )}
        </div>
      </a>
      <FavoriteButton
        name={show.name}
        isFavorite={isFavorite}
        canChange={favoriteActions.canChange}
        onToggle={toggleFavorite}
      />
    </li>
  );
};
