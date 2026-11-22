export interface FavoriteNotice {
  kind: "success" | "error";
  message: string;
  revision: number;
}

export interface FavoriteToastProps {
  notice: FavoriteNotice | null;
}
