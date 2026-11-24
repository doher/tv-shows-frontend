import { autorun } from "mobx";
import { useLayoutEffect } from "react";
import { searchStore } from "~/App/logic/stores/searchStore";
import { searchShows } from "~/App/logic/tasks/searchShows";
import { searchRequests } from "../searchRequests";
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
