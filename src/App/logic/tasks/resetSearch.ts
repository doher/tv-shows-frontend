import { runInAction } from "mobx";
import { searchRequests } from "~/App/logic/search/searchRequests";
import { searchStore } from "~/App/logic/stores/searchStore";

export const resetSearch = (query = "") => {
  searchRequests.cancel();
  runInAction(() => {
    searchStore.setQuery(query);
    searchStore.setSearch({ status: "idle" });
  });
};
