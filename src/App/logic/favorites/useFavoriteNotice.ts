import { useEffect, useRef, useState } from "react";
import type { ToastMessage } from "~/ui-kit/Toast/types";

const TOAST_DURATION_MS = 5000;

export const useFavoriteNotice = () => {
  const [notice, setNotice] = useState<ToastMessage | null>(null);
  const lastNoticeId = useRef(0);

  const showNotice = (kind: ToastMessage["kind"], message: string) => {
    lastNoticeId.current += 1;
    setNotice({ id: lastNoticeId.current, kind, message });
  };

  useEffect(() => {
    if (notice === null) {
      return;
    }

    const timer = setTimeout(
      () => setNotice((current) => (current === notice ? null : current)),
      TOAST_DURATION_MS,
    );
    return () => clearTimeout(timer);
  }, [notice]);

  return { notice, showNotice };
};
