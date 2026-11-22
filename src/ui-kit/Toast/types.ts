export interface ToastNotice {
  kind: "success" | "error";
  message: string;
  revision: number;
}

export interface ToastProps {
  notice: ToastNotice | null;
}
