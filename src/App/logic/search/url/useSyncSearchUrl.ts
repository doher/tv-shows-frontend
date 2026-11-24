import { autorun } from "mobx";
import { useLayoutEffect } from "react";
import { searchStore } from "~/App/logic/stores/searchStore";
import { resetSearch } from "~/App/logic/tasks/resetSearch";
import { searchShows } from "~/App/logic/tasks/searchShows";
import { getSearchUrlRequest } from "./getSearchUrlRequest";
import { readSearchUrl } from "./readSearchUrl";
import { replaceSearchUrl } from "./replaceSearchUrl";

export const useSyncSearchUrl = () => {
  useLayoutEffect(() => {
    const initial = readSearchUrl();
    if (initial.query) {
      searchStore.setQuery(initial.query);
      void searchShows(initial);
    } else {
      resetSearch();
    }

    const stopSync = autorun(() => {
      replaceSearchUrl(getSearchUrlRequest(searchStore.search));
    });

    return () => {
      stopSync();
      resetSearch();
    };
  }, []);
};
