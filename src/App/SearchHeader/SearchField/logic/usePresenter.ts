import { type ChangeEvent, useId, useRef } from "react";
import { getPendingSearch } from "~/App/logic/search/getPendingSearch";
import { searchStore } from "~/App/logic/stores/searchStore";
import { typeQuery } from "./tasks/typeQuery";

export const usePresenter = () => {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const { query, search } = searchStore;

  const changeQuery = (event: ChangeEvent<HTMLInputElement>) => {
    void typeQuery(event.currentTarget.value);
  };

  const clearQuery = () => {
    inputRef.current?.focus();
    void typeQuery("");
  };

  return {
    query,
    isBusy: getPendingSearch(search, query) !== null,
    inputId,
    inputRef,
    changeQuery,
    clearQuery,
  };
};
