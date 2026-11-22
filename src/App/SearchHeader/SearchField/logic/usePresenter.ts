import { type ChangeEvent, useId, useRef } from "react";
import { searchStore } from "~/stores/search";
import { typeQuery } from "./tasks/typeQuery";

export const usePresenter = () => {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  const changeQuery = (event: ChangeEvent<HTMLInputElement>) => {
    void typeQuery(event.currentTarget.value);
  };

  const clearQuery = () => {
    inputRef.current?.focus();
    void typeQuery("");
  };

  return {
    query: searchStore.query,
    inputId,
    inputRef,
    changeQuery,
    clearQuery,
  };
};
