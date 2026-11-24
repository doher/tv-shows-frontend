import { Button } from "~/ui-kit/Button/Button";
import styles from "./SearchFeedback.module.css";
import type { SearchFeedbackProps } from "./types";

export const SearchFeedback = (props: SearchFeedbackProps) => {
  const isError = props.kind === "error";
  const message = (
    <p className={styles.message} role={isError ? "alert" : "status"}>
      {props.message}
    </p>
  );

  if (isError) {
    return (
      <div className={styles.error}>
        {message}
        <Button
          className={styles.retry}
          onClick={props.isRetrying ? undefined : props.onRetry}
          aria-disabled={props.isRetrying}
          ref={props.retryButton}
        >
          Повторить поиск
        </Button>
      </div>
    );
  }

  return message;
};
