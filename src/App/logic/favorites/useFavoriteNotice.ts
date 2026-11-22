import { useEffect, useState } from "react";
import type { ToastNotice } from "~/ui-kit/Toast/types";

const TOAST_DURATION_MS = 5000;

export const useFavoriteNotice = () => {
  const [notice, setNotice] = useState<ToastNotice | null>(null);

  const showNotice = (kind: ToastNotice["kind"], message: string) => {
    setNotice((current) => ({
      kind,
      message,
      revision: (current?.revision ?? 0) + 1,
    }));
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
