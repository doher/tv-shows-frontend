import { Toast } from "~/ui-kit/Toast/Toast";
import styles from "./Favorites.module.css";
import { FavoritesHeader } from "./FavoritesHeader/FavoritesHeader";
import { FavoritesList } from "./FavoritesList/FavoritesList";
import { FavoritesTrigger } from "./FavoritesTrigger/FavoritesTrigger";
import { usePresenter } from "./logic/usePresenter";
import type { FavoritesProps } from "./types";

export const Favorites = (props: FavoritesProps) => {
  const { count, list, dialog, focus, open, retry } = usePresenter(props);

  return (
    <>
      <FavoritesTrigger
        ref={dialog.trigger}
        count={count}
        isOpen={dialog.isOpen}
        panelId={dialog.panelId}
        onOpen={open}
      />
      <Toast notice={dialog.isOpen ? null : props.notice} />
      <dialog
        className={styles.drawer}
        ref={dialog.ref}
        id={dialog.panelId}
        aria-labelledby={dialog.titleId}
        closedby="any"
        onClose={dialog.handleClose}
      >
        <FavoritesHeader
          titleId={dialog.titleId}
          closeButtonRef={focus.closeButton}
        />
        <FavoritesList {...list} cardRef={focus.cardRef} onRetry={retry} />
        <Toast notice={props.notice} />
      </dialog>
    </>
  );
};
