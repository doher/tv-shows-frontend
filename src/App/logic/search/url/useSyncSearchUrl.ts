import { autorun } from "mobx";
import { useLayoutEffect } from "react";
import { searchShows } from "~/App/tasks/searchShows";
import { searchStore } from "~/stores/search";
import { searchRequests } from "../SearchRequests";
import { getSearchUrlRequest } from "./getSearchUrlRequest";
import { readSearchUrl } from "./readSearchUrl";
import { replaceSearchUrl } from "./replaceSearchUrl";

export const useSyncSearchUrl = () => {
  useLayoutEffect(() => {
    const initial = readSearchUrl();
    searchStore.setQuery(initial.query);
    if (initial.query) {
      void searchShows(initial);
    }

    const stopSync = autorun(() => {
      replaceSearchUrl(getSearchUrlRequest(searchStore.search));
    });

    return () => {
      stopSync();
      searchRequests.cancel();
      searchStore.setQuery("");
    };
  }, []);
};
