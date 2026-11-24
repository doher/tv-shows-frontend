import type { FavoritesProps } from "../types";
import { useDrawerDialog } from "./useDrawerDialog";
import { useDrawerShows } from "./useDrawerShows";
import { useRemovedCardFocus } from "./useRemovedCardFocus";

export const usePresenter = (props: FavoritesProps) => {
  const { reset, clear, count, ...list } = useDrawerShows(props);
  const { showModal, ...dialog } = useDrawerDialog(clear);
  const focus = useRemovedCardFocus();

  const open = () => {
    reset();
    showModal();
    props.refresh();
  };

  const retry = () => {
    focus.closeButton.current?.focus();
    props.refresh();
  };

  return { count, list, dialog, focus, open, retry };
};
