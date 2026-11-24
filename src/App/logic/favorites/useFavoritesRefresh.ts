import { useEffect } from "react";
import { favoritesStore } from "~/App/logic/stores/favoritesStore";
import { refreshFavorites } from "../tasks/refreshFavorites";
import { favoritesRequests } from "./favoritesRequests";

export const useFavoritesRefresh = () => {
  useEffect(() => {
    const refreshWhenVisible = () => {
      if (document.visibilityState === "visible") {
        void refreshFavorites();
      }
    };

    void refreshFavorites();
    addEventListener("focus", refreshWhenVisible);
    document.addEventListener("visibilitychange", refreshWhenVisible);
    return () => {
      removeEventListener("focus", refreshWhenVisible);
      document.removeEventListener("visibilitychange", refreshWhenVisible);
      favoritesRequests.cancel();
      favoritesStore.setList({ status: "loading" });
    };
  }, []);
};
