export interface FavoriteButtonProps {
  name: string;
  isFavorite: boolean;
  canChange: boolean;
  onToggle: () => void;
}
