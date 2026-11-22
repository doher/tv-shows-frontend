import type { Ref } from "react";

export type SearchFeedbackProps =
  | { kind: "status"; message: string }
  | {
      kind: "error";
      message: string;
      onRetry: () => void;
      retryButton: Ref<HTMLButtonElement>;
    };
