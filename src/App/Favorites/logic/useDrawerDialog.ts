import { useId, useRef, useState } from "react";

const SCROLLBAR_WIDTH = "--favorites-scrollbar-width";

export const useDrawerDialog = (onAfterClose: () => void) => {
  const ref = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const titleId = useId();
  const [isOpen, setIsOpen] = useState(false);

  const showModal = () => {
    const root = document.documentElement;
    const scrollbarWidth = innerWidth - root.clientWidth;
    root.style.setProperty(SCROLLBAR_WIDTH, `${scrollbarWidth}px`);
    ref.current?.showModal();
    setIsOpen(true);
  };

  const handleClose = async () => {
    const dialog = ref.current;
    if (!dialog || dialog.open) {
      return;
    }

    document.documentElement.style.removeProperty(SCROLLBAR_WIDTH);
    setIsOpen(false);
    trigger.current?.focus({ preventScroll: true });
    await Promise.allSettled(
      dialog.getAnimations().map((animation) => animation.finished),
    );
    if (!dialog.open && dialog.isConnected) {
      onAfterClose();
    }
  };

  return { ref, trigger, panelId, titleId, isOpen, showModal, handleClose };
};
