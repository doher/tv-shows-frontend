import type { SearchRequest } from "~/App/types";

const parsePage = (param: string) => {
  if (!/^\d+$/.test(param)) {
    return 1;
  }

  return Math.max(1, Math.min(Number(param), Number.MAX_SAFE_INTEGER));
};

export const readSearchUrl = (search = location.search): SearchRequest => {
  const params = new URLSearchParams(search);
  const query = params.get("q")?.trim() ?? "";

  if (!query) {
    return { query, genre: null, page: 1 };
  }

  return {
    query,
    genre: params.get("genre")?.trim() || null,
    page: parsePage(params.get("page") ?? ""),
  };
};
