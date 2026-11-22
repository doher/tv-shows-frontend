import styles from "./Toast.module.css";
import type { ToastProps } from "./types";

export const Toast = ({ notice }: ToastProps) => (
  <div className={styles.root}>
    <div role="status">
      {notice?.kind === "success" && (
        <p className={styles.message} key={notice.revision}>
          {notice.message}
        </p>
      )}
    </div>
    <div role="alert">
      {notice?.kind === "error" && (
        <p
          className={`${styles.message} ${styles.error}`}
          key={notice.revision}
        >
          {notice.message}
        </p>
      )}
    </div>
  </div>
);
