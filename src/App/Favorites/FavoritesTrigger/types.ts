import type { Ref } from "react";

export interface FavoritesTriggerProps {
  ref: Ref<HTMLButtonElement>;
  count: number | null;
  isOpen: boolean;
  panelId: string;
  onOpen: () => void;
}
